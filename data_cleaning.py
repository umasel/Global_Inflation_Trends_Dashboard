import pandas as pd

# Load the dataset
file_path = 'Dataset/global_inflation_data.csv'
data = pd.read_csv(file_path)

# Display the first few rows of the dataset
print("Original Data:")
print(data.head())

# Fill missing values with a placeholder (e.g., 0 or the mean of the column)
data.fillna(0, inplace=True)

# Optionally, rename columns for easier access
data.rename(columns={
    'country_name': 'Country',
    'indicator_name': 'Indicator'
    # Add more renaming if needed
}, inplace=True)

# Save the cleaned data to a new CSV file
cleaned_file_path = 'Dataset/cleaned_global_inflation_data.csv'
data.to_csv(cleaned_file_path, index=False)

print(f"Cleaned data saved to {cleaned_file_path}")