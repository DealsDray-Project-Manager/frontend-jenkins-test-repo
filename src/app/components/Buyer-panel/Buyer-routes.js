import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))


const Buyer = [
    {
        path: '/buyer/dashboard',
        element: <Dashboard />,
    }, 
]

export default Buyer
