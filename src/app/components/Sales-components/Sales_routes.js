import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const ViewPrice = Loadable(lazy(() => import('./view-price/price-basis-of-sub-muic')))
const ViewUnitsForSales = Loadable(lazy(() => import('./view-price/view-units')))
const BuyerConnectedSales = Loadable(lazy(()=> import('./Buyer-con-sales/buyer-con-sales')))
const ReadyForSalesUnits = Loadable(lazy(()=> import('./ready-for-sales-units/sales-uints')))
const ViewPriceBasisOfMuic = Loadable(lazy(()=> import('./view-price/price-basis-muic')))


const SalesRouter= [
    {
        path: '/sales/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/sales/muic-basis-ready-for-sales',
        element: <ViewPriceBasisOfMuic />,
    },
    {
        path: '/sales/ready-for-sales',
        element: <ViewPrice />,
    },
    {
        path: '/sales/ready-for-sales/view-units/:brand/:model/:grade/:date',
        element: <ViewUnitsForSales />,
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
