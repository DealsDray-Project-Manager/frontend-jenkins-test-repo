import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const ViewAllUsers = Loadable(lazy(() => import('./Manage-users/view-users')))
const ViewUserEditHistory = Loadable(
    lazy(() => import('./Manage-users/user-history'))
)
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
const AuditBag = Loadable(lazy(() => import('./Manage-bag/bag-audit')))
const BulkBag = Loadable(lazy(() => import('./Manage-bag/add-bulk-bag')))
const Tray = Loadable(lazy(() => import('./Manage-tray/view-tray')))
const TrayAudit = Loadable(lazy(() => import('./Manage-tray/tray-audit')))
const TrayEditHistory = Loadable(lazy(() => import('./Manage-tray/history')))

const BulkTray = Loadable(lazy(() => import('./Manage-tray/add-bulk-tray')))
const ReadyForCharging = Loadable(
    lazy(() => import('./Ready-for-charging/view-wht-tray'))
)
const ReadyForChargingViewItem = Loadable(
    lazy(() => import('./Ready-for-charging/view-item'))
)
const ReadyForChargingBqc = Loadable(
    lazy(() => import('./Ready-for-charging/bqc-tray'))
)
const RemoveInvalidItem = Loadable(
    lazy(() => import('./Remove-invalid-item-from-bag/bag'))
)
const RemoveInvalidItemView = Loadable(
    lazy(() => import('./Remove-invalid-item-from-bag/view-item'))
)
const TrackItem = Loadable(lazy(() => import('./Track-item/track-item')))
const BqcReport = Loadable(lazy(() => import('./Manage-bqc-report/search')))
const ReadyForRdl = Loadable(lazy(() => import('./Ready-for-rdl/wht-tray')))
const Categorys = Loadable(lazy(() => import('./tray-category/view-categorys')))
const ReadyToTransfer =Loadable(lazy(() => import('./Ready-for-transfer/ctx-tray')))
const PartList  =Loadable(lazy(() => import('./Manage-part-list/temp-part')))
const ColorList =Loadable(lazy(() => import('./Manage-color-list/temp-view')))
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
        path: '/sup-admin/Category',
        element: <Categorys />,
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
        path: '/sup-admin/bag/audit/:bagId',
        element: <AuditBag />,
    },
    {
        path: '/sup-admin/bag/add-bulk-bag',
        element: <BulkBag />,
    },
    {
        path: '/sup-admin/tray/add-bulk-tray',
        element: <BulkTray />,
    },
    {
        path: '/sup-admin/tray',
        element: <Tray />,
    },
    {
        path: '/sup-admin/tray/audit/:trayId',
        element: <TrayAudit />,
    },
    {
        path: '/sup-admin/tray/edit-history/:trayId',
        element: <TrayEditHistory />,
    },
    {
        path: '/sup-admin/ready-for-charging/in-use-wht',
        element: <ReadyForCharging />,
    },
    {
        path: '/sup-admin/ready-for-charging/bqc-tray',
        element: <ReadyForChargingBqc />,
    },
    {
        path: '/sup-admin/wht/view-item/:trayId',
        element: <ReadyForChargingViewItem />,
    },
    {
        path: '/sup-admin/remove-invalid-item',
        element: <RemoveInvalidItem />,
    },
    {
        path: '/sup-admin/remove-invalid-item/:bagId',
        element: <RemoveInvalidItemView />,
    },
    {
        path: '/sup-admin/track-item',
        element: <TrackItem />,
    },
    {
        path: '/sup-admin/user-history/:username',
        element: <ViewUserEditHistory />,
    },
    {
        path: '/sup-admin/bqc/report',
        element: <BqcReport />,
    },
    {
        path: '/sup-admin/ready-for-rdl',
        element: <ReadyForRdl />,
    },
    {
        path: '/sup-admin/ready-for-transfer',
        element: <ReadyToTransfer />,
    },
    {
        path: '/sup-admin/view-part-list',
        element: <PartList />,
    },
    {
        path: '/sup-admin/view-color-list',
        element: <ColorList />,
    },
]

export default SuperAdminRouter
