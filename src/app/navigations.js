import { Typography } from '@mui/material'
import { authRoles } from 'app/auth/authRoles'

export const navigations = [
    {
        name: 'Dashboard',
        path: '/sup-admin/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.admin, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/mis/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.Mis, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/sp-user/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.RMWAREHOUSE,
    },
    {
        name: 'Dashboard',
        path: '/warehouse/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.Warehouse, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/bot/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.bot, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/sorting/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.sorting, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/charging/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.charging, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/audit/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.audit, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/bqc/dashboard',
        icon: '',
        sales: 'all',
        auth: authRoles.bqc, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/reporting/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.reporting, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/rdl-fls/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.RDL_FLS, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/rdl-two/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.RDL_2,
    },
    {
        name: 'Dashboard',
        path: '/sales/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.Sales_Agent, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/pricing/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.pricing_Agent, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    // {
    //     name: 'Analytics',
    //     path: '/dashboard/analytics',
    //     icon: 'analytics',
    //     auth: authRoles.admin, // ONLY SUPER ADMIN(SA) AND ADMIN CAN ACCESS
    // },
    {
        label: 'Pages',
        type: 'label',
    },
    {
        name: 'Masters',
        icon: 'fiber_manual_record',
        children: [
            {
                name: 'Users',
                // icon: 'people',
                path: '/sup-admin/users',
            },
            {
                name: 'Locations',
                // icon: 'location_on_outlined',
                path: '/sup-admin/location',
            },
            {
                name: 'Warehouses',
                // icon: 'home',
                path: '/sup-admin/warehouse',
            },
            {
                name: 'Vendors',
                // icon: 'home',
                path: '/sup-admin/view-vendors',
            },
            {
                name: 'Tray Category',
                // icon: 'category',
                path: '/sup-admin/Category',
            },
            {
                name: 'Brands',
                // icon: 'branding_watermark',
                path: '/sup-admin/brands',
            },
            {
                name: 'Products',
                // icon: 'shopping_cart',
                path: '/sup-admin/products',
            },
            {
                name: 'Color List',
                // icon: 'add_shopping_cart',
                path: '/sup-admin/view-color-list',
            },
            {
                name: 'Part List',
                // icon: 'add_shopping_cart',
                path: '/sup-admin/view-part-list',
            },

            {
                name: 'Bags',
                // icon: 'add_shopping_cart',
                path: '/sup-admin/bag',
            },
            {
                name: 'Trays',
                // icon: 'add_shopping_cart',
                path: '/sup-admin/tray',
            },
        ],
        auth: authRoles.admin,
        sales: false,
    },

    {
        name: 'Ready For Charging',
        icon: 'battery_charging_full',
        children: [
            {
                name: 'In-use wht Tray',
                path: '/sup-admin/ready-for-charging/in-use-wht',
                iconText: 'PL',
            },
            {
                name: 'Ready for BQC wht Tray',
                path: '/sup-admin/ready-for-charging/bqc-tray',
                iconText: 'PL',
            },
        ],
        auth: authRoles.admin,
        sales: false,
    },
    {
        name: 'Bag Reassign',
        icon: 'assignment_return',
        children: [
            {
                name: 'Assigned Bag',
                path: '/sup-admin/bag-assinged/bag',
                iconText: 'PL',
            },
           
        ],
        auth: authRoles.admin,
        sales: false,
    },
    {
        name: 'Tray Reassign',
        icon: 'remove_shopping_cart',
        children: [
            {
                name: 'Sorting (bot to wht)',
                path: '/sup-admin/tray-reassign/sorting/bot-wht',
                iconText: 'PL',
            },
            {
                name: 'Assigned to Merging',
                path: '/sup-admin/tray-reassign/merge',
                iconText: 'PL',
            },
            {
                name: 'Assigned to charging',
                path: '/sup-admin/tray-reassign/charging',
                iconText: 'PL',
            },
            {
                name: 'Assigned to recharging',
                path: '/sup-admin/tray-reassign/recharging',
                iconText: 'PL',
            },
            {
                name: 'Assigned to bqc',
                path: '/sup-admin/tray-reassign/bqc',
                iconText: 'PL',
            },
            {
                name: 'Assigned to audit',
                path: '/sup-admin/tray-reassign/audit',
                iconText: 'PL',
            },
            {
                name: 'Assigned to rdl-fls',
                path: '/sup-admin/tray-reassign/rdl-fls',
                iconText: 'PL',
            },
            {
                name: 'Assigned to rdl-repair',
                path: '/sup-admin/tray-reassign/rdl-repair',
                iconText: 'PL',
            },
            {
                name: 'Assigned Sorting (ctx to stx)',
                path: '/sup-admin/tray-reassign/sorting/ctx-stx',
                iconText: 'PL',
            },
        ],
        auth: authRoles.admin,
        sales: false,
    },

    {
        name: 'Remove invalid item',
        icon: 'remove',
        path: '/sup-admin/remove-invalid-item',
        auth: authRoles.admin,
        sales: false,
    },
    {
        name: 'Ready for RDL-FLS',
        icon: 'low_priority',
        path: '/sup-admin/ready-for-rdl',
        auth: authRoles.admin,
        sales: false,
    },
    {
        name: 'Ready for Transfer CTX',
        icon: 'transform',
        path: '/sup-admin/ready-for-transfer',
        auth: authRoles.admin,
        sales: false,
    },
    {
        name: 'Track item',
        icon: 'art_track',
        path: '/sup-admin/track-item',
        auth: authRoles.admin,
        sales: false,
    },
    {
        name: 'Report',
        icon: 'reorder',
        children: [
            {
                name: 'Bqc Report',
                path: '/sup-admin/bqc/report',
                iconText: 'PL',
            },
        ],
        auth: authRoles.admin,
        sales: false,
    },
    {
        name: 'Order',
        icon: 'reorder',
        children: [
            {
                name: 'Orders',
                path: '/mis/orders',
                iconText: 'PL',
            },
            {
                name: 'Bad Orders',
                path: '/mis/bad-orders',
                iconText: 'PL',
            },
        ],
        auth: authRoles.Mis,
        sales: false,
    },
    {
        name: 'Delivery',
        icon: 'shopping_cart',
        children: [
            {
                name: 'Delivery',
                path: '/mis/delivery',
                iconText: 'VP',
            },
            {
                name: 'Bad Delivery',
                path: '/mis/bad-delivery',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
        sales: false,
    },
    {
        name: 'Recon Sheet',
        icon: 'filter_tilt_shift',
        children: [
            // {
            //     name: 'All Orders',
            //     path: '/mis/orders',
            //     iconText: 'PL',
            // },
            {
                name: 'Delivered Orders',
                path: '/mis/recon-sheet/delivered-orders',
                iconText: 'PL',
            },
            {
                name: 'Not Delivered Orders',
                path: '/mis/recon-sheet/not-delivered-orders',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
        sales: false,
    },
    {
        name: 'UIC Manage',
        icon: 'format_indent_decrease',
        children: [
            {
                name: 'All',
                path: '/mis/uic-manage/all',
                iconText: 'PL',
            },
            {
                name: 'UIC Generated',
                path: '/mis/uic-manage/uic-generated',
                iconText: 'PL',
            },
            {
                name: 'UIC Not Generated',
                path: '/mis/uic-manage/uic-not-generated',
                iconText: 'VP',
            },
            {
                name: 'UIC Downloaded',
                path: '/mis/uic-manage/uic-downloaded',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
        sales: false,
    },

    {
        name: 'Assign to Agent',
        icon: 'assignment',
        children: [
            {
                name: 'Assign to Bot',
                path: '/mis/assign-to-agent/bot',
                iconText: 'VP',
            },
            {
                name: 'Assign to Charging',
                path: '/mis/assign-to-agent/charging',
                iconText: 'NP',
            },
            {
                name: 'Assign to Bqc',
                path: '/mis/assign-to-agent/bqc',
                iconText: 'NP',
            },
            {
                name: 'Assign to Audit',
                path: '/mis/assign-to-agent/audit',
                iconText: 'NP',
            },
            {
                name: 'Assign to RDL-Fls',
                path: '/mis/assign-to-agent/Rdl-fls',
                iconText: 'NP',
            },
            {
                name: 'Assign to RDL-Repair',
                path: '/mis/assign-to-agent/Rdl-repair',
                iconText: 'NP',
            },
            {
                name: <Typography sx={{textAlign:'left'}}>Assign to RDL 2 (WHT to RP)</Typography>,
                path: '/mis/assign-to-agent/Rdl2',
                iconText: 'NP',
            },
        ],
        auth: authRoles.Mis,
        sales: false,
    },
    {
        name: 'Sorting',
        icon: 'sort',
        children: [
            {
                name: 'BOT to WHT',
                path: '/mis/sorting/bot-to-wht',
                iconText: 'VP',
            },
            {
                name: 'WHT to RP',
                path: '/mis/sorting/wht-to-rp',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
        sales: false,
    },
    {
        name: 'Sorting',
        icon: 'sort',
        children: [
            {
                name: 'CTX to STX',
                path: '/mis/sorting/ctx-to-stx',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
        sales: true,
    },
    {
        name: 'Merge',
        icon: 'merge_type',
        children: [
            {
                name: 'WHT',
                path: '/mis/merge/wht',
                iconText: 'VP',
            },
            {
                name: 'MMT',
                path: '/mis/merge/mmt',
                iconText: 'NP',
            },
            {
                name: 'CTX',
                path: '/mis/merge/ctx',
                iconText: 'NP',
            },

            {
                name: 'Pickup',
                path: '/mis/merge/pickup',
                iconText: 'NP',
            },
        ],
        auth: authRoles.Mis,
        sales: false,
    },
    {
        name: 'Merge',
        icon: 'merge_type',
        children: [
            {
                name: 'STX',
                path: '/mis/merge/stx',
                iconText: 'NP',
            },
        ],
        auth: authRoles.Mis,
        sales: true,
    },
    {
        name: 'CTX',
        icon: 'shopping_cart',
        children: [
            {
                name: 'Transfer',
                path: '/mis/ctx/transfer',
                iconText: 'VP',
            },
            {
                name: 'Receive',
                path: '/mis/ctx/receive',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
        sales: 'all',
    },
    {
        name: 'Track',
        icon: 'art_track',
        children: [
            {
                name: 'Item Track',
                path: '/mis/track/item',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
        sales: 'all',
    },

    {
        name: 'Bag',
        icon: 'class',
        children: [
            {
                name: 'Scan',
                path: '/wareshouse/bag/scan',
                iconText: 'VP',
            },
            {
                name: 'Bag Issue Request',
                path: '/wareshouse/bag/bag-issue-request',
                iconText: 'NP',
            },
            {
                name: 'Bag Close Request',
                path: '/wareshouse/bag/bag-close-requests',
                iconText: 'NP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: false,
    },
    {
        name: 'PMT And MMT',
        icon: 'move_to_inbox',
        children: [
            {
                name: 'Tray Close Request',
                path: '/wareshouse/pmt-mmt/tray-close-request',
                iconText: 'VP',
            },
            {
                name: 'Issued PMT and MMt',
                path: '/wareshouse/pmt-mmt/issued',
                iconText: 'NP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: false,
    },
    {
        name: 'BOT',
        icon: 'new_releases',
        children: [
            {
                name: 'BOT To Release',
                path: '/wareshouse/bot/release',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: false,
    },
    {
        name: 'WHT',
        icon: 'shopping_cart',
        children: [
            {
                name: 'WHT Tray',
                path: '/wareshouse/wht/tray',
                iconText: 'VP',
            },
            {
                name: 'Inuse WHT',
                path: '/wareshouse/wht/in-use',
                iconText: 'VP',
            },
            {
                name: 'Charging Request',
                path: '/wareshouse/wht/charging-request',
                iconText: 'VP',
            },
            {
                name: 'In-Charging WHT',
                path: '/wareshouse/wht/in-charging',
                iconText: 'VP',
            },

            {
                name: 'Return From Charging',
                path: '/wareshouse/wht/return-from-charging',
                iconText: 'VP',
            },
            {
                name: 'BQC Request',
                path: '/wareshouse/wht/bqc-request',
                iconText: 'VP',
            },
            {
                name: 'Return From BQC',
                path: '/wareshouse/wht/return-from-bqc',
                iconText: 'VP',
            },
            {
                name: 'Audit Requests',
                path: '/wareshouse/wht/audit-request',
                iconText: 'VP',
            },
            {
                name: 'Return From Audit',
                path: '/wareshouse/wht/return-from-audit',
                auth: authRoles.Warehouse,
                iconText: 'VP',
            },
            {
                name: 'Ready for Audit',
                path: '/wareshouse/wht/ready-for-audit',
                iconText: 'VP',
            },
            {
                name: 'RDL-FLS Request',
                path: '/wareshouse/wht/rdl-fls-request',
                iconText: 'VP',
            },
            {
                name: 'Return From RDL-FLS',
                path: '/wareshouse/wht/return-from-rdl-fls',
                iconText: 'VP',
            },
            {
                name: 'RDL-2 Request',
                path: '/wareshouse/wht/rdl2-request',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: false,
    },
    {
        name: 'Sorting',
        icon: 'sort',
        children: [
            {
                name: 'Sorting Request (BOT)',
                path: '/wareshouse/sorting/request',
                iconText: 'VP',
            },
            {
                name: 'In-Sorting WHT',
                path: '/wareshouse/wht/in-sorting',
                iconText: 'VP',
            },
            {
                name: 'Sorting Done (WHT)',
                path: '/wareshouse/sorting/return-from-sorting',
                iconText: 'VP',
            },
            {
                name: 'Sorting Done (WHT to RP)',
                path: '/wareshouse/sorting/return-from-sorting-rp',
                iconText: 'VP',
            },
            {
                name: 'WHT to RP',
                path: '/wareshouse/sorting/wht-to-rp/whttorp',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: false,
    },
    {
        name: 'Sorting',
        icon: 'sort',
        children: [
            {
                name: 'Sorting Request (CTX)',
                path: '/wareshouse/sorting/ctx/request',
                iconText: 'VP',
            },

            {
                name: 'Sorting Done (CTX/STX)',
                path: '/wareshouse/sorting/ctx-to-stx/return-from-sorting',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: true,
    },
    {
        name: 'Merge',
        icon: 'merge_type',
        children: [
            {
                name: 'Merge Request',
                path: '/wareshouse/merge/request',
                iconText: 'VP',
            },
            {
                name: 'Return From Merge',
                path: '/wareshouse/merge/return-from-merge',
                iconText: 'VP',
            },
            {
                name: 'Pickup Request',
                path: '/wareshouse/wht/pickup/request',
                iconText: 'VP',
            },
            {
                name: 'Return From Pickup',
                path: '/wareshouse/wht/pickup/return-from-pickup',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: false,
    },
    {
        name: 'Merge',
        icon: 'merge_type',
        children: [
            {
                name: 'Merge Request',
                path: '/wareshouse/merge/request',
                iconText: 'VP',
            },
            {
                name: 'Return From Merge',
                path: '/wareshouse/merge/return-from-merge',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: true,
    },
    {
        name: 'CTX',
        icon: 'shopping_cart',
        children: [
            {
                name: 'CTX Tray',
                path: '/wareshouse/ctx/all',
                iconText: 'VP',
            },
            {
                name: 'Transfer Request',
                path: '/wareshouse/ctx/transfer/request',
            },
            {
                name: 'Receive Request',
                path: '/wareshouse/ctx/receive/request',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: 'all',
    },
    {
        name: 'STX',
        icon: 'shopping_cart',
        children: [
            {
                name: 'STX Tray',
                path: '/wareshouse/stx/all',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: true,
    },
    {
        name: 'Report',
        icon: 'report',
        children: [
            {
                name: 'PMT Report',
                path: '/wareshouse/report/pmt',
                iconText: 'VP',
            },
            {
                name: 'MMT Report',
                path: '/wareshouse/report/mmt',
                iconText: 'VP',
            },
            {
                name: 'BOT Report',
                path: '/wareshouse/report/bot',
                iconText: 'VP',
            },
            {
                name: 'Sales Bin',
                path: '/wareshouse/report/sales-bin',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: false,
    },
    {
        name: 'WHT Utility',
        icon: 'search',
        children: [
            {
                name: 'Search And Import',
                path: '/warehouse/wht-utility/import-data',
                iconText: 'VP',
            },
            {
                name: 'Bot Tray',
                path: '/warehouse/wht-utility/Bot-tray',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: false,
    },
    {
        name: 'Billed Bin',
        icon: 'class',
        path: '/mis/billedbin',
        auth: authRoles.Mis,
        sales: true,
    },
    {
        name: 'Report',
        icon: 'search',
        children: [
            {
                name: 'Billed Bin Report',
                path: '/mis/report/billedBin',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
        sales: true,
    },

    {
        name: 'Bag',
        icon: 'class',
        path: '/bot/bag',
        auth: authRoles.bot,
        sales: false,
    },
    {
        name: 'Tray',
        icon: 'shopping_cart',
        path: '/bot/tray',
        auth: authRoles.bot,
        sales: false,
    },
    {
        name: 'Sorting Request',
        icon: 'sort',
        children: [
            // {
            //     name: 'BOT to WHT',
            //     path: '/sorting/request',
            //     iconText: 'VP',
            // },
            {
                name: 'WHT to RP',
                path: '/sorting/request',
                iconText: 'VP',
            },
        ],
        auth: authRoles.sorting,
        sales: false,
    },
    {
        name: 'Sorting Request',
        icon: 'sort',
        children: [
            {
                name: 'CTX to STX',
                path: '/sorting/ctx/request',
                iconText: 'VP',
            },
        ],
        auth: authRoles.sorting,
        sales: true,
    },

    {
        name: 'Tray Merge',
        icon: 'merge_type',
        path: '/sorting/merge',
        auth: authRoles.sorting,
        sales: 'all',
    },
    {
        name: 'Pickup',
        icon: 'merge_type',
        children: [
            {
                name: 'From Tray',
                icon: 'merge_type',
                path: '/sorting/pickup/request',
            },
            {
                name: 'To Tray',
                icon: 'merge_type',
                path: '/sorting/pickup/to-tray',
            },
        ],
        auth: authRoles.sorting,
        sales: false,
    },

    {
        name: 'Charging Request',
        icon: 'battery_charging_full',
        path: '/charging/tray',
        auth: authRoles.charging,
        sales: false,
    },
    {
        name: 'Bqc Request',
        icon: '',
        path: '/bqc/tray',
        auth: authRoles.bqc,
        sales: false,
    },
    {
        name: 'Audit Request',
        icon: 'settings_system_daydream',
        path: '/audit/audit-request',
        auth: authRoles.audit,
        sales: false,
    },
    {
        name: 'Assigned Tray',
        icon: 'settings_system_daydream',
        path: '/audit/assigned-tray',
        auth: authRoles.audit,
        sales: false,
    },

    {
        name: 'RDL FLS Requests',
        icon: 'class',
        path: '/rdl-fls/tray',
        auth: authRoles.RDL_FLS,
        sales: false,
    },

    {
        name: 'Orders',
        icon: 'reorder',
        children: [
            {
                name: 'Total Order Placed',

                path: '/reporting/all-orders',
            },

            {
                name: 'Not Delivered Packets',

                path: '/reporting/not-delivered-orders',
            },
        ],
        sales: false,
        auth: authRoles.reporting,
    },
    {
        name: 'Delivery',
        icon: 'reorder',
        children: [
            {
                name: 'Delivered Packets',

                path: '/reporting/delivered-orders',
            },
            {
                name: 'Total Packet Delivered',

                path: '/reporting/delivery/item',
            },
            {
                name: <Typography sx={{textAlign:'left'}}>Units Available in Processing</Typography>,

                path: '/reporting/units/processing',
            },
            {
                name: 'Units Ready for Sale',

                path: '/reporting/units/ready-for-sales',
            },
        ],
        sales: false,
        auth: authRoles.reporting,
    },
    {
        name: 'Delivery',
        icon: 'reorder',
        children: [
            {
                name: 'Units Ready for Sale',

                path: '/reporting/units/ready-for-sales',
            },
        ],
        sales: true,
        auth: authRoles.reporting,
    },
    {
        name: 'Bag',
        icon: 'class',
        children: [
            {
                name: 'Closed Bag',
                path: '/reporting/bags/closed',
            },
        ],
        sales: false,
        auth: authRoles.reporting,
    },

    {
        name: 'Bot-Tray',
        icon: 'shopping_cart',
        children: [
            {
                name: 'Sorting Pending',
                path: '/reporting/bot-tray/sorting-pending',
            },
        ],
        sales: false,
        auth: authRoles.reporting,
    },
    {
        name: 'Model Missmatch',
        icon: 'shopping_cart',
        children: [
            {
                name: 'Closed Tray',
                path: '/reporting/mmt-tray',
                sales: 'all',
                auth: authRoles.reporting,
            },
            {
                name: 'Merging In Progress',
                path: '/reporting/mmt/in-merging',
                sales: 'all',
                auth: authRoles.reporting,
            },
        ],
        sales: false,
        auth: authRoles.reporting,
    },

    {
        name: 'Product Missmatch Tray',
        icon: 'shopping_cart',
        path: '/reporting/pmt-tray',
        sales: false,
        auth: authRoles.reporting,
    },
    {
        name: 'WHT',
        icon: 'shopping_cart',
        children: [
            {
                name: 'In-use',
                path: '/reporting/wht/inuse',
            },
            {
                name: 'Merge Pending',
                path: '/reporting/wht/ready-for-merge',
            },
            {
                name: 'Merging In Progress',
                path: '/reporting/wht/in-merging',
            },
            {
                name: 'Charge Pending',
                path: '/reporting/wht/ready-for-charge',
            },
            {
                name: 'Recharge Pending',
                path: '/reporting/wht/recharge',
            },
            {
                name: 'Charging In Progress',
                path: '/reporting/wht/in-charging',
            },
            {
                name: 'Bqc Pending',
                path: '/reporting/wht/ready-for-bqc',
            },
            {
                name: 'Bqc In Progress',
                path: '/reporting/wht/in-bqc',
            },
            {
                name: 'Audit Pending',
                path: '/reporting/wht/ready-for-audit',
            },
            {
                name: 'Audit In Progress',
                path: '/reporting/wht/in-audit',
            },
            {
                name: 'Rdl 1 Pending',
                path: '/reporting/wht/ready-for-rdl-fls',
            },
            {
                name: 'RDL 1 In Progress',
                path: '/reporting/wht/in-rdl-fls',
            },
        ],
        sales: false,
        auth: authRoles.reporting,
    },
    {
        name: 'CTX',
        icon: 'shopping_cart',
        children: [
            {
                name: <Typography sx={{textAlign:'left'}}>Sales Bucket Transfer Pending</Typography>,
                path: '/reporting/ctx/transfer-pending-to-sales',
            },
            {
                name: 'Sale Bucket In Progress',
                path: '/reporting/ctx/transfer-to-sales/in-progress',
            },
        ],
        sales: false,
        auth: authRoles.reporting,
    },
    {
        name: 'Month Wise Purchase',
        icon: 'shopping_cart',
        path: '/reporting/month-wise-purchase-details',
        sales: 'all',
        auth: authRoles.reporting,
    },
    {
        name: 'Track',
        icon: 'shopping_cart',
        children: [
            {
                name: 'Item Track',
                path: '/reporting/track-item',
            },
            {
                name: 'Tray Track',
                path: '/reporting/track-tray',
            },
        ],
        sales: 'all',
        auth: authRoles.reporting,
    },
    {
        name: 'Rdl 1 Done Units',
        icon: 'art_track',
        path: '/reporting/rdl-one-done-units',
        sales: false,
        auth: authRoles.reporting,
    },
    // {
    //     name: 'Track Items',
    //     icon: '',
    //     path: '/reporting/track-item',
    //     sales: false,
    //     auth: authRoles.reporting,
    // },
    // {
    //     name: 'Track Trays',
    //     icon: '',
    //     path: '/reporting/track-tray',
    //     sales: false,
    //     auth: authRoles.reporting,
    // },
    {
        name: 'RDL 2 Requests',
        icon: 'class',
        path: '/rdl-two/tray',
        auth: authRoles.RDL_2,
        sales: false,
    },
    {
        name: 'Part List',
        icon: 'class',
        path: '/sp-user/part-list',
        auth: authRoles.RMWAREHOUSE,
        sales: false,
    },
    {
        name: 'Product List',
        icon: 'compare',
        path: '/sp-user/product-list',
        auth: authRoles.RMWAREHOUSE,
        sales: false,
    },
    {
        name: 'Upcoming Repairs',
        icon: 'shopping_cart',
        path: '/sp-user/upcoming-repair-tray',
        auth: authRoles.RMWAREHOUSE,
        sales: false,
    },
    {
        name: 'Part Issue Request',
        icon: 'shopping_cart',
        path: '/sp-user/rdl-2-issue-request',
        auth: authRoles.RMWAREHOUSE,
        sales: false,
    },
    {
        name: 'WHT to RP',
        path: '/wareshouse/sorting/spwhuser',
        iconText: 'VP',
        auth: authRoles.RMWAREHOUSE,   
        sales: false,
    },
    {
        name: 'Dummy Panel',
        icon: 'class',
        path: '',
        auth: authRoles.Sales_Agent,
        sales: false,
    },
    {
        name: 'Dummy Panel',
        icon: 'class',
        path: '',
        auth: authRoles.pricing_Agent,
        sales: true,
    },
]
export const getfilteredNavigations = (navList = [], role, cpc_type) => {
    return navList.reduce((array, nav) => {
        if (nav.auth) {
            if (nav.auth.includes(role)) {
                if (cpc_type == 'Sales') {
                    if (nav.sales == true || nav.sales == 'all') {
                        array.push(nav)
                    }
                } else if (nav.sales == false || nav.sales == 'all') {
                    array.push(nav)
                }
            }
        } else {
            if (nav.children) {
                nav.children = getfilteredNavigations(
                    nav.children,
                    role,
                    cpc_type
                )
                array.push(nav)
            } else {
                array.push(nav)
            }
        }
        return array
    }, [])
}
