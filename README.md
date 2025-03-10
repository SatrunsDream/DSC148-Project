# DSC148-Project

## 0 Introduction

## 1 Dataset
### 1.1 Identify a dataset
The datasets we will be using are

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
* `lat`: Latitude (decimal degrees) for center of the zip code
* `long`: Longitude (decimal degrees) for center of the zip code

**[Offenses Known to Law Enforcement](https://ucr.fbi.gov/crime-in-the-u.s/2015/crime-in-the-u.s.-2015/tables/table-8/table_8_offenses_known_to_law_enforcement_by_state_by_city_2015.xls/view) (9,396 entries): This dataset contains the volume of violent crime and property crime, as reported by 12 months of complete offense data for 2015, as reported by city and town law enforcement agencies that contributed data to the Uniform Crime Reporting Program**
* `City`: City name of each agency
* `Population`: Population estimate for each agency, derived by applying the average annual growth rate (2010–2014) to the 2014 U.S. Census population estimate
* `Violent crime`: Volume of total violent crime
* `Murder and nonnegligent manslaughter`: Volume of murder and nonnegligent manslaughter
* `Rape (revised definition)`: Rape reportings using this definition of rape. Penetration, no matter how slight, of the vagina or anus with any body part or object, or oral penetration by a sex organ of another person, without the consent of the victim. (This includes the offenses of rape, sodomy, and sexual assault with an object as converted from data submitted via the National Incident-Based Reporting System).
* `Rape (legacy definition)`: Rape reportings using this definition of rape. The carnal knowledge of a female forcibly and against her will.
* `Robbery`: Volume of robbery
* `Aggravated assault`: Volume of aggravated assault
* `Property crime`: Volume of total property crime
* `Burglary`: Volume of burglary
* `Larceny-theft`: Volume of larceny-theft
* `Motor vehicle theft`: Volume of motor vehicle theft
* `Arson`: Volume of arson (the FBI does not publish arson data unless it receives data from either the agency or the state for all 12 months of the calendar year)
* [Data Declaration](https://ucr.fbi.gov/crime-in-the-u.s/2015/crime-in-the-u.s.-2015/tables/table-8/table-8-data-declaration_final)

**[Institutional Characteristics](https://nces.ed.gov/ipeds/datacenter/DataFiles.aspx?year=2023&sid=b90abf0b-8b20-4dc7-9338-4b14f9d94e9c&rtid=7) (6,163 entries): This dataset contains directory information for every institution in the 2023-24 IPEDS universe. Includes name, address, city, state, zip code and various URL links to the institution's home page, admissions, financial aid offices and the net price calculator. Identifies institutions as currently active, and institutions that participate in Title IV federal financial aid programs for which IPEDS is mandatory. It includes variables derived from the 2023-24 Institutional Characteristics survey, such as control and level of institution, highest level and highest degree offered, Carnegie classifications and several geographical location variables including county, congressional districts, statistical areas and degree of urbanization**
* `INSTNM`: Institution (entity) name
* `CITY`: City location of institution
* `STABBR`: State abbreviation
* `ZIP`: ZIP code
* `OBEREG`: Bureau of Economic Analysis (BEA) Regions. 0 - US Service schools, 1 - New England CT ME MA NH RI VT, 2 - Mid East DE DC MD NJ NY PA, 3 - Great Lakes IL IN MI OH WI, 4 - Plains IA KS MN MO NE ND SD, 5 - Southeast AL AR FL GA KY LA MS NC SC TN VA WV, 6 - Southwest AZ NM OK TX, 7 - Rocky Mountains CO ID MT UT WY, 8 - Far West AK CA HI NV OR WA, 9 - Outlying areas AS FM GU MH MP PR PW VI, -3 - Not available
* `COUNTYNM`: County name
* `LONGITUD`: Longitude location of institution
* `LATITUDE`: Latitude location of institution
* `HLOFFER`: Highest level of offering. 0 - Other, 1 - Postsecondary award, certificate or diploma of less than one academic year, 2 - Postsecondary award, certificate or diploma of at least one but less than two academic years, 3 - Associate's degree, 4 - Postsecondary award, certificate or diploma of at least two but less than four academic years, 5 - Bachelor's degree, 6 - Postbaccalaureate certificate, 7 - Master's degree, 8 - Post-master's certificate, 9 - Doctor's degree, b - None of the above or no answer, -2 - Not applicable, first-professional only, -3 - Not Available
* The dataset contains 73 columns, but only a few relevant ones are described here
* To see data dictionary go to the [url](https://nces.ed.gov/ipeds/datacenter/DataFiles.aspx?year=2023&sid=b90abf0b-8b20-4dc7-9338-4b14f9d94e9c&rtid=7) and download the `Dictionary` file for the `HD2023` data file

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

Datasets: 
* https://www.kaggle.com/datasets/ahmedshahriarsakib/usa-real-estate-dataset/data
* https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html
* https://www.census.gov/programs-surveys/geography/technical-documentation/records-layout/gaz-record-layouts.html
* https://www.fourfront.us/data/datasets/us-population-density/
