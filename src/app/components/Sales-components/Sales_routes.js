import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))


const SalesRouter= [

    {
        path: '/sales/dashboard',
        element: <Dashboard />,
    },
]

export default SalesRouter
