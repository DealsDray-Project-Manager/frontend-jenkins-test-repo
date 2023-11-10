import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'
import Search from './Track-item/search-and-display/search'

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
    lazy(() => import('./Wht-tray/ready-for-rdl-1'))
)
const InMergingMmt = Loadable(lazy(() => import('./Mmt-tray/in-merging')))
const InMergingWht = Loadable(lazy(() => import('./Wht-tray/in-merging')))
const ChargingInProgress = Loadable(
    lazy(() => import('./Wht-tray/charge-in-progress'))
)
const BqcInprogress = Loadable(lazy(() => import('./Wht-tray/bqc-in-progress')))
const AuditInProgress = Loadable(
    lazy(() => import('./Wht-tray/audit-in-progress'))
)
const RdlFlsInprogress = Loadable(
    lazy(() => import('./Wht-tray/rdl-1-in-progress'))
)
const TrackItemDeliveryReport = Loadable(
    lazy(() => import('./Report/delivery-report'))
)
const WhtRecharging = Loadable(
    lazy(() => import('./Wht-tray/read-for-recharge'))
)
const WhtTrayItem = Loadable(lazy(() => import('./Tray-item-view/item')))
const ReportMonthWisePurchaise = Loadable(
    lazy(() => import('./Report/month-wise-purchaise'))
)
const CtxTrayTransferPendingToSales = Loadable(
    lazy(() => import('./Ctx/transfer-pending-to-sales'))
)
const CtxTransferToSaleProgress = Loadable(
    lazy(() => import('./Ctx/transfer-inprogress-to-sale'))
)
const RdlOneDoneUnitsTrack = Loadable(
    lazy(() => import('./Track-item/rdl-1-done-units'))
)
const TrackItemsEach = Loadable(
    lazy(() => import('./Track-item/search-and-display/search'))
)
const TrackTray = Loadable(lazy(() => import('./Track-tray/trayinformation')))
const UnVerifiedImeiReport = Loadable(lazy(() => import('./Unverified-imei-report/items')))
// RDL-2 OUT PUT 
const Rdl2Output = Loadable(lazy(() => import('./Report/Rdl-2-output/rdl-2-output')))
// PART INVENTORY LEDGER 
const PartInventoryLedger=Loadable(lazy(() => import('./Track-item/part-inventory-ledger/part-inventory-ledger')))

const ReportingRouter = [
    {
        path: '/reporting/inventory-ledger',
        element: <PartInventoryLedger />,
    },
    {
        path: '/reporting/rdl-2-output',
        element: <Rdl2Output />,
    },
    {
        path: '/reporting/unverified-imei',
        element: <UnVerifiedImeiReport />,
    },
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
        path: '/reporting/wht/ready-for-rdl-1',
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
        path: '/reporting/wht/in-rdl-1',
        element: <RdlFlsInprogress />,
    },
    {
        path: '/reporting/wht/in-rdl-1',
        element: <RdlFlsInprogress />,
    },
    {
        path: '/reporting/delivery/item',
        element: <TrackItemDeliveryReport />,
    },
    {
        path: '/reporting/wht/recharge',
        element: <WhtRecharging />,
    },
    {
        path: '/reporting/tray/item/:trayId',
        element: <WhtTrayItem />,
    },
    {
        path: '/reporting/month-wise-purchase-details',
        element: <ReportMonthWisePurchaise />,
    },
    {
        path: '/reporting/ctx/transfer-pending-to-sales',
        element: <CtxTrayTransferPendingToSales />,
    },
    {
        path: '/reporting/ctx/transfer-to-sales/in-progress',
        element: <CtxTransferToSaleProgress />,
    },
    {
        path: '/reporting/rdl-1-done-units',
        element: <RdlOneDoneUnitsTrack />,
    },
    {
        path: '/reporting/track-item',
        element: <TrackItemsEach />,
    },
    {
        path: '/reporting/track-tray',
        element: <TrackTray />,
    },
]

export default ReportingRouter
