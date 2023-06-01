import React, { lazy } from 'react'
import Loadable from '../Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const PartList = Loadable(lazy(() => import('./Manage-part-list/view-part')))
const BulkAddPart = Loadable(lazy(() => import('./Manage-part-list/bulk-add')))
const Managestock = Loadable(
    lazy(() => import('./Manage-part-list/managestock'))
)
const ProductMaster = Loadable(
    lazy(() => import('./Manage-products/view-products'))
)
const Sparereporting = Loadable(
    lazy(() => import('./Manage-part-list/sparereporting'))
)
const ManageStockUpdateReport = Loadable(
    lazy(() => import('./Manage-part-list/manageStockReport'))
)
const Association = Loadable(
    lazy(() => import('./Manage-part-list/muic-association'))
)
const Addmuicrm = Loadable(
    lazy(() => import('./Manage-part-list/addmuicrm'))
)
const SuccessPageOfMuicAssosication = Loadable(
    lazy(() => import('./Manage-part-list/success-page-muic-ass'))
)
const Partsassociation = Loadable(
    lazy(() => import('./Manage-products/partsassociation'))
)
const BulkProducts = Loadable(
    lazy(() => import('./Manage-products/add-bulk-products'))
)
const MUIClist = Loadable(lazy(() => import('./Manage-products/muiclist')))
const Addparts = Loadable(lazy(() => import('./Manage-products/addparts')))
const UpcomingRepairTray = Loadable(lazy(() => import('./Upcoming-repair/wht-tray')))
const ViewRequirementOfPart = Loadable(lazy(() => import('./Upcoming-repair/view-wht-tray')))
const IssueRequesToRdl2 = Loadable(lazy(() => import('./Rdl-2-Issue-Request/tray')))


const RmWarehouse = [
    {
        path: '/sp-user/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/sp-user/part-list',
        element: <PartList />,
    },
    {
        path: '/sp-user/product-list',
        element: <ProductMaster />,
    },
    {
        path: '/sp-user/view-list/bulk-add',
        element: <BulkAddPart />,
    },
    {
        path: '/sp-user/view-list/managestock',
        element: <Managestock />,
    },
    {
        path: '/sp-user/view-list/sparereporting',
        element: <Sparereporting />,
    },
    {
        path: '/sp-user/view-part-list/addmuic/:partId',
        element: <Addmuicrm />,
    },
    {
        path: '/sp-user/view-part-list/managestock/report',
        element: <ManageStockUpdateReport />,
    },
    {
        path: '/sp-user/view-part-list/muic-association/:partId',
        element: <Association />,
    },
    {
        path: '/sp-user/view-part-list/muic-association/success',
        element: <SuccessPageOfMuicAssosication />,
    },
    {
        path: '/sp-user/products/bulk-product',
        element: <BulkProducts />,
    },
    {
        path: '/sp-user/products/muiclist/:muic',
        element: <MUIClist />,
    },
    {
        path: '/sp-user/upcoming-repair-tray',
        element: <UpcomingRepairTray />,
    },
    {
        path: '/sp-user/products/addparts',
        element: <Addparts />,
    },
    {
        path: '/sp-user/upcoming-repair-tray/units/:trayId',
        element: <ViewRequirementOfPart />,
    },
    {
        path: '/sp-user/rdl-2-issue-request',
        element: <IssueRequesToRdl2 />,
    },
    {
        path: '/sp-user/products/partsassociation/report',
        element: <Partsassociation />,
    },
]

export default RmWarehouse
