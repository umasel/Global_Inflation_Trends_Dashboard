// Function to clear the time series plot
function clearTimeseries() {
    let timeseriesDiv = document.getElementById("timeseries");
    if (timeseriesDiv) {
        timeseriesDiv.remove();
    }
}

// Function to clear the bar chart plot
function clearBarChart() {
    let timeseriesDiv = document.getElementById("timeseries");
    if (timeseriesDiv) {
        timeseriesDiv.remove();
    }
}

// Creating the map object with worldCopyJump and minZoom options
let myMap = L.map("map", {
    center: [20.0, 0.0],
    zoom: 2,
    worldCopyJump: true,
    minZoom: 2
});

// Adding the tile layer for the map's background
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Link to GeoJSON data for world countries
let link = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

// Function to determine the color of a country based on the inflation rate
function chooseColor(rate) {
    return rate > 10 ? "rgba(255, 0, 0, 0.9)" :    // High inflation (red)
           rate > 5  ? "rgba(255, 165, 0, 0.9)" : // Medium-high inflation (orange)
           rate > 2  ? "rgba(255, 255, 0, 0.9)" : // Medium inflation (yellow)
           rate > 0  ? "rgba(0, 128, 0, 0.9)" :  // Low inflation (green)
           rate < 0 ? "rgba(128, 0, 128, 0.9)" :  // Negative inflation (purple)
                       "rgba(128, 128, 128, 0.9)";    // No data (grey)
}

// Adding a legend to the map
let legend = L.control({ position: 'bottomleft' });

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend'),
        grades = [-1, 0, 2, 5, 10],
        labels = ['< 0', '0-2', '2-5', '5-10', '10+'];

    // Loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + chooseColor(grades[i] + 1) + '; width: 18px; height: 18px; display: inline-block; margin-right: 8px; opacity: 1;"></i>' +
            labels[i] + '<br>';
    }

    // Add a grey color for "No data" with the same opacity
    div.innerHTML +=
        '<i style="background: rgba(128, 128, 128, 1); width: 18px; height: 18px; display: inline-block; margin-right: 8px; opacity: 0.5;"></i>' +
        'No data<br>';

    return div;
};

// Add the legend to the map
legend.addTo(myMap);

// Mapping of GeoJSON country names to CSV country names
const countryNameMapping = {
    "The Bahamas": "Bahamas, The",
    "China": "China, People's Republic of",
    "Turkey": "Türkiye, Republic of",
    "Russia": "Russian Federation",
    "United States of America": "United States",
    "Republic of Serbia": "Serbia",
    "Republic of the Congo": "Congo, Republic of ",
    "Democratic Republic of the Congo": "Congo, Dem. Rep. of the",
    "United Republic of Tanzania": "Tanzania",
    "South Korea": "Korea, Republic of",
    "Taiwan": "Taiwan Province of China",
    // Add more mappings as needed
};

// Function to get the correct CSV name for a given GeoJSON country name
function getCsvCountryName(geoJsonName) {
    return countryNameMapping[geoJsonName] || geoJsonName;
}

// Load the inflation data and create the map
let inflationData = {};
let selectedYear = null; // Default year
let selectedCountry = "all"; // Default country

function updateMap() {
    d3.json(link).then(function(geoData) {
        console.log("GeoJSON data loaded successfully");
        
        // Clear previous layers
        myMap.eachLayer(function (layer) {
            if (!!layer.toGeoJSON) {
                myMap.removeLayer(layer);
            }
        });

        // Add the tile layer back
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);

        // Creating a GeoJSON layer with the retrieved data
        L.geoJson(geoData, {
            style: function(feature) {
                let country = getCsvCountryName(feature.properties.name);
                let inflationRate = selectedYear && inflationData[selectedYear] && inflationData[selectedYear][country] ? inflationData[selectedYear][country] : 0;
                if (selectedCountry !== "all" && country !== selectedCountry) {
                    return {
                        color: "white",
                        fillColor: "grey",
                        fillOpacity: 0.2,
                        weight: 1.5
                    };
                }
                console.log("Country: ", country, " Inflation Rate: ", inflationRate);
                return {
                    color: "white",
                    fillColor: chooseColor(inflationRate),
                    fillOpacity: 0.5,
                    weight: 1.5
                };
            },
            onEachFeature: function(feature, layer) {
                // Store the original style of the layer
                let originalStyle = {
                    fillOpacity: layer.options.fillOpacity,
                    fillColor: layer.options.fillColor
                };

                layer.on({
                    mouseover: function(event) {
                        let layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.9
                        });
                    },
                    mouseout: function(event) {
                        let layer = event.target;
                        // Reset the style back to the original
                        layer.setStyle(originalStyle);
                    },
                    click: function(event) {
                        myMap.fitBounds(event.target.getBounds());
                    }
                });

                let country = getCsvCountryName(feature.properties.name);
                let inflationRate = selectedYear && inflationData[selectedYear] && inflationData[selectedYear][country] ? inflationData[selectedYear][country] : "Data not available";
                layer.bindPopup("<h1>" + country + "</h1> <hr> <h2>Inflation Rate: " + inflationRate + "%</h2>");
            }
        }).addTo(myMap);
    }).catch(function(error) {
        console.log("Error loading GeoJSON data: ", error);
    });
}

// Function to update the time series plot
function updateTimeseries(country) {
    let years = Object.keys(inflationData).sort();
    let rates = years.map(year => inflationData[year][country] || null);

    let mean = d3.mean(rates.filter(rate => rate !== null));
    let stdDev = d3.deviation(rates.filter(rate => rate !== null));
    let ci95 = 1.96 * stdDev;

    let meanLine = Array(years.length).fill(mean);
    let ciUpperLine = Array(years.length).fill(mean + ci95);
    let ciLowerLine = Array(years.length).fill(mean - ci95);

    let traces = [
        {
            x: years,
            y: rates,
            type: "scatter",
            mode: "lines+markers",
            name: country
        },
        {
            x: years,
            y: meanLine,
            type: "scatter",
            mode: "lines",
            line: { color: "grey", dash: "dash" },
            name: "Mean",
            hoverinfo: "skip"
        },
        {
            x: years,
            y: ciUpperLine,
            type: "scatter",
            mode: "lines",
            line: { color: "purple", dash: "dot" },
            name: "95% CI Upper",
            hoverinfo: "skip"
        },
        {
            x: years,
            y: ciLowerLine,
            type: "scatter",
            mode: "lines",
            line: { color: "purple", dash: "dot" },
            name: "95% CI Lower",
            hoverinfo: "skip"
        }
    ];

    if (country !== "all" && selectedYear !== null) {
        let highlightYear = selectedYear;
        let highlightRate = inflationData[highlightYear][country] || 0;
        traces.push({
            x: [highlightYear],
            y: [highlightRate],
            type: "scatter",
            mode: "markers",
            marker: {
                size: 12,
                color: chooseColor(highlightRate),
                symbol: "diamond"
            },
            name: `${country} (${highlightYear})`,
            hoverinfo: 'skip' // Disable hoverinfo for the highlighted point
        });
    }

    let layout = {
        title: `Inflation Rate Over Time for ${country}`,
        xaxis: { title: "Year" },
        yaxis: { title: "Inflation Rate (%)" },
        showlegend: false, // Hide the legend
        height: 600,
        width: 1200,
        annotations: [
            {
                x: 2026,
                y: mean,
                xref: 'x',
                yref: 'y',
                text: 'Mean',
                showarrow: false,
                align: 'right',
                ax: 20,
                ay: 0,
                font: { color: 'grey' }
            },
            {
                x: 2027,
                y: mean + ci95,
                xref: 'x',
                yref: 'y',
                text: '95% CI Upper',
                showarrow: false,
                align: 'right',
                ax: 20,
                ay: -10,
                font: { color: 'purple' }
            },
            {
                x: 2027,
                y: mean - ci95,
                xref: 'x',
                yref: 'y',
                text: '95% CI Lower',
                showarrow: false,
                align: 'right',
                ax: 20,
                ay: 10,
                font: { color: 'purple' }
            }
        ]
    };

    // Add the timeseries div if not already present
    if (!document.getElementById("timeseries")) {
        let container = document.querySelector(".container");
        let timeseriesDiv = document.createElement("div");
        timeseriesDiv.id = "timeseries";
        timeseriesDiv.className = "mt-4";
        container.appendChild(timeseriesDiv);
    }

    Plotly.newPlot("timeseries", traces, layout);
}

// Function to update the bar chart for the selected year
function updateBarChart(year) {
    console.log(`Updating bar chart for year: ${year}`);
    let countries = Object.keys(inflationData[year]);
    let rates = countries.map(country => inflationData[year][country]);

    let top10Data = countries.map((country, index) => ({ country, rate: rates[index] }))
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 10);

    console.log('Top 10 Data:', top10Data);

    let barData = [
        {
            x: top10Data.map(d => d.country),
            y: top10Data.map(d => d.rate),
            type: 'bar',
            text: top10Data.map(d => `${d.country}: ${d.rate}%`),
            hoverinfo: 'text',
            marker: {
                color: 'rgba(0, 128, 128, 1.0)',
                line: 1.5
            }
        }
    ];

    let layout = {
        title: `Top 10 Countries with Highest Inflation Rates in ${year}`,
        xaxis: { title: 'Country' },
        yaxis: { title: 'Inflation Rate (%)' },
        height: 600,
        width: 1200,
        showlegend: false, // Hide the legend
        margin: { t: 30, l: 150 }
    };

    // Add the timeseries div if not already present
    if (!document.getElementById("timeseries")) {
        let container = document.querySelector(".container");
        let timeseriesDiv = document.createElement("div");
        timeseriesDiv.id = "timeseries";
        timeseriesDiv.className = "mt-4";
        container.appendChild(timeseriesDiv);
    }

    Plotly.newPlot("timeseries", barData, layout);
}

// Function to update the country-specific metadata
function updateCountryMetadata(country) {
    let years = Object.keys(inflationData).sort();
    let rates = years.map(year => inflationData[year][country]).filter(rate => rate !== undefined);
    let mean = d3.mean(rates);
    let stdDev = d3.deviation(rates);
    let min = d3.min(rates);
    let max = d3.max(rates);
    let count = rates.length;

    let metadata = `
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Number of Records:</strong> ${count}</p>
        <p><strong>Mean Inflation Rate:</strong> ${mean.toFixed(2)}%</p>
        <p><strong>Standard Deviation:</strong> ${stdDev.toFixed(2)}</p>
        <p><strong>Min Inflation Rate:</strong> ${min}%</p>
        <p><strong>Max Inflation Rate:</strong> ${max}%</p>
    `;

    document.getElementById("country-metadata").innerHTML = metadata;
}

// Load the CSV data and initialise the dashboard
d3.csv("../DB_Extraction/inflation.csv").then(function(data) {
    console.log("CSV data loaded successfully");

    // Populate the inflationData object
    data.forEach(function(d) {
        let year = +d.year;
        if (!inflationData[year]) {
            inflationData[year] = {};
        }
        inflationData[year][d.country_name] = +d.inflation_rate;
    });

    // Populate the year dropdown
    let yearSelect = document.getElementById("year-select");
    let years = Object.keys(inflationData).sort();
    years.forEach(function(year) {
        let option = document.createElement("option");
        option.value = year;
        option.text = year;
        yearSelect.appendChild(option);
    });

    // Populate the country dropdown
    let countrySelect = document.getElementById("country-select");
    let countries = Array.from(new Set(data.map(d => d.country_name))).sort();
    countries.forEach(function(country) {
        let option = document.createElement("option");
        option.value = country;
        option.text = country;
        countrySelect.appendChild(option);
    });

    // Set initial map
    updateMap();

    // Add the legend once
    legend.addTo(myMap);

    // Update map when year changes
    yearSelect.addEventListener("change", function() {
        selectedYear = +this.value;
        updateMap();
        if (selectedCountry !== "all") {
            updateTimeseries(selectedCountry);
            updateCountryMetadata(selectedCountry);
        } else {
            updateBarChart(selectedYear);
        }
    });

    // Update map and timeseries when country changes
    countrySelect.addEventListener("change", function() {
        selectedCountry = this.value;
        if (selectedCountry === "all") {
            // Clear country-specific statistics
            document.getElementById("country-metadata").innerHTML = "";
        } else {
            updateTimeseries(selectedCountry);
            updateCountryMetadata(selectedCountry);
        }
        updateMap();
    });

    // Add event listener for the reset button
    document.getElementById("reset-view").addEventListener("click", function() {
        console.log("Reset button clicked"); // Add this for debugging

        // Reset country and year dropdowns to default values
        document.getElementById("country-select").value = "all";
        document.getElementById("year-select").value = "select";
        
        // Reset selectedCountry and selectedYear variables
        selectedCountry = "all";
        selectedYear = null;

        // Reset the map view to the original view
        myMap.setView([20.0, 0.0], 2);

        // Clear the country-specific statistics
        document.getElementById("country-metadata").innerHTML = "";

        // Clear the timeseries and bar chart
        clearTimeseries();
        clearBarChart();

        // Clear all map layers and re-add the tile layer to remove any previous highlights
        myMap.eachLayer(function (layer) {
            if (!!layer.toGeoJSON) {
                myMap.removeLayer(layer);
            }
        });

        // Add the tile layer back
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);

        // Re-add the legend
        legend.addTo(myMap);

        // Re-add the map layers
        updateMap();
    });

    // Initial metadata update
    updateCountryMetadata("All Countries");
    // Initial bar chart update
    updateBarChart(selectedYear || "select");

}).catch(function(error) {
    console.log("Error loading CSV data: ", error);
});
