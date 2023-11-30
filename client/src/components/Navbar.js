import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/userSlice'
import { Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { MAIN_ROUTE, ADMIN_ROUTE, CABINET_ROUTE, LOGIN_ROUTE } from './AppRouter'

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
        <Navbar data-bs-theme="light">

            <Container>
                <Navbar.Brand style={{ paddingBottom: '8px' }} as={NavLink} to={MAIN_ROUTE}><h4>Huck hub</h4></Navbar.Brand>

                <Nav className="ml-auto">
                    {
                        isAuth
                            ? <Stack direction="horizontal" gap={3}>
                                <Button type="primary" ghost onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
                                <Button type="primary" ghost onClick={() => navigate(CABINET_ROUTE)}>Кабинет</Button>
                                <Button type="primary" ghost onClick={() => handleLogout()}>Выйти</Button>
                            </Stack>
                            : <Button type="primary" ghost onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    }

                </Nav>

            </Container>

        </Navbar>
    )
}

export default NavbarComponent