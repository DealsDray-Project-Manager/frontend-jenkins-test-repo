import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const TrayRDL_one = Loadable(lazy(() => import('./Tray/rdl-1-request')))
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
        path: '/rdL-1/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/rdL-1/tray',
        element: <TrayRDL_one />,
    },
    {
        path: '/rdL-1/tray/approve/:trayId',
        element: <TrayRDL_oneApprove />,
    },
    {
        path: '/rdL-1/tray/actionfunction',
        element: <Actionfunction />,
    },
    {
        path: '/rdL-1/rdl-1-request/approve/information-display',
        element: <ReportDataDisplay />,
    },
    {
        path: '/rdL-1/rdl-1-request/approve/information-display/action',
        element: <ActionDisplay />,
    },
]

export default RDLRouter
