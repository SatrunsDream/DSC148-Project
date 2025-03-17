import React, { useState } from 'react';
import { Container, Typography, ThemeProvider, createTheme, CssBaseline, TextField, Box, Paper, InputAdornment, Button, Rating } from '@mui/material';
import LocationMap from './components/LocationMap';
import config from './config';
import { fetchPrediction } from './api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green color
    },
    secondary: {
      main: '#81c784', // Lighter green
    },
    background: {
      default: '#e8f5e9', // Light green background
    },
  },
  typography: {
    h3: {
      fontFamily: "'Dancing Script', cursive",
      fontWeight: 700,
      color: '#2e7d32',
      fontSize: '3.5rem',
    },
    h6: {
      fontFamily: "'Dancing Script', cursive",
      fontWeight: 600,
      color: '#2e7d32',
      fontSize: '2rem',
    },
    prediction: {
      fontFamily: "'Dancing Script', cursive",
      color: '#1b5e20', // Dark green
      fontSize: '2rem',
    },
    predictionSecondary: {
      fontFamily: "'Dancing Script', cursive",
      color: '#2e7d32', // Medium green
      fontSize: '1.5rem',
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(145deg, #ffffff 0%, #f1f8e9 100%)',
          border: '1px solid #81c784',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#4caf50',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Dancing Script', cursive",
          fontSize: '1.5rem !important',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  const [formData, setFormData] = useState({
    city: '',
    zipcode: '',
    squareFootage: '',
    acreLot: '',
    bedrooms: '',
    bathrooms: '',
    listedPrice: ''
  });

  const [shouldFetchLocation, setShouldFetchLocation] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For numeric fields, ensure the value is not negative
    if (['listedPrice', 'squareFootage', 'bedrooms', 'bathrooms', 'zipcode'].includes(name)) {
      const numValue = value === '' ? '' : Math.max(0, parseInt(value, 10));
      setFormData(prev => ({
        ...prev,
        [name]: numValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Trigger map update when city or zipcode changes
    if (name === 'city' || name === 'zipcode') {
      setShouldFetchLocation(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First get the full address for geocoding
      const fullAddress = `${formData.city} ${formData.zipcode}`;

      // Prepare the data for the prediction API
      const predictionData = {
        address: fullAddress,
        price: formData.listedPrice ? parseFloat(formData.listedPrice) : null,
        square_footage: parseFloat(formData.squareFootage),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        age: 0  // Since we don't have age in the form, defaulting to 0
      };

      // Call the prediction API
      const data = await fetchPrediction(predictionData);
      setPredictionResult(data.prediction);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log('Google Maps API Key:', config.googleMapsApiKey);
  console.log('Backend URL:', config.backendUrl);
  console.log('API Key:', config.apiKey);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            mb: 4,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          House Valuation Demo
        </Typography>

        <Paper elevation={3}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            }}
          >
            <TextField
              fullWidth
              label="Listed Price"
              name="listedPrice"
              type="number"
              value={formData.listedPrice}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter the listed price"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                inputProps: { min: 0 }
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ gridColumn: { xs: '1', sm: '1 / 3' } }}
            />

            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter city name"
              InputLabelProps={{
                shrink: true,
              }}
            />
            
            <TextField
              fullWidth
              label="Zip Code"
              name="zipcode"
              type="number"
              value={formData.zipcode}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter zip code"
              InputProps={{
                inputProps: { min: 0 }
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              label="Square Footage"
              name="squareFootage"
              type="number"
              value={formData.squareFootage}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter square footage"
              InputProps={{
                inputProps: { min: 0 }
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              label="Acre Lot"
              name="acreLot"
              type="number"
              value={formData.acreLot}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter lot size in acres"
              InputProps={{
                inputProps: { min: 0, step: "0.01" }
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              label="Number of Bedrooms"
              name="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter number of bedrooms"
              InputProps={{
                inputProps: { min: 0 }
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              label="Number of Bathrooms"
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter number of bathrooms"
              InputProps={{
                inputProps: { min: 0 }
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button 
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ 
                gridColumn: { xs: '1', sm: '1 / 3' },
                mt: 2,
                height: '50px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(145deg, #4caf50 0%, #45a049 100%)',
                '&:hover': {
                  background: 'linear-gradient(145deg, #45a049 0%, #3d8b40 100%)',
                }
              }}
            >
              {loading ? 'Processing...' : 'Analyze'}
            </Button>
          </Box>
        </Paper>

        {predictionResult && (
          <Paper 
            elevation={3} 
            sx={{ 
              mt: 4, 
              mb: 4, 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(145deg, #ffffff 0%, #f1f8e9 100%)',
              borderRadius: '15px',
              border: '1px solid #81c784'
            }}
          >
            <Typography 
              variant="prediction" 
              component="h2" 
              gutterBottom
              sx={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                mb: 2
              }}
            >
              Predicted Price: ${predictionResult.predicted_price.toLocaleString()}
            </Typography>
            <Typography 
              variant="predictionSecondary" 
              component="h3" 
              gutterBottom
              sx={{
                mb: 2
              }}
            >
              {predictionResult.valuation}
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 1,
                '& .MuiRating-root': {
                  color: '#4caf50'
                }
              }}
            >
              <Typography 
                component="legend" 
                sx={{ 
                  mr: 1,
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '1.3rem',
                  color: '#2e7d32'
                }}
              >
                Property Rating:
              </Typography>
              <Rating value={predictionResult.star_rating} readOnly size="large" />
            </Box>
          </Paper>
        )}

        <LocationMap 
          city={formData.city}
          zipcode={formData.zipcode}
          shouldFetch={shouldFetchLocation}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;