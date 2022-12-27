import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const ViewAllUsers = Loadable(lazy(() => import('./Manage-users/view-users')))
const ViewProducts = Loadable(
    lazy(() => import('./Manage-products/view-products'))
)
const BulkProducts = Loadable(
    lazy(() => import('./Manage-products/add-bulk-products'))
)
const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const Location = Loadable(lazy(() => import('./Manage-location/view-location')))
const Warehouse = Loadable(
    lazy(() => import('./Manage-warehouse/view-warehouse'))
)
const Brands = Loadable(lazy(() => import('./Manage-brands/view-brands')))
const BulkBrand = Loadable(lazy(() => import('./Manage-brands/bulk-add-brand')))
const Bag = Loadable(lazy(() => import('./Manage-bag/view-bag')))
const BulkBag = Loadable(lazy(() => import('./Manage-bag/add-bulk-bag')))
const Tray = Loadable(lazy(() => import('./Manage-tray/view-tray')))
const BulkTray = Loadable(lazy(() => import('./Manage-tray/add-bulk-tray')))
const ReadyForCharging = Loadable(
    lazy(() => import('./Ready-for-charging/view-wht-tray'))
)
const RemoveInvalidItem = Loadable(
    lazy(() => import('./Remove-invalid-item-from-bag/bag'))
)
const TrackItem = Loadable(lazy(() => import('./Track-item/track-item')))
const SuperAdminRouter = [
    {
        path: '/sup-admin/users',
        element: <ViewAllUsers />,
    },
    {
        path: '/sup-admin/products',
        element: <ViewProducts />,
    },
    {
        path: '/sup-admin/products/bulk-product',
        element: <BulkProducts />,
    },
    {
        path: '/sup-admin/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/sup-admin/location',
        element: <Location />,
    },
    {
        path: '/sup-admin/warehouse',
        element: <Warehouse />,
    },
    {
        path: '/sup-admin/brands',
        element: <Brands />,
    },
    {
        path: '/sup-admin/brands/bulk-brand',
        element: <BulkBrand />,
    },
    {
        path: '/sup-admin/bag',
        element: <Bag />,
    },
    {
        path: '/sup-admin/bag/add-bulk-bag',
        element: <BulkBag />,
    },
    {
        path: '/sup-admin/tray/bulk-tray',
        element: <BulkTray />,
    },
    {
        path: '/sup-admin/tray',
        element: <Tray />,
    },
    {
        path: '/sup-admin/ready-for-charging',
        element: <ReadyForCharging />,
    },
    {
        path: '/sup-admin/remove-invalid-item',
        element: <RemoveInvalidItem />,
    },
    {
        path: '/sup-admin/track-item',
        element: <TrackItem />,
    },
]

export default SuperAdminRouter
