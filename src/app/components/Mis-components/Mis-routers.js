import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const Orders = Loadable(lazy(() => import('./Order/order')))
const BulkImportOrder = Loadable(
    lazy(() => import('./Order/bulk-import-order'))
)
const BadOrders = Loadable(lazy(() => import('./Order/view-bad-order')))
const Delivery = Loadable(lazy(() => import('./Delivery/delivery')))
const BulkImportDelivery = Loadable(
    lazy(() => import('./Delivery/bulk-import-delivery'))
)
const BadDelivery = Loadable(lazy(() => import('./Delivery/badDelivery')))
const ReconDeliveredOrders = Loadable(
    lazy(() => import('./Recon-sheet/delivered-orders'))
)
const ReconNotDeliveredOrders = Loadable(
    lazy(() => import('./Recon-sheet/not-delivered-orders'))
)
const AssignToBot = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-bot/view-bot-tray'))
)
const AssignToBotUicGen = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-bot/uic-gen'))
)
const AssignToBqc = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-bqc/bqcplanner'))
)
const AssignToAudit = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-audit/view-wht-tray'))
)
const AssignToCharging = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-charging/chargingplanner'))
)
const FromChargingplanner = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-charging/view-wht-tray'))
)
const Frombqcplanner = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-bqc/view-wht-tray'))
)
const AssignToRdl = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-rdl-1/wht-tray'))
)
const AssignToRdltrayView = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-rdl-1/view-wht-tray'))
)
const AssignToRdltwo = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-rdl-2/tray'))
)
const AssignToRdltwoview = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-rdl-2/view-wht-tray'))
)
const UicAll = Loadable(lazy(() => import('./Uic-manage/all')))
const UicDownloaded = Loadable(
    lazy(() => import('./Uic-manage/uic-downloaded'))
)
const UicGenerated = Loadable(lazy(() => import('./Uic-manage/uic-generated')))
const UicNotGenerated = Loadable(
    lazy(() => import('./Uic-manage/uic-not-generated'))
)
const SortingBotTowht = Loadable(
    lazy(() => import('./Sorting/Bot-to-wht/bot-tray'))
)
const SortingWhtTorp = Loadable(
    lazy(() => import('./Sorting/Wht-to-rp/wht-tray'))
)
const Process = Loadable(lazy(() => import('./Sorting/Wht-to-rp/process')))
const SortingBotTowhtViewItem = Loadable(
    lazy(() => import('./Sorting/Bot-to-wht/view-clubed-item'))
)
const SortingBotTowhtAssignSectionToAgent = Loadable(
    lazy(() => import('./Sorting/Bot-to-wht/assign-for-sorting'))
)
const SortingBotTowhtAssign = Loadable(
    lazy(() => import('./Sorting/Bot-to-wht/wht-assignment'))
)
const MergeMmt = Loadable(lazy(() => import('./Merge/Mmt-merge/mmt-tray')))
const MergeMmtViewItem = Loadable(
    lazy(() => import('./Merge/Mmt-merge/view-item'))
)
const MergeWht = Loadable(lazy(() => import('./Merge/Wht-merge/wht-tray')))
const TrackItem = Loadable(lazy(() => import('./Track/item-track')))
const SearchImei = Loadable(lazy(() => import('./Wht-utility/search')))
const Pickup = Loadable(lazy(() => import('./Merge/Pickup/pickup')))
const WhtutilityBotTray = Loadable(lazy(() => import('./Wht-utility/bot-tray')))
const WhtUtilityBotTrayResticker = Loadable(
    lazy(() => import('./Wht-utility/bot-tray-resticker'))
)
const WhtUtilityBotTrayClose = Loadable(
    lazy(() => import('./Wht-utility/bot-tray-close'))
)
const CtxMerge = Loadable(lazy(() => import('./Merge/Ctx-merge/ctx-tray')))
const CtxTrayTransfer = Loadable(
    lazy(() => import('./ctx-tray/Transfer/ctx-tray'))
)
const CtxTrayReceiveFromProcessing = Loadable(
    lazy(() => import('./ctx-tray/Receive/request'))
)
const CtxToStxAssignToSorting = Loadable(
    lazy(() => import('./Sorting/Ctx-to-stx/ctx-tray'))
)
const StxMerging = Loadable(lazy(() => import('./Merge/Stx-merging/tray')))
const BilledBin = Loadable(lazy(() => import('./BilledBin/items')))
const BilledBinReport = Loadable(lazy(() => import('./Report/billed-bin')))
const ViewRpTray = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-rdl-2/view-rp'))
)
const ViewSpTray = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-to-rdl-2/view-sp'))
)
const StxUtilityPage = Loadable(lazy(() => import('./Stx-utility/scan-uic')))
const StxUtilityInprogressTray = Loadable(
    lazy(() => import('./Stx-utility/tray'))
)
const StxTrayUtilityInProgressClose = Loadable(
    lazy(() => import('./Stx-utility/close'))
)
const RackChangeAssignement = Loadable(lazy(() => import('./Rack-change/tray')))
const RackRequestCreated = Loadable(
    lazy(() => import('./Rack-change/rack-change-request-created/tray'))
)
const BagTransffer = Loadable(
    lazy(() => import('./bag-transffer/bag-send/bag-send'))
)
const AssignForDisplayGrading = Loadable(
    lazy(() => import('./Assign-to-agent/Assign-for-display-grading/tray'))
)
const WhtToRpPartsNotAvailable = Loadable(
    lazy(() => import('./Sorting/Wht-to-rp/Parts-not-available/brand-model'))
)
const WhtToRpPartsNotAvailableViewSp = Loadable(
    lazy(() => import('./Sorting/Wht-to-rp/Parts-not-available/view-sp'))
)
const WhtToRpRepairWithoutSpCompBrandAndModel = Loadable(
    lazy(() =>
        import('./Sorting/Wht-to-rp/Repair-without-part/comp-brand-model')
    )
)
const WhtToRpRepairWithoutSpCompBrandAndModelProcess = Loadable(
    lazy(() => import('./Sorting/Wht-to-rp/Repair-without-part/process'))
)
const StxToStxUtilityScanUic = Loadable(
    lazy(() => import('./Stx-utility/stx-to-stx-utility'))
)
const BagTransfferReceive= Loadable(
    lazy(() => import('./bag-transffer/bag-receive/bag-receive'))
)
// RPA TO STX SORTING ASSIGNMENT PAGE
const RpaToStxSortingAssignment =  Loadable(
    lazy(() => import('./Sorting/Rpa-stx/rpa-stx'))
)
// NOT REPAIRABLE UNITS REPORT 
const DeviceNotRepairableUnitReport = Loadable(
    lazy(() => import('./Report/Rdl-2-device-not-repairable/rdl-2-device-not-repairable'))
)
// SALES MIS STOCK REPORT SUB-MUIC
const SalesMisStockReport = Loadable(
    lazy(() => import('./Report/Sales-stock-report/stock-report'))
)
const SalesMisStockReportViewUic = Loadable(
    lazy(() => import('./Report/Sales-stock-report/view-uic'))
)
// SALES MIS STOCK REPORT MUIC
const SalesMisStockReportWithMuic = Loadable(
    lazy(() => import('./Report/Sales-stock-report/Sales-stock-with-muic/stock-report-muic'))
)
const SalesMisStockReportViewUicMuicBase = Loadable(
    lazy(() => import('./Report/Sales-stock-report/Sales-stock-with-muic/view-uic-with-muic'))
)

const dataTableRoutes = [
    {
        path: '/mis/report/sales-stock-with-muic/view-uic/:itemId',
        element: <SalesMisStockReportViewUicMuicBase />,
    },
    {
        path: '/mis/report/sales-stock-with-muic',
        element: <SalesMisStockReportWithMuic />,
    },
    {
        path: '/mis/report/sales-stock/view-uic/:subMuic',
        element: <SalesMisStockReportViewUic />,
    },
    {
        path: '/mis/report/sales-stock',
        element: <SalesMisStockReport />,
    },
    {
        path: '/mis/report/not-repairable',
        element: <DeviceNotRepairableUnitReport />,
    },
    {
        path: '/mis/rpa-to-stx',
        element: <RpaToStxSortingAssignment />,
    },
    {
        path: '/mis/stx-to-stx-utility',
        element: <StxToStxUtilityScanUic />,
    },
    {
        path: '/mis/sorting/wht-to-rp-without-sp/process/:brand/:model',
        element: <WhtToRpRepairWithoutSpCompBrandAndModelProcess />,
    },
    {
        path: '/mis/sorting/wht-to-rp-without-sp',
        element: <WhtToRpRepairWithoutSpCompBrandAndModel />,
    },
    {
        path: '/mis/sorting/wht-to-rp-parts-not-available/view-sp/:brand/:model',
        element: <WhtToRpPartsNotAvailableViewSp />,
    },
    {
        path: '/mis/sorting/wht-to-rp-parts-not-available',
        element: <WhtToRpPartsNotAvailable />,
    },
    {
        path: '/mis/assign-to-agent-for-display-grading',
        element: <AssignForDisplayGrading />,
    },
    {
        path: '/mis/bag-transfer',
        element: <BagTransffer />,
    },
    {
        path: '/mis/bag-receive',
        element: <BagTransfferReceive />,
    },
    {
        path: '/mis/rack-change-request',
        element: <RackRequestCreated />,
    },
    {
        path: '/mis/rack-change',
        element: <RackChangeAssignement />,
    },
    {
        path: '/mis/stx-utility/tray-view/close/:trayId',
        element: <StxTrayUtilityInProgressClose />,
    },
    {
        path: '/mis/stx-utility-tray-view',
        element: <StxUtilityInprogressTray />,
    },
    {
        path: '/mis/stx-utility',
        element: <StxUtilityPage />,
    },
    {
        path: '/mis/assign-to-agent/rdl-2/view-rp/:trayId',
        element: <ViewRpTray />,
    },
    {
        path: '/mis/assign-to-agent/rdl-2/view-sp/:trayId',
        element: <ViewSpTray />,
    },
    {
        path: '/mis/dashboard',
        element: <Dashboard />,
    },

    {
        path: '/mis/orders',
        element: <Orders />,
    },
    {
        path: '/mis/uic-manage/all',
        element: <UicAll />,
    },
    {
        path: '/mis/bad-orders',
        element: <BadOrders />,
    },
    {
        path: '/mis/delivery',
        element: <Delivery />,
    },
    {
        path: '/mis/bad-delivery',
        element: <BadDelivery />,
    },
    {
        path: '/mis/recon-sheet/delivered-orders',
        element: <ReconDeliveredOrders />,
    },
    {
        path: '/mis/recon-sheet/not-delivered-orders',
        element: <ReconNotDeliveredOrders />,
    },
    {
        path: '/mis/uic-manage/uic-downloaded',
        element: <UicDownloaded />,
    },
    {
        path: '/mis/uic-manage/uic-generated',
        element: <UicGenerated />,
    },
    {
        path: '/mis/uic-manage/uic-not-generated',
        element: <UicNotGenerated />,
    },
    {
        path: '/mis/assign-to-agent/bot',
        element: <AssignToBot />,
    },
    {
        path: '/mis/assign-to-agent/bot/uic-genaration/:bagId',
        element: <AssignToBotUicGen />,
    },
    {
        path: '/mis/assign-to-agent/bqc',
        element: <Frombqcplanner />,
    },
    {
        path: '/mis/assign-to-agent/bqcplanner/view-wht-tray/:brand/:model/:jack',
        element: <Frombqcplanner />,
    },
    {
        path: '/mis/assign-to-agent/charging',
        element: <FromChargingplanner />,
    },
    {
        path: '/mis/assign-to-agent/chargingplanner/view-wht-tray/:brand/:model/:jack',
        element: <FromChargingplanner />,
    },
    {
        path: '/mis/assign-to-agent/audit',
        element: <AssignToAudit />,
    },
    {
        path: '/mis/assign-to-agent/rdl-1',
        element: <AssignToRdl />,
    },
    {
        path: '/mis/assign-to-agent/rdl-1/view-item/:trayId',
        element: <AssignToRdltrayView />,
    },
    {
        path: '/mis/assign-to-agent/rdl-2',
        element: <AssignToRdltwo />,
    },
    {
        path: '/mis/assign-to-agent/rdl-2/view-item/:trayId',
        element: <AssignToRdltwoview />,
    },
    {
        path: '/mis/sorting/bot-to-wht',
        element: <SortingBotTowht />,
    },
    {
        path: '/mis/sorting/wht-to-rp',
        element: <SortingWhtTorp />,
    },
    {
        path: '/mis/sorting/wht-to-rp/process/:brand/:model',
        element: <Process />,
    },
    {
        path: '/mis/sorting/ctx-to-stx',
        element: <CtxToStxAssignToSorting />,
    },
    {
        path: '/mis/sorting/bot-to-wht/assign-for-sorting',
        element: <SortingBotTowhtAssignSectionToAgent />,
    },
    {
        path: '/mis/sorting/bot-to-wht/assign-for-sorting/view-item',
        element: <SortingBotTowhtViewItem />,
    },
    {
        path: '/mis/sorting/bot-to-wht/wht-assignment',
        element: <SortingBotTowhtAssign />,
    },
    {
        path: '/mis/merge/mmt',
        element: <MergeMmt />,
    },
    {
        path: '/mis/merge/pickup',
        element: <Pickup />,
    },
    {
        path: '/mis/merge/mmt/view-item/:trayId',
        element: <MergeMmtViewItem />,
    },
    {
        path: '/mis/merge/wht',
        element: <MergeWht />,
    },
    {
        path: '/mis/merge/ctx',
        element: <CtxMerge />,
    },
    {
        path: '/mis/merge/stx',
        element: <StxMerging />,
    },
    {
        path: '/mis/orders/bulk-import',
        element: <BulkImportOrder />,
    },
    {
        path: '/mis/delivery/bulk-import',
        element: <BulkImportDelivery />,
    },
    {
        path: '/mis/track/item',
        element: <TrackItem />,
    },
    {
        path: '/mis/tray-transfer',
        element: <CtxTrayTransfer />,
    },
    {
        path: '/mis/ctx/receive',
        element: <CtxTrayReceiveFromProcessing />,
    },
    {
        path: '/warehouse/wht-utility/import-data',
        element: <SearchImei />,
    },
    {
        path: '/warehouse/wht-utility/Bot-tray',
        element: <WhtutilityBotTray />,
    },
    {
        path: '/warehouse/wht-utility/Bot-tray/resticker/:trayId',
        element: <WhtUtilityBotTrayResticker />,
    },
    {
        path: '/warehouse/wht-utility/Bot-tray/close/:trayId',
        element: <WhtUtilityBotTrayClose />,
    },
    {
        path: '/mis/billedbin',
        element: <BilledBin />,
    },
    {
        path: '/mis/report/billedBin',
        element: <BilledBinReport />,
    },
]

export default dataTableRoutes
