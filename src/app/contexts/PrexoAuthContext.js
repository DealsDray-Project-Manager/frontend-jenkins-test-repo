import React, { createContext, useEffect, useReducer, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
// import { firebaseConfig } from 'config.js'
import { MatxLoading } from 'app/components'
import { useNavigate } from 'react-router-dom'
// import jwt from "jsonwebtoken"
import jwt_decode from 'jwt-decode'
import { axiosSuperAdminPrexo } from '../../axios'
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig)
// }
const initialAuthState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'AUTH_STATE_CHANGED': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialAuthState,
    LoginPrxo: () => Promise.resolve(),
    logout: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialAuthState)
    const LoginPrxo = async (username, password) => {
        let res = await axiosSuperAdminPrexo.post('/login', {
            user_name: username,
            password: password,
        })
        if (res.status == 200) {
         
            dispatch({
                type: 'AUTH_STATE_CHANGED',
                payload: {
                    isAuthenticated: true,
                    user: {
                        id: res.data.data.data._id,
                        name: res.data.data.data.name,
                        username: res.data.data.data.user_name,
                        avatar: res.data.data.data.profile,
                        email: res.data.data.data.email,
                        role: res.data.data.data.user_type,
                        cpc_type: res.data.data.data.cpc_type,
                        warehouse: res.data.data.data.warehouse,
                        location: res.data.data.data.cpc,
                        serverType: res.data.data.serverType,
                    },
                },
            })
        }
        return res
    }
    const logout = () => {
        localStorage.removeItem('prexo-authentication')
        dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
                isAuthenticated: true,
                user: null,
            },
        })
        navigate('/')
    }
    useEffect(() => {
        let userExists = localStorage.getItem('prexo-authentication')
        if (userExists) {
            let user = jwt_decode(userExists)
           
            dispatch({
                type: 'AUTH_STATE_CHANGED',
                payload: {
                    isAuthenticated: true,
                    user: {
                        id: user.adminId,
                        name: user.name,
                        avatar: user.profile,
                        email: user.email,
                        role: user.user_type,
                        cpc_type: user.cpc_type,
                        warehouse: user.warehouse,
                        username: user.user_name,
                        location: user.location,
                        serverType: user.serverType,
                    },
                },
            })
        } else {
            dispatch({
                type: 'AUTH_STATE_CHANGED',
                payload: {
                    isAuthenticated: true,
                    user: null,
                },
            })
        }
        return
    }, [dispatch])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                LoginPrxo,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
