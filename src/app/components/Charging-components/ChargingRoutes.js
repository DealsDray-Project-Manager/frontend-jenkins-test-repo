import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const Tray = Loadable(lazy(() => import('./Tray/tray')))

const ChargingRouter= [
    {
        path: '/charging/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/charging/tray',
        element: <Tray />,
    },
]

export default ChargingRouter
