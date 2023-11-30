import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Admin from "../pages/Admin.page"
import Cabinet from "../pages/Cabinet.page"
import Auth from "../pages/Auth.page"
import Main from "../pages/Main.page"
import NotFound from "../pages/NotFound.page"

export const ADMIN_ROUTE = '/admin'
export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'
export const CABINET_ROUTE = '/cabinet'
export const MAIN_ROUTE = '/'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CABINET_ROUTE,
        Component: Cabinet
    },
]

export const publicRoutes = [

    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
]

const AppRouter = () => {

    const { isAuth } = useSelector((state) => state.user)

    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} exact />)}
            {publicRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} exact />)}
            <Route path='*' element={<NotFound />} />
        </Routes>
    )

}

export default AppRouter