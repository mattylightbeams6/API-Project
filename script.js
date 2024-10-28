

// function findArea() {
//     let searchInput = document.getElementById("search-city");
//     let cityName = searchInput.value;
    
//     if (cityName.length < 1) {
//         console.log("empty");
//         return
//     }
    
//     const geoCall = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
//     fetch(geoCall)
//     .then(response => response.json())
//         .then(locationData => {
//             if (locationData.length > 0) {
//                 const lat = locationData[0].lat;
//                 const lon = locationData[0].lon;
                
//                 console.log(`${cityName} lat: ${lat}\n${cityName} lon: ${lon}`);
//             } else {
//                 console.log("City not found.");
//             }
//         })

        
//         // document.getElementById("search-card").classList.add("hidden");
//         // document.getElementBayId("info-card").classList.remove("hidden");
//     }
    
    





    // const geoCall = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
const apiKey = '8975f6507977ae6b439590f714d09db9';

function getNearbyData() {
    let ipApiCall = 'http://ip-api.com/json/';
    return fetch(ipApiCall)
        .then(response => response.json())
        .then(data => {
            return { lat: data.lat, lon: data.lon };
        })
        .catch(error => console.error('Error:', error)
    );
}

function processAirData(lat, lon) {
    let owmAirCall = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(owmAirCall)
        .then(response => response.json())
        .then(data => {
            let airIndex = data.list[0].main.aqi;
            let pollutantCO = data.list[0].components.co;
            let pollutantNO2 = data.list[0].components.no2;
            let pollutantO3 = data.list[0].components.o3;
            let pollutantSO2 = data.list[0].components.so2;
            let pollutantPM2_5 = data.list[0].components.pm2_5;
            let pollutantPM10 = data.list[0].components.pm10;

            const statusAQI = getAQIStatus(airIndex);
            const statusCO = getCOStatus(pollutantCO);
            const statusNO2 = getNO2Status(pollutantNO2);
            const statusO3 = getO3Status(pollutantO3);
            const statusSO2 = getSO2Status(pollutantSO2);
            const statusPM2_5 = getSO2Status(pollutantPM2_5);
            const statusPM10 = getSO2Status(pollutantPM10);

            document.getElementById("mainAQI").textContent = `${airIndex} (${statusAQI})`;
            document.getElementById("mainCO").textContent = `${pollutantCO} μg/m3 (${statusCO})`;
            document.getElementById("mainNO2").textContent = `${pollutantNO2} μg/m3 (${statusNO2})`;
            document.getElementById("mainO3").textContent = `${pollutantO3} μg/m3 (${statusO3})`;
            document.getElementById("mainSO2").textContent = `${pollutantSO2} μg/m3 (${statusSO2})`;
            document.getElementById("mainPM2_5").textContent = `${pollutantPM2_5} μg/m3 (${statusPM2_5})`;
            document.getElementById("mainPM10").textContent = `${pollutantPM10} μg/m3 (${statusPM10})`;
        })
}

function getAQIStatus(aqi) {
    switch (aqi) {
        case 1:
            document.getElementById("bottom-box").style.border = "4px solid rgb(0, 128, 0)";
            return 'Good';
        case 2:
            document.getElementById("bottom-box").style.border = "4px solid rgb(173, 255, 47)";
            return 'Fair';
        case 3:
            document.getElementById("bottom-box").style.border = "4px solid rgb(255, 165, 0)";
            return 'Moderate';
        case 4:
            document.getElementById("bottom-box").style.border = "4px solid rgb(255, 69, 0)"; 
            return 'Poor';
        case 5:
            document.getElementById("bottom-box").style.border = "4px solid rgb(139, 0, 0)"; 
            return 'Very Poor';
        default:
            document.getElementById("bottom-box").style.border = "4px solid rgb(0, 0, 0)"; 
            return 'unknown';
    }
}

function getCOStatus(pollutantCO) {
    if (pollutantCO >= 0 && pollutantCO <= 4400) {
        return 'Good';
    } else if (pollutantCO >= 4401 && pollutantCO <= 9400) {
        return 'Fair';
    } else if (pollutantCO >= 9401 && pollutantCO <= 12400) {
        return 'Moderate';
    } else if (pollutantCO >= 12401 && pollutantCO <= 15400) {
        return 'Poor';
    } else {
        return 'Very Poor';
    }
}

function getNO2Status(pollutantNO2) {
    if (pollutantNO2 >= 0 && pollutantNO2 <= 40) {
        return 'Good';
    } else if (pollutantNO2 >= 41 && pollutantNO2 <= 70) {
        return 'Fair';
    } else if (pollutantNO2 >= 71 && pollutantNO2 <= 150) {
        return 'Moderate';
    } else if (pollutantNO2 >= 151 && pollutantNO2 <= 200) {
        return 'Poor';
    } else {
        return 'Very Poor';
    }
}

function getO3Status(pollutantO3) {
    if (pollutantO3 >= 0 && pollutantO3 <= 60) {
        return 'Good';
    } else if (pollutantO3 >= 61 && pollutantO3 <= 100) {
        return 'Fair';
    } else if (pollutantO3 >= 101 && pollutantO3 <= 140) {
        return 'Moderate';
    } else if (pollutantO3 >= 141 && pollutantO3 <= 180) {
        return 'Poor';
    } else {
        return 'Very Poor';
    }
}

function getSO2Status(pollutantSO2) {
    if (pollutantSO2 >= 0 && pollutantSO2 <= 20) {
        return 'Good';
    } else if (pollutantSO2 >= 21 && pollutantSO2 <= 80) {
        return 'Fair';
    } else if (pollutantSO2 >= 81 && pollutantSO2 <= 250) {
        return 'Moderate';
    } else if (pollutantSO2 >= 250 && pollutantSO2 <= 350) {
        return 'Poor';
    } else {
        return 'Very Poor';
    }
}

function getPM2_5Status(pollutantPM2_5) {
    if (pollutantPM2_5 >= 0 && pollutantPM2_5 <= 10) {
        return 'Good';
    } else if (pollutantPM2_5 >= 11 && pollutantPM2_5 <= 25) {
        return 'Fair';
    } else if (pollutantPM2_5 >= 26 && pollutantPM2_5 <= 50) {
        return 'Moderate';
    } else if (pollutantPM2_5 >= 50 && pollutantPM2_5 <= 75) {
        return 'Poor';
    } else {
        return 'Very Poor';
    }
}

function getPM10Status(pollutantPM10) {
    if (pollutantPM10 >= 0 && pollutantPM10 <= 20) {
        return 'Good';
    } else if (pollutantPM10 >= 21 && pollutantPM10 <= 50) {
        return 'Fair';
    } else if (pollutantPM10 >= 51 && pollutantPM10 <= 100) {
        return 'Moderate';
    } else if (pollutantPM10 >= 101 && pollutantPM10 <= 200) {
        return 'Poor';
    } else {
        return 'Very Poor';
    }
}

window.onload = () => {
    getNearbyData().then(coords => {
        processAirData(coords.lat, coords.lon)
    })
}