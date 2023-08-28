import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dahsboard/dashboard')))
const Purchase = Loadable(lazy(() => import('./purchase/purchaseuser')))
const Order = Loadable(lazy(() => import('./purchase/order')))
const OrderDetails = Loadable(lazy(() => import('./order-details/orderd-data')))
const OrderSummary = Loadable(lazy(() => import('./Order-summary/summary')))

const PurchaseUser = [
    {
        path: '/purchase-user/order-summary',
        element: <OrderSummary />,
    },
    {
        path: '/purchase-user/order-details',
        element: <OrderDetails />,
    },
    {
        path: '/purchase-user/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/purchase-user/purchase',
        element: <Purchase />,
    },
    {
        path: '/purchase-user/purchase/order/:spnNumber/:muic',
        element: <Order />,
    },
]

export default PurchaseUser
