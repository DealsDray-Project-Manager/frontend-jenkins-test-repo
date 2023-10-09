import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const BagScaning = Loadable(lazy(() => import('./Bag/scan')))

const baggingUserRouter = [
    {
        path: '/bagging/bag/scan',
        element: <BagScaning />,
    },
    {
        path: '/bagging/dashboard',
        element: <Dashboard />,
    },
]

export default baggingUserRouter
