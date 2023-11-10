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
// START REBQC
const ReBqcPage= Loadable(lazy(() => import('./Issued-trays/re-bqc-start'))) 
const ReBqcRouters = [
    {
        path: '/rebqc/pending-items/start-rebqc/:model/:uic',
        element: <ReBqcPage />,
    },
    {
        path: '/rebqc/pending-items',
        element: <PendingItems />,
    },
    {
        path: '/rebqc/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/rebqc/issued-trays',
        element: <IssuedTrays />,
    },
    {
        path: '/rebqc/issued-trays/close/:trayId',
        element: <CloseTheTray />,
    },
]

export default ReBqcRouters
