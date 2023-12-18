import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

/*--------------------------------------------------*/
// DASHBOARD
const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
// ISSUED TRAY VIEW PAGE 
const IssuedTrayView= Loadable(lazy(() => import('./Issued-trays/tray')))
// PENDING ITEMS
const PendingItems= Loadable(lazy(() => import('./Issued-trays/pending-items')))
// START RP-AUDIT
const StartRpAudit =Loadable(lazy(() => import('./Issued-trays/start-rp-audit')))
// CLOSE TRAY WITH ITEMS 
const CloseTray= Loadable(lazy(() => import('./Issued-trays/close')))
const RpAuditRouters = [
    {
        path: '/rp-audit/issued-trays/close/:trayId',
        element: <CloseTray />,
    },
    {
        path: '/rp-audit/pending-items/start-rp-audit/:uic',
        element: <StartRpAudit />,
    },
    {
        path: '/rp-audit/pending-items',
        element: <PendingItems />,
    },
    {
        path: '/rp-audit/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/rp-audit/issued-trays',
        element: <IssuedTrayView />,
    },
]

export default RpAuditRouters
