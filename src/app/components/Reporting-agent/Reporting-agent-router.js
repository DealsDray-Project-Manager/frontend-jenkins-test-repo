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
const InMergingMmt = Loadable(
    lazy(() => import('./Mmt-tray/in-merging'))
)
const InMergingWht = Loadable(
    lazy(() => import('./Wht-tray/in-merging'))
)
const ChargingInProgress = Loadable(
    lazy(() => import('./Wht-tray/charge-in-progress'))
)
const BqcInprogress = Loadable(
    lazy(() => import('./Wht-tray/bqc-in-progress'))
)
const AuditInProgress = Loadable(
    lazy(() => import('./Wht-tray/audit-in-progress'))
)
const RdlFlsInprogress = Loadable(
    lazy(() => import('./Wht-tray/rdl-fls-in-progress'))
)
const TrackItemDeliveryReport = Loadable(
    lazy(() => import('./Track-item/delivery'))
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
    {
        path: '/reporting/mmt/in-merging',
        element: <InMergingMmt />,
    },
    {
        path: '/reporting/wht/in-merging',
        element: <InMergingWht />,
    },
    {
        path: '/reporting/wht/in-charging',
        element: <ChargingInProgress />,
    },
    {
        path: '/reporting/wht/in-bqc',
        element: <BqcInprogress />,
    },
    {
        path: '/reporting/wht/in-audit',
        element: <AuditInProgress />,
    },
    {
        path: '/reporting/wht/in-rdl-fls',
        element: <RdlFlsInprogress />,
    },
    {
        path: '/reporting/wht/in-rdl-fls',
        element: <RdlFlsInprogress />,
    },
    {
        path: '/reporting/delivery/item',
        element: <TrackItemDeliveryReport />,
    },
]

export default ReportingRouter
