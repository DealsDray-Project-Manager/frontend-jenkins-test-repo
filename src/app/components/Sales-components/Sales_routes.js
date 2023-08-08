import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const ViewPrice = Loadable(lazy(() => import('./view-price/price')))


const SalesRouter= [

    {
        path: '/sales/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/sales/view-price',
        element: <ViewPrice />,
    },
]

export default SalesRouter
