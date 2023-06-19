import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const TrayRequest = Loadable(lazy(() => import('./Tray/request')))
const TrayItem = Loadable(lazy(() => import('./Tray/item')))
const Scan = Loadable(lazy(() => import('./Tray/scan')))

const Trayrequest = Loadable(lazy(() => import('./Sp_Rp_trays/request')))
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
        path: '/rdl-two/scan',
        element: <Scan />,
    },
    {
        path: '/rdl-two/tray/view-item/:trayId',
        element: <TrayItem />,
    },
    {
        path: '/rdl-two/Sp_Rp_trays',
        element: <Trayrequest />,
    },
]

export default RDLRouter
