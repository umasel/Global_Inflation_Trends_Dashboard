-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/IiU81W
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "inflation" (
    "ID" varchar(80)   NOT NULL,
    "Country" varchar(50)   NOT NULL,
    "Indicator" varchar(200)   NOT NULL,
    "Year" int   NOT NULL,
    "Inflation_Rate" float   NOT NULL,
    CONSTRAINT "pk_inflation" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "gdp" (
    "ID" varchar(80)   NOT NULL,
    "Country" varchar(50)   NOT NULL,
    "Code" varchar(10)   NOT NULL,
    "Year" int   NOT NULL,
    "GDP" float   NOT NULL,
    CONSTRAINT "pk_gdp" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "gdp_growth" (
    "ID" varchar(80)   NOT NULL,
    "Country" varchar(50)   NOT NULL,
    "Code" varchar(10)   NOT NULL,
    "Year" int   NOT NULL,
    "GDP_Growth" float   NOT NULL,
    CONSTRAINT "pk_gdp_growth" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "gdp_percapita" (
    "ID" varchar(80)   NOT NULL,
    "Country" varchar(50)   NOT NULL,
    "Code" varchar(10)   NOT NULL,
    "Year" int   NOT NULL,
    "GDP_per_Capita" float   NOT NULL,
    CONSTRAINT "pk_gdp_percapita" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "gdp_ppp" (
    "ID" varchar(80)   NOT NULL,
    "Country" varchar(50)   NOT NULL,
    "Code" varchar(10)   NOT NULL,
    "Year" int   NOT NULL,
    "GDP_PPP" float   NOT NULL,
    CONSTRAINT "pk_gdp_ppp" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "gdp_ppp_percapita" (
    "ID" varchar(80)   NOT NULL,
    "Country" varchar(50)   NOT NULL,
    "Code" varchar(10)   NOT NULL,
    "Year" int   NOT NULL,
    "GDP_PPP_per_Capita" float   NOT NULL,
    CONSTRAINT "pk_gdp_ppp_percapita" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "gdp_unemployment_by_category" (
    "ID" varchar(200)   NOT NULL,
    "Country" varchar(50)   NOT NULL,
    "Indicator" varchar(200)   NOT NULL,
    "Gender" varchar(10)   NOT NULL,
    "Age_Group" varchar(30)   NOT NULL,
    "age_categories" varchar(30)   NOT NULL,
    "Year" int   NOT NULL,
    "Unemployment_Rate" float   NOT NULL
);

CREATE TABLE "gdp_unemployment" (
    "ID" varchar(80)   NOT NULL,
    "Country" varchar(50)   NOT NULL,
    "Code" varchar(10)   NOT NULL,
    "Year" int   NOT NULL,
    "Unemployment_Rate" float   NOT NULL,
    CONSTRAINT "pk_gdp_unemployment" PRIMARY KEY (
        "ID"
     )
);

