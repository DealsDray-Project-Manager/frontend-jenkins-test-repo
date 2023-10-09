import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/Dashboard')))
const PricingPage = Loadable(lazy(() => import('./pricing-page/comb-brand-model')))
const ReadyForSale = Loadable(lazy(() => import('./Ready-for-sales/ready-for-sales')))
const MuicBasePricing = Loadable(lazy(() => import('./Muic-base-price/page')))
const MuicBaseReadyForSales = Loadable(lazy(() => import('./Ready-for-sales/muic-base-ready-for-sales')))


const pricingRouter= [
    {
        path: '/pricing/muic-base-ready-for-sales',
        element: <MuicBaseReadyForSales />,
    },
    {
        path: '/pricing/ready-for-sales',
        element: <ReadyForSale />,
    },
    {
        path: '/pricing/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/pricing/muic-base-ready-for-pricing',
        element: <MuicBasePricing />,
    },
    {
        path: '/pricing/ready-for-pricing',
        element: <PricingPage />,
    },
]

export default pricingRouter
