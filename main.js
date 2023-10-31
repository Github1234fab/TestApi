// let array = [];

// console.log(array);

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "091a7623a2mshfe940e4a900ef7bp1a0aa8jsn21d9e18b7442",
//     "X-RapidAPI-Host": "asos2.p.rapidapi.com",
//   },
// };

// fetch("https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US", options)
//   .then((response) => response.json())
//   .then((data) => {
//     // Stocke les données dans le tableau
//     array.push(data.products);

//     // Affiche le tableau dans la console
//     console.log(array);
//   })
//   .catch((err) => console.error(err));

//api taux de co2 pour voyage----------------------------------------------

// let inputKm = document.getElementById("inputKm");
// console.log(inputKm);
// let distance ;
// console.log(distance);

// inputKm.addEventListener("mouseleave", () => {

//   console.log(inputKm.value);

//   distance = inputKm.value;
//     console.log(distance);

// })
// // const encodedParams = new URLSearchParams();
// // encodedParams.append("distance", "5");
// // encodedParams.append("vehicle", "SmallDieselCar");
// const encodedParams = new URLSearchParams();
// encodedParams.append("distance", distance);
// encodedParams.append("vehicle", "SmallDieselCar");

// const options = {
//   method: "POST",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//     "X-RapidAPI-Key": "091a7623a2mshfe940e4a900ef7bp1a0aa8jsn21d9e18b7442",
//     "X-RapidAPI-Host": "tracker-for-carbon-footprint-api.p.rapidapi.com",
//   },
//   body: encodedParams,
// };

// fetch("https://tracker-for-carbon-footprint-api.p.rapidapi.com/carTravel", options)
//   .then((response) => response.json())
//   .then((data) => {
//     array.push(data);
//   console.log(array)})
//   .catch((err) => console.error(err));

// const options = {
//   method: "POST",
//   headers: {
//     "content-type": "application/json",
//     "X-RapidAPI-Key": "091a7623a2mshfe940e4a900ef7bp1a0aa8jsn21d9e18b7442",
//     "X-RapidAPI-Host": "travel-co2-climate-carbon-emissions.p.rapidapi.com",
//   },
//   body: '{"from":"Paris, France","to":"Barcelona, Spain","ways":2,"people":2,"language":"en","title":"Comparing flying and public transport from Paris to Barcelona.","transport_types":["flying","public-transport"]}',
// };

// fetch("https://travel-co2-climate-carbon-emissions.p.rapidapi.com/api/v1/simpletrips", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// let Token = "77318a42b3d89e38aaccf4d3829c357c197b8601be0095d98d129c5b9f2ef9b8";

// fetch("http://api.meteo-concept.com/api/ephemeride/1?token=77318a42b3d89e38aaccf4d3829c357c197b8601be0095d98d129c5b9f2ef9b8&insee=35238")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err));

// 77318a42b3d89e38aaccf4d3829c357c197b8601be0095d98d129c5b9f2ef9b8

// const ApiKey = "9183577a9b461d4be6a90ea944a7cf2b";
// let url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=9183577a9b461d4be6a90ea944a7cf2b&units=metric&lang=fr";

// +++++++++++++++++++++++++++++++++++++++++ REQUETE POUR OBTENIR COORDONNÉES AVEC COMME INPUT LE NOM DE VILLE

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++APPLI MÉTÉO

let input = document.querySelector(".input");
input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    let inputValue = input.value;

    let containerOneDay = document.querySelector(".container_1day");
    containerOneDay.classList.add("container_1day_visible");

    // +++++++++++++++++++++++++++++++++++++++++ REQUETE UNSPLASH POUR PHOTO DE LA VILLE

    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${inputValue}&client_id=6dpP6ZcR-gr6EVNQLNZ3oND9ou7ucZL48kpa_zHpaVo`
        );
        const data = await response.json();
        console.log(data);
        let img = document.querySelector(".town_img");
        img.src = data.results[0].urls.full;
      } catch (error) {
        console.error("Erreur:", error);
      }
    }

    // +++++++++++++++++++++++++++++++++++++++++ REQUETE POUR OBTENIR LES INFOS AVEC DANS L'URL, LA LAT. ET LA LONG.

    fetchData();

    let UrlCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=1f1721082468b559881d1a385be60f39`;

    fetch(UrlCoordinates)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let town = data[0].name;
        let lat = data[0].lat;
        let lon = data[0].lon;

        // +++++++++++++++++++++++++++++++++++++++++ ITÉRATION SUR L'OBJET DAILY POUR RÉCUPÉRER LES PRÉVISIONS DU JOUR ET  À 7 JOURS  ET ICONS (8 JOURS - CELUI EN COURS)

        let UrlForecast = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=1f1721082468b559881d1a385be60f39`;

        fetch(UrlForecast)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            let container8days = document.querySelector(".container_8days");
            container8days.innerHTML = "";
            for (let i = 0; i < data.daily.length; i++) {
              let dailyData = data.daily[i];
              let weatherDescription = dailyData.weather[0].description;
              let weatherDailyIcon = dailyData.weather[0].icon;

              let timestamp = dailyData.dt;
              let date = new Date(timestamp * 1000);

              let options = { weekday: "long", month: "long", day: "numeric" };
              let dayOfWeek = date.toLocaleDateString("fr-FR", options);

              let divWeatherDate = document.createElement("div");
              divWeatherDate.style.fontSize = "1.5em";
              divWeatherDate.style.fontWeight = "bold";
              divWeatherDate.innerHTML = dayOfWeek;
              divWeatherDate.classList.add("div_container8days");
              container8days.appendChild(divWeatherDate);

              // +++++++++++++++++++++++++++++++++++++++++ CRÉATION DES ICONS

              let divWeatherIcon = document.createElement("img");
              divWeatherIcon.src = "http://openweathermap.org/img/wn/" + weatherDailyIcon + "@2x.png";
              divWeatherDate.appendChild(divWeatherIcon);

              let h4WeatherDescription = document.createElement("h4");
              h4WeatherDescription.innerHTML = weatherDescription;
              h4WeatherDescription.classList.add("div_weatherDescription");
              divWeatherDate.appendChild(h4WeatherDescription);

              // +++++++++++++++++++++++++++++++++++++++++ CRÉATION TEMPÉRATURE DAILY

              let dailyTemp = Math.floor(dailyData.temp.day);
              console.log(dailyTemp);
              let divDailyTemp = document.createElement("div");
              divDailyTemp.innerHTML = dailyTemp + "°C";
              divDailyTemp.classList.add("daily_temp");
              divWeatherDate.appendChild(divDailyTemp);

              // +++++++++++++++++++++++++++++++++++++++++ CRÉATION TEMPÉRATURE LOGO

              // let iconDailyTemp = document.createElement("span");
              // let iconElement = document.createElement("i");
              // iconElement.classList.add("fa-solid", "fa-temperature-three-quarters", "icons");
              // iconDailyTemp.appendChild(iconElement);
              // divWeatherDate.appendChild(iconDailyTemp);
            }

            let weather = data.current.weather[0].description;
            let weatherIcon = data.current.weather[0].icon;
            let iconDom = document.createElement("img");
            iconDom.style.height = "250px";
            iconDom.style.width = "250px";
            iconDom.style.marginTop = "-50px";
            iconDom.style.marginLeft = "-5  0px";

            iconDom.src = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            let weatherIconSpan = document.querySelector(".icon");
            weatherIconSpan.innerHTML = "";
            weatherIconSpan.appendChild(iconDom);
            let currentTemp = data.current.temp;
            let currentTempFloor = Math.floor(currentTemp);
            let currentTempHuman = data.current.feels_like;
            let currentTempHumanFloor = Math.floor(currentTempHuman);
            let leveSoleil = data.current.sunrise;
            let leveSoleilDate = new Date(leveSoleil * 1000);
            let leveSoleilFormat = leveSoleilDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            let coucheSoleil = data.current.sunset;
            let coucheSoleilDate = new Date(coucheSoleil * 1000);
            let coucheSoleilFormat = coucheSoleilDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            let currentHour = data.current.dt;
            let dayHour = new Date(currentHour * 1000);
            let formattedTime = dayHour.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            let currentHumidity = data.current.humidity;
            let currentUV = data.current.uvi;
            let currentWindSpeed = data.current.wind_speed;
            let currentRain = data.current.rain;

            document.querySelector(".town").innerHTML = town;
            document.querySelector(".weather").innerHTML = weather;
            document.querySelector(".temp").innerHTML = currentTempFloor + "°c";
            document.querySelector(".tempHuman").innerHTML = currentTempHumanFloor + "°C";
            document.querySelector(".upSun").innerHTML = leveSoleilFormat;
            document.querySelector(".downSun").innerHTML = coucheSoleilFormat;
            document.querySelector(".hour").innerHTML = formattedTime;
            document.querySelector(".humidity").innerHTML = currentHumidity + "%";
            document.querySelector(".uv").innerHTML = currentUV;
            document.querySelector(".wind").innerHTML = currentWindSpeed + " Km/h";
            // document.querySelector(".rain").innerHTML = currentRain;
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }
});

let containers = document.querySelectorAll(".container");

containers.forEach((container) => {
  container.addEventListener("click", function () {
    console.log("ok");
    let isExpanded = this.classList.contains("expanded");
    this.classList.toggle("expanded", !isExpanded);
  });
});

let inputDelete = document.querySelector(".delete");
inputDelete.addEventListener("click", function () {
  input.value = "";
});
