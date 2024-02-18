import React from 'react'
import Lottie from 'lottie-react'
import haze from '../assets/haze.json'
import './Common.scss'

function Haze() {
  return (
    <div className='lottie'>
       <Lottie animationData={haze} loop={true}/>
    </div>
  )
}

export default Haze