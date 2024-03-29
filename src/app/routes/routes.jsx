import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import chartsRoute from 'app/views/charts/ChartsRoute'
import chatRoutes from 'app/views/chat-box/ChatRoutes'
import crudRoute from 'app/views/CRUD/CrudRoutes'
import formsRoutes from 'app/views/forms/FormsRoutes'
import ListRoute from 'app/views/list/ListRoute'
import mapRoutes from 'app/views/map/MapRoutes'
import pagesRoutes from 'app/views/pages/pagesRoutes'
import todoRoutes from 'app/views/todo/TodoRoutes'
import inboxRoute from 'app/views/inbox/InboxRoutes'
import pricingRoutes from 'app/views/pricing/PricingRoutes'
import invoiceRoutes from 'app/views/invoice/InvoioceRoutes'
import calendarRoutes from 'app/views/calendar/CalendarRoutes'
import ecommerceRoutes from 'app/views/ecommerce/EcommerceRoutes'
import dataTableRoutes from 'app/views/data-table/dataTableRoutes'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dragAndDropRoute from 'app/views/Drag&Drop/DragAndDropRoute'
import scrumBoardRoutes from 'app/views/scrum-board/ScrumBoardRoutes'
import pageLayoutRoutes from 'app/views/page-layouts/PageLayoutRoutees'
import { dashboardRoutes } from 'app/views/dashboard/DashboardRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'
/**************************************************** */
import SuperAdminRoutes from '../components/sup-admin-components/sup-admin-routers'
import MisRoutes from '../components/Mis-components/Mis-routers'
import WarehouseRoutes from '../components/Warehouse-components/WarehouseRouter'
import BotRoutes from '../components/Bot-components/BotRoutes'
import SortingRoutes from '../components/Sorting-agent-components/SortingRoutes'
import ChargingRoutes from '../components/Charging-components/ChargingRoutes'
import BqcRoutes from '../components/Bqc-components/BqcRoutes'
import Login from '../Login/loginRouter'
import ChangePasswordRouter from 'app/components/Change-password/change-password-router'
import AuditRouter from 'app/components/Audit-components/AuditRouter'
import RDL_one from 'app/components/Rdl_one-components/Rdl-1-routers'
import PricingRoutes from 'app/components/Pricing-components/Pricing_routers'
import SalesRoutes from 'app/components/Sales-components/Sales_routes'
import ReportingAgent from 'app/components/Reporting-agent/Reporting-agent-router'
import Rdl2Routers from 'app/components/Rdl-2-panel/Rdl-2-router'
import RmWarehouse from 'app/components/Rm-warehouse/Rm-warehouse'
import SpmisPanel from 'app/components/Sp-mis-panel/sp-mis-panel'
import PurchaseUser from 'app/components/Purchase-rm/purchase-rm'
import BuyerUser from 'app/components/Buyer-panel/Buyer-routes'
import BaggingUserRouter from 'app/components/Bagging-user/bagging-user-router'
import RpBqcRouter from 'app/components/Rpbqc-agent/Rpbqc-routers'
import RpAuditRouter from 'app/components/Rp-audit/Rp-audit-router'


export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [
                ...RpAuditRouter,
                ...RpBqcRouter,
                ...PurchaseUser,
                ...SpmisPanel,
                ...dashboardRoutes,
                ...calendarRoutes,
                ...chartsRoute,
                ...chatRoutes,
                ...crudRoute,
                ...dataTableRoutes,
                ...dragAndDropRoute,
                ...ecommerceRoutes,
                ...formsRoutes,
                ...invoiceRoutes,
                ...ListRoute,
                ...mapRoutes,
                ...materialRoutes,
                ...inboxRoute,
                ...pageLayoutRoutes,
                ...pagesRoutes,
                ...pricingRoutes,
                ...scrumBoardRoutes,
                ...todoRoutes,
                ...SuperAdminRoutes,
                ...MisRoutes,
                ...WarehouseRoutes,
                ...BotRoutes,
                ...SortingRoutes,
                ...ChargingRoutes,
                ...BqcRoutes,
                ...AuditRouter,
                ...RDL_one,
                ...PricingRoutes,
                ...SalesRoutes,
                ...ReportingAgent,
                ...Rdl2Routers,
                ...RmWarehouse,
                ...BuyerUser,
                ...BaggingUserRouter,
            ],
        },

        ...Login,
        ...ChangePasswordRouter,
        {
            path: '/',
            element: <Navigate to="/login" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
