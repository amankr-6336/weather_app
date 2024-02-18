import React from 'react'
import Lottie from 'lottie-react'
import rain from '../assets/rain.json'
import './Common.scss'

function Rain() {
  return (
    <div className='lottie'> 
       <Lottie animationData={rain} loop={true}/>
    </div>
  )
}

export default Rain