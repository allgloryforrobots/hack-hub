import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { check } from '../http/userAPI'
import { setUser } from '../store/userSlice'

import AppRouter from './AppRouter'
import NavbarComponent from './Navbar'
import { LOGIN_ROUTE } from './AppRouter'

export default function LoadingLayout() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {

        check()
            .then(data => {
                dispatch(setUser(data))
            })
            .catch(e => {
                navigate(LOGIN_ROUTE)
            })
            .finally(() => setLoading(false))

    }, [])
  
    if (loading) {
        return <Spin style={{ position: 'fixed', top: '50%', left: '50%' }} size="large" />
    }
  
    return (
      <>
        <NavbarComponent />
        <AppRouter />
      </>
    )
  }
  