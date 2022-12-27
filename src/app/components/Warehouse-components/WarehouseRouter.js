import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const BagScaning = Loadable(lazy(() => import('./Bag/bag-scan')))
const BagIssueRequest = Loadable(
    lazy(() => import('./Bag/bag-issue-request/bag-issue-request'))
)
const BagCloseRequests = Loadable(
    lazy(() => import('./Bag/bag-close-request/bag-close-requests'))
)
const PmtMmtTrayCloseRequest = Loadable(
    lazy(() => import('./Pmt-mmt/tray-close-request/tray-requests'))
)
const PmtMmtTrayIssued = Loadable(
    lazy(() => import('./Pmt-mmt/issued-pmt-mmt/issue-pmt-mmt'))
)
const BotToRelease = Loadable(
    lazy(() => import('./Bot/bot-to-release/bot-tray'))
)
const WhtTray = Loadable(
    lazy(() => import('./Wht/wht-tray/tray'))
)
const WhtInuse = Loadable(
    lazy(() => import('./Wht/In-use-wht/tray'))
)
const WhtInSorting = Loadable(
    lazy(() => import('./Wht/In-sorting/tray'))
)
const WhtChargingRequests = Loadable(
    lazy(() => import('./Wht/Charging-request/requests'))
)
const WhtInCharging = Loadable(
    lazy(() => import('./Wht/In-charging/tray'))
)
const WhtReturnFromCharging = Loadable(
    lazy(() => import('./Wht/Return-from-charging/tray'))
)
const WhtBqcRequests = Loadable(
    lazy(() => import('./Wht/Bqc-request/tray'))
)
const WhtReturnFromBqc = Loadable(
    lazy(() => import('./Wht/Return-from-bqc/tray'))
)
const SortingRequest=Loadable(lazy(()=>import("./Sorting/Sorting-requests/tray")))
const ReturnFromSorting=Loadable(lazy(()=>import("./Sorting/Return-from-sorting/tray")))
const MergeRequest =Loadable(lazy(()=>import("./Merge/Merge-request/tray")))
const ReturnFromMerge =Loadable(lazy(()=>import("./Merge/Return-from-merge/tray")))
const PmtReport =Loadable(lazy(()=>import("./Report/pmt-report")))
const MmtReport =Loadable(lazy(()=>import("./Report/pmt-report")))
const BotReport =Loadable(lazy(()=>import("./Report/Bot-report/tray")))




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
        path: '/wareshouse/bag/bag-close-requests',
        element: <BagCloseRequests />,
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
        path: '/wareshouse/bot/release',
        element: <BotToRelease />,
    },
    {
        path: '/wareshouse/wht/tray',
        element: <WhtTray />,
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
        path: '/wareshouse/wht/in-charging',
        element: <WhtInCharging />,
    },
    {
        path: '/wareshouse/wht/return-from-charging',
        element: <WhtReturnFromCharging />,
    },
    {
        path: '/wareshouse/wht/bqc-request',
        element: <WhtBqcRequests />,
    },
    {
        path: '/wareshouse/wht/return-from-bqc',
        element: <WhtReturnFromBqc />,
    },
    {
        path: '/wareshouse/sorting/request',
        element: <SortingRequest />,
    },
    {
        path: '/wareshouse/sorting/return-from-sorting',
        element: <ReturnFromSorting />,
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
        path: '/wareshouse/merge/request',
        element: <MergeRequest />,
    },
    {
        path: '/wareshouse/merge/return-from-merge',
        element: <ReturnFromMerge />,
    },

]


export default WarehoueRouter
