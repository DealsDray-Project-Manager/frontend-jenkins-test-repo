import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'


const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const Purchase = Loadable(lazy(() => import('./purchase/purchaseuser')))



const PurchaseUser=[
    {
        path: '/purchase-user/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/purchase-user/purchase',
        element: <Purchase />,
    },
]


export default PurchaseUser