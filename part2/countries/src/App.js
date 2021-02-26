import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const api_key = process.env.REACT_APP_WEATHER_API_KEY;
  const WEATHER_API = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`;

  const [capitalWeather, setCapitalWeather] = useState({});

  useEffect(
    () =>
      axios.get(WEATHER_API).then((res) => {
        console.log(res);
        setCapitalWeather(res.data.current);
      }),
    [WEATHER_API]
  );
  if (capitalWeather) {
    return (
      <div>
        <h3>Weather in {country.capital}</h3>
        <div>Temperature: {capitalWeather.temperature ?? ""} Celsius</div>
        <img src={capitalWeather.weather_icons} alt={capitalWeather.weather_descriptions}/>
        <div>Wind speed: {capitalWeather.wind_speed} mph direction {capitalWeather.wind_dir}</div>
      </div>
    );
  }
};

const CountryDetail = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <div>Capital: {country.capital}</div>
    <div>Population: {country.population}</div>
    <h3>Languages</h3>
    <ul>
      {country.languages.map((lang) => (
        <li key={lang.name}>{lang.name}</li>
      ))}
    </ul>
    <img
      src={country.flag}
      width="400"
      height="300"
      alt={`Flag of ${country.name}`}
    />
    <Weather country={country} />
  </div>
);

const ShowCountries = ({ countries, filter, handleClick }) => {
  const filteredCountries =
    filter.length === 0
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(filter.toLowerCase())
        );

  if (filter.length === 0) {
    return <div>Please enter a country name</div>;
  } else if (filteredCountries.length > 10) {
    return <div>Too many countries, specify another filter </div>;
  } else if (filteredCountries.length === 1) {
    return <CountryDetail country={filteredCountries[0]} />;
  } else {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name}>
            {country.name}{" "}
            <button value={country.name} onClick={handleClick}>
              Show
            </button>{" "}
          </li>
        ))}
      </ul>
    );
  }
};

function App() {
  // App States
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  // App properties

  const COUNTRY_ENDPOINT = "https://restcountries.eu/rest/v2/all";

  // App efects
  useEffect(() => {
    axios.get(COUNTRY_ENDPOINT).then((res) => {
      setCountries(res.data);
      console.log(res.data);
    });
  }, []);

  // Input handlers

  const handleCountryChange = (e) => {
    setCountryFilter(e.target.value);
  };

  return (
    <div className="App">
      <h1>Data for countries</h1>
      <div>
        Filter by country:{" "}
        <input value={countryFilter} onChange={handleCountryChange} />
      </div>
      <ShowCountries
        countries={countries}
        filter={countryFilter}
        handleClick={handleCountryChange}
      />
    </div>
  );
}

export default App;
