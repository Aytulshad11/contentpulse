import React from 'react'
import imageone from "../assets/image1.jpg"
function Logo({width = '100px'}) {
  return (
    <div>
      <img src={imageone} alt="Logo" style={{width: width}} />
    </div>
  )
}

export default Logo