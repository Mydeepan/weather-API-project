import React, { useEffect, useState } from 'react';
import axios from 'axios';
import wind from '../assets/wind.png';
import SunIcon from '../assets/sun-clear.webp';
import clearNty from '../assets/Weather_6-1024.webp';
import CloudIcon from '../assets/colod-sun.png';
import NytCloude from '../assets/nty-c.webp';
import brokenclouds from '../assets/clear-removebg-preview.png';
import scatteredClouds from '../assets/clear-removebg-preview.png';
import rain from '../assets/drizzle.webp';
import thunderstorm from '../assets/thunderstorm.png';
import SnowIcon from '../assets/snow.png';
import haze from '../assets/hare.webp';


export const Home = () => {
    const [text, setText] = useState('Erode');
    const [urlValue, setUrlValue] = useState("Erode");
    const [temp, setTemp] = useState("");
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState("");
    const [weatherState, setWeatherState] = useState('');
    const [fealLike, setFeelLike] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [humidity, setHumidity] = useState('');
    const [lon, setLon] = useState('');
    const [lat, setLat] = useState("");
    const [pressure, setPressure] = useState('');
    let apiKey = '72801495cdbb4c1c82d6bfe513a6ae28';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${urlValue}&appid=${apiKey}&units=Metric`;

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [iconCurrent, setCurrentIcon] = useState(null);

    const weatherIconMap = {
        '01d': SunIcon,
        '01n': clearNty,
        '02d': CloudIcon,
        '02n': NytCloude,
        '03d': scatteredClouds,
        '03n': scatteredClouds,
        '04d': brokenclouds,
        '04n': brokenclouds,
        '09d': rain,
        '09n': rain,
        '10d': rain,
        '10n': rain,
        '11d': thunderstorm,
        '11n': thunderstorm,
        '13d': SnowIcon,
        '13n': SnowIcon,
        '50d': haze,
        '50n': haze
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                let res = await axios.get(url);
                let resData = res.data;
                setTemp(Math.floor(resData.main.temp));
                setCityName(resData.name);
                setCountry(resData.sys.country);
                setWeatherState(resData.weather[0].main);
                setFeelLike(Math.floor(resData.main.feels_like));
                setWindSpeed(resData.wind.speed);
                setHumidity(resData.main.humidity);
                setLon(resData.coord.lon.toFixed(2));
                setLat(resData.coord.lat.toFixed(2));
                setPressure(resData.main.pressure);
                const icons = resData.weather[0].icon;
                setCurrentIcon(weatherIconMap[icons] || SunIcon);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [urlValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const enterValue = text;
        setUrlValue(enterValue);
    };

    return (
        <>
            <main>
                <div className="container">
                    <div className="h-tag">
                        <h2>Weather Report</h2>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input type="text" id='Search' value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter your Location' autoComplete='off' />
                        <button type="submit">
                            Search
                        </button>
                    </form>
                    {isLoading && <p className='loading'>Loading..</p>}
                    {!isLoading && error && <p className='error'>{error}</p>}
                    {!isLoading && !error &&
                        <>
                            <div className="img">
                                <img src={iconCurrent} alt={weatherState} />
                                <h4><span>{temp}° C</span> {weatherState}</h4>
                                <h3>{cityName}</h3>
                                <h4>{country}</h4>
                            </div>
                            <div className="details">
                                <div className='feel'>
                                    <p>Pressure: <i>{pressure + ' mb'}</i></p>
                                    <p> Feel like<i>: {fealLike}°C </i></p>
                                </div>
                                <div className="hu-wi">
                                    <p> <img src={wind} width={25} height={25} /> Wind:  <i>{windSpeed} km/h</i></p>
                                    <p><b>💧</b> Humidity: <i>{humidity} %</i></p>
                                </div>
                                <div className="log-lat">
                                    <p>Latitude: <span>{lat}</span></p>
                                    <p>Longitude: <span>{lon}</span></p>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </main>
        </>
    );
};
