# DSC148-Project

## 0 Introduction

## 1 Dataset
### 1.1 Identify a dataset
The dataset we will be using is

**[usa real estate data](https://www.kaggle.com/datasets/ahmedshahriarsakib/usa-real-estate-dataset/data) (2,226,382 entries): This dataset contains Real Estate listings in the US broken by State and zip code**
* `brokered by`: (categorically encoded agency/broker)
* `status`: (Housing status - a. ready for sale or b. ready to build)
* `price`: (Housing price, it is either the current listing price or recently sold price if the house is sold recently)
* `bed`: (# of beds)
* `bath`: (# of bathrooms)
* `acre_lot`: (Property / Land size in acres)
* `street`: (categorically encoded street address)
* `city`: (city name)
* `state`: (state name)
* `zip_code`: (postal code of the area)
* `house_size`: (house area/size/living space in square feet)
* `prev_sold_date`: (Previously sold date)
* `brokered by` and `street` addresses were categorically encoded due to data privacy policy
* `acre_lot` means the total land area, and `house_size` denotes the living space/building area

**[ZIP Code Tabulation Areas](https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html) (33,791 entries): This dataset contains geographic identifier codes, names, area measurements, and representative latitude and longitude coordinates for zip codes based on the 2020 Census tabulation blocks**
* `GEOID`: Five digit ZIP Code Tabulation Area Census Code
* `ALAND`: Land Area (square meters) - Created for statistical purposes only
* `AWATER`: Water Area (square meters) - Created for statistical purposes only
* `ALAND_SQMI`: Land Area (square miles) - Created for statistical purposes only
* `AWATER_SQMI`: Water Area (square miles) - Created for statistical purposes only
* `INTPTLAT`: Latitude (decimal degrees) First character is blank or "-" denoting North or South latitude respectively
* `INTPTLONG`: Longitude (decimal degrees) First character is blank or "-" denoting East or West longitude respectively
* [ZIP Code Tabulation Areas Glossary](https://www.census.gov/programs-surveys/geography/technical-documentation/records-layout/gaz-record-layouts.html)

**[US Population Density by Zip Code, City, and State](https://www.fourfront.us/data/datasets/us-population-density/) (40,959 entries): This dataset contains 2010 census data for every zip code in the United States, including the corresponding City, State, and latitude/longitude coordinates for the center of the zip code**
* `Zip`: Zip code
* `population`: Population of each zip code
* `density`: Population density of each zip code per sq. mile
* `City`: City name
* `St`: State name
* `CitySt`: City, St pair
* `County`: County name
* `Country`: Country name
* `Coordinates`: lat, long pair
* `lat`: Latitude (decimal degrees)
* `long`: Longitude (decimal degrees)

### 1.2 Data cleaning


### 1.3 Perform an exploratory data analysis
* Basic Statistics
* Properties
* Interesting findings
### 1.4 Findings in exploratory data analysis
* EDA should motivate your model design/choice

## 2. Predictive Task
### 2.1 Predictive task
* Identify a predictive task based on your dataset
### 2.2 Evaluation
* 2.2 How will you evaluate different models in this task?
### 2.3 Generalization
### 2.4 Baseline
* What are the baseline models you want to compare with?
* Why do you think they are appropriate?
* Why do you think your model can outperform them? Or say, what are their drawbacks?
### 2.5 Baseline result

## 3. Model
### 3.1 Initial settings
* What is the model that you propose to attack this task?
* It’s fine to use models that were described in class here
* Explain and justify your choice/proposal What are the features you designed for your model?
* Any unsuccessful tries?
### 3.2 Basic hyperparameter tuning
### 3.3 Feature engineering
### 3.4 Model optimzation
* How will you optimize your model?
* It’s fine here to call any 3rd party libs
* Did you encounter any troubles? Scalability? Overfitting?
### 3.5 Final optimization result

## 4. Literature
* Has your dataset/task been studied by others before?
* How the dataset was used?
* Are you working on a brand-new task?
* How are other people attacking the same/similar tasks?
* What is state-of-the-art method in this task or related tasks?
* Are your conclusions similar or different from existing work?
* What’s the major novelty of your work?

Note -> Originally, we had decided to do a 'basic' predict home prices model, however, this has been done billions of times, so we decided to change our question to make it unique.

## 5. Result
### 5.1 Comparison
* Does your proposed method outperform the baselines?
* Why your model can outperform? Or why your model fails?
* Whether the gap is significant?
### 5.2 Effectiveness
* Are all features you designed effective?
### 5.3 Hyperparameters
* How shall one set the hyper-parameters of your model?
### 5.4 Major takeaways
* What are the major takeaways (i.e., conclusions)?

## References
