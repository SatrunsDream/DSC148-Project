from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
import numpy as np
from typing import Dict, Any
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder

load_dotenv()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# House Input Model
class HouseInput(BaseModel):
    price: float | None = None
    square_footage: float
    bedrooms: int
    bathrooms: int
    age: int
    address: str

# ML Model for House Prediction
class HousePredictor:
    def __init__(self):
        # Load and preprocess the data
        self.model = self._train_model()

    def _train_model(self):
        # Load your dataset
        realtor_data = pd.read_csv('backend/data/cleaned_realtor_data.csv')  # Update with the actual path

        X = realtor_data.drop('price', axis=1)
        y = realtor_data['price']

        # Convert 'prev_sold_date' to datetime
        X['prev_sold_date'] = pd.to_datetime(X['prev_sold_date'])

        # Handle the datetime column 'prev_sold_date'
        X['prev_sold_year'] = X['prev_sold_date'].dt.year
        X['prev_sold_month'] = X['prev_sold_date'].dt.month
        X['prev_sold_day'] = X['prev_sold_date'].dt.day
        X = X.drop(columns=['prev_sold_date'])

        # Handle categorical features (use LabelEncoder)
        categorical_cols = X.select_dtypes(include=['object']).columns
        encoder = LabelEncoder()
        for col in categorical_cols:
            X[col] = encoder.fit_transform(X[col])

        # Split the data into train and test sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Train the model
        model = LinearRegression()
        model.fit(X_train, y_train)

        return model

    def predict(self, features: Dict[str, Any]) -> Dict[str, Any]:
        # Prepare the input data for prediction
        input_data = pd.DataFrame([features])

        # Convert 'prev_sold_date' to datetime
        input_data['prev_sold_date'] = pd.to_datetime(input_data['prev_sold_date'])

        # Handle the datetime column 'prev_sold_date'
        input_data['prev_sold_year'] = input_data['prev_sold_date'].dt.year
        input_data['prev_sold_month'] = input_data['prev_sold_date'].dt.month
        input_data['prev_sold_day'] = input_data['prev_sold_date'].dt.day
        input_data = input_data.drop(columns=['prev_sold_date'])

        # Handle categorical features (use LabelEncoder)
        categorical_cols = input_data.select_dtypes(include=['object']).columns
        encoder = LabelEncoder()
        for col in categorical_cols:
            input_data[col] = encoder.fit_transform(input_data[col])

        # Make predictions
        predicted_price = self.model.predict(input_data)[0]

        is_undervalued = True
        if 'price' in features and features['price'] is not None:
            is_undervalued = predicted_price > features['price']

        # Generate star rating based on valuation
        star_rating = 5 if is_undervalued else 3

        regression_plot = {
            "x": [i for i in range(5)],
            "y": [
                predicted_price * 0.9,
                predicted_price * 0.95,
                predicted_price,
                predicted_price * 1.05,
                predicted_price * 1.1
            ]
        }

        roc_data = {
            "fpr": [0, 0.2, 0.4, 0.6, 0.8, 1],
            "tpr": [0, 0.4, 0.6, 0.8, 0.9, 1]
        }

        return {
            "predicted_price": predicted_price,
            "valuation": "undervalued" if is_undervalued else "overvalued",
            "star_rating": star_rating,
            "confidence": 0.85,
            "regression_plot": regression_plot,
            "roc_data": roc_data
        }

# Create predictor instance
predictor = HousePredictor()

# API Endpoints
@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API is running"}

@app.get("/api/geocode")
async def geocode(address: str):
    api_key = os.getenv("GOOGLE_MAPS_API_KEY")
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"

    try:
        response = requests.get(f"{base_url}?address={address}&key={api_key}")
        data = response.json()

        if data["status"] == "OK":
            result = {
                "status": "OK",
                "results": [{
                    "geometry": {
                        "location": data["results"][0]["geometry"]["location"]
                    },
                    "address_components": data["results"][0]["address_components"]
                }]
            }
            return result
        else:
            return {"status": "ERROR", "error": "Location not found"}

    except Exception as e:
        return {"status": "ERROR", "error": str(e)}

@app.get("/api/nearby-places")
async def nearby_places(latitude: float, longitude: float, type: str, radius: int = 3000):
    api_key = os.getenv("GOOGLE_MAPS_API_KEY")
    base_url = "https://places.googleapis.com/v1/places:searchNearby"
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": "places.displayName,places.location,places.formattedAddress,places.types"
    }

    data = {
        "locationRestriction": {
            "circle": {
                "center": {
                    "latitude": latitude,
                    "longitude": longitude
                },
                "radius": radius
            }
        },
        "includedTypes": [type]
    }

    try:
        response = requests.post(base_url, headers=headers, json=data)
        places_data = response.json()

        if "places" in places_data:
            return {
                "status": "OK",
                "results": places_data["places"]
            }
        else:
            return {
                "status": "OK",
                "results": []
            }

    except Exception as e:
        return {"status": "ERROR", "error": str(e)}

@app.post("/api/predict-house-value")
async def predict_house_value(house_input: HouseInput):
    try:
        # First, get the geocoding data for the address
        geocode_result = await geocode(house_input.address)

        if geocode_result["status"] != "OK":
            raise HTTPException(status_code=400, detail="Could not geocode address")

        # Extract location data
        location = geocode_result["results"][0]["geometry"]["location"]

        # Prepare features for prediction
        features = {
            "price": house_input.price,
            "square_footage": house_input.square_footage,
            "bedrooms": house_input.bedrooms,
            "bathrooms": house_input.bathrooms,
            "age": house_input.age,
            "latitude": location["lat"],
            "longitude": location["lng"]
        }

        # Get prediction
        prediction_result = predictor.predict(features)

        return {
            "status": "OK",
            "prediction": prediction_result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)