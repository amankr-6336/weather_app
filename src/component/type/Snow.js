import React from 'react'
import Lottie from 'lottie-react'
import snow from '../assets/snow.json'
import './Common.scss'

function Snow() {
  return (
    <div className='lottie'> 
       <Lottie animationData={snow} loop={true}/>
    </div>
  )
}

export default Snow