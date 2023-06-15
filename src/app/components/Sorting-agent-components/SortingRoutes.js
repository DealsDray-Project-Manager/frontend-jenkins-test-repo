import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const SortingRequest = Loadable(lazy(() => import('./Sorting-request/tray')))
const Start = Loadable(lazy(() => import('./Sorting-request/start')))
const StartSorting = Loadable(
    lazy(() => import('./Sorting-request/start-sorting'))
)
const TrayMerge = Loadable(lazy(() => import('./Tray-merge/tray')))
const StartTrayMerge = Loadable(lazy(() => import('./Tray-merge/start-merge')))
const PickupRequest = Loadable(lazy(() => import('./pickup/pickup-request')))
const PickupRequestStartPage = Loadable(
    lazy(() => import('./pickup/start-pickup'))
)
const PickupToTray=Loadable(
    lazy(() => import('./pickup/to-tray'))
)
const PickupViewItem= Loadable(
    lazy(() => import('./pickup/view-item'))
)
const CtxtoStxSortingRequest= Loadable(
    lazy(() => import('./Sorting-request/ctx-to-stx/sort-request'))
)
const StartCtxToStx = Loadable(
    lazy(() => import('./Sorting-request/ctx-to-stx/start-sort'))
)

const SortingRouter = [
    {
        path: '/sorting/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/sorting/request',
        element: <SortingRequest />,
    },
    {
        path: '/sorting/ctx/request',
        element: <CtxtoStxSortingRequest />,
    },
    {
        path: '/sorting/ctx/request/start-sort/:trayId',
        element: <StartCtxToStx />,
    },
    {
        path: '/sorting/request/start-sorting/:trayId',
        element: <StartSorting />,
    },
    {
        path: '/sorting/request/start',
        element: <Start />,
    },
    {
        path: '/sorting/merge',
        element: <TrayMerge />,
    },
    {
        path: '/sorting/merge/start/:trayId',
        element: <StartTrayMerge />,
    },
    {
        path: '/sorting/pickup/request',
        element: <PickupRequest />,
    },
    {
        path: '/sorting/pickup/request/start/:trayId',
        element: <PickupRequestStartPage />,
    },
    {
        path: '/sorting/pickup/to-tray',
        element: <PickupToTray />,
    },
    {
        path: '/sorting/pickup/to-tray/view-item/:trayId',
        element: <PickupViewItem />,
    },
]

export default SortingRouter
