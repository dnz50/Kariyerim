import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
        <h2>KARİYERİM</h2>
        <div className='button'>
            <NavLink className='btn' to={"/"}>İş Listesi</NavLink>
            <NavLink className='btn' to={"/jobs"}>İş Ekle</NavLink>
        </div>

    </header>
  )
}

export default Header