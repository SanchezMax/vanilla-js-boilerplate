const listOfCities = document.querySelector(".container .cities");
const apiKey = "5e7c127c2e697398a02d432425c678a9"; // Your OpenWeatherMap API key here

/**
 * Request weather information for the city user have entered and put it in page to show
 * @param {string} city - City from user autocomplete input
 */

function getWeather(city) {
    let inputVal = city

    // get select fields
    const forecast_select = document.getElementById('forecast-select').value;
    const units_select = document.getElementById('units-select').value;
    let unit;
    // select unit
    switch (units_select) {
        case 'metric':
            unit = 'C';
            break;
        case 'imperial':
            unit = 'F';
            break;
        case 'standard':
            unit = 'k';
            break;
    }

    const url = `https://api.openweathermap.org/data/2.5/${forecast_select}?q=${inputVal}&appid=${apiKey}&units=${units_select}`;

    // fetching data
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // checking response code
            if (data["cod"] == "200") {
                switch (forecast_select) {
                    case 'weather':
                        const { main, name, sys, weather } = data;
                        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
                        const li = document.createElement("li");
                        li.classList.add("city");
                        // markup for current weather
                        const markup = `
                            <h2 class="city-name" data-name="${name},${sys.country}">
                                <span>${name}</span>
                                <sup>${sys.country}</sup>
                            </h2>
                            <div class="city-temp">${Math.round(main.temp)}<sup>°${unit}</sup></div>
                            <figure>
                                <div class="circled">
                                    <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
                                </div>
                                <figcaption>${weather[0]["description"]}</figcaption>
                            </figure>
                        `;
                        li.innerHTML = markup;
                        listOfCities.appendChild(li);
                        break;
                    case 'forecast':
                        const { cnt, list, city } = data;

                        const fixed_top = document.getElementById('fixed-top')
                        fixed_top.style.opacity = 1
                        const h2 = document.createElement("h2");
                        h2.classList.add("city-name");
                        h2.style.margin = 0;
                        h2.dataset.name = "${city.name},${city.country}";
                        // markup for fixed top bar
                        const top_markup = `
                            <span>${city.name}</span>
                            <sup>${city.country}</sup>
                        `;
                        h2.innerHTML = top_markup
                        fixed_top.appendChild(h2)

                        for (let index = 0; index < cnt; index++) {
                            const { dt, main, weather } = list[index]
                            const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
                            const li = document.createElement("li");
                            li.classList.add("city");
                            // markup for 5 day forecast
                            const markup = `
                                ${timeConverter(dt)}
                                <div class="city-temp">${Math.round(main.temp)}<sup>°${unit}</sup></div>
                                <figure>
                                    <div class="circled">
                                        <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
                                    </div>
                                    <figcaption>${weather[0]["description"]}</figcaption>
                                </figure>
                            `;
                            li.innerHTML = markup;
                            listOfCities.appendChild(li);
                        }
                        break;
                }
            } else {
                errorHandler()
            }
        })
        .catch(() => {
            errorHandler()
        });
}

/**
 * Show and alert, clear input field and return to first screen
 */
function errorHandler() {
    Telegram.WebApp.showAlert('Unfortunately, the bot cannot find information about this city');
    let inputElement = document.querySelector('input');
    inputElement.value = '';
    clearWeather();
    clearFixedTop();
    togglePage();
}

/**
 * Remove all info from weather page
 */

function clearWeather() {
    const listItems = listOfCities.querySelectorAll(".container .city");
    listItems.forEach(element => {
        element.parentNode.removeChild(element);
    });
}

/**
 * Remove info from element and make it transparent
 */

function clearFixedTop() {
    const fixed_top = document.getElementById('fixed-top')
    const toRemove = document.querySelector('h2.city-name')
    fixed_top.style.opacity = 0;
    fixed_top.removeChild(toRemove);
}

/**
 * Show or hide the weather page depending on current state
 */

function toggleShowWeather() {
    let el = document.getElementById('container')
    if (el.classList.contains('hidden')) {
        el.style.display = ''
        setTimeout(function () {
            el.classList.remove('hidden')
        }, 600);
    } else {
        el.classList.add('hidden')
        setTimeout(function () {
            el.style.display = 'none'
            clearWeather();
            clearFixedTop();
        }, 300);
    }
}

/**
 * Converts a time to an inner HTML markup
 * @param {number} timestamp - Current time in UNIX timestamp
 * @returns {string} Inner HTML markup
 */

function timeConverter(timestamp) {
    let time = new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const options = {
        month: "long",
        day: "numeric",
    };
    let date = new Date(timestamp * 1000).toLocaleDateString("en-UK", options)
    return `
        <h2>
            <span class="city-date">${date}</span>
            <span class="city-time">${time}</span>
        </h2>
    `;
}