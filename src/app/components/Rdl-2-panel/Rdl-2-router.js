import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
// const TrayRequest = Loadable(lazy(() => import('./Tray/request')))
const TrayItem = Loadable(lazy(() => import('./Tray/item')))

const Trayrequest = Loadable(lazy(() => import('./Sp_Rp_trays/request')))
const RpTrayReceive = Loadable(lazy(() => import('./Sp_Rp_trays/rp-receive')))
const SpTrayReceive = Loadable(lazy(() => import('./Sp_Rp_trays/sp-receive')))
const TrayStartPage = Loadable(lazy(() => import('./Sp_Rp_trays/start')))
const TrayUnitInformationDisplay = Loadable(
    lazy(() => import('./Sp_Rp_trays/start-repair'))
)
const TrayUnitInformationDisplayAction = Loadable(
    lazy(() => import('./Sp_Rp_trays/repair-done-action'))
)
const TraySummary = Loadable(lazy(() => import('./Sp_Rp_trays/summary')))

const RDLRouter = [
    {
        path: '/rdl-2/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/rdl-2/tray',
        element: <Trayrequest />,
    },
    {
        path: '/rdl-2/tray/rp-tray-receive/:trayId',
        element: <RpTrayReceive />,
    },
    {
        path: '/rdl-2/tray/sp-tray-receive/:trayId',
        element: <SpTrayReceive />,
    },
    {
        path: '/rdl-2/tray/start/:trayId',
        element: <TrayStartPage />,
    },
    {
        path: '/rdl-2/tray/unit-information-display',
        element: <TrayUnitInformationDisplay />,
    },
    {
        path: '/rdl-2/tray/unit-information-display/action',
        element: <TrayUnitInformationDisplayAction />,
    },
    {
        path: '/rdl-2/tray/tray/summary/:trayId',
        element: <TraySummary />,
    },
]

export default RDLRouter
