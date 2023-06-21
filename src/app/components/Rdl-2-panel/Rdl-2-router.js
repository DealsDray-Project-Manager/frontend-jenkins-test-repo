import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
// const TrayRequest = Loadable(lazy(() => import('./Tray/request')))
const TrayItem = Loadable(lazy(() => import('./Tray/item')))

const Trayrequest = Loadable(lazy(() => import('./Sp_Rp_trays/request')))
const RpTrayReceive = Loadable(lazy(() => import('./Sp_Rp_trays/rp-receive')))
const SpTrayReceive = Loadable(lazy(() => import('./Sp_Rp_trays/sp-receive')))
const TrayStartPage = Loadable(lazy(() => import('./Sp_Rp_trays/start')))
const TrayUnitInformationDisplay = Loadable(lazy(() => import('./Sp_Rp_trays/start-repair')))
const TrayUnitInformationDisplayAction = Loadable(lazy(() => import('./Sp_Rp_trays/repair-done-action')))


const RDLRouter = [
    {
        path: '/rdl-two/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/rdl-two/tray',
        element: <Trayrequest />,
    },
    {
        path: '/rdl-two/tray/rp-tray-receive/:trayId',
        element: <RpTrayReceive />,
    },
    {
        path: '/rdl-two/tray/sp-tray-receive/:trayId',
        element: <SpTrayReceive />,
    },
    {
        path: '/rdl-two/tray/tray/start/:trayId',
        element: <TrayStartPage />,
    },
    {
        path: '/rdl-two/tray/tray/unit-information-display',
        element: <TrayUnitInformationDisplay />,
    },
    {
        path: '/rdl-two/tray/tray/unit-information-display/action',
        element: <TrayUnitInformationDisplayAction />,
    },
]

export default RDLRouter
