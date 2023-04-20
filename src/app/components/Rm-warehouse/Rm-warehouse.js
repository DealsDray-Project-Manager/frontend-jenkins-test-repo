import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const PartList = Loadable(lazy(() => import('./Part-list/view-part')))
const ColorList = Loadable(lazy(() => import('./Color-list/view-color')))

const RmWarehouse = [
    {
        path: '/rm-warehouse/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/rm-warehouse/part-list',
        element: <PartList />,
    },
    {
        path: '/rm-warehouse/color-list',
        element: <ColorList />,
    },
]

export default RmWarehouse
