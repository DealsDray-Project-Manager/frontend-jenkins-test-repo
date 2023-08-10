import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const ViewPrice = Loadable(lazy(() => import('./view-price/price')))
const ViewUnitsForSales = Loadable(lazy(() => import('./view-price/view-units')))


const SalesRouter= [

    {
        path: '/sales/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/sales/ready-for-sales',
        element: <ViewPrice />,
    },
    {
        path: '/sales/ready-for-sales/view-units/:brand/:model/:grade/:date',
        element: <ViewUnitsForSales />,
    },
]

export default SalesRouter
