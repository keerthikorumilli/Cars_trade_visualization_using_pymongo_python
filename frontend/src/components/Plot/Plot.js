import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Plot.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons'; 

const PlotComponent = () => {
  const [statistics, setStatistics] = useState({
    MEAN: {},
    MEDIAN: {},
    MODE: {},
    STANDARD_DEVIATION: {},
    VARIANCE: {},
    INTERQUARTILERANGE: {},
  });

  useEffect(() => {
    async function fetchAllStatistics(statistic) {
      try {
        console.log(`Fetching all statistics for ${statistic}`);
        const response = await axios.get(`http://localhost:5000/api/carsdata/${statistic}`);
        console.log('Response data:', response.data);
        console.log(`Response for ${statistic}:`, response.data);
        setStatistics((prevStats) => ({ ...prevStats, [statistic]: response.data }));
      } catch (error) {
        console.error(`Error fetching all statistics for ${statistic}:`, error);
      }
    }

    fetchAllStatistics('MEAN');
    fetchAllStatistics('MEDIAN');
    fetchAllStatistics('MODE');
    fetchAllStatistics('STANDARD_DEVIATION');
    fetchAllStatistics('VARIANCE');
    fetchAllStatistics('INTERQUARTILERANGE');
  }, []);

  const renderGradientBar = (statistic) => {
    const stats = statistics[statistic];
    const data = Object.keys(stats).map((attribute) => ({
      name: attribute,
      value: stats[attribute],
    }));
    console.log(data);
    const customColorRGB = "#228B22";
return (
  <div className="box">
    <h3>{statistic}</h3>
    <div className='chart'>
      <BarChart width={224} height={135} data={data}>
        <XAxis dataKey="name" angle={-45} textAnchor="end" tick={{ fill: 'white', fontSize: 11 }} />
        <YAxis tick={{ fill: 'white' }} />
        <Tooltip />
        <Bar dataKey="value" fill={customColorRGB} />
      </BarChart>
    </div>
  </div>
);

  };

  return (
    <div className="layout-container">
      <div className="left-half">
        {renderGradientBar('MEAN')}
        {renderGradientBar('MEDIAN')}
        {renderGradientBar('MODE')}
        {renderGradientBar('STANDARD_DEVIATION')}
        {renderGradientBar('VARIANCE')}
        {renderGradientBar('INTERQUARTILERANGE')}
      </div>
      <div className="right-half">
        <div className="textarea">
          <div className='name'>
            <FontAwesomeIcon icon={faDatabase} size="2x" />
            <p className='about'>About the data</p>
          </div>
          <p className='para'>
          This is a dataset has the data about various cars of different models and also has some key components that tell if a car is good to buy, affordable for a certaim range or not. The dataset comprises various attributes related to car models, encompassing details such as the manufacturer, type, seating capacity, engine displacement, dimensions (length, width, height, wheelbase), cylinder count, fuel type, engine specifications, transmission type, brake systems, drive type, turning radius, fuel tank capacity, boot space, fuel efficiency, emission classification, tire size, available variants, and NCAP safety rating. All these features helps to define the performance and durability of a car.This comprehensive collection of attributes offers insights into the specifications, performance, and safety features of different car models. Analyzing this data can help in understanding the diversity and characteristics of vehicles, aiding in decision-making for buyers, manufacturers, and automotive enthusiasts. Cars Dataset has been so vibrant with lots of different models and types of cars to work on, which will be a guide for the buyers to pick the best option among all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlotComponent;
