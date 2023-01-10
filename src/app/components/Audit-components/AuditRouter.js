import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const AssignedOtherTray = Loadable(
    lazy(() => import('./Assigned-other-tray/assigned-other-tray'))
)
const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const TrayItem = Loadable(lazy(() => import('./Assigned-other-tray/view-item')))
const AuditRequest = Loadable(
    lazy(() => import('./Audit-request/Audit-requests'))
)
const WhtTransction = Loadable(
    lazy(() => import('./Audit-request/start-segrigation'))
)

const AuditRouter = [
    {
        path: '/audit/assigned-tray',
        element: <AssignedOtherTray />,
    },
    {
        path: '/audit/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/audit/assigned-tray/view-item/:trayId',
        element: <TrayItem />,
    },
    {
        path: '/audit/audit-request',
        element: <AuditRequest />,
    },
    {
        path: '/audit/audit-request/start-transaction/:trayId',
        element: <WhtTransction />,
    },
]

export default AuditRouter
