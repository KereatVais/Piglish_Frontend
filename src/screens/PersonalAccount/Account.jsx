import React from "react";
import { useSelector } from "react-redux";
import './Account.scss'

import unknownUser from '../../common/img/unknownUser.jpg'

const Account = (props) => {
  const userData = useSelector((state) => state.auth)

  return(
    <div className='personal-account'>
      <h2>Личный кабинет</h2>
      <div className='headline'>
        <div className='headline__avatar'>
          <img src={unknownUser} alt="" />
        </div>
        <h3 className='headline__username'>
          {userData.username}
        </h3>
      </div>
      <div className='body'>
        <div>
          Дата рождения: {userData.dateOfBirth}
        </div>
        <div>
          Страна: {userData.country}
        </div>
        <div>
          Email: {userData.email}
        </div>
      </div>
    </div>
  )
}

export default Account