import React, { lazy } from 'react'
import Loadable from '../components/Loadable/Loadable'

const Login = Loadable(lazy(() => import('./login')))

const LoginRouter = [
    {
        path: '/',
        element: <Login />,
    },
]

export default LoginRouter
