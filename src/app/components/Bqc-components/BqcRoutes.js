import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const Tray = Loadable(lazy(() => import('./Tray/tray')))

const BqcRouter= [
    {
        path: '/bqc/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/bqc/tray',
        element: <Tray />,
    },
]

export default BqcRouter
