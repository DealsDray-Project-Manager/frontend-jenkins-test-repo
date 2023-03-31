import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const DeliveredOrders = Loadable(lazy(() => import('./Order/delivered-orders')))
const NotDeliverdOrders = Loadable(
    lazy(() => import('./Order/not-delivered-orders'))
)
const AllOrders = Loadable(lazy(() => import('./Order/all-orders')))
const ProcessingUnits = Loadable(
    lazy(() => import('./Delivery/processing-units'))
)
const ReadyForSalesUnits = Loadable(
    lazy(() => import('./Delivery/ready-for-sale'))
)
const ClosedBag = Loadable(
    lazy(() => import('./Bags/closed-bags'))
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
    {
        path: '/reporting/all-orders',
        element: <AllOrders />,
    },
    {
        path: '/reporting/units/processing',
        element: <ProcessingUnits />,
    },
    {
        path: '/reporting/units/ready-for-sales',
        element: <ReadyForSalesUnits />,
    },
    {
        path: '/reporting/bags/closed',
        element: <ClosedBag />,
    },
]

export default ReportingRouter
