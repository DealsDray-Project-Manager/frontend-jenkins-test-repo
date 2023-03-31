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
const ClosedBag = Loadable(lazy(() => import('./Bags/closed-bags')))
const BotTraySortingPending = Loadable(
    lazy(() => import('./Bot-tray/sorting-pending'))
)
const MmtTray = Loadable(lazy(() => import('./Mmt-tray/tray')))
const PmtTray = Loadable(lazy(() => import('./Pmt-tray/tray')))
const InuseWhtTray = Loadable(lazy(() => import('./Wht-tray/in-use-tray')))
const WhtReadyForMerge = Loadable(
    lazy(() => import('./Wht-tray/ready-for-merge'))
)
const ReadyForCharging = Loadable(
    lazy(() => import('./Wht-tray/ready-for-charge'))
)
const ReadyToBqc = Loadable(lazy(() => import('./Wht-tray/ready-for-bqc')))
const ReadyToAudit = Loadable(lazy(() => import('./Wht-tray/ready-for-audit')))
const ReadyToRdlFls = Loadable(
    lazy(() => import('./Wht-tray/ready-for-rdl-fls'))
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
    {
        path: '/reporting/bot-tray/sorting-pending',
        element: <BotTraySortingPending />,
    },
    {
        path: '/reporting/mmt-tray',
        element: <MmtTray />,
    },
    {
        path: '/reporting/pmt-tray',
        element: <PmtTray />,
    },
    {
        path: '/reporting/wht/inuse',
        element: <InuseWhtTray />,
    },
    {
        path: '/reporting/wht/ready-for-merge',
        element: <WhtReadyForMerge />,
    },
    {
        path: '/reporting/wht/ready-for-charge',
        element: <ReadyForCharging />,
    },
    {
        path: '/reporting/wht/ready-for-bqc',
        element: <ReadyToBqc />,
    },
    {
        path: '/reporting/wht/ready-for-audit',
        element: <ReadyToAudit />,
    },
    {
        path: '/reporting/wht/ready-for-rdl-fls',
        element: <ReadyToRdlFls />,
    },
]

export default ReportingRouter
