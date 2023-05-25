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
        path: '/rm-user/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/rm-user/part-list',
        element: <PartList />,
    },
    {
        path: '/rm-user/product-list',
        element: <ProductMaster />,
    },
    {
        path: '/rm-user/view-list/bulk-add',
        element: <BulkAddPart />,
    },
    {
        path: '/rm-user/view-list/managestock',
        element: <Managestock />,
    },
    {
        path: '/rm-user/view-list/sparereporting',
        element: <Sparereporting />,
    },
    {
        path: '/rm-user/view-part-list/managestock/report',
        element: <ManageStockUpdateReport />,
    },
    {
        path: '/rm-user/view-part-list/muic-association/:partId',
        element: <Association />,
    },
    {
        path: '/rm-user/view-part-list/muic-association/success',
        element: <SuccessPageOfMuicAssosication />,
    },
    {
        path: '/rm-user/products/bulk-product',
        element: <BulkProducts />,
    },
    {
        path: '/rm-user/products/muiclist/:muic',
        element: <MUIClist />,
    },
    {
        path: '/rm-user/upcoming-repair-tray',
        element: <UpcomingRepairTray />,
    },
    {
        path: '/rm-user/products/addparts',
        element: <Addparts />,
    },
    {
        path: '/rm-user/upcoming-repair-tray/units/:trayId',
        element: <ViewRequirementOfPart />,
    },
    {
        path: '/rm-user/rdl-2-issue-request',
        element: <IssueRequesToRdl2 />,
    },
    {
        path: '/rm-user/products/partsassociation/report',
        element: <Partsassociation />,
    },
]

export default RmWarehouse
