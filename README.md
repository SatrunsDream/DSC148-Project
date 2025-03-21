# Home Price Evaluator: Determining Market Value

## Introduction
In today’s competitive housing market, overpaying for a home is an all-too-common pitfall—one that can lead to missed opportunities and costly investment mistakes. 
Accurately determining a home's expected price and value could be a crucial aspect in real estate, benefiting both sellers and buyers. This project aims to build a model that predicts home prices and assess their value, helping to identify if a property's price is reasonable. \href{https://house-evaluation.vercel.app/}{https://house-evaluation.vercel.app/} This live demo will also provide detailed information about an entered property and its surrounding area including estimated price, the property's value, and nearest local amenities.

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
* `Violent crime`: Volume of total violent crime. Consists of murder and nonnegligent manslaughter, rape, robbery, and aggravated assault
* `Property crime`: Volume of total property crime. Consists of burglary, larceny-theft, motor vehicle theft
* `Arson`: Volume of arson (the FBI does not publish arson data unless it receives data from either the agency or the state for all 12 months of the calendar year)
* [Data Declaration](https://ucr.fbi.gov/crime-in-the-u.s/2015/crime-in-the-u.s.-2015/tables/table-8/table-8-data-declaration_final)

**[Institutional Characteristics](https://nces.ed.gov/ipeds/datacenter/DataFiles.aspx?year=2023&sid=b90abf0b-8b20-4dc7-9338-4b14f9d94e9c&rtid=7) (6,163 entries): This dataset contains directory information for every institution in the 2023-24 IPEDS universe. Includes name, address, city, state, zip code and various URL links to the institution's home page, admissions, financial aid offices and the net price calculator. Identifies institutions as currently active, and institutions that participate in Title IV federal financial aid programs for which IPEDS is mandatory. It includes variables derived from the 2023-24 Institutional Characteristics survey, such as control and level of institution, highest level and highest degree offered, Carnegie classifications and several geographical location variables including county, congressional districts, statistical areas and degree of urbanization**
* `INSTNM`: Institution (entity) name
* `CITY`: City location of institution
* `STABBR`: State abbreviation
* `ZIP`: ZIP code
* `OBEREG`: Bureau of Economic Analysis (BEA) Regions
  * 0 - US Service schools
  * 1 - New England CT ME MA NH RI VT
  * 2 - Mid East DE DC MD NJ NY PA
  * 3 - Great Lakes IL IN MI OH WI
  * 4 - Plains IA KS MN MO NE ND SD
  * 5 - Southeast AL AR FL GA KY LA MS NC SC TN VA WV
  * 6 - Southwest AZ NM OK TX
  * 7 - Rocky Mountains CO ID MT UT WY
  * 8 - Far West AK CA HI NV OR WA
  * 9 - Outlying areas AS FM GU MH MP PR PW VI
  * -3 - Not available
* `COUNTYNM`: County name
* `LONGITUD`: Longitude location of institution
* `LATITUDE`: Latitude location of institution
* `HLOFFER`: Highest level of offering
  * 0 - Other
  * 1 - Postsecondary award, certificate or diploma of less than one academic year
  * 2 - Postsecondary award, certificate or diploma of at least one but less than two academic years
  * 3 - Associate's degree
  * 4 - Postsecondary award, certificate or diploma of at least two but less than four academic years
  * 5 - Bachelor's degree
  * 6 - Postbaccalaureate certificate
  * 7 - Master's degree
  * 8 - Post-master's certificate
  * 9 - Doctor's degree
  * b - None of the above or no answer
  * -2 - Not applicable, first-professional only
  * -3 - Not Available
* The dataset contains 73 columns, but only a few relevant ones are described here
* To see data dictionary go to the [url](https://nces.ed.gov/ipeds/datacenter/DataFiles.aspx?year=2023&sid=b90abf0b-8b20-4dc7-9338-4b14f9d94e9c&rtid=7) and download the `Dictionary` file for the `HD2023` data file

**[Property Taxes by State](https://taxfoundation.org/data/all/state/property-taxes-by-state-county/) (51 entries): This dataset provides state-level property tax information, including effective tax rates for owner-occupied housing in 2022 and 2023, as well as state rankings based on tax rates, offering insights into regional tax burdens**
* `State`: State name (including Washington DC)
* `Effective Tax Rate (2023)`: The mean effective property tax rate for owner-occupied housing (total real taxes paid/total home value) in 2023, expressed as a percentage
* `Effective Tax Rate (2022)`: The mean effective property tax rate for owner-occupied housing (total real taxes paid/total home value) in 2022, expressed as a percentage
* `Rank`: The ranking of the state based on its effective property tax rate in 2023 (DC’s rank does not affect states’ ranks)

### 1.2 Data cleaning
* Dropping rows with missing 'zip_code' since it can't be reliably filled in
* Filling NaN values of `price` steps:
   1) Fill in missing prices with median zip code prices
   2) Fill in missing prices with median state prices if the zip code group has all missing values
   3) Fill in missing prices with global median prices as a final fallback
* Filling NaN values of `bed` and `bath` steps:
   1) Fill in missing beds and baths with median zip code beds and baths
   2) Fill in missing beds and baths with median state beds and baths if the zip code group has all missing values
   3) Fill in missing beds and baths with global median beds and baths as a final fallback
* Filling NaN values of `acre_lot` steps:
   1) Fill in missing acreage with median zip code acreage
   2) Fill in missing acreage with median state acreage if the zip code group has all missing values
   3) Fill in missing acreage with global median acreage as a final fallback
* Filling missing states with `Guam` because the zipcode 96999 is found in Guam1. Filtering `state` to only include US states and Washington DC and remove US territories and else (e.g. New Brunswick is a Canadian province)$^1$
* Filling NaN values of `city` steps:
   1) Fill in missing cities using zip code
   2) Fill in missing acreage with state if the zip code group has all missing values
   3) Drop rows where city is still missing as a final fallback
* Filling NaN values of `house_size` steps:
   1) Fill in missing house sizes using zip code
   2) Fill in missing house sizes with city if the zip code group has all missing values + created temporary `city_state` column to avoid city name ambiguity
   3) Fill in missing house sizes with state as a final fallback
* Convert `prev_sold_date` to datetime
* Given that there are over 700_000 NaN values of `prev_sold_date`, these null values most likely exist represent that the homes have never been sold before, therefore we will create a binary indicator column `first_sale` where a 1 represents if the home has never been sold before (the NaN values) and 0 if it has (the non-NaN values).
* Given that there were `prev_sold_date` dates that happened after the dataset `usa real estate data` was last updated, which was in 2024, those dates will be made NaN
* Filling NaN values of `prev_sold_date` steps:
   1) Fill in missing previous sold dates using zip code
   2) Fill in missing previous sold dates with city_state if the zip code group has all missing values
   3) Fill in missing previous sold dates with state
   4) Fill in missing previous sold dates with global median as a final fallback
   5) drop `city_state` since it was a temporary column and we have cleaned the missing values of all of the features
* Cleaning up and normalizing the values of the categorical features
* Changing types of `zip_code`, `bed`, `bath`, and `house_size` to `int`
* Convert both the categorically encoded features `brokered_by` and `street` to strings and fill the NaN values with 'Not Specified'
* Changing types of the categorically encoded features and `zip_code` to `str`
* Drop duplicates
* Merging the dataframe `zipcode_land` onto `realtor_data` to include `land_area` (in sq. miles), `water_area` (in sq. miles), and latitude & longitude for each `zip_code`.
* Merging the dataframe `zipcode_pop` onto `realtor_data` to include `population` and	`density` for each `zip_code`.
* Replacing `city` and `state` values with non-missing `City` and `St` values from `zipcode_pop` for cases where `zipcode_land` data was missing. Missing values in `zipcode_land` occured when there was an incorrect zipcode assignment--Kent, Washington, being incorrectly linked to a Los Angeles-area zipcode—-or a zipcode covered a niche area, such as Hat Island in Washington.
* Filling in most of the missing `latitude` and `longitude` values with `lat` and `long` from `zipcode_pop`, as both datasets were merged based on zip code.
* Since I used the `City`, `St`, `lat`, and `long` from `zipcode_pop` to help clean up the dataset more, they are no longer necessary.
* Merging the dataframe `crime_data` onto `realtor_data` to include crime statistics for each `city_state` (a combinationation of city and state as a temp identifier).
* Getting rid of additional columns from the merge that are unnecessary
* Filling some NaN values of `land_area`, `water_area`, `latitude`, and `longitude` with the median for each (`city`, `state`) group
* Dropping the remaining rows where `latitude` and `longitude` are missing, as these correspond to non-existent areas, such as out of county, louisiana or out of county, california, or remote locations such as Naukati Bay, Alaska, or Kasaan, Alaska.
* Haversine function to calculate the great-circle distance between two coordinates in miles where 3958.8 is the Earth's radius in miles
* Merging `uni_data` onto `realtor_data` by grouping by zip code and computing the nearest university once for each unique zip code using the haversine distance formula and creating the features `closest_uni_name`, `closest_uni_lat`, `closest_uni_lon`, `closest_uni_zip`, `closest_uni_obereg`, `closest_uni_hloffer`, and `distance_to_uni` (sq miles).
* Creating a new feature `median_zip_price`, which represents the median price of homes in the zip code (helps compare listing prices to the market norm).
* Creating a new feature `inventory_count`, which represents the number of homes available for sale (low inventory → higher prices) by zip code.
* Merging the nearest zip code (with available crime data) onto `realtor_data` by calculating the nearest zip code for each unique zip code using the haversine distance formula and creating the features `nearest_zip` and `nearest_zip_distance` (sq miles).
* Filling NaN values of `violent_crime` and `property_crime` steps:
   1) Fill in missing violent crime and property crime numbers using nearest zip code's violent_crime and property_crime numbers
   2) Fill in missing violent crime and property crime numbers using state violent_crime and property_crime numbers as a final fallback
* Filling NaN values of `land_area` and `water_area` steps:
   1) Fill in missing land_area and water_area sq miles using nearest zip code's land_area and water_area sq miles
   2) Fill in missing land_area and water_area sq miles using state land_area and water_area sq miles as a final fallback
* Filling NaN values of `population` and `density` steps:
   1) Fill in missing land_area and water_area sq miles using nearest zip code's land_area and water_area sq miles
   2) Fill in missing land_area and water_area sq miles using state land_area and water_area sq miles as a final fallback
* Filling NaN values of `median_zip_price` and `inventory_count` steps:
   1) Fill in missing median_zip_price and inventory_count using nearest zip code's median_zip_price and inventory_count numbers
   2) Fill in missing median_zip_price and inventory_count using state median_zip_price and inventory_count numbers as a final fallback

Summary statistics + Outlier Removal
* From the summary statistics and the outlier plots we can see that the max `price` is $1\times 10^9$, which is \$1 billion, however this is not realistic because, as of February 2024, the most expensive home in the United States is Gordon Pointe in Naples, Florida, which is listed for \$295 million dollars$^2$. Therefore we can filter `realtor_data` to not include the outliers in `price` that are greater than \$295 million dollars.$^2$ We can also see that the min is 0.0, meaning the home was free, however, this is not realistic and to avoid data entry errors, the lowest threshold will be set at \$10,000.
* From the summary statistics we can see that the max `bed` is $473$, however this is not realistic because the Biltmore Estate in Asheville, North Carolina has the most amount of bedrooms in the United States at 35 $^3$. Therefore we can filter `realtor_data` to not include the outliers in `bed` that are greater than $35$.$^3$
* From the summary statistics we can see that the max `bath` is $752$, however this is not realistic because The One in Bel Air, California has the most amount of bathrooms in the United States at 49$^4$. Therefore we can filter `realtor_data` to not include the outliers in `bath` that are greater than $49$.$^4$
* From the summary statistics we can see that the max `house_size` is $1.0404004\times 10^9$, which is around 1.04 billion, however this is not realistic because the Biltmore Estate in Asheville, North Carolina, the largest home in the United States by square footage, is at 175,000 sq ft$^5$. Therefore we can filter `realtor_data` to not include the outliers in `house_size` that are greater than $175,000$.$^5$

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
    * Yes
* How the dataset was used?
    * Predict price
* Are you working on a brand-new task?
    * Haven't seen creating rating system for a property's value compared to other properties in their respective market
* How are other people attacking the same/similar tasks?
    * We are incorporating predicting expected price which is similar to other people's projects but only using it as a tool for our overall task
* What is state-of-the-art method in this task or related tasks?
    * ...
* Are your conclusions similar or different from existing work?
    * ...
* What’s the major novelty of your work?
    * ...
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
* https://ucr.fbi.gov/crime-in-the-u.s/2015/crime-in-the-u.s.-2015/tables/table-8/table_8_offenses_known_to_law_enforcement_by_state_by_city_2015.xls/view
* https://ucr.fbi.gov/crime-in-the-u.s/2015/crime-in-the-u.s.-2015/tables/table-8/table-8-data-declaration_final
* https://nces.ed.gov/ipeds/datacenter/DataFiles.aspx?year=2023&sid=b90abf0b-8b20-4dc7-9338-4b14f9d94e9c&rtid=7
* https://nces.ed.gov/ipeds/datacenter/DataFiles.aspx?year=2023&sid=b90abf0b-8b20-4dc7-9338-4b14f9d94e9c&rtid=7
* https://taxfoundation.org/data/all/state/property-taxes-by-state-county/

Citations:
1. https://researchmaniacs.com/ZipCodes/9/Where-is-Zip-Code-96999.html
2. https://oag.ca.gov/sites/all/files/agweb/pdfs/cjsc/stats/computational_formulas.pdf
3. https://www.newscentermaine.com/article/news/nation-world/most-expensive-home-in-the-us-on-the-market/507-ab381921-8d2f-4236-86c0-6f785f73dbd9
4. https://www.housebeautiful.com/lifestyle/g46520154/biggest-houses-across-the-world/
5. https://www.silive.com/news/2022/01/americas-most-expensive-home-21-bedrooms-49-bathrooms-twice-as-big-as-the-white-house-295m.html
6. https://www.familyhandyman.com/list/the-biggest-home-in-each-state-that-will-stun-you/?srsltid=AfmBOoqAs9h6YdZAM2KcBt9QwmYL4bxOLHGDzCM9-PKcqTQ0OEFf-oE7

