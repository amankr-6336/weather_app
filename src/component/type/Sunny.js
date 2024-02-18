import React from 'react'
import Lottie from 'lottie-react'
import sunny from '../assets/sunny.json'
import './Common.scss'

function Sunny() {
  return (
    <div className='lottie'>
      <Lottie animationData={sunny} loop={true}/>
    </div>
  )
}

export default Sunny