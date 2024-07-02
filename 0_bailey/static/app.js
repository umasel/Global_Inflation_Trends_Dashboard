// // ==========================================================================================================================================================================

// // Function to populate dropdowns with options
// function populateDropdown(dropdownId, options) {
//   const dropdown = document.getElementById(dropdownId);
//   options.forEach(option => {
//     const opt = document.createElement('option');
//     opt.value = option;
//     opt.innerHTML = option;
//     dropdown.appendChild(opt);
//   });
// }

// // ==========================================================================================================================================================================

// // Function to handle country selection change
// function countryChanged(value) {
//   console.log('Country selected:', value);
//   updateCountryMetadata(value);
//   updateTimeSeries(value);
// }

// // ==========================================================================================================================================================================

// // Function to handle year selection change
// function yearChanged(value) {
//   console.log('Year selected:', value);
//   updateHeatmap(value);
// }

// // ==========================================================================================================================================================================

// // Function to fetch data (example using local JSON file)
// async function fetchData() {
//   const response = await fetch('./data/global_inflation_data.json');
//   const data = await response.json();
//   return data;
// }

// // ==========================================================================================================================================================================

// // Function to update country-specific metadata
// function updateCountryMetadata(country) {
//   fetchData().then(data => {
//     const countryData = data[country];
//     const metadataDiv = document.getElementById('country-metadata');
//     metadataDiv.innerHTML = `
//       <p>Country: ${country}</p>
//       <p>Population: ${countryData.population}</p>
//       <p>GDP: ${countryData.gdp}</p>
//       <p>Inflation Rate (latest): ${countryData.latest_inflation_rate}%</p>
//     `;
//   });
// }

// // ==========================================================================================================================================================================

// // Function to update the time series chart
// function updateTimeSeries(country) {
//   fetchData().then(data => {
//     const countryData = data[country];
//     const trace = {
//       x: countryData.years,
//       y: countryData.inflation_rates,
//       type: 'scatter'
//     };
//     const layout = {
//       title: `Inflation Rate Over Time for ${country}`,
//       xaxis: { title: 'Year' },
//       yaxis: { title: 'Inflation Rate (%)' }
//     };
//     Plotly.newPlot('timeSeries', [trace], layout);
//   });
// }

// // ==========================================================================================================================================================================

// // Function to update the heatmap
// function updateHeatmap(year) {
//   fetchData().then(data => {
//     const heatmapData = Object.keys(data).map(country => ({
//       country: country,
//       inflation_rate: data[country].inflation_rates_by_year[year]
//     }));

//     const trace = {
//       type: 'choropleth',
//       locations: heatmapData.map(d => d.country),
//       z: heatmapData.map(d => d.inflation_rate),
//       text: heatmapData.map(d => d.country),
//       colorscale: 'Blues'
//     };

//     const layout = {
//       title: `Global Inflation Rates in ${year}`,
//       geo: {
//         projection: {
//           type: 'robinson'
//         }
//       }
//     };

//     Plotly.newPlot('heatmap', [trace], layout);
//   });
// }

// // ==========================================================================================================================================================================

// // Function to initialize the dashboard
// function init() {
//   fetchData().then(data => {
//     // Get the list of countries and years
//     const countries = Object.keys(data);
//     const years = Object.keys(data[countries[0]].inflation_rates_by_year);

//     // Populate the dropdowns
//     populateDropdown('countryDropdown', countries);
//     populateDropdown('yearDropdown', years);

//     // Get the first country and year to initialize the charts
//     const firstCountry = countries[0];
//     const firstYear = years[0];

//     // Initialize the charts and metadata with the first country and year
//     updateCountryMetadata(firstCountry);
//     updateTimeSeries(firstCountry);
//     updateHeatmap(firstYear);
//   });
// }

// // ==========================================================================================================================================================================

// // Event listener for dropdown changes
// function optionChanged(newSample, type) {
//   if (type === 'country') {
//     countryChanged(newSample);
//   } else if (type === 'year') {
//     yearChanged(newSample);
//   }
// }

// // ==========================================================================================================================================================================

// // Initialize the dashboard on page load
// document.addEventListener('DOMContentLoaded', init);
