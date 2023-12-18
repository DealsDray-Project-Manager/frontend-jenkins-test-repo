import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

/*--------------------------------------------------*/
// DASHBOARD
const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
// ISSUED TRAYS
const IssuedTrays= Loadable(lazy(() => import('./Issued-trays/issued-trays')))
// CLOSE THE TRAY
const CloseTheTray = Loadable(lazy(() => import('./Issued-trays/close')))
// PENDING ITEMS
const PendingItems= Loadable(lazy(() => import('./Issued-trays/pending-items'))) 
// START RP-BQC
const RpBqcPage= Loadable(lazy(() => import('./Issued-trays/rp-bqc-start'))) 
const RpBqcRouters = [
    {
        path: '/rp-bqc/pending-items/start-rp-bqc/:uic',
        element: <RpBqcPage />,
    },
    {
        path: '/rp-bqc/pending-items',
        element: <PendingItems />,
    },
    {
        path: '/rp-bqc/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/rp-bqc/issued-trays',
        element: <IssuedTrays />,
    },
    {
        path: '/rp-bqc/issued-trays/close/:trayId',
        element: <CloseTheTray />,
    },
]

export default RpBqcRouters
