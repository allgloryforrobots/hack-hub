import React, { useState, useRef } from 'react'
import { Container, Card } from 'react-bootstrap'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from '../components/AppRouter'
import { Button, Input, Form, Space } from 'antd'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { login, registration } from '../http/userAPI'
import { setUser } from '../store/userSlice'
import { notifyError, notifySuccess } from '../components/notification'
import { generatePassword } from '../http/userAPI'

const Auth = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const passwordRef = useRef(null)
    const emailRef = useRef(null)
    const [passwordVisible, setPasswordVisible] = useState(false);

    // useEffect(() => {
    //     emailRef.current.setSelectionRange(emailRef.current.value.length, emailRef.current.value.length)
    // }, [])

    const sendCredentials = async () => {

        try {
            let data = null;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }

            dispatch(setUser(data.user))
            navigate(MAIN_ROUTE)

        } catch (e) {
            notifyError({
                message: `${e.response.status}: ${e.response.statusText}`,
                description: e.response.data.message
            })
        }

    }

    const passwordKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendCredentials();
        }
    }

    const emailKeyDown = (event) => {
        if (event.key === 'Enter') {
            passwordRef.current.focus()
        }
    }

    const [form] = Form.useForm()
    const passwordRegexp = /(([a-z A-Z 1-9 @$!%*#?&])(?=.*[A-Z][a-z])(?=.*\d)(?=.*[@$!%*#?&])).{7,15}/

    const passwordValidator = (rule, value, callback) => {
        if (value.match(passwordRegexp)) {
            return callback()
        }
        callback(true)
    }

    const createPasswordAndDownload = async() => {

        try {
            const data = await generatePassword()
            setPassword(data.password)
        } catch (e) {
            notifyError({
                message: `${e.response.status}: ${e.response.statusText}`,
                description: e.response.data.message
            })
        }

        const element = document.createElement("a")
        const file = new Blob([password], {type: 'text/plain'})
        element.href = URL.createObjectURL(file)
        element.download = "пароль.txt"
        document.body.appendChild(element) // Required for this to work in FireFox
        element.click()

        notifySuccess({
            message: 'Пароль сгенерирован', 
            description: 'Пароль вставлен в поле пароль и загружен в файл. Браузер сохраняет файлы по умолчанию в папку загрузки',
            duration: 0
        })
        
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 59 }}
        >

            <Card style={{ width: 600 }} className='p-5'>
                <h2 className='m-auto mb-4'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>

                <Form form={form} layout="vertical">
                    <Form.Item
                        name="email"
                        label="Электронная почта"
                        rules={[{ required: true, type: 'email', message: 'Введите корректный адрес электронной почты' }]}
                    >
                        <Input
                            ref={emailRef}
                            placeholder="Введите ваш email"
                            type="email" value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={emailKeyDown}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            {
                                required: true,
                                min: 8,
                                message: 'Пароль должен быть длиной от 8 до 16 символов, а также содержать цифры, знак препинания, буквы латинского алфавита в нижнем и верхнем регистрах',
                                validator: passwordValidator
                            }
                        ]}
                    >
                        <Space direction="horizontal">
                            <Input.Password
                                ref={passwordRef}
                                autoComplete="on"
                                type="password"
                                placeholder="Введите ваш пароль"
                                value={password}
                                onChange={e => setPassword(e.target.value)} onKeyDown={passwordKeyDown}
                                visibilityToggle={{
                                    visible: passwordVisible,
                                    onVisibleChange: setPasswordVisible,
                                }}
                            />

                            <Button
                                style={{
                                    width: 150,
                                }}
                                onClick={() => setPasswordVisible((prevState) => !prevState)}
                            >
                                {passwordVisible ? 'Скрыть пароль' : 'Показать пароль'}
                            </Button>
                        </Space>
                       
                    </Form.Item>

                    {
                        !isLogin && <Form.Item label="Помощь в подборе пароля">
                            <Button type="primary" onClick={createPasswordAndDownload} ghost>
                                Сгенерировать пароль, подставить, записать в файл и скачать
                            </Button>
                        </Form.Item>
                    }

                    <Form.Item>
                        {
                            isLogin
                                ? <Button type="primary" onClick={sendCredentials}>
                                    Войти
                                </Button>
                                : <Button type="primary" onClick={sendCredentials}>
                                    Зарегистрироваться
                                </Button>
                        }
                        {
                            isLogin
                                ? <NavLink to={REGISTRATION_ROUTE}>
                                    <Button type="link">Зарегистрироваться</Button>
                                </NavLink>
                                : <NavLink to={LOGIN_ROUTE}>
                                    <Button type="link">Войти</Button>
                                </NavLink>
                        }
                    </Form.Item>
                </Form>
            </Card>

        </Container>
    )
}

export default Auth