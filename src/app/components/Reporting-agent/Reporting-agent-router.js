import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const DeliveredOrders = Loadable(lazy(() => import('./Order/delivered-orders')))
const NotDeliverdOrders = Loadable(
    lazy(() => import('./Order/not-delivered-orders'))
)

const ReportingRouter = [
    {
        path: '/reporting/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/reporting/not-delivered-orders',
        element: <NotDeliverdOrders />,
    },
    {
        path: '/reporting/delivered-orders',
        element: <DeliveredOrders />,
    },
]

export default ReportingRouter
