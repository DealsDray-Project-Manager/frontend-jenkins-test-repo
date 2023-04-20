import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const TrayRequest = Loadable(lazy(() => import('./Tray/request')))
const TrayItem = Loadable(lazy(() => import('./Tray/item')))

const RDLRouter = [
    {
        path: '/rdl-two/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/rdl-two/tray',
        element: <TrayRequest />,
    },
    {
        path: '/rdl-two/tray/view-item/:trayId',
        element: <TrayItem />,
    },
]

export default RDLRouter
