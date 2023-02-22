import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const BagScaning = Loadable(lazy(() => import('./Bag/bag-scan')))
const BagIssueRequest = Loadable(
    lazy(() => import('./Bag/bag-issue-request/bag-issue-request'))
)
const BagIssueRequestApprove = Loadable(
    lazy(() => import('./Bag/bag-issue-request/ex-vs-act'))
)
const BagCloseRequests = Loadable(
    lazy(() => import('./Bag/bag-close-request/bag-close-requests'))
)
const BotDoneCloseTray = Loadable(
    lazy(() => import('./Bag/bag-close-request/close'))
)
const BagCloseRequestsSummery = Loadable(
    lazy(() => import('./Bag/bag-close-request/summer'))
)
const BagCloseRequestsViewItem = Loadable(
    lazy(() => import('./Bag/bag-close-request/view-tray-item'))
)
const PmtMmtTrayCloseRequest = Loadable(
    lazy(() => import('./Pmt-mmt/tray-close-request/tray-requests'))
)
const PmtMmtTrayIssued = Loadable(
    lazy(() => import('./Pmt-mmt/issued-pmt-mmt/issue-pmt-mmt'))
)
const PmtMmtTrayIssuedViewItem = Loadable(
    lazy(() => import('./Pmt-mmt/issued-pmt-mmt/view-item'))
)
const BotToRelease = Loadable(
    lazy(() => import('./Bot/bot-to-release/bot-tray'))
)
const BotToReleaseViewItem = Loadable(
    lazy(() => import('./Bot/bot-to-release/view-tray-item'))
)
const WhtTray = Loadable(lazy(() => import('./Wht/wht-tray/tray')))
const WhtTrayItem = Loadable(lazy(() => import('./Wht/wht-tray/wht-tray-item')))
const WhtInuse = Loadable(lazy(() => import('./Wht/In-use-wht/tray')))
const WhtInSorting = Loadable(lazy(() => import('./Wht/In-sorting/tray')))
const WhtChargingRequests = Loadable(
    lazy(() => import('./Wht/Charging-request/requests'))
)
const WhtChargingRequestApprove = Loadable(
    lazy(() => import('./Wht/Charging-request/approve'))
)

const WhtInCharging = Loadable(lazy(() => import('./Wht/In-charging/tray')))
const WhtReturnFromCharging = Loadable(
    lazy(() => import('./Wht/Return-from-charging/tray'))
)
const WhtReturnFromChargingClose = Loadable(
    lazy(() => import('./Wht/Return-from-charging/close'))
)
const WhtReturnFromChargingViewItem = Loadable(
    lazy(() => import('./Wht/Return-from-charging/view-item'))
)
const WhtBqcRequests = Loadable(lazy(() => import('./Wht/Bqc-request/tray')))
const WhtBqcRequestsApprove = Loadable(
    lazy(() => import('./Wht/Bqc-request/approve'))
)

const WhtReturnFromBqc = Loadable(
    lazy(() => import('./Wht/Return-from-bqc/tray'))
)
const WhtReturnFromBqcViewItem = Loadable(
    lazy(() => import('./Wht/Return-from-bqc/view-item'))
)
const WhtReturnFromBqcClose = Loadable(
    lazy(() => import('./Wht/Return-from-bqc/close'))
)
const SortingRequest = Loadable(
    lazy(() => import('./Sorting/Sorting-requests/tray'))
)
const SortingRequestDtaildView = Loadable(
    lazy(() => import('./Sorting/Sorting-requests/detailed-view'))
)
const SortingRequestExvsAct = Loadable(
    lazy(() => import('./Sorting/Sorting-requests/ex-vs-act'))
)

const ReturnFromSorting = Loadable(
    lazy(() => import('./Sorting/Return-from-sorting/tray'))
)
const ReturnFromSortingClose = Loadable(
    lazy(() => import('./Sorting/Return-from-sorting/close'))
)
const MergeRequest = Loadable(lazy(() => import('./Merge/Merge-request/tray')))
const MergeRequestApprove = Loadable(
    lazy(() => import('./Merge/Merge-request/approve-request'))
)

const ReturnFromMerge = Loadable(
    lazy(() => import('./Merge/Return-from-merge/tray'))
)
const ReturnFromMergeClose = Loadable(
    lazy(() => import('./Merge/Return-from-merge/close'))
)
const PmtReport = Loadable(lazy(() => import('./Report/pmt-report')))
const MmtReport = Loadable(lazy(() => import('./Report/mmt-report')))
const BotReport = Loadable(lazy(() => import('./Report/Bot-report/tray')))
const BotReportSkuSum = Loadable(
    lazy(() => import('./Report/Bot-report/sku-summery'))
)
const BotReportSkuSumView = Loadable(
    lazy(() => import('./Report/Bot-report/from-sku-summery-view-item'))
)

const AuditRequest = Loadable(lazy(() => import('./Wht/Audit-request/tray')))
const AuditRequestApprove = Loadable(
    lazy(() => import('./Wht/Audit-request/request-approve'))
)
const ReturnFromAuditeWhtRelease = Loadable(
    lazy(() => import('./Wht/Return-from-audit/wht-tray-release'))
)
const OtherTrayReturnFromAudit = Loadable(
    lazy(() => import('./Wht/Return-from-audit/other-tray-return-from-audit'))
)
const OtherTrayReturnFromAuditViewItem = Loadable(
    lazy(() => import('./Wht/Return-from-audit/handel-view-tray-item'))
)

const ReadyForAudit = Loadable(
    lazy(() => import('./Wht/Ready-for-audit/wht-tray-view'))
)

const ReadyForAuditAction = Loadable(
    lazy(() => import('./Wht/Ready-for-audit/action'))
)
const SalesBinItem = Loadable(lazy(() => import('./Report/sales-bin')))
const OtherTrayReturnFromAuditClose = Loadable(
    lazy(() => import('./Wht/Return-from-audit/close-tray'))
)
const CtxTray =Loadable(lazy(()=> import('./Ctx-tray/ctx-tray-view/tray')))
const CtxTrayItem =Loadable(lazy(()=>import('./Ctx-tray/ctx-tray-view/view-item')))
const PickupRequest =Loadable(lazy(()=>import('./Merge/pickup-request/wht-tray')))
const PickupRequestApprove =Loadable(lazy(()=>import('./Merge/pickup-request/approve')))
const WarehoueRouter = [
    {
        path: '/warehouse/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/wareshouse/bag/scan',
        element: <BagScaning />,
    },
    {
        path: '/wareshouse/bag/bag-issue-request',
        element: <BagIssueRequest />,
    },
    {
        path: '/wareshouse/bag/bag-issue-request/approve/:bagId',
        element: <BagIssueRequestApprove />,
    },
    {
        path: '/wareshouse/bag/bag-close-requests',
        element: <BagCloseRequests />,
    },
    {
        path: '/wareshouse/bag/bag-close-requests/summery/:bagId',
        element: <BagCloseRequestsSummery />,
    },
    {
        path: '/wareshouse/tray/item/:trayId',
        element: <BagCloseRequestsViewItem />,
    },
    {
        path: '/wareshouse/bot-done/tray-close/:trayId',
        element: <BotDoneCloseTray />,
    },
    {
        path: '/wareshouse/pmt-mmt/tray-close-request',
        element: <PmtMmtTrayCloseRequest />,
    },
    {
        path: '/wareshouse/pmt-mmt/issued',
        element: <PmtMmtTrayIssued />,
    },
    {
        path: '/wareshouse/pmt-mmt/issued/view-item/:trayId',
        element: <PmtMmtTrayIssuedViewItem />,
    },
    {
        path: '/wareshouse/bot/release',
        element: <BotToRelease />,
    },
    {
        path: '/wareshouse/bot/release/view-item/:trayId',
        element: <BotToReleaseViewItem />,
    },
    {
        path: '/wareshouse/wht/tray',
        element: <WhtTray />,
    },
    {
        path: '/wareshouse/wht/tray/item/:trayId',
        element: <WhtTrayItem />,
    },
    {
        path: '/wareshouse/wht/in-use',
        element: <WhtInuse />,
    },
    {
        path: '/wareshouse/wht/in-sorting',
        element: <WhtInSorting />,
    },
    {
        path: '/wareshouse/wht/charging-request',
        element: <WhtChargingRequests />,
    },
    {
        path: '/wareshouse/wht/charging-request/approve/:trayId',
        element: <WhtChargingRequestApprove />,
    },
    {
        path: '/wareshouse/wht/in-charging',
        element: <WhtInCharging />,
    },
    {
        path: '/wareshouse/wht/return-from-charging',
        element: <WhtReturnFromCharging />,
    },
    {
        path: '/wareshouse/wht/return-from-charging/view-item/:trayId',
        element: <WhtReturnFromChargingViewItem />,
    },
    {
        path: '/wareshouse/wht/return-from-charging/close/:trayId',
        element: <WhtReturnFromChargingClose />,
    },
    {
        path: '/wareshouse/wht/bqc-request',
        element: <WhtBqcRequests />,
    },
    {
        path: '/wareshouse/wht/bqc-request/approve/:trayId',
        element: <WhtBqcRequestsApprove />,
    },
    {
        path: '/wareshouse/wht/return-from-bqc',
        element: <WhtReturnFromBqc />,
    },
    {
        path: '/wareshouse/wht/return-from-bqc/view-item/:trayId',
        element: <WhtReturnFromBqcViewItem />,
    },
    {
        path: '/wareshouse/wht/return-from-bqc/close/:trayId',
        element: <WhtReturnFromBqcClose />,
    },
    {
        path: '/wareshouse/wht/ready-for-audit',
        element: <ReadyForAudit />,
    },
    {
        path: '/wareshouse/wht/ready-for-audit/view/:trayId',
        element: <ReadyForAuditAction />,
    },
    {
        path: '/wareshouse/sorting/request',
        element: <SortingRequest />,
    },
    {
        path: '/wareshouse/sorting/request/approve/:trayId',
        element: <SortingRequestDtaildView />,
    },
    {
        path: '/wareshouse/request/approve/item-verifiying/:trayId',
        element: <SortingRequestExvsAct />,
    },
    {
        path: '/wareshouse/sorting/return-from-sorting',
        element: <ReturnFromSorting />,
    },
    {
        path: '/wareshouse/sorting/return-from-sorting/close/:trayId',
        element: <ReturnFromSortingClose />,
    },
    {
        path: '/wareshouse/report/pmt',
        element: <PmtReport />,
    },
    {
        path: '/wareshouse/report/mmt',
        element: <MmtReport />,
    },
    {
        path: '/wareshouse/report/bot',
        element: <BotReport />,
    },
    {
        path: '/wareshouse/report/sales-bin',
        element: <SalesBinItem />,
    },
    {
        path: '/wareshouse/report/bot/sku-summery/:trayId',
        element: <BotReportSkuSum />,
    },
    {
        path: '/wareshouse/report/bot/sku-summery/details/:trayId/:muic',
        element: <BotReportSkuSumView />,
    },
    {
        path: '/wareshouse/merge/request',
        element: <MergeRequest />,
    },
    {
        path: '/wareshouse/merge/request/approve/:mmtTrayId',
        element: <MergeRequestApprove />,
    },
    {
        path: '/wareshouse/merge/return-from-merge',
        element: <ReturnFromMerge />,
    },
    {
        path: '/wareshouse/merge/return-from-merge/close/:trayId',
        element: <ReturnFromMergeClose />,
    },
    {
        path: '/wareshouse/wht/audit-request',
        element: <AuditRequest />,
    },
    {
        path: '/wareshouse/wht/audit-request/approve/:trayId',
        element: <AuditRequestApprove />,
    },
    {
        path: '/wareshouse/wht/wht-release',
        element: <ReturnFromAuditeWhtRelease />,
    },
    {
        path: '/wareshouse/wht/return-from-audit',
        element: <OtherTrayReturnFromAudit />,
    },
    {
        path: '/wareshouse/wht/return-from-audit/tray-items/:trayId',
        element: <OtherTrayReturnFromAuditViewItem />,
    },

    {
        path: '/wareshouse/wht/return-from-audit/close/:trayId',
        element: <OtherTrayReturnFromAuditClose />,
    },
    {
        path: '/wareshouse/ctx/all',
        element: <CtxTray />,
    },
    {
        path: '/wareshouse/ctx/view-item/:trayId',
        element: <CtxTrayItem />,
    },
    {
        path: '/wareshouse/wht/pickup/request',
        element: <PickupRequest />,
    },
    {
        path: '/wareshouse/wht/pickup/request/approve/:trayId',
        element: <PickupRequestApprove />,
    },
]

export default WarehoueRouter
