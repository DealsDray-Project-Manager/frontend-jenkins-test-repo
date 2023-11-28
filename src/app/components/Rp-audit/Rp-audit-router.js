import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

/*--------------------------------------------------*/
// DASHBOARD
const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
// ISSUED TRAY VIEW PAGE 
const IssuedTrayView= Loadable(lazy(() => import('./Issued-trays/tray')))
const RpAuditRouters = [
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
