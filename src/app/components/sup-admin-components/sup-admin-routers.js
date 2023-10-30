import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const ViewAllUsers = Loadable(lazy(() => import('./Manage-users/view-users')))
const ViewUserEditHistory = Loadable(
    lazy(() => import('./Manage-users/user-history'))
)
const ViewProducts = Loadable(
    lazy(() => import('./Manage-products/view-products'))
)
const MUIClist = Loadable(lazy(() => import('./Manage-products/muiclist')))
const Addparts = Loadable(lazy(() => import('./Manage-products/addparts')))
const Partsassociation = Loadable(
    lazy(() => import('./Manage-products/partsassociation'))
)

const BulkProducts = Loadable(
    lazy(() => import('./Manage-products/add-bulk-products'))
)
const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const Location = Loadable(lazy(() => import('./Manage-location/view-location')))
const Warehouse = Loadable(
    lazy(() => import('./Manage-warehouse/view-warehouse'))
)

const Vendors = Loadable(lazy(() => import('./Manage-vendors/view-vendors')))
const Categories = Loadable(lazy(() => import('./Manage-sp-categories/view-categories')))
const Trayrack = Loadable(lazy(() => import('./Manage-trayracks/view-trayracks')))
const Storage = Loadable(lazy(() => import('./Manage-storage/view-storage')))
const RAM = Loadable(lazy(() => import('./Manage-ram/view-ram')))
const Boxes = Loadable(lazy(() => import('./Manage-boxes/view-boxes')))
const Payments = Loadable(lazy(() => import('./Manage-payments/view-payments')))
const Warranty = Loadable(lazy(() => import('./Manage-warranty/view-warranty')))

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
const ReadyForRdl = Loadable(lazy(() => import('./Ready-for-rdl-1/wht-tray')))
const Categorys = Loadable(lazy(() => import('./tray-category/view-categorys')))
const ReadyToTransfer = Loadable(
    lazy(() => import('./Ready-for-transfer/ctx-tray'))
)
const PartList = Loadable(lazy(() => import('./Manage-part-list/temp-part')))
const Addmuic = Loadable(lazy(() => import('./Manage-part-list/addmuic')))

const Association = Loadable(
    lazy(() => import('./Manage-part-list/muic-association'))
)
// const MUIC_details =Loadable(lazy(()=>import('./Manage-part-list/muic-details')))
const Uploadspare = Loadable(
    lazy(() => import('./Manage-part-list/uploadspare'))
)
const Uploadspare1 = Loadable(
    lazy(() => import('./Manage-part-list/uploadspare1'))
)
const Validatespare = Loadable(
    lazy(() => import('./Manage-part-list/validatespare'))
)
const Sparereporting = Loadable(
    lazy(() => import('./Manage-part-list/sparereporting'))
)
const Spare1 = Loadable(
    lazy(() => import('./Manage-part-list/manageStockReport'))
)
const Managestock = Loadable(
    lazy(() => import('./Manage-part-list/managestock'))
)
const ColorList = Loadable(lazy(() => import('./Manage-color-list/temp-view')))
const BulkAddPart = Loadable(lazy(() => import('./Manage-part-list/bulk-add')))
// const MUICreporting=Loadable(lazy(()=>import('./Manage-part-list/muicreporting')))

const SuccessPageOfMuicAssosication = Loadable(
    lazy(() => import('./Manage-part-list/success-page-muic-ass'))
)
const ManageStockUpdateReport = Loadable(
    lazy(() => import('./Manage-part-list/manageStockReport'))
)
const ReassignToCharging = Loadable(
    lazy(() => import('./Tray-reassign/Assign-to-charging/view-wht-tray'))
)
const ReassignToBqc = Loadable(
    lazy(() => import('./Tray-reassign/Assign-to-bqc/view-wht-tray'))
)
const ReassignToAudit = Loadable(
    lazy(() => import('./Tray-reassign/Assign-to-audit/view-wht-tray'))
)
const ReassignToRdlFls = Loadable(
    lazy(() => import('./Tray-reassign/Assign-to-rdl-1/wht-tray'))
)
const ReassignToRdlRepair = Loadable(
    lazy(() => import('./Tray-reassign/Assign-to-rdl-2/wht-tray'))
)
const ReassignToReCharging = Loadable(
    lazy(() => import('./Tray-reassign/Assign-to-recharging/view-wht-tray'))
)
const ReassignTrayItemView = Loadable(
    lazy(() => import('./Tray-reassign/Assign-to-rdl-1/view-wht-tray'))
)
const ReassignMergeRequest = Loadable(
    lazy(() => import('./Tray-reassign/Tray-merge/tray'))
)
const AssignedBag = Loadable(
    lazy(() => import('./Bag-reassign/Assign-to-bot/view-bot-bag'))
)
const ReassignSortingCtxToStx = Loadable(
    lazy(() => import('./Tray-reassign/Ctx-to-stx/ctx-tray'))
)
const ReassignSortingBotToWht = Loadable(
    lazy(() => import('./Tray-reassign/Bot-wht-sort/tray'))
)
const UnverifiedImeiUpdation = Loadable(
    lazy(() => import('./Un-verified-imei-updation/units'))
)
const BuyerCreationPage = Loadable(
    lazy(() => import('./Manage-buyer/new-buyer'))
)
const SubMuicMaster = Loadable(
    lazy(() => import('./Sub-muic-master/sub-muic'))
)
const BqcSync = Loadable(
    lazy(() => import('./Bqc-sync/bqc-sync'))
)
const RemoveDupUicFromTray=Loadable(
    lazy(() => import('./Remove-duplicat-from-tray/remove-dup-from-tray'))
)
const SuperAdminRouter = [
    {
        path: '/sup-admin/buyer/create',
        element: <BuyerCreationPage />,
    },
    {
        path: '/sup-admin/remove-duplicate-uic',
        element: <RemoveDupUicFromTray />,
    },
    {
        path: '/sup-admin/bqc-sync',
        element: <BqcSync />,
    },
    {
        path: '/sup-admin/sub-muic',
        element: <SubMuicMaster />,
    },
    {
        path: '/sup-admin/unverified-imei-updation',
        element: <UnverifiedImeiUpdation />,
    },
    {
        path: '/sup-admin/users',
        element: <ViewAllUsers />,
    },
    {
        path: '/sup-admin/products',
        element: <ViewProducts />,
    },
    {
        path: '/sup-admin/products/muiclist/:muic',
        element: <MUIClist />,
    },
    {
        path: '/sup-admin/products/addparts',
        element: <Addparts />,
    },
    {
        path: '/sup-admin/view-part-list/addmuic/:partId',
        element: <Addmuic />,
    },

    {
        path: '/sup-admin/products/partsassociation/report',
        element: <Partsassociation />,
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
        path: '/sup-admin/view-vendors',
        element: <Vendors />,
    },
    {
        path: '/sup-admin/view-categories',
        element: <Categories />,
    },
    {
        path: '/sup-admin/view-trayracks',
        element: <Trayrack />,
    },
    {
        path: '/sup-admin/view-boxes',
        element: <Boxes />,
    },
    {
        path: '/sup-admin/view-payments',
        element: <Payments />,
    },
    {
        path: '/sup-admin/view-warranty',
        element: <Warranty />,
    },
    {
        path: '/sup-admin/view-storage',
        element: <Storage />,
    },
    {
        path: '/sup-admin/view-ram',
        element: <RAM />,
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
        path: '/sup-admin/remove-invalid-units-from-bag',
        element: <RemoveInvalidItem />,
    },
    {
        path: '/sup-admin/remove-invalid-units-from-bag/:bagId',
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
        path: '/sup-admin/view-part-list/muic-association/:partId',
        element: <Association />,
    },

    {
        path: '/sup-admin/view-list/uploadspare',
        element: <Uploadspare />,
    },
    {
        path: '/sup-admin/view-list/uploadspare1',
        element: <Uploadspare1 />,
    },
    {
        path: '/sup-admin/view-list/validatespare',
        element: <Validatespare />,
    },
    {
        path: '/sup-admin/view-list/sparereporting',
        element: <Sparereporting />,
    },
    // {
    //     path: '/sup-admin/view-list/muicreporting',
    //     element: <MUICreporting />,
    // },
    {
        path: '/sup-admin/view-list/sparereporting1',
        element: <Spare1 />,
    },
    {
        path: '/sup-admin/view-list/managestock',
        element: <Managestock />,
    },
    {
        path: '/sup-admin/view-color-list',
        element: <ColorList />,
    },
    {
        path: '/sup-admin/view-list/bulk-add',
        element: <BulkAddPart />,
    },
    {
        path: '/sup-admin/view-part-list/muic-association/success',
        element: <SuccessPageOfMuicAssosication />,
    },
    {
        path: '/sup-admin/view-part-list/managestock/report',
        element: <ManageStockUpdateReport />,
    },
    {
        path: '/sup-admin/tray-reassign/charging',
        element: <ReassignToCharging />,
    },
    {
        path: '/sup-admin/tray-reassign/bqc',
        element: <ReassignToBqc />,
    },
    {
        path: '/sup-admin/tray-reassign/audit',
        element: <ReassignToAudit />,
    },
    {
        path: '/sup-admin/tray-reassign/rdl-fls',
        element: <ReassignToRdlFls />,
    },
    {
        path: '/sup-admin/tray-reassign/rdl-repair',
        element: <ReassignToRdlRepair />,
    },
    {
        path: '/sup-admin/tray-reassign/recharging',
        element: <ReassignToReCharging />,
    },
    {
        path: '/sup-admin/tray-reassign/merge',
        element: <ReassignMergeRequest />,
    },
    {
        path: '/sup-admin/tray/item-view/:trayId',
        element: <ReassignTrayItemView />,
    },
    {
        path: '/sup-admin/bag-assinged/bag',
        element: <AssignedBag />,
    },
    {
        path: '/sup-admin/tray-reassign/sorting/ctx-stx',
        element: <ReassignSortingCtxToStx />,
    },
    {
        path: '/sup-admin/tray-reassign/sorting/bot-wht',
        element: <ReassignSortingBotToWht />,
    },
]

export default SuperAdminRouter
