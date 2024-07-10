# Global Inflation Analysis Dashboard

## Project Proposal: Interactive Dashboard on Global Inflation Trends

**Group 1:**
- Uma Selvaraj (Team Lead)
- Bailey Strauch
- Zejing Liang
- Wendy Ware

## Project Overview
Our project aims to create an interactive dashboard that visualizes global inflation trends from 1980 to 2024. Utilizing the dataset sourced from Kaggle, we will provide insightful visualizations that allow users to explore inflation data by country and year, as well as investigate factors influencing inflation.

## Dataset
- **Country Inflation Data Source**: [Global Inflation Data on Kaggle](https://www.kaggle.com/datasets/sazidthe1/global-inflation-data)
- **Records**: Approximately 196 countries
- **Timeframe**: 1980-2024

## Objectives
1. **Visualize Global Inflation Trends**:
   - Create a dropdown selection for countries to display time series data from 1980 to 2024.
   - Display country-specific statistics and metadata.
2. **Heatmap Visualization**:
   - Implement a dropdown selection for years to show a heatmap (Choropleth Map) scaled on inflation rates.
3. **Research on Influencing Factors (time permitting)**:
   - Conduct original research to identify and visualize factors influencing inflation.

## Key Features
1. **Title and Introduction**:
   - Title of the dashboard
   - An introductory image
   - A brief blurb about the project
   - Links to data sources
2. **Country-wise Inflation Trends**:
   - Interactive dropdown for country selection
   - Time series visualization of inflation rates from 1980 to 2024
   - Calculation and presentation of country-specific statistics and metadata
3. **Year-wise Heatmap**:
   - Interactive dropdown for year selection
   - Choropleth map to visualize global inflation rates for the selected year
4. **Factors Influencing Inflation**:
   - Original research to explore and present factors influencing inflation
   - Visual representation of these factors

## Proposal and Dashboard Mock-up
[Project Proposal](https://github.com/umasel/Global_Inflation_Trends_Dashboard/blob/main/Project%20Documentation/Project%203%20Group%201%20Proposal%20v002.docx)

## Technology and Tools
- **Programming Languages**: Python, JavaScript
- **Libraries**: Matplotlib, Pandas, Plotly, Leaflet, and at least one additional visualization library not covered in class (e.g., D3.js or Bokeh)
- **Database**: PostgreSQL (for storing and querying the dataset)
- **Backend**: Flask (for serving the interactive visualizations)

## Ethical Considerations
- Ensure data privacy and accuracy
- Transparent and ethical use of data sources
- Provide clear references and credits for data and code used

## Team Collaboration
- Regular meetings and communication via Slack
- Task management using GitHub Projects
- Documentation and code sharing on a dedicated GitHub repository

## Deliverables
- An interactive dashboard with the described features
- A comprehensive README.md file with project overview, instructions, ethical considerations, and references
- A group presentation summarizing our findings and demonstrating the dashboard

## Repository Layout
├── Cleaned Data
├── DB_Extraction
├── Images
├── Project Docs
├── Resources
├── Starter Code
├── static
├── .DS_Store
├── .env
├── .gitignore
├── db_csv_extraction
├── etl_project3_code
├── index
├── README.md
└── sql_code

## Timeline
![Gantt Chart](https://github.com/umasel/Global_Inflation_Trends_Dashboard/blob/main/Images/Project%20Gantt.png)

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
