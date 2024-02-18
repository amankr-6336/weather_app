import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.scss";
import { IoSearch } from "react-icons/io5";

import { FaLocationDot } from "react-icons/fa6";

import { IoArrowUpOutline } from "react-icons/io5";
import { IoArrowDownOutline } from "react-icons/io5";

import moment from 'moment';
import RainBar from "../rainbar/RainBar";
import { IoStatsChartSharp } from "react-icons/io5";

import Haze from '../type/Haze';
import Cloudy from '../type/Cloudy'
import Rain from '../type/Rain'
import Snow from '../type/Snow'
import Sunny from '../type/Sunny'
import DayForcast from "../dayforcast/DayForcast";

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [city, setCity] = useState('new delhi');
    const [cityImage, setCityImage] = useState(null);
    const [dayforcast, setDayForcast] = useState(null);

    const API_KEY = "c482559d3dd586b617bd8546c3ea1ddc";


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
                setWeatherData(response.data);

                const cityImageResponse = await axios.get(`https://api.unsplash.com/search/photos?query=${city}&client_id=cDJ8t3Z5HyEz2M1iu7r2tcKa45nVkw7C4p67Zbxxces`);
                if (cityImageResponse.data.results.length > 0) {
                  setCityImage(cityImageResponse.data.results[0].urls.regular);
                }
            

                const dayForecast = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
                const flist = dayForecast.data.list;
                const filtered = filterForecast(flist);
                setDayForcast(filtered);

                // Fetch weather icon
                setWeatherIcon(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])

    const unixTimestamp = weatherData?.sys?.sunrise;

    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds


    const options = { timeZone: 'Asia/Kolkata' }; // 'Asia/Kolkata' is the timezone identifier for IST
    const formattedDate = date.toLocaleDateString('en-US', {
        ...options,
        weekday: 'short', // Short weekday name (e.g., "Sat")
        day: '2-digit', // Two-digit day of the month (e.g., "12")
        month: 'short' // Short month name (e.g., "Feb")
    });


    const getCurrentTime = () => {
        const options = { timeZone: 'Asia/Kolkata', hour12: false }; // 'Asia/Kolkata' is the timezone identifier for IST, and hour12: false ensures 24-hour format
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString('en-US', options);

        return formattedTime;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!city) return; 

        try {
            // Fetch weather data
            const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            setWeatherData(weatherResponse.data);
        
           

          
              const cityImageResponse = await axios.get(`https://api.unsplash.com/search/photos?query=${city}&client_id=cDJ8t3Z5HyEz2M1iu7r2tcKa45nVkw7C4p67Zbxxces`);
              if (cityImageResponse.data.results.length > 0) {
                setCityImage(cityImageResponse.data.results[0].urls.regular);
              }
         

            const dayForecast = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
            const flist = dayForecast.data.list;
           
            const filtered = filterForecast(flist);
            setDayForcast(filtered);

            // Fetch weather icon
            setWeatherIcon(`http://openweathermap.org/img/wn/${weatherResponse.data.weather[0].icon}.png`);

           
        } catch (error) {
            alert('enter valid place name')
            console.error('Error fetching data: ', error);
        }
    };

    const filterForecast = (forecastList) => {
        const currentUnixTime = moment().unix();
        const endUnixTime = moment().add(24, 'hours').unix();

        return forecastList.filter(forecast => {
            const forecastUnixTime = forecast.dt;
            return forecastUnixTime >= currentUnixTime && forecastUnixTime <= endUnixTime;
        });
    };

    let weatherComponent;
    if (weatherData?.weather[0]?.main) {
        switch (weatherData?.weather[0]?.main) {
            case 'Haze':
                weatherComponent = <Haze />;
                break;
            case 'Clouds':
                weatherComponent = <Cloudy />;
                break;
            case 'Snow':
                weatherComponent = <Snow />;
                break;
            case 'Sunny':
                weatherComponent = <Sunny />;
                break;
            case 'Rain':
                weatherComponent = <Rain />;
                break;
            default:
                weatherComponent = <Sunny />;
        }
    }
    let precp=0;
    if(weatherData?.rain){
        const rainValue = weatherData?.rain['1h']; // Accessing the rain value from the object
        precp+= Math.round(rainValue * 10);
        console.log(precp)
    }
    return (
        <div className="weather_box">
            <span className="block_color">

            </span>

            <div className="inner_weather_box">
                <div className="content_box">
                    <div className="left_side">
                        <div className="lottie_ani">
                        {weatherComponent}
                        </div>
                       

                        <div className="weather_desc">
                        <p>{weatherData?.weather[0]?.description}</p>
                        </div>

                        <div className="min_max">
                            <div className="max_temp">
                                
                                <h1>{weatherData?.main?.temp_max} °C</h1>
                                <p>Max temp.</p>
                                {/* <IoArrowUpOutline /> */}
                            </div>

                            <div className="max_temp">
                                <h1>{weatherData?.main?.temp_min}  °C</h1>
                                <p>Min temp.</p>
                                {/* <IoArrowUpOutline /> */}
                            </div>

                        </div>
                    </div>
                    <div className="right_side">
                        <div className="search_section">
                            <form onSubmit={handleSubmit}>
                                <input type="text" className="search" placeholder="Search here" onChange={(e) => setCity(e.target.value)} />
                                <IoSearch id="search" />

                            </form>

                        </div>

                        <div className="info_section">
                            <div className="city_info">
                                <div className="city_location">
                                    <p>Current location</p>
                                    <div className="name_of_city">
                                        <h4>{weatherData?.name}</h4>
                                        <div id="city">
                                            <FaLocationDot />
                                        </div>


                                    </div>

                                </div>
                                <div className="city_image">
                                    <div className="inner_image_box">
                                        {cityImage &&<img src={cityImage}  loading="lazy" alt="sorry" />}
                                        <div className="icon_info">
                                            <div className="temp_icon">
                                                <div className="left_side_b">
                                                    <div className="city_icon">
                                                        <img src={weatherIcon} alt="" />
                                                    </div>
                                                    <div className="city_temp">
                                                        <h2>{weatherData?.main?.temp}°C</h2>
                                                    </div>
                                                </div>

                                                <div className="right_side_b">
                                                    <div className="day_time">
                                                        <p>{formattedDate}, {getCurrentTime()}</p>
                                                    </div>
                                                    <div className="desc">
                                                        <p>{weatherData?.weather[0]?.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* <div className="extra_image_section">
                                        <div className="inner_extra_section">
                                            <MdMyLocation />
                                        </div>

                                    </div> */}
                                </div>
                                <div className="highlights">
                                    <h4>Today's Highlights</h4>
                                    <div className="inner_highlight_box">


                                        <div className="highlight_box">
                                            <div className="highlights_numbers">
                                                <p>Humidity</p>
                                                <h5>{weatherData?.main?.humidity}%</h5>
                                            </div>
                                        </div>
                                        <div className="highlight_box">
                                            <div className="highlights_numbers">
                                                <p>precipitation</p>
                                                <h5>{precp}%</h5>
                                            </div>
                                        </div>
                                        <div className="highlight_box">
                                            <div className="highlights_numbers">
                                                <p>Wind</p>
                                                <h5>{weatherData?.wind?.speed}km/h</h5>
                                            </div>
                                        </div>
                                        <div className="sunrise_sunset">
                                            <div className="time">
                                                <p>Sunrise & Sunset</p>
                                                <div className="times">
                                                    <div className="sunrise">
                                                        <span><IoArrowUpOutline /></span>
                                                        <h5>{moment.unix(weatherData?.sys?.sunrise).format('h:mm a')}</h5>
                                                    </div>
                                                    <div className="sunrise">
                                                        <span><IoArrowDownOutline /></span>
                                                        <h5>{moment.unix(weatherData?.sys?.sunset).format('h:mm a')}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="analytic_info">


                                <div className="hour_forecast">
                                    <div className="section_name">
                                        <h5>Chance of Rain</h5>
                                        <IoStatsChartSharp />
                                    </div>

                                    {
                                        dayforcast?.map((forecastItem, index) => <RainBar key={index} forecastItem={forecastItem} />)
                                    }

                                    <div className="range">
                                        <div className="spacing">

                                        </div>
                                        <div className="values">
                                            <p>Light</p>
                                            <p>Moderate</p>
                                            <p>Heavy</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="day_forcast">
                                    <h4 className="section_name">Overview of Today</h4>
                                    <div className="display_days">
                                        <DayForcast day={{formattedDate}} icon={weatherIcon} data={weatherData} />
                                       
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
