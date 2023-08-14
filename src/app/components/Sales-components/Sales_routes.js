import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const ViewPrice = Loadable(lazy(() => import('./view-price/price')))
const BuyerConnectedSales = Loadable(lazy(()=> import('./Buyer-con-sales/buyer-con-sales')))
const ReadyForSalesUnits = Loadable(lazy(()=> import('./ready-for-sales-units/sales-uints')))
const SalesRouter= [
    {
        path: '/sales/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/sales/view-price',
        element: <ViewPrice />,
    },
    {
        path:'/sales/Buyer-con-sales/',
        element:<BuyerConnectedSales/>,
    },
    {
        path:'/sales/ready-for-sales-units',
        element:<ReadyForSalesUnits/>,
    }
]

export default SalesRouter
