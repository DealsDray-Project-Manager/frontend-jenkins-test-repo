import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const TrayRDL_one = Loadable(lazy(() => import('./Tray/rdl-fls-request')))
const TrayRDL_oneApprove = Loadable(lazy(() => import('./Tray/approve')))
const Actionfunction = Loadable(lazy(() => import('./Tray/actionfunction')))
const ReportDataDisplay = Loadable(
    lazy(() => import('./Tray/report-data-display'))
)
const ActionDisplay = Loadable(
    lazy(() => import('./Tray/action'))
)
const RDLRouter = [
    {
        path: '/rdL-fls/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/rdL-fls/tray',
        element: <TrayRDL_one />,
    },
    {
        path: '/rdL-fls/tray/approve/:trayId',
        element: <TrayRDL_oneApprove />,
    },
    {
        path: '/rdL-fls/tray/actionfunction',
        element: <Actionfunction />,
    },
    {
        path: '/rdL-fls/rdl-fls-request/approve/information-display',
        element: <ReportDataDisplay />,
    },
    {
        path: '/rdL-fls/rdl-fls-request/approve/information-display/action',
        element: <ActionDisplay />,
    },
]

export default RDLRouter
