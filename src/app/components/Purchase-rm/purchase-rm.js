import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'


const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const Purchase = Loadable(lazy(() => import('./purchase/purchaseuser')))
const Order = Loadable(lazy(() => import('./purchase/order')))



const PurchaseUser=[
    {
        path: '/purchase-user/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/purchase-user/purchase',
        element: <Purchase />,
    },
    {
        path: '/purchase-user/purchase/order',
        element: <Order />,
    },
]


export default PurchaseUser