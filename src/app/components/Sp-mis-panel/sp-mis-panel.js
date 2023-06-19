import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'


const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const Procurement = Loadable(lazy(() => import('./procurement/sp_procurement')))
const Procurementlist = Loadable(lazy(() => import('./procurement/procurementlist')))
const Request = Loadable(lazy(() => import('./procurement/request')))



const Spmis=[
    {
        path: '/sp-mis/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/sp-mis/procurement',
        element: <Procurement />,
    },
    {
        path: '/sp-mis/procurement/procurementlist',
        element: <Procurementlist />,
    },
    {
        path: '/sp-mis/procurement/procurementlist/request',
        element: <Request />,
    },
]


export default Spmis