import React from 'react'
import Lottie from 'lottie-react'
import Cloud from '../assets/cloudy.json'
import './Common.scss'

function Cloudy() {
  return (
    <div className='lottie'>
       <Lottie animationData={Cloud} loop={true}/>
    </div>
  )
}

export default Cloudy