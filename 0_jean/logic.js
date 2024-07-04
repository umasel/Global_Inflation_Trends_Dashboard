// Creating the map object
let myMap = L.map("map", {
    center: [20.0, 0.0],
    zoom: 2
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data for world countries
let link = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

// Function to determine the color of a country based on the inflation rate
function chooseColor(rate) {
    return rate > 10 ? "red" :
           rate > 5  ? "orange" :
           rate > 2  ? "yellow" :
           rate > 0  ? "green" :
                       "grey";
}

// Load the inflation data
let inflationData = {};

d3.csv("sorted_df.csv").then(function(data) {
    console.log("CSV data loaded successfully");
    data.forEach(function(d) {
        if (+d.year === 2024) { // Filter for the year 2024
            inflationData[d.country_name] = +d.inflation_rate; 
        }
    });
    console.log("Inflation Data: ", inflationData);

    // Getting our GeoJSON data
    d3.json(link).then(function(geoData) {
        console.log("GeoJSON data loaded successfully");
        // Creating a GeoJSON layer with the retrieved data
        L.geoJson(geoData, {
            style: function(feature) {
                let country = feature.properties.name;
                let inflationRate = inflationData[country] || 0;
                console.log("Country: ", country, " Inflation Rate: ", inflationRate);
                return {
                    color: "white",
                    fillColor: chooseColor(inflationRate),
                    fillOpacity: 0.5,
                    weight: 1.5
                };
            },
            onEachFeature: function(feature, layer) {
                layer.on({
                    mouseover: function(event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.9
                        });
                    },
                    mouseout: function(event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.5
                        });
                    },
                    click: function(event) {
                        myMap.fitBounds(event.target.getBounds());
                    }
                });
                let country = feature.properties.name;
                let inflationRate = inflationData[country] || "Data not available";
                layer.bindPopup("<h1>" + country + "</h1> <hr> <h2>Inflation Rate: " + inflationRate + "%</h2>");
            }
        }).addTo(myMap);

        // Adding a legend to the map
        let legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {
            let div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 2, 5, 10],
                labels = ['0-2', '2-5', '5-10', '10+'];

            // Loop through our density intervals and generate a label with a colored square for each interval
            for (let i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + chooseColor(grades[i] + 1) + '"></i> ' +
                    '<span class="legend-label">' + labels[i] + '</span><br>';
            }

            return div;
        };

        legend.addTo(myMap);
    }).catch(function(error) {
        console.log("Error loading GeoJSON data: ", error);
    });
}).catch(function(error) {
    console.log("Error loading CSV data: ", error);
});