-- ==================================================
-- CREATING TABLES

-- Table for Inflation
CREATE TABLE inflation (
    ID varchar(80) PRIMARY KEY,
    Country varchar(50) NOT NULL,
    Indicator varchar(200) NOT NULL,
    Year int NOT NULL,
    Inflation_Rate float NOT NULL
);

-- Table for GDP
CREATE TABLE gdp (
    ID varchar(80) PRIMARY KEY,
    Country varchar(50) NOT NULL,
    Code varchar(10) NOT NULL,
    Year int NOT NULL,
    GDP float NOT NULL,
    CONSTRAINT fk_gdp_inflation FOREIGN KEY (ID) REFERENCES inflation(ID)
);

-- Table for GDP Growth
CREATE TABLE gdp_growth (
    ID varchar(80) PRIMARY KEY,
    Country varchar(50) NOT NULL,
    Code varchar(10) NOT NULL,
    Year int NOT NULL,
    GDP_Growth float NOT NULL,
    CONSTRAINT fk_gdp_growth_inflation FOREIGN KEY (ID) REFERENCES inflation(ID)
);

-- Table for GDP Per Capita
CREATE TABLE gdp_percapita (
    ID varchar(80) PRIMARY KEY,
    Country varchar(50) NOT NULL,
    Code varchar(10) NOT NULL,
    Year int NOT NULL,
    GDP_per_Capita float NOT NULL,
    CONSTRAINT fk_gdp_percapita_inflation FOREIGN KEY (ID) REFERENCES inflation(ID)
);

-- Table for GDP PPP
CREATE TABLE gdp_ppp (
    ID varchar(80) PRIMARY KEY,
    Country varchar(50) NOT NULL,
    Code varchar(10) NOT NULL,
    Year int NOT NULL,
    GDP_PPP float NOT NULL,
    CONSTRAINT fk_gdp_ppp_inflation FOREIGN KEY (ID) REFERENCES inflation(ID)
);

-- Table for GDP PPP Per Capita
CREATE TABLE gdp_ppp_percapita (
    ID varchar(80) PRIMARY KEY,
    Country varchar(50) NOT NULL,
    Code varchar(10) NOT NULL,
    Year int NOT NULL,
    GDP_PPP_per_Capita float NOT NULL,
    CONSTRAINT fk_gdp_ppp_percapita_inflation FOREIGN KEY (ID) REFERENCES inflation(ID)
);

-- Table for GDP Unemployment by Category (standalone)
CREATE TABLE gdp_unemployment_by_category (
    ID varchar(200) PRIMARY KEY,
    Country varchar(50) NOT NULL,
    Indicator varchar(200) NOT NULL,
    Gender varchar(10) NOT NULL,
    Age_Group varchar(30) NOT NULL,
    age_categories varchar(30) NOT NULL,
    Year int NOT NULL,
    Unemployment_Rate float NOT NULL
);

-- Table for GDP Unemployment
CREATE TABLE gdp_unemployment (
    ID varchar(80) PRIMARY KEY,
    Country varchar(50) NOT NULL,
    Code varchar(10) NOT NULL,
    Year int NOT NULL,
    Unemployment_Rate float NOT NULL,
    CONSTRAINT fk_gdp_unemployment_inflation FOREIGN KEY (ID) REFERENCES inflation(ID)
);

-- ==================================================
-- UPLOADING INFO FROM CSVs TO TABLES

-- All tables uploaded in `sh`
-- Numerous errors handled using the queries below

-- Modifying tables to include NULL values
ALTER TABLE inflation ALTER COLUMN Inflation_Rate DROP NOT NULL;
ALTER TABLE gdp ALTER COLUMN GDP DROP NOT NULL;
ALTER TABLE gdp_growth ALTER COLUMN GDP_Growth DROP NOT NULL;
ALTER TABLE gdp_percapita ALTER COLUMN GDP_per_Capita DROP NOT NULL;
ALTER TABLE gdp_ppp ALTER COLUMN GDP_PPP DROP NOT NULL;
ALTER TABLE gdp_ppp_percapita ALTER COLUMN GDP_PPP_per_Capita DROP NOT NULL;
ALTER TABLE gdp_unemployment_by_category ALTER COLUMN Unemployment_Rate DROP NOT NULL;
ALTER TABLE gdp_unemployment ALTER COLUMN Unemployment_Rate DROP NOT NULL;

-- Modifying VARCHAR length
ALTER TABLE inflation ALTER COLUMN Country TYPE varchar(100);
ALTER TABLE gdp ALTER COLUMN Country TYPE varchar(100);
ALTER TABLE gdp_growth ALTER COLUMN Country TYPE varchar(100);
ALTER TABLE gdp_percapita ALTER COLUMN Country TYPE varchar(100);
ALTER TABLE gdp_ppp ALTER COLUMN Country TYPE varchar(100);
ALTER TABLE gdp_ppp_percapita ALTER COLUMN Country TYPE varchar(100);
ALTER TABLE gdp_unemployment_by_category ALTER COLUMN Country TYPE varchar(100);
ALTER TABLE gdp_unemployment ALTER COLUMN Country TYPE varchar(100);

-- Remove the foreign key constraint
ALTER TABLE gdp DROP CONSTRAINT fk_gdp_inflation;

-- Checking tables
SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns
WHERE table_name = 'gdp';

-- Remove the foreign key constraint
ALTER TABLE gdp_growth DROP CONSTRAINT fk_gdp_growth_inflation;

-- Checking tables
SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns
WHERE table_name = 'gdp_growth';

-- Remove the foreign key constraint
ALTER TABLE gdp_percapita DROP CONSTRAINT fk_gdp_percapita_inflation;

-- Checking tables
SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns
WHERE table_name = 'gdp_percapita';

-- Remove the foreign key constraint
ALTER TABLE gdp_ppp DROP CONSTRAINT fk_gdp_ppp_inflation;

-- Checking tables
SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns
WHERE table_name = 'gdp_ppp';

-- Remove the foreign key constraint
ALTER TABLE gdp_ppp_percapita DROP CONSTRAINT fk_gdp_ppp_percapita_inflation;

-- Checking tables
SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns
WHERE table_name = 'gdp_ppp_percapita';

-- Remove the foreign key constraint
ALTER TABLE gdp_unemployment DROP CONSTRAINT fk_gdp_unemployment_inflation;

-- Checking tables
SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns
WHERE table_name = 'gdp_unemployment';

-- Uploading *.csvs (performed in `sh`)

-- -- Inflation
-- \copy inflation (Country, Indicator, Year, Inflation_Rate, ID) FROM 'C:\Users\wware\Desktop\UWA Bootcamp\Challenges\Global_Inflation_Trends_Dashboard\cleaned_data\inflation.csv' DELIMITER ',' CSV HEADER;

-- -- GDP Growth
-- \copy gdp_growth (Country, Code, Year, GDP_Growth, ID) FROM 'C:\Users\wware\Desktop\UWA Bootcamp\Challenges\Global_Inflation_Trends_Dashboard\cleaned_data\gdp_growth.csv' DELIMITER ',' CSV HEADER;

-- -- GDP Per Capita
-- \copy gdp_percapita (Country, Code, Year, GDP_per_Capita, ID) FROM 'C:\Users\wware\Desktop\UWA Bootcamp\Challenges\Global_Inflation_Trends_Dashboard\cleaned_data\gdp_percapita.csv' DELIMITER ',' CSV HEADER;

-- -- GDP PPP Per Capita
-- \copy gdp_ppp_percapita (Country, Code, Year, GDP_PPP_per_Capita, ID) FROM 'C:\Users\wware\Desktop\UWA Bootcamp\Challenges\Global_Inflation_Trends_Dashboard\cleaned_data\gdp_ppp_percapita.csv' DELIMITER ',' CSV HEADER;

-- -- GDP PPP
-- \copy gdp_ppp (Country, Code, Year, GDP_PPP, ID) FROM 'C:\Users\wware\Desktop\UWA Bootcamp\Challenges\Global_Inflation_Trends_Dashboard\cleaned_data\gdp_ppp.csv' DELIMITER ',' CSV HEADER;

-- -- GDP Unemployment
-- \copy gdp_unemployment (Country, Code, Year, Unemployment_Rate, ID) FROM 'C:\Users\wware\Desktop\UWA Bootcamp\Challenges\Global_Inflation_Trends_Dashboard\cleaned_data\gdp_unemployment_for_use.csv' DELIMITER ',' CSV HEADER;

-- -- GDP Unemployment by Category
-- \copy gdp_unemployment_by_category (Country, Indicator, Gender, Age_Group, age_categories, Year, Unemployment_Rate, ID) FROM 'C:\Users\wware\Desktop\UWA Bootcamp\Challenges\Global_Inflation_Trends_Dashboard\cleaned_data\gdp_unemployment.csv' DELIMITER ',' CSV HEADER;

-- -- GDP
-- \copy gdp (Country, Code, Year, GDP, ID) FROM 'C:\Users\wware\Desktop\UWA Bootcamp\Challenges\Global_Inflation_Trends_Dashboard\cleaned_data\gdp.csv' DELIMITER ',' CSV HEADER;
