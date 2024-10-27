const apiKey = '8975f6507977ae6b439590f714d09db9';

const airCall = 'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={api_key}'

// function goBack() {
//     // Hide the details card and show the search card
//     document.getElementById("info-card").classList.add("hidden");
//     document.getElementById("search-card").classList.remove("hidden");
// }


function findArea() {
    let searchInput = document.getElementById("search-city");
    let cityName = searchInput.value;
    
    if (cityName.length < 1) {
        console.log("empty");
        return
    }

    const geoCall = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    fetch(geoCall)
        .then(response => response.json())
        .then(locationData => {
            if (locationData.length > 0) {
                const lat = locationData[0].lat;
                const lon = locationData[0].lon;

                console.log(`${cityName} lat: ${lat}\n${cityName} lon: ${lon}`);
            } else {
                console.log("City not found.");
            }
        })


    // document.getElementById("search-card").classList.add("hidden");
    // document.getElementById("info-card").classList.remove("hidden");
}
