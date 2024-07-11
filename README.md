# Global Inflation Analysis Dashboard

## Project Proposal: Interactive Dashboard on Global Inflation Trends

**Development Team:**
- Uma Selvaraj (Team Lead)
- Bailey Strauch
- Zejing Liang
- Wendy Ware

## Project Overview
Our project aims to create an interactive dashboard that visualizes global inflation trends from 1980 to 2024. Utilizing the dataset sourced from Kaggle, we will provide insightful visualizations that allow users to explore inflation data by country and year, as well as investigate factors influencing inflation.

[Inflation Dashboard]()

## Objectives
1. **Visualise Global Inflation Trends**:
   - Create a dropdown selection for countries to display time series data from 1980 to 2024.
   - Display country-specific statistics and metadata.
2. **Heatmap Visualisation**:
   - Implement a dropdown selection for years to show a heatmap (Choropleth Map) scaled on inflation rates.
3. **Research on Influencing Factors**:
   - Conduct original research to identify and visualise factors influencing inflation.

## Define, Design, Develop and Deploy Process
We followed a standard process, as follows:

![Project Process](https://raw.githubusercontent.com/umasel/Global_Inflation_Trends_Dashboard/main/Project%20Docs/Images/Project%20Dev%20Process%20Flow.png)

## Dataset
- **Country Inflation Data Source**: [Global Inflation Data on Kaggle](https://www.kaggle.com/datasets/sazidthe1/global-inflation-data)
- **Records**: 196 countries
- **Timeframe**: 1980-2024

Data is stored in PostgreSQL. This is the ERD:
![ERD Image](https://github.com/umasel/Global_Inflation_Trends_Dashboard/blob/82dac62ef0ed8dfadeca7cd3bbe27c4fb7ee5d74/Project%20Docs/Images/inflation_ERD.png)

## Key Features
1. **Title and Introduction**:
   - Title of the dashboard
   - An introductory image
   - A brief blurb about the project
   - Links to data sources
2. **Country-wise Inflation Trends**:
   - Interactive dropdown for country selection
   - Time series visualisation of inflation rates from 1980 to 2024
   - Calculation and presentation of country-specific statistics and metadata
3. **Year-wise Heatmap**:
   - Interactive dropdown for year selection
   - Choropleth map to visualize global inflation rates for the selected year
4. **Factors Influencing Inflation**:
   - Original research to explore and present factors influencing inflation
   - Visual representation of these factors

## Proposal and Dashboard Mock-up
[Project Proposal](https://github.com/umasel/Global_Inflation_Trends_Dashboard/blob/386e86b6cba9b609dbbf808037553074d0391a71/Project%20Docs/Project%203%20Group%201%20Proposal%20v002.docx)

## Technology and Tools
- **Programming Languages**: Python, JavaScript
- **Libraries**: Matplotlib, Pandas, Plotly, Leaflet, and at least one additional visualisation library not covered in class. We selected Flourish.studio and developed a race bar chart that circulates over the timeframe showing the top ten countries with the highest inflation rate per year.
- **Database**: PostgreSQL (for storing and querying the dataset)
- **Backend**: Flask (for serving the interactive visualisations)

## Ethical Considerations

1. Data Integrity and Accuracy:

- Source Reliability: We sourced our data from Kaggle, ensuring that it is accurate, reliable, and up-to-date. We have verified the credibility of the dataset and its original sources to maintain high standards of data integrity.
- Data Representation: Our commitment is to represent the data accurately without manipulation that could mislead users. We provide clear metadata and documentation about the dataset, including any limitations or biases inherent in the data.

2. Privacy and Security:

- Data Privacy: Although we use publicly available data, we are mindful of any personal or sensitive information that may inadvertently be included. We ensure that any such data is anonymized or excluded to protect individuals' privacy.
- Security Measures: We implement robust security measures to protect the integrity of our data and the dashboard from unauthorized access and potential cyber threats. We used a library not used in class called `dotenv`, which accesses a .env file with PostgreSQL credentials that can be ignored when pushing to a public repository. This is the script to use:

``` Python
from dotenv import load_dotenv

# Function to connect to DB
def connect_to_db():
    try:
        connection = psycopg2.connect(
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            host=os.getenv('DB_HOST'),
            port=int(os.getenv('DB_PORT')),  # Convert port to integer
            database=os.getenv('DB_NAME')
        )
        return connection
    except Exception as error:
        print(f"Error: {error}")
        return None
```

3. Transparency and Accountability:

- Development Process: We maintain transparency about our development process, including the use of Midjourney for imagery creation and ChatGPT as a co-pilot in our project. We clearly document the tools and technologies used and the extent of their involvement.
- Algorithmic Transparency: If our dashboard includes any data analysis or predictive algorithms, we ensure that these are transparent and that users can understand how conclusions are drawn. We provide documentation on the methodologies used.

4. Bias and Fairness:

- Bias Mitigation: We are aware of potential biases in the data and the visualizations. We strive to present the information in a balanced manner, avoiding any form of bias that could influence the interpretation of the data.
- Inclusive Design: We design our dashboard to be accessible and useful to a diverse audience, taking into account different perspectives and avoiding exclusionary practices.

By considering these ethical aspects, we ensure that our inflation dashboard project is responsible, trustworthy, and respectful of the rights and expectations of our users.

## Team Collaboration
- Regular meetings and communication via Slack
- Task management using GitHub Projects
- Documentation and code sharing on a dedicated GitHub repository

## Deliverables
- An interactive dashboard with the described features
- A comprehensive README.md file with project overview, instructions, ethical considerations, and references
- A group presentation summarizing our findings and demonstrating the dashboard

## Repository Layout
├── **Cleaned Data** `Stage 2 - Data Transform`

├── **DB_Extraction** `Stage 1 - Data Extract`

├── **Images**

├── **Project Docs**
    
    ├──Images

├── **Resources** `Raw Data`

├── **Starter Code** `Basic Code`

├── **static** `Stage 5 - Develop and Test`

     ├──js/app.js

     ├──css/styles.css

├── .DS_Store

├── .env `Private PostgreSQL Credentials` - you will have to set this up yourself

├── .gitignore

├── db_csv_extraction.ipynb `Stage 4 - Database Export`

├── etl_project3_code.ipynb `Stage 1 - Data Extract`|`Stage 2 - Data Transform`|`Stage 3 - Data Load`

├── index.html `The Dashboard`

├── sql_code.ipynb

└── README.md 


## Timeline
![Gantt Chart](https://github.com/umasel/Global_Inflation_Trends_Dashboard/blob/82dac62ef0ed8dfadeca7cd3bbe27c4fb7ee5d74/Project%20Docs/Images/Project%20Gantt.png)

## How to Run the Project
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/global-inflation-dashboard.git
   cd global-inflation-dashboard
   ```
2. **Set Up the Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```
3. **Install the Dependencies**:
   These have been provided in all relevant code files
4. **Set Up the Database**:
   - Ensure PostgreSQL is installed and running.
   - Create a new database: 
   ```sql
   CREATE DATABASE inflation_db;
   ```
   - Run the provided SQL script to set up the schema and import data:
   ```bash
   psql -U yourusername -d inflation_db -f setup.sql
   ```
5. **Serve the Dashboard**:
   - Open your code editor (e.g., VS Code) and open the project folder.
   - Use the "Go Live" option to start the Live Server and serve your static files.
6. Access the Dashboard:
   - Open your web browser and go to the provided local address (typically `http://127.0.0.1:5500` or similar).

Open your web browser and go to the provided local address (typically http://127.0.0.1:5500 or similar).
   Code published 

## References

Global Inflation Data on Kaggle
Midjourney.com used for imagery design and rendering
ChatGPT at Opensources.com use as a co-pilot

## Acknowledgements
We would like to thank our instructors and peers for their support and guidance throughout this project.
