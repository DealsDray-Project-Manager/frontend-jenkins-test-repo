import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const Dashboard = Loadable(lazy(() => import('./Dashboard/dashboard')))
const BagIssueRequest = Loadable(
    lazy(() => import('./Bag/bag-issue-request/bag-issue-request'))
)
const BagIssueRequestApprove = Loadable(
    lazy(() => import('./Bag/bag-issue-request/ex-vs-act'))
)
const BagCloseRequests = Loadable(
    lazy(() => import('./Bag/bag-close-request/bag-close-requests'))
)
const BotDoneCloseTray = Loadable(
    lazy(() => import('./Bag/bag-close-request/close'))
)
const BagCloseRequestsSummary = Loadable(
    lazy(() => import('./Bag/bag-close-request/summer'))
)
const BagCloseRequestsViewItem = Loadable(
    lazy(() => import('./Bag/bag-close-request/view-tray-item'))
)
const PmtMmtTrayCloseRequest = Loadable(
    lazy(() => import('./Pmt-mmt/tray-close-request/tray-requests'))
)
const PmtMmtTrayIssued = Loadable(
    lazy(() => import('./Pmt-mmt/issued-pmt-mmt/issue-pmt-mmt'))
)
const PmtMmtTrayIssuedViewItem = Loadable(
    lazy(() => import('./Pmt-mmt/issued-pmt-mmt/view-item'))
)
const BotToRelease = Loadable(
    lazy(() => import('./Bot/bot-to-release/bot-tray'))
)
const BotToReleaseViewItem = Loadable(
    lazy(() => import('./Bot/bot-to-release/view-tray-item'))
)
const WhtTray = Loadable(lazy(() => import('./Wht/wht-tray/tray')))
const WhtTrayItem = Loadable(lazy(() => import('./Wht/wht-tray/wht-tray-item')))
const WhtInuse = Loadable(lazy(() => import('./Wht/In-use-wht/tray')))
const WhtInSorting = Loadable(lazy(() => import('./Wht/In-sorting/tray')))
const WhtChargingRequests = Loadable(
    lazy(() => import('./Wht/Charging-request/requests'))
)
const WhtChargingRequestApprove = Loadable(
    lazy(() => import('./Wht/Charging-request/approve'))
)

const WhtInCharging = Loadable(lazy(() => import('./Wht/In-charging/tray')))
const WhtReturnFromCharging = Loadable(
    lazy(() => import('./Wht/Return-from-charging/tray'))
)
const WhtReturnFromChargingClose = Loadable(
    lazy(() => import('./Wht/Return-from-charging/close'))
)
const WhtReturnFromChargingViewItem = Loadable(
    lazy(() => import('./Wht/Return-from-charging/view-item'))
)
const WhtBqcRequests = Loadable(lazy(() => import('./Wht/Bqc-request/tray')))
const WhtBqcRequestsApprove = Loadable(
    lazy(() => import('./Wht/Bqc-request/approve'))
)

const WhtReturnFromBqc = Loadable(
    lazy(() => import('./Wht/Return-from-bqc/tray'))
)
const WhtReturnFromBqcViewItem = Loadable(
    lazy(() => import('./Wht/Return-from-bqc/view-item'))
)
const WhtReturnFromBqcClose = Loadable(
    lazy(() => import('./Wht/Return-from-bqc/close'))
)
const SortingRequest = Loadable(
    lazy(() => import('./Sorting/Sorting-requests/tray'))
)
const SortingRequestDtaildView = Loadable(
    lazy(() => import('./Sorting/Sorting-requests/detailed-view'))
)
const SortingRequestExvsAct = Loadable(
    lazy(() => import('./Sorting/Sorting-requests/ex-vs-act'))
)

const ReturnFromSorting = Loadable(
    lazy(() => import('./Sorting/Return-from-sorting/tray'))
)

const ReturnFromSortingClose = Loadable(
    lazy(() => import('./Sorting/Return-from-sorting/close'))
)
const MergeRequest = Loadable(lazy(() => import('./Merge/Merge-request/tray')))
const MergeRequestApprove = Loadable(
    lazy(() => import('./Merge/Merge-request/approve-request'))
)

const ReturnFromMerge = Loadable(
    lazy(() => import('./Merge/Return-from-merge/tray'))
)
const ReturnFromMergeClose = Loadable(
    lazy(() => import('./Merge/Return-from-merge/close'))
)
const PmtReport = Loadable(lazy(() => import('./Report/pmt-report')))
const MmtReport = Loadable(lazy(() => import('./Report/mmt-report')))
const BotReport = Loadable(lazy(() => import('./Report/Bot-report/tray')))
const BotReportSkuSum = Loadable(
    lazy(() => import('./Report/Bot-report/sku-summery'))
)
const BotReportSkuSumView = Loadable(
    lazy(() => import('./Report/Bot-report/from-sku-summery-view-item'))
)

const AuditRequest = Loadable(lazy(() => import('./Wht/Audit-request/tray')))
const AuditRequestApprove = Loadable(
    lazy(() => import('./Wht/Audit-request/request-approve'))
)
const ReturnFromAuditeWhtRelease = Loadable(
    lazy(() => import('./Wht/Return-from-audit/wht-tray-release'))
)
const OtherTrayReturnFromAudit = Loadable(
    lazy(() => import('./Wht/Return-from-audit/other-tray-return-from-audit'))
)
const OtherTrayReturnFromAuditViewItem = Loadable(
    lazy(() => import('./Wht/Return-from-audit/handel-view-tray-item'))
)

const ReadyForAudit = Loadable(
    lazy(() => import('./Wht/Ready-for-audit/wht-tray-view'))
)

const ReadyForAuditAction = Loadable(
    lazy(() => import('./Wht/Ready-for-audit/action'))
)
const ReadyForRDL = Loadable(lazy(() => import('./Wht/Rdl-1-request/tray')))

const ReadyForRDLApprove = Loadable(
    lazy(() => import('./Wht/Rdl-1-request/approve'))
)

const ReturnFormRDL = Loadable(
    lazy(() => import('./Wht/Return-from-rdl-1/tray'))
)

const ReturnFormRDLClose = Loadable(
    lazy(() => import('./Wht/Return-from-rdl-1/close'))
)

const ReturnFormRDLviewitems = Loadable(
    lazy(() => import('./Wht/Return-from-rdl-1/view'))
)

const SalesBinItem = Loadable(lazy(() => import('./Report/sales-bin')))
const OtherTrayReturnFromAuditClose = Loadable(
    lazy(() => import('./Wht/Return-from-audit/close-tray'))
)
const CtxTray = Loadable(lazy(() => import('./Ctx-tray/ctx-tray-view/tray')))
const CtxTrayItem = Loadable(
    lazy(() => import('./Ctx-tray/ctx-tray-view/view-item'))
)
const PickupRequest = Loadable(
    lazy(() => import('./Merge/pickup-request/wht-tray'))
)
const PickupRequestApprove = Loadable(
    lazy(() => import('./Merge/pickup-request/approve'))
)
const PickupRequestApproveExvsActPage = Loadable(
    lazy(() => import('./Merge/pickup-request/ex-vs-act'))
)
const PickupDoneClosedBySorting = Loadable(
    lazy(() => import('./Merge/return-from-pickup/return-from-pickup'))
)
const PickupDoneClose = Loadable(
    lazy(() => import('./Merge/return-from-pickup/close'))
)
const CtxTransferRequest = Loadable(
    lazy(() => import('./Ctx-tray/Transfer-ctx-request/request'))
)
const ReturnFromAuditItemView = Loadable(
    lazy(() => import('./Wht/Return-from-audit/view-item-ctx'))
)
const CtxTransferApprove = Loadable(
    lazy(() => import('./Ctx-tray/Transfer-ctx-request/approve'))
)
const CtxTrayReceiveFromProcessing = Loadable(
    lazy(() => import('./Ctx-tray/ctx-receive/request'))
)
const CtxTrayReceiveApprove = Loadable(
    lazy(() => import('./Ctx-tray/ctx-receive/approve'))
)
const SortingCtxToStxRequest = Loadable(
    lazy(() => import('./Sorting/sorting-request-ctx/request'))
)
const SortingCtxFromAndToviewAndIssue = Loadable(
    lazy(() => import('./Sorting/sorting-request-ctx/approve'))
)
const SortingDoneCtxtoStxTray = Loadable(
    lazy(() => import('./Sorting/Return-from-sorting-ctx/tray'))
)
const SortingDoneCtxOrStxTrayClose = Loadable(
    lazy(() => import('./Sorting/Return-from-sorting-ctx/close'))
)

const WhttoRpRequests = Loadable(
    lazy(() => import('./Sorting/wht-to-rp/Requests/requests'))
)
const WhtToRpScanEach = Loadable(
    lazy(() => import('./Sorting/wht-to-rp/Requests/scan-each-tray'))
)
const WhtToRpScanActVsExt = Loadable(
    lazy(() => import('./Sorting/wht-to-rp/Requests/act-ext'))
)
const AllStxTray = Loadable(lazy(() => import('./Stx-tray/Stx/tray')))
const RDL2Request = Loadable(lazy(() => import('./Rp-tray/Rdl-2-Request/tray')))
const RDL2RequestApprove = Loadable(
    lazy(() => import('./Rp-tray/Rdl-2-Request/approve'))
)
const BilledBin = Loadable(
    lazy(() => import('../Mis-components/BilledBin/items'))
)
const ReturnFromWhtToRp = Loadable(
    lazy(() => import('./Sorting/wht-to-rp/Return-from-sorting/tray'))
)
const ReturnFromWhtToRpClose = Loadable(
    lazy(() => import('./Sorting/wht-to-rp/Return-from-sorting/close'))
)
const AllRptTray = Loadable(lazy(() => import('./Rp-tray/all-rp-tray/tray')))
const ReturnFromRdlTwo = Loadable(
    lazy(() => import('./Rp-tray/return-from-rdl-2/returned-tray'))
)
const ReturnFromRdlTwoClosePage = Loadable(
    lazy(() => import('./Rp-tray/return-from-rdl-2/close'))
)
const UpgradeUnitsReport = Loadable(
    lazy(() => import('./Report/Upgrade-units/units'))
)
const RackChangeClose = Loadable(
    lazy(() => import('./Wht/wht-tray/rack_change'))
)
const AllBotTray = Loadable(
    lazy(() => import('./Bot/bot-to-release/All-bot-tray/tray'))
)
const AllPmtTray = Loadable(lazy(() => import('./Pmt-mmt/All-pmt/tray')))
const AllMmtTray = Loadable(lazy(() => import('./Pmt-mmt/All-mmt/tray')))
const RackChangeScanOut = Loadable(lazy(() => import('./Rack-change/scan-out')))
const RackChangeScanIn = Loadable(lazy(() => import('./Rack-change/scan-in')))
const  CopyGradingAssignRequest = Loadable(lazy(() => import('./Stx-tray/Copy-display-grading-request/requests')))
const  DisplayGradingRequestApprove = Loadable(lazy(() => import('./Stx-tray/Copy-display-grading-request/approve')))
const  RetunrFromCopyGrading = Loadable(lazy(() => import('./Stx-tray/Return-from-display-grading/tray')))
const  ReturnFromDisplayGradingClose = Loadable(lazy(() => import('./Stx-tray/Return-from-display-grading/close')))
// RPA TRAY ALL
const GetRpaTrayAll= Loadable(lazy(() => import('./Rpa-rpb-trays/all-rpa/tray')))
// RETURN FROM RPBQC 
const ReturnFromRpaAndRpbTrays =Loadable(lazy(() => import('./Rpa-rpb-trays/return-from-rp-audit/return-from-rpaudit')))
// RBQC TRAY ALL
const GetRpbTrayAll= Loadable(lazy(() => import('./Rpa-rpb-trays/all-rpb/rpb-tray')))
// CLOSE TRAY RPA OR RPB
const CloseRpaOrRpb=Loadable(lazy(() => import('./Rpa-rpb-trays/return-from-rp-audit/close')))
// RPA TO STX  sorting ASSIGNED REQUESTS
const RpatoStxSortingAssigned=Loadable(lazy(() => import('./Sorting/Rpa-to-stx/requests')))
// START WORK RPA TO STX
const StartWorkRpaToStx=Loadable(lazy(() => import('./Sorting/Rpa-to-stx/start')))
// VIEW RPA TO STX TRAY RPA to STX Work In Progress
const RpaToStxWorkInProgressTrays=Loadable(lazy(() => import('./Sorting/Rpa-to-stx/rpa-to-stx-work-tray')))
// CAN BIN REPORT TRAY 
const CanBinTray =Loadable(lazy(() => import('./Rp-tray/Can-bin/can-bin-tray')))
// CAN BIN START 
const CanBinStartPage=Loadable(lazy(() => import('./Rp-tray/Can-bin/start')))
// CAN BIN REPORT 
const CanBinReport =Loadable(lazy(() => import('./Report/can-bin')))
const RpaToStxInprogressTrayClose=Loadable(lazy(() => import('./Sorting/Rpa-to-stx/close')))
const StxTrayViewUnits=Loadable(lazy(() => import('./Stx-tray/Stx/view-units')))

const WarehoueRouter = [
    {
        path: '/warehouse/stx/view-units/:trayId',
        element: <StxTrayViewUnits />,
    },
    {
        path: '/warehouse/rpa-to-stx-work-in-progess-trays-view/close/:trayId',
        element: <RpaToStxInprogressTrayClose />,
    },
    {
        path: '/warehouse/rpt/report/can-bin',
        element: <CanBinReport />,
    },
    {
        path: '/warehouse/can-bin/start/:trayId',
        element: <CanBinStartPage />,
    },
    {
        path: '/warehouse/can-bin',
        element: <CanBinTray />,
    },
    {
        path: '/warehouse/rpa-to-stx-work-in-progess-trays-view',
        element: <RpaToStxWorkInProgressTrays />,
    },
    {
        path: '/warehouse/rpa-to-stx/assigned-trays/start/:trayId',
        element: <StartWorkRpaToStx />,
    },
    {
        path: '/warehouse/rpa-to-stx/assigned-trays',
        element: <RpatoStxSortingAssigned />,
    },
    {
        path: '/warehouse/rpa-rpb-tray-issue-or-return/close/:trayId',
        element: <CloseRpaOrRpb />,
    },
    {
        path: '/warehouse/rpa-rpb-tray-issue-or-return',
        element: <ReturnFromRpaAndRpbTrays />,
    },
    {
        path: '/warehouse/rpb-trays',
        element: <GetRpbTrayAll />,
    },
    {
        path: '/warehouse/rpa-trays',
        element: <GetRpaTrayAll />,
    },
    {
        path: '/warehouse/stx/return-from-display-grading/close/:trayId',
        element: <ReturnFromDisplayGradingClose />,
    },
    {
        path: '/warehouse/stx/return-from-display-grading',
        element: <RetunrFromCopyGrading />,
    },
    {
        path: '/warehouse/stx/display-grading-issue-requests/approve/:trayId',
        element: <DisplayGradingRequestApprove />,
    },
    {
        path: '/warehouse/stx/display-grading-issue-requests',
        element: <CopyGradingAssignRequest />,
    },
    
    {
        path: '/warehouse/rack-change/scan-in',
        element: <RackChangeScanIn />,
    },
    {
        path: '/warehouse/rack-change/scan-out',
        element: <RackChangeScanOut />,
    },
    {
        path: '/warehouse/all-mmt-tray',
        element: <AllMmtTray />,
    },
    {
        path: '/warehouse/all-pmt-tray',
        element: <AllPmtTray />,
    },
    {
        path: '/warehouse/tray/rack-change/:trayId',
        element: <RackChangeClose />,
    },
    {
        path: '/warehouse/rpt/report/upgrade-units',
        element: <UpgradeUnitsReport />,
    },
    {
        path: '/warehouse/rpt/return-from-rdl-2/close/:trayId',
        element: <ReturnFromRdlTwoClosePage />,
    },
    {
        path: '/warehouse/rpt/return-from-rdl-2',
        element: <ReturnFromRdlTwo />,
    },
    {
        path: '/warehouse/rpt-tray',
        element: <AllRptTray />,
    },
    {
        path: '/warehouse/sorting/return-from-wht-to-rp',
        element: <ReturnFromWhtToRp />,
    },
    {
        path: '/warehouse/sorting/return-from-wht-to-rp/close/:trayId',
        element: <ReturnFromWhtToRpClose />,
    },
    {
        path: '/warehouse/dashboard',
        element: <Dashboard />,
    },
   
    {
        path: '/wareshouse/bag/bag-issue-request',
        element: <BagIssueRequest />,
    },
    {
        path: '/wareshouse/bag/bag-issue-request/approve/:bagId',
        element: <BagIssueRequestApprove />,
    },
    {
        path: '/wareshouse/bag/bag-close-requests',
        element: <BagCloseRequests />,
    },
    {
        path: '/wareshouse/bag/bag-close-requests/summary/:bagId',
        element: <BagCloseRequestsSummary />,
    },
    {
        path: '/wareshouse/tray/item/:trayId',
        element: <BagCloseRequestsViewItem />,
    },
    {
        path: '/wareshouse/bot-done/tray-close/:trayId',
        element: <BotDoneCloseTray />,
    },
    {
        path: '/wareshouse/pmt-mmt/tray-close-request',
        element: <PmtMmtTrayCloseRequest />,
    },
    {
        path: '/wareshouse/pmt-mmt/issued',
        element: <PmtMmtTrayIssued />,
    },
    {
        path: '/wareshouse/pmt-mmt/issued/view-item/:trayId',
        element: <PmtMmtTrayIssuedViewItem />,
    },
    {
        path: '/wareshouse/bot/release',
        element: <BotToRelease />,
    },
    {
        path: '/wareshouse/all-bot-tray',
        element: <AllBotTray />,
    },
    {
        path: '/wareshouse/bot/release/view-item/:trayId',
        element: <BotToReleaseViewItem />,
    },
    {
        path: '/wareshouse/wht/tray',
        element: <WhtTray />,
    },
    {
        path: '/wareshouse/wht/tray/item/:trayId',
        element: <WhtTrayItem />,
    },
    {
        path: '/wareshouse/wht/in-use',
        element: <WhtInuse />,
    },
    {
        path: '/wareshouse/wht/in-sorting',
        element: <WhtInSorting />,
    },
    {
        path: '/wareshouse/wht/charging-request',
        element: <WhtChargingRequests />,
    },
    {
        path: '/wareshouse/wht/charging-request/approve/:trayId',
        element: <WhtChargingRequestApprove />,
    },
    {
        path: '/wareshouse/wht/in-charging',
        element: <WhtInCharging />,
    },
    {
        path: '/wareshouse/wht/return-from-charging',
        element: <WhtReturnFromCharging />,
    },
    {
        path: '/wareshouse/wht/rdl-1-request',
        element: <ReadyForRDL />,
    },
    {
        path: '/wareshouse/wht/rdl-1-request/approve/:trayId',
        element: <ReadyForRDLApprove />,
    },
    {
        path: '/wareshouse/wht/return-from-rdl-1',
        element: <ReturnFormRDL />,
    },
    // {
    //     path: '/wareshouse/wht/Return-From-RDL/approve/:trayId',
    //     element: <ReturnFormRDLApprove />,
    // },ReturnFormRDLviewitems
    {
        path: '/wareshouse/wht/return-from-rdl-1/close/:trayId',
        element: <ReturnFormRDLClose />,
    },
    {
        path: '/wareshouse/wht/return-from-rdl-1/view/:trayId',
        element: <ReturnFormRDLviewitems />,
    },
    {
        path: '/wareshouse/wht/return-from-charging/view-item/:trayId',
        element: <WhtReturnFromChargingViewItem />,
    },
    {
        path: '/wareshouse/wht/return-from-charging/close/:trayId',
        element: <WhtReturnFromChargingClose />,
    },
    {
        path: '/wareshouse/wht/bqc-request',
        element: <WhtBqcRequests />,
    },
    {
        path: '/wareshouse/wht/bqc-request/approve/:trayId',
        element: <WhtBqcRequestsApprove />,
    },
    {
        path: '/wareshouse/wht/return-from-bqc',
        element: <WhtReturnFromBqc />,
    },
    {
        path: '/wareshouse/wht/return-from-bqc/view-item/:trayId',
        element: <WhtReturnFromBqcViewItem />,
    },
    {
        path: '/wareshouse/wht/return-from-bqc/close/:trayId',
        element: <WhtReturnFromBqcClose />,
    },
    {
        path: '/wareshouse/wht/ready-for-audit',
        element: <ReadyForAudit />,
    },
    {
        path: '/wareshouse/wht/ready-for-audit/view/:trayId',
        element: <ReadyForAuditAction />,
    },
    {
        path: '/wareshouse/sorting/request',
        element: <SortingRequest />,
    },
    {
        path: '/wareshouse/sorting/ctx/request',
        element: <SortingCtxToStxRequest />,
    },
    {
        path: '/wareshouse/sorting/ctx/request/approve/:trayId',
        element: <SortingCtxFromAndToviewAndIssue />,
    },
    {
        path: '/wareshouse/sorting/request/approve/:trayId',
        element: <SortingRequestDtaildView />,
    },
    {
        path: '/wareshouse/request/approve/item-verifiying/:trayId',
        element: <SortingRequestExvsAct />,
    },
    {
        path: '/wareshouse/sorting/return-from-sorting',
        element: <ReturnFromSorting />,
    },
    // {
    //     path: '/wareshouse/sorting/spwhuser',
    //     element: <SPWHuser />,
    // },
    // {
    //     path: '/wareshouse/sorting/return-from-sorting-rp/view',
    //     element: <View />,
    // },
    // {
    //     path: '/wareshouse/sorting/return-from-sorting-rp/close',
    //     element: <Close />,
    // },
    {
        path: '/wareshouse/sorting/wht-to-rp',
        element: <WhttoRpRequests />,
    },
    {
        path: '/wareshouse/sorting/wht-to-rp/scanning',
        element: <WhtToRpScanEach />,
    },
    {
        path: '/wareshouse/sorting/wht-to-rp/scan/:trayId',
        element: <WhtToRpScanActVsExt />,
    },

    {
        path: '/wareshouse/sorting/ctx-to-stx/return-from-sorting/close/:trayId',
        element: <SortingDoneCtxOrStxTrayClose />,
    },
    {
        path: '/wareshouse/sorting/ctx-to-stx/return-from-sorting',
        element: <SortingDoneCtxtoStxTray />,
    },
    {
        path: '/wareshouse/sorting/return-from-sorting/close/:trayId',
        element: <ReturnFromSortingClose />,
    },
    {
        path: '/wareshouse/report/pmt',
        element: <PmtReport />,
    },
    {
        path: '/wareshouse/report/mmt',
        element: <MmtReport />,
    },
    {
        path: '/wareshouse/report/bot',
        element: <BotReport />,
    },
    {
        path: '/wareshouse/report/sales-bin',
        element: <SalesBinItem />,
    },
    {
        path: '/wareshouse/report/bot/sku-summary/:trayId',
        element: <BotReportSkuSum />,
    },
    {
        path: '/wareshouse/report/bot/sku-summary/details/:trayId/:muic',
        element: <BotReportSkuSumView />,
    },
    {
        path: '/wareshouse/merge/request',
        element: <MergeRequest />,
    },
    {
        path: '/wareshouse/merge/request/approve/:mmtTrayId',
        element: <MergeRequestApprove />,
    },
    {
        path: '/wareshouse/merge/return-from-merge',
        element: <ReturnFromMerge />,
    },
    {
        path: '/wareshouse/merge/return-from-merge/close/:trayId',
        element: <ReturnFromMergeClose />,
    },
    {
        path: '/wareshouse/wht/audit-request',
        element: <AuditRequest />,
    },
    {
        path: '/wareshouse/wht/audit-request/approve/:trayId',
        element: <AuditRequestApprove />,
    },
    {
        path: '/wareshouse/wht/wht-release',
        element: <ReturnFromAuditeWhtRelease />,
    },
    {
        path: '/wareshouse/wht/return-from-audit',
        element: <OtherTrayReturnFromAudit />,
    },
    {
        path: '/wareshouse/wht/return-from-audit/tray-items/:trayId',
        element: <OtherTrayReturnFromAuditViewItem />,
    },
    {
        path: '/wareshouse/wht/return-from-audit/ctx/tray-items/:trayId',
        element: <ReturnFromAuditItemView />,
    },

    {
        path: '/wareshouse/wht/return-from-audit/close/:trayId',
        element: <OtherTrayReturnFromAuditClose />,
    },
    {
        path: '/wareshouse/ctx/all',
        element: <CtxTray />,
    },
    {
        path: '/wareshouse/stx/all',
        element: <AllStxTray />,
    },
    {
        path: '/wareshouse/tray-transfer/request',
        element: <CtxTransferRequest />,
    },
    {
        path: '/wareshouse/tray-transfer/request/approve/:trayId',
        element: <CtxTransferApprove />,
    },
    {
        path: '/wareshouse/tray/receive/request',
        element: <CtxTrayReceiveFromProcessing />,
    },
    {
        path: '/wareshouse/tray/receive/request/approve/:trayId',
        element: <CtxTrayReceiveApprove />,
    },
    {
        path: '/wareshouse/tray/view-item/:trayId',
        element: <CtxTrayItem />,
    },
    {
        path: '/wareshouse/wht/pickup/request',
        element: <PickupRequest />,
    },
    {
        path: '/wareshouse/wht/pickup/request/approve/:trayId',
        element: <PickupRequestApprove />,
    },
    {
        path: '/wareshouse/wht/pickup/request/approve/item-verifying/:trayId',
        element: <PickupRequestApproveExvsActPage />,
    },
    {
        path: '/wareshouse/wht/pickup/return-from-pickup',
        element: <PickupDoneClosedBySorting />,
    },
    {
        path: '/wareshouse/wht/pickup/return-from-pickup/close/:trayId',
        element: <PickupDoneClose />,
    },
    {
        path: '/wareshouse/rpt/rdl-2-request',
        element: <RDL2Request />,
    },
    {
        path: '/wareshouse/rpt/rdl-2-request/approve/:trayId',
        element: <RDL2RequestApprove />,
    },
]

export default WarehoueRouter
