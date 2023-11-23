import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'


const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const Procurement = Loadable(lazy(() => import('./procurement/sp_procurement')))
const Procurementlist = Loadable(lazy(() => import('./procurement/procurementlist')))
const Request = Loadable(lazy(() => import('./procurement/request')))
// ISSUE TOOLS AND CONSUMABLES PAGE
const IssueConsumablesAndTools =Loadable(lazy(()=> import("./Issue-tools-and-consumables/page-for-issue")))


const Spmis=[
    {
        path: '/sp-mis/tools-and-consumable/issue',
        element: <IssueConsumablesAndTools />,
    },
    {
        path: '/sp-mis/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/sp-mis/procurement',
        element: <Procurement />,
    },
    {
        path: '/sp-mis/procurement/procurementlist/:brand/:model',
        element: <Procurementlist />,
    },
    {
        path: '/sp-mis/procurement/procurementlist/request/:brand/:model',
        element: <Request />,
    },
]


export default Spmis