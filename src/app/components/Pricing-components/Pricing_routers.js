import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/Dashboard')))
const PricingPage = Loadable(lazy(() => import('./pricing-page/comb-brand-model')))


const pricingRouter= [
    {
        path: '/pricing/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/pricing/ready-for-pricing',
        element: <PricingPage />,
    },
]

export default pricingRouter
