import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const SortingRequest = Loadable(lazy(() => import('./Sorting-request/tray')))
const StartSorting = Loadable(lazy(() => import('./Sorting-request/start-sorting')))
const TrayMerge = Loadable(lazy(() => import('./Tray-merge/tray')))
const StartTrayMerge = Loadable(lazy(() => import('./Tray-merge/start-merge')))
const PickupRequest =Loadable(lazy(() => import('./pickup/pickup-request')))

const SortingRouter= [
    {
        path: '/sorting/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/sorting/request',
        element: <SortingRequest />,
    },
    {
        path: '/sorting/request/start-sorting/:trayId',
        element: <StartSorting />,
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
]

export default SortingRouter
