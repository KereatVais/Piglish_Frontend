import React from "react";
import './Footer.scss'

import logoWhite from '../../common/img/logoWhite.svg'

const Footer = (props) => {
  return (
    <div className='footer'>
      <div className='image-container'>
        <img src={logoWhite} alt="" />
      </div>
      <div className='body'>
        <p>Если есть вопросы - смело пишите на email: <a href='mailto:derivolkate152@gmail.com'>derivolkate152@gmail.com</a></p>
        <p style={{fontSize: '16px'}}>Copyright © 2023 Piglish, Inc.</p>
      </div>
    </div>
  )
}

export default Footer;