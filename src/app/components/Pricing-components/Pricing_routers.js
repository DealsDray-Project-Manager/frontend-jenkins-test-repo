import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/Dashboard')))
const PricingPage = Loadable(lazy(() => import('./pricing-page/comb-brand-model')))
const ReadyForSale = Loadable(lazy(() => import('./Ready-for-sales/ready-for-sales')))


const pricingRouter= [
    {
        path: '/pricing/ready-for-sales',
        element: <ReadyForSale />,
    },
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
