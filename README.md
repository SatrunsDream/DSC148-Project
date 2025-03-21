# Home Price Evaluator: Determining Market Value

## Introduction
In today’s competitive housing market, overpaying for a home is an all-too-common pitfall—one that can lead to missed opportunities and costly investment mistakes. 
Accurately determining a home's expected price and value could be a crucial aspect in real estate, benefiting both sellers and buyers. This project aims to build a model that predicts home prices and assess their value, helping to identify if a property's price is reasonable. [Home Evaluation Demo](https://house-evaluation.vercel.app/). This live demo will also provide detailed information about an entered property and its surrounding area including estimated price, the property's value, and nearest local amenities.

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
Row drop: We first began cleaning by dropping rows with missing 'zip$\_$code' because we felt that it couldn't be reliably imputed and where the 'state' wasn't a US state or DC, e.g., Guam or Puerto Rico. We also made sure every feature was its correct type. We then began the imputing side of things after a good chunk of the original dataset had missing values. We filled in missing values using hierarchical imputation by first using the median zip code values, then median state values, and median global values as a final fallback. Specifically to handle the missing values of columns 'city' and 'house$\_$size', we imputed first using zip code, however for city we then filled in any remaining missing values with state mode values, and dropping the remaining rows, and for 'house$\_$size', we filled in any missing values with median grouped city, state values, and then filled in median state values as a final fallback. We created a binary feature 'first$\_$sale', which was created for homes with missing 'prev$\_$sold$\_$date' values, marking homes that had never been sold before. Temporal data in 'prev$\_$sold$\_$date' was adjusted to account for future dates beyond 2024. Categorical features, such as 'brokered$\_$by' and 'street', were cleaned by filling missing values with 'Not Specified'. Any duplicates were then dropped. After cleaning up the original USA Real Estate dataset, we then moved onto merging the other datasets onto the original dataset. We merged the dataframe 'zipcode$\_$land' (ZIP Code Tabulation Areas Dataset) onto `realtor$\_$data` to include `land area` (in sq. miles), `water area` (in sq. miles), and latitude and longitude for each zip code, merged the dataframe 'zipcode$\_$pop' (US Population Density by Zip Code, City, and State Dataset) onto 'realtor$\_$data' to include 'population' and	'density' for each zip code, and merged the 'crime$\_$data' dataframe (Offenses Known to Law Enforcement Dataset) onto 'realtor$\_$data' to include crime statistics for each `city$\_$state` (a combinationation of city and state as a temp identifier), and merged the dataframe 'zipcode$\_$pop' onto 'realtor$\_$data' to include 'population' and	'density' for each zip code. We then got rid of any additional columns from the merges that were unnecessary and filtered 'population' to only keep rows properties where the city has a population above 0. We then had to impute missing values again due to the merges, so we did this with the median for each (`city`, `state`) group for the `land$\_$area`, `water$\_$area`, `latitude`, and `longitude` features, and dropped the remaining rows where `latitude` and `longitude` were missing, as these corresponded to non-existent areas, such as out of county, louisiana or out of county, california, or remote locations such as Naukati Bay, Alaska, or Kasaan, Alaska. We then merged the `uni$\_$data` dataset (Institutional Characteristics Dataset) onto `realtor$\_$data` by grouping by zip code and computing the nearest university once for each unique zip code using the haversine distance formula: 

$$d = 2r\arcsin \biggl( \sqrt{\sin^2(\frac{\phi_2-\phi_1}{2}) + \cos(\phi_1)\cos(\phi_2)\sin^2(\frac{\lambda_2 - \lambda_1}{2})} \biggr)$$

and creating new features of characteristics of the nearest university to that zip code. We also created two more new features 'median$\_$zip$\_$price', which represented the median price of homes in the zip code (helped compare listing prices to the market norm), and 'inventory$\_$count', which represented the number of homes available for sale (low inventory $\rightarrow$ higher prices) by zip code. To deal with the remaining missing values we decided to calculate the nearest zip code for each unique zip code using the haversine distance formula again and creating the features 'nearest$\_$zip' and `nearest$\_$zip$\_$distance` (sq miles). We then also created new features 'total$\_$crime' that sums up total `violent$\_$crime` numbers and `property$\_$crime` numbers for a given zip code to calculate `crime$\_$rate` which is based on the formula: 

$$\frac{\text{Number of total crimes reported}}{\text{population}}\times 1,000$$

meaning crime rate per 1,000 inhabitants. Our last step was merging the dataframe `property$\_$taxes` (Property Taxes by State Dataset) to include property taxes for each state. We also created a new feature 'house$\_$category', which represents the type of home a property is e.g., tiny home, investment property, family home, ranch home, luxury home, luxury estate, and other. This was done through geodemographic segmentation, which selected relevant features, enabling nuanced, region-specific property classification. The derivation came from  zip code-level aggregations to classify homes based on local real estate characteristics, e.g., price, house size, crime rates, and property taxes, acreage, etc. Properties labeled Luxury Estates typically exceeded local norms in price, size, and acreage. Properties were labeled Luxury Homes if they met the high-price and large-size criteria, but not necessarily acreage. Properties labeled Ranch Homes depended on having substantial land size relative to local norms. Other categories included Family Homes, which were defined by mid-range prices, adequate bedrooms, and bathrooms; Tiny Homes were identified by having small size and being affordable; and Investment Properties were characterized by high crime, elevated property taxes, or unusually small sizes.

### 1.3 Basic Statistics
After looking at the summary statistics of the numeric features, there were some extreme outliers that had to be dealt with. We saw that max `price` is $1\times 10^9$, which is \$1 billion, however, this is not realistic because, as of February 2024, the most expensive home in the United States is Gordon Pointe in Naples, Florida, which is listed for \$295 million dollars$^2$ [Most expensive home in the US is on the market](https://www.newscentermaine.com/article/news/nation-world/most-expensive-home-in-the-us-on-the-market/507-ab381921-8d2f-4236-86c0-6f785f73dbd9). Therefore we filtered `realtor$\_$data` to not include the outliers in 'price' that are greater than \$295 million dollars.$^2$ We can also see that the min is 0.0, meaning the home was free, however, this is not realistic and to avoid data entry errors, the lowest threshold was set at \$10,000. We did this same process for many other numeric features that had extreme outliers, e.g., 'bed', 'bath', and 'house$\_$size'. For the remaining columns that had relatively realistic outliers, we winsorized them to limit any extreme values by capping them at certain thresholds (we did at a 0.01\% threshold level). After attempting to handle the extreme outliers, we ended up logarizing all of the numeric features that had a skew score above 1 and that weren't 'bed', 'bath', 'property$\_$tax', 'crime$\_$rate', 'nearest$\_$zip$\_$distance', and 'total$\_$crime'.

### 1.4 Findings in exploratory data analysis
* EDA should motivate your model design/choice

## 2. Predictive Task
### 2.1 Predictive task

Our objective is to \textbf{predict house prices using a comprehensive array of features}, including factors such as zip code, house size, and the number of bathrooms, among others. To achieve this, we aim to develop a regression model trained on an extensive dataset comprising millions of observations from across the United States. In constructing our final predictive model, we will evaluate its performance against six baseline models, iteratively improving upon them to create a more accurate and robust regression model.

### 2.2 Evaluation
The primary metric used to compare our baseline models and the final model is the \textbf{Root Mean Squared Error (RMSE)}. RMSE is a commonly used evaluation metric for regression problems, providing a clear indication of model performance. It calculates the square root of the average squared differences between predicted and actual values, making it highly sensitive to large errors. This sensitivity is particularly beneficial when we want to penalize significant prediction errors more heavily.

### 2.3 Preprocessing Features
For our baseline models, we decided to start with the seven numerical features most correlated with price: \textbf{median$\_$zip$\_$price, house$\_$size, acre$\_$lot, bath, latitude, longitude, and crime$\_$rate}. We used these exact features for all baseline models to standardize the comparison and make it easier to observe future improvements in terms of adding or subtracting features in the creation of our final model. We also split our dataset into training and test sets in order to properly evaluate our baseline models on unseen data.

### 2.4 Baseline
The first baseline model is a basic \textbf{Linear Regression}. The main purpose of this model is to analyze and quantify the linear effect of each of the seven features most correlated with price. While a simple linear regression model like this one is not going to be the best performing model, it is an important setting stone for more advanced models with more features. Additionally, it is the model least likely to overfit to the training set.

OLS linear regression can help us determine the importance of our features through their weights, but sometimes these weights can be detrimental when it comes to predicting unseen data and lead to higher variance. To prevent overfitting, we can introduce penalties in the regression and reduce the importance of the weights by shrinking them towards 0. Two techniques to achieve this are \textbf{Ridge and Lasso Regression}. Therefore, we also created two more regression models as a baseline point of reference. 

One of the key disadvantages of linear regression is its failure to capture nonlinear relationships, thus producing biased estimates. Because of this, we created a \textbf{Random Forest Regression} model. A random forest model can effectively capture valuable trends and relationships through the use of ensemble learning methods, which train several models through a series of decision trees on random samples of the training set and return an averaged result in which the trees “vote” for the best model. One disadvantage is that it can lead to overfitting, but we limited max$\_$depth to counteract it. Random forest regression can provide additional input on what features accurately predict price non-linearly.

For tabular data, \textbf{XGB Regression} and \textbf{LightGBM} are known to be some of the best-performing models. Like with random forest regression, both of these algorithms use ensemble learning methods, with the addition of gradient boosting frameworks that iteratively improve predictions made by individual decision trees (or “weak learners”), with the additional techniques like regularization. In a way, both of these models combine previous simpler models into a faster and more accurate single model. XGB Regression tends to perform better overall, but lightGBM is more memory efficient and tends to be faster for large datasets like this one.

### 2.5 Baseline results

The ordinary linear regression model exhibited the poorest performance, with an RMSE of 0.71. Both the ridge and lasso regression models also recorded an RMSE of 0.71, indicating that any potential improvements over the ordinary linear regression model were minimal. The random forest regression model performed slightly better, achieving an RMSE of 0.64. As anticipated, the most proficient models were XGB Regression, which delivered the lowest RMSE of 0.57, and LightGBM, with an RMSE of 0.62, underscoring their superior predictive accuracy compared to the other models tested.

## 3. Model
### 3.1 Initial settings
The final model selected for the predictive task is \textbf{Light Gradient Boosting Machine (LightGBM)}. Since our final dataset has over two million entries, LightGBM was chosen due to its superior balance between predictive accuracy and computational efficiency, making it well-suited for handling such large dataset with numerous features. Another reason we chose LightGBM is because of its ability to handle categorical variables effectively and mitigate overfitting through built-in regularization techniques, making it a robust choice for real estate price prediction.

### 3.2 Feature engineering
Instead of just using the seven most correlated numerical features like our baseline models, we decided to use all the available features as well engineered ones. Thus, we need to preprocess our features before training the model.

The prev$\_$sold$\_$date column, which is a datetime feature, is decomposed into three separate numerical features:
\begin{itemize}
    \item prev$\_$sold$\_$year (year of the previous sale)
    \item prev$\_$sold$\_$month (month of the previous sale)
    \item prev$\_$sold$\_$day (day of the previous sale)
\end{itemize}

The original prev$\_$sold$\_$date column is then removed, as it has been replaced by more useful numerical representations.

In order to make categorial features useful for the model, we used LabelEncoder from sklearn.preprocessing to transform categorical values into numerical values. 

For example, if a column contains ['Apartment', 'House', 'Condo'], LabelEncoder will convert it to [0, 1, 2]

### 3.4 Model optimzation
In order to make sure that our final model performs better than all the baseline models while avoiding overfitting, we optimized it by hyperparameter tuning and splitting the data into a test and training set.

Accounting for efficiency, given that we have a large dataset, we deicded to used RandomSearchCV from sklearn.model$\_$selection over GridSearchCV in order to find the best combination of hyperparameters for our model.

The parameters that we used for the model are:
\begin{itemize}
    \item \textbf{objective}: regression  
    \item \textbf{metric}: rmse  
    \item \textbf{boosting\_type}: gbdt  
    \item \textbf{num\_leaves}: 100  
    \item \textbf{max\_depth}: 20  
    \item \textbf{learning\_rate}: 0.1  
    \item \textbf{lambda\_l1}: 1.0  
    \item \textbf{lambda\_l2}: 1.0  
    \item \textbf{feature\_fraction}: 1  
    \item \textbf{bagging\_fraction}: 0.8  
\end{itemize}

Since we are predicting home prices (a continuous variable), we need a regression model and we are evaluating the model using RMSE as discussed above.

We went with GBDT (Gradient Boosted Decision Trees) as the boosting type because it works well for structured/tabular data, learning from previous mistakes by iteratively reducing errors. Additionally, GBDT generally offers the best performance for structured regression tasks.

To controls the complexity of the model by determining how many decision leaves a single tree can have, we tuned num$\_$leaves to make sure that we don't risk overfitting the model by capturing too many patterns. Additionally, we also tuned max$\_$depth to limit how deep each tree can grow, preventing excessive complexity.

In order to make sure that our model can generalize data well, we tuned learning$\_$rate to control how much the model adjusts weights in each iteration.

Furthermore, to encourage sparsity in feature importance, control large weights, reducing variance and improving generalization, we tuned L1 Regularization and L2 Regularization.

Lastly, we also tuned feature$\_$fraction and bagging$\_$fraction to prevent overfitting by ensuring the model doesn’t become too dependent on a specific subset of training data and making sure that the model use all available features as feature selection was already optimized during preprocessing.

### 3.5 House Valuations

We took the difference between the expected price from our optimized LightGBM model and the listed price, and based our valuations on this difference. If the difference was within one standard deviation of the overall price difference, we classified the property as \textbf{properly valued}. If the difference was less than negative one standard deviation, we classified the property as \textbf{undervalued}. Conversely, if the difference exceeded one standard deviation, we classified the property as \textbf{overvalued}. Based on our valuations, nearly 79\% of homes were classified as "Properly Valued." However, approximately 10.5\% were deemed "Undervalued," potentially indicating 'good' investment opportunities, and approximately 10.1\% were deemed "Overvalued," potentially indiciating 'bad' investment opportunities. This distribution suggests that while most homes are priced fairly, a significant portion still deviates from their expected value, emphasizing the importance of accurate valuation in real estate decision-making.

## 4. Literature
\textbf{Implementing GIS in Real Estate Price Prediction and Mass Valuation: The Case Study of Nicosia District. By Charambolos Yiorkas and Thomas Dimopoulos}\\
\href{https://www.researchgate.net/publication/319569550_Implementing_GIS_in_real_estate_price_prediction_and_mass_valuation_the_case_study_of_Nicosia_District}{https://www.researchgate.net/publication}\\
Yiorkas and Dimopoulos wanted to produce better real estate predictions for a small dataset of 1341 properties in Cyprus. The main purpose of this report is to prove that geospatial features such such as proximity to schools or universities have a significant effect on property prices. Price predictions for properties in Cyprus were usually done by only looking at the physical properties of the house, such as its size, age, and number of bedrooms and bathrooms. The two main models that were performed in this research are Ordinary Least Squares Regression (as a baseline model) and Geographically Weighted Regression (as the final model). While we didn’t implement geospatial analytical techniques in our models unlike in this report, this served as inspiration for us to include features that were outside of our original dataset and related with the geography and environment of the property. The main evaluation metric used was R-squared instead of RMSE, and the Geographically Weighted Regression model proved to be far more accurate, with an R-squared value of 0.79 versus 0.55 for the OLS model, thus proving that in some instances, geographical features can be a very useful addition to a property price prediction model.

\textbf{Advanced Machine Learning Algorithms for House Price Prediction: Case Study in Kuala Lumpur. By Shuzlina Abdul Rahman, Sofanita Mutalib, Ismail Ibrahim, Nor Hamizah Zulkifley}\\
\href{https://thesai.org/Downloads/Volume12No12/Paper_91-Advanced_Machine_Learning_Algorithms.pdf}{https://www.researchgate.net/publication}\\
This project is the most similar to ours we could find in terms of data preprocessing, feature selection, and the models that were implemented. It is based on a dataset of 53883 entries representing individual properties in Kuala Lumpur, and the four models that were implemented were Multiple Linear Regression, Ridge Regression, LightGBM, and XGBoost, which turned out to be the best performing model. The main difference between our project and this one is the missing value imputations. Rahman, Mutalib, Ibrahim, and Zulkifley opted to simply drop all rows with any missing values, which significantly reduced the size of the dataset to 31899 entries, while we followed a multi-step implementation process that would attempt to impute missing values based on local group medians (such as zip code), or global medians if not possible. Price was also log transformed due to extreme skewness, showcasing the many similarities between our dataset and this one, even while taking into account the substantial geographical differences (Kuala Lumpur, a city, vs the United States, a large country). Overall, this project shares many commonalities with our regression component of the project, but it doesn’t go into the value analysis (whether the house is undervalued, overvalued, or neither).

## 5. Result
### 5.1 Comparison
Our analysis compared several predictive models for house price estimation. The baseline linear regression model (OLS) produced an RMSE of 0.71, indicating moderate performance but limited capability in capturing non-linear relationships. Regularized models like Ridge and Lasso offered improvements in feature selection and model simplicity, though their RMSE values remained close to 0.71, suggesting that simply penalizing coefficients did not enhance prediction accuracy. In contrast, ensemble methods performed significantly better a Random Forest model achieved an RMSE of approximately 0.64 by better handling feature interactions and non-linearities. Most notably, gradient boosting techniques —XGBoost attained the lowest RMSE at around 0.57, while LightGBM delivered an RMSE near 0.62, coupled with improved computational efficiency on large datasets. Taking that into account we took LightGBM as the final model and tunned it with a final RMSE of approximately 0.4.

### 5.2 Major takeaways
Incorporating geographic and environmental data improved prediction accuracy. Our baseline linear regression models (OLS, Ridge, Lasso) struggled to capture the complexities of real estate pricing, compared to the ensemble models (Random Forest and gradient boosting methods) that significantly improved predictive accuracy. The LightGBM model was best-performing model, achieving an RMSE of 0.4 after hyperparameter tuning. Its computational efficiency and ability to handle non-linearity made it the optimal choice. The only issue with this being our best model is that LightGBM is black-box, so we don't really know what's going on inside the model, which makes it harder to interpret. Unlike previous studies that dropped missing values, our imputation strategy (using local medians when possible) allowed us to retain more data while maintaining model robustness.

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
7. https://www.researchgate.net/publication/319569550_Implementing_GIS_in_real_estate_price_prediction_and_mass_valuation_the_case_study_of_Nicosia_District
8. https://thesai.org/Downloads/Volume12No12/Paper_91-Advanced_Machine_Learning_Algorithms.pdf

