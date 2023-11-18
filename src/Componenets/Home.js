import React, { useState } from "react";
import "../index.css";

// Importing All Cloud Icons

import fog from "../Images/Logo.png";
import Broken from "../Images/Broken-clouds.png";
import clear from "../Images/clear-sky.png";
import few from "../Images/few-clouds.png";
import mist from "../Images/mist.png";
import rain from "../Images/rain.png";
import Scattered from "../Images/Scatteres-clouds.png";
import Shower from "../Images/shower-rain.png";
import Snow from "../Images/snow.png";
import Thunderstorm from "../Images/thunderstrom.png";

// Importing Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  //   faTemperatureThreeQuarters,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  // API Key from OpenWeathermap
  const API_KEY = "b8ed9feeea9a9579aca5cfc3abddeb48";

  const [wicon, setwicon] = useState(fog);

  //   After Entering the City showDetails function will be called
  const showDetails = async () => {
    let cityName = document.getElementsByClassName("cityName");
    if (cityName[0].value === "") {
      alert("Please enter a city..");
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName[0].value}&units=Metric&appid=${API_KEY}`;

    cityName[0].value = "";
    try {
      let response = await fetch(url);
      let data = await response.json();

      const Temp = document.getElementsByClassName("temp");
      const min_temp = document.getElementsByClassName("min-temp");
      const max_temp = document.getElementsByClassName("max-temp");
      const Pressure = document.getElementsByClassName("pressure");
      const humidity = document.getElementsByClassName("humidity");
      const wind = document.getElementsByClassName("wind-speed");
      const Cloud = document.getElementsByClassName("cloud");
      const City = document.getElementsByClassName("city");

      Temp[0].innerHTML = data.main.temp + " °C";
      min_temp[0].innerHTML = " Min Temp : " + data.main.temp_min + " °C";
      max_temp[0].innerHTML = " Max Temp : " + data.main.temp_max + " °C";
      Pressure[0].innerHTML = "Pressure : " + data.main.pressure + " Pascal";
      humidity[0].innerHTML = " Humidity : " + data.main.humidity + " %";
      wind[0].innerHTML = " Wind Speed : " + data.wind.speed + " Km/h";
      Cloud[0].innerHTML = data.weather[0].description;
      City[0].innerHTML =
        " City : " + data.name + " (" + data.sys.country + ")";

      // Changing the Cloud icons w. r. t. icon code
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setwicon(clear);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setwicon(few);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setwicon(Scattered);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setwicon(Broken);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setwicon(Shower);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setwicon(rain);
      } else if (
        data.weather[0].icon === "11d" ||
        data.weather[0].icon === "11n"
      ) {
        setwicon(Thunderstorm);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setwicon(Snow);
      } else if (
        data.weather[0].icon === "50d" ||
        data.weather[0].icon === "50n"
      ) {
        setwicon(mist);
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      alert(
        "Oops.. Sorry! Choose another city. \n Weather data for this city is not available."
      );
    }
  };

  return (
    <>
      <div className="home">
        <h1>Welcome to "Get My weather" app</h1>
        <div className="city-name-submit">
          <input
            type="text"
            name="city"
            className="cityName"
            placeholder="Enter Your city name"
          />
          <button
            onClick={() => {
              showDetails();
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} beat />
          </button>
        </div>
        <div className="show-details">
          <div className="weather-image">
            <img src={wicon} alt="Hello" className="Weather-icon" />
          </div>
          <div className="weather-data">
            <img src={fog} alt="logo" className="logo" />
            {/* <FontAwesomeIcon
              className="temp-icon"
              icon={faTemperatureThreeQuarters}
              beat
            /> */}
            <h2 className="temp">Temp</h2>
            <div className="weather-details">
              <div className="data">
                <h3 className="min-temp">Min Temp</h3>
              </div>
              <div className="data">
                <h3 className="max-temp">Max Temp</h3>
              </div>
              <div className="data">
                <h3 className="pressure">Pressure</h3>
              </div>
              <div className="data">
                <h3 className="humidity">Humidity</h3>
              </div>
              <div className="data">
                <h3 className="wind-speed">Wind Spped</h3>
              </div>
              <div className="data">
                <h3 className="cloud">Cloudy</h3>
              </div>
              <div className="data">
                <h3 className="city"> City name</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
