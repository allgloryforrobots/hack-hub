import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/userSlice'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE, ADMIN_ROUTE, CABINET_ROUTE, LOGIN_ROUTE } from '../AppRouter'
import './index.module.css'

const NavbarComponent = () => {

    const { isAuth } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.setItem('token', "")
        dispatch(logout())
        navigate(LOGIN_ROUTE)
    }

    return (
        <div className="navbar">

            <div>
                <div style={{ paddingBottom: '8px' }} as={NavLink} to={MAIN_ROUTE}><h4>Huck hub</h4></div>

                <div>
                    {
                        isAuth
                            ? <div>
                                <button onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</button>
                                <button onClick={() => navigate(CABINET_ROUTE)}>Кабинет</button>
                                <button onClick={() => handleLogout()}>Выйти</button>
                            </div>
                            : <button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</button>
                    }

                </div>

            </div>

        </div>
    )
}

export default NavbarComponent