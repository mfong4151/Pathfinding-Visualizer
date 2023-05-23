import React, { FC } from 'react'
import './VisFooter.css'
import qrCode from '../../assets/frame.png'
const VisFooter:FC = () => {
  return (
    <footer className='udc'>
      <img src={qrCode} alt=""/>

    </footer>
  )
}

export default VisFooter;
