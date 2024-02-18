import React from 'react'
import './RainBar.scss'
import moment from 'moment';

function RainBar({forecastItem}) {
  
    let barValue=5;
    let barClass='light';
    
    if(forecastItem?.rain){
      const rainValue = forecastItem?.rain['3h']; // Accessing the rain value from the object
      barValue += Math.round(rainValue * 10);
       barClass = barValue > 50 ? 'dark' : 'light';
    }
    else{
      barValue=5;
    }
    
    
  return (
     <div className="rainbar">
        <div className="innerrainbar">
            <div className="bar_time">
               <p>{moment.unix(forecastItem.dt).format('h a')}</p>
            </div>
            <div className="barlength">
            {/* <p>{barValue}</p> */}
                  <span className={`bar_value ${barClass}`}style={{ width: `${barValue}%` }}></span>
            </div>
        </div>
     </div>
  )
}

export default RainBar