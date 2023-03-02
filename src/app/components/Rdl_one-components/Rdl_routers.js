import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
// const Tray = Loadable(lazy(() => import('./Tray/tray')))
// const TraySegregation = Loadable(lazy(() => import('./Tray/item-segrgation')))
const TrayRDL_one = Loadable(lazy(() => import('./Tray/rdl_one-request')))
const TrayRDL_oneApprove = Loadable(lazy(() => import('./Tray/approve')))



const BqcRouter= [

    {
        path: '/RDL_one/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/RDL_one/tray',
        element: <TrayRDL_one />,
    },
    {
        path: '/RDL_one/tray/approve/:trayId',
        element: <TrayRDL_oneApprove />,
    },
   
]

export default BqcRouter
