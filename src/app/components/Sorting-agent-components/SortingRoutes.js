import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const SortingRequest = Loadable(lazy(() => import('./Sorting-request/tray')))
const TrayMerge = Loadable(lazy(() => import('./Tray-merge/tray')))

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
        path: '/sorting/merge',
        element: <TrayMerge />,
    },
]

export default SortingRouter
