/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const listOfCities = document.querySelector(".container .cities");
/*SUBSCRIBE HERE FOR API KEY: https://home.openweathermap.org/users/sign_up*/
const apiKey = "5e7c127c2e697398a02d432425c678a9";

function getWeather(city) {
    let inputVal = city

    //check if there's already a city
    const listItems = listOfCities.querySelectorAll(".container .city");
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            //athens,gr
            if (inputVal.includes(",")) {
                //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                    content = el
                        .querySelector(".city-name span")
                        .textContent.toLowerCase();
                } else {
                    content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            } else {
                //athens
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });

        if (filteredArray.length > 0) {
            Telegram.WebApp.showAlert(`You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent
                } ...otherwise be more specific by providing the country code as well 😉`);
            return;
        }
    }

    const forecast_select = document.getElementById('forecast-select').value;
    const units_select = document.getElementById('units-select').value;
    var unit;
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
        default:
            break;
    }

    //ajax here
    const url = `https://api.openweathermap.org/data/2.5/${forecast_select}?q=${inputVal}&appid=${apiKey}&units=${units_select}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data["cod"] == "200") {
                switch (forecast_select) {
                    case 'weather':
                        const { main, name, sys, weather } = data;
                        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
                        const li = document.createElement("li");
                        li.classList.add("city");
                        const markup = `
                            <h2 class="city-name" data-name="${name},${sys.country}">
                                <span>${name}</span>
                                <sup>${sys.country}</sup>
                            </h2>
                            <div class="city-temp">${Math.round(main.temp)}<sup>°${unit}</sup></div>
                            <figure>
                                <div class="circled">
                                    <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
                                </div
                                <figcaption>${weather[0]["description"]}</figcaption>
                            </figure>
                        `;
                        li.innerHTML = markup;
                        listOfCities.appendChild(li);
                        break;
                    case 'forecast':
                        const { cnt, list, city } = data;
                        for (let index = 0; index < cnt; index++) {
                            const { dt, main, weather } = list[index]
                            const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
                            const li = document.createElement("li");
                            li.classList.add("city");
                            const markup = `
                                <h2 class="city-name" data-name="${city.name},${city.country}">
                                    <span>${city.name}</span>
                                    <sup>${city.country}</sup>
                                </h2>
                                <h4 class="city-date">${timeConverter(dt)}</h4>
                                <div class="city-temp">${Math.round(main.temp)}<sup>°${unit}</sup></div>
                                <figure>
                                    <div class="circled">
                                        <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
                                    </div
                                    <figcaption>${weather[0]["description"]}</figcaption>
                                </figure>
                            `;
                            li.innerHTML = markup;
                            listOfCities.appendChild(li);
                        }
                    default:
                        break;
                }
            } else {
                Telegram.WebApp.showAlert('Please search for a valid city 😩');
                let inputElement = document.querySelector('input');
                inputElement.value = '';
                clearWeather();
                togglePage();
            }
        })
        .catch(() => {
            Telegram.WebApp.showAlert('Please search for a valid city 😩');
        });
}

function clearWeather() {
    const listItems = listOfCities.querySelectorAll(".container .city");
    listItems.forEach(element => {
        element.parentNode.removeChild(element)
    });
}

function toggleShowWeather() {
    var el = document.getElementById('container')
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
        }, 300);
    }
}

function timeConverter(timestamp) {
    var time = new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const options = {
        month: "long",
        day: "numeric",
      };
    var date = new Date(timestamp * 1000).toLocaleDateString("en-UK", options)
    return time + '   ' + date
}