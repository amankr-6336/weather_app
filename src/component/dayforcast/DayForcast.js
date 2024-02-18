import React from 'react'
import { IoArrowUpOutline } from "react-icons/io5";
import { IoArrowDownOutline } from "react-icons/io5";
import './Dayforcast.scss'
 

function DayForcast({icon,data,day}) {

 



  return (
    <div className="day">
        <div className="inner_day">
            <div className="left_day">
               <div className="max">
               <IoArrowUpOutline />
                   <p>{data?.main?.temp_max}°</p>
               </div>
               <div className="min">
               <IoArrowDownOutline />
               <p>{data?.main?.temp_min}°</p>
               </div>
            </div>
            <div className="right_day">
                 <div className="day_icon">
                    <img src={icon} alt="" />
                 </div>
                 <div className="desc">
                    <h4 className='day_name'>{day?.formattedDate}</h4>
                    <p className='main'>{data?.weather[0]?.main}</p>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default DayForcast