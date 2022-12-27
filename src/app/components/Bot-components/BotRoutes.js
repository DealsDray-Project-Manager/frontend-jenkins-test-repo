import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const Bag = Loadable(lazy(() => import('./Bag/view-assigned-all-bag')))
const Tray = Loadable(lazy(() => import('./Tray/assigned-all-tray')))

const BotRouter = [
    {
        path: '/bot/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/bot/bag',
        element: <Bag />,
    },
    {
        path: '/bot/tray',
        element: <Tray />,
    },
]

export default BotRouter
