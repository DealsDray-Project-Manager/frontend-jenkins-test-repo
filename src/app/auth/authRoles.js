export const authRoles = {
    Mis: ['MIS'],
    admin: ['super-admin'],
    Warehouse: ['Warehouse'],
    bot: ['Bag Opening'],
    sorting: ['Sorting Agent'],
    charging: ['Charging'],
    bqc: ['BQC'],
    audit: ['Audit'],
    RDL_FLS: ['RDL-1'],
    Sales_Agent: ['Sales Agent'],
    pricing_Agent: ['Pricing Agent'],
    reporting: ['Reporting'],
    RDL_2: ['RDL-2'],
    RMWAREHOUSE: ['SP User'],
    SPMIS: ['Sp mis'],
    PURCHASERM: ['Purchase RM'],
    Buyer: ['Buyer'],
    bagging: ['Bagging'],
    RPBQC: ['RP-BQC'],
    RPAUDIT: ['RP-Audit'],
}

// Check out app/views/dashboard/DashboardRoutes.js
// Only SA & Admin has dashboard access

// const dashboardRoutes = [
//   {
//     path: "/dashboard/analytics",
//     component: Analytics,
//     auth: authRoles.admin <===============
//   }
// ];

// Check navigaitons.js

// {
//   name: "Dashboard",
//   path: "/dashboard/analytics",
//   icon: "dashboard",
//   auth: authRoles.admin <=================
// }
