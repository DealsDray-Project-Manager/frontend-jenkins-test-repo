import { Typography } from '@mui/material'
import { authRoles } from 'app/auth/authRoles'

export const navigations = [
    {
        name: 'Dashboard',
        path: '/sp-mis/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.SPMIS, // SP MIS DASHBOARD
    },
    {
        name: 'Dashboard',
        path: '/bagging/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.bagging, // SP MIS DASHBOARD
    },
    {
        name: 'Dashboard',
        path: '/purchase-user/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.PURCHASERM, // PURCHASE USER DASHBOARD
    },

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
        auth: authRoles.Mis, // PROCESSING MIS DASHBOARD
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
        path: '/rp-bqc/dashboard',
        icon: '',
        sales: 'all',
        auth: authRoles.RPBQC, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/rp-audit/dashboard',
        icon: '',
        sales: 'all',
        auth: authRoles.RPAUDIT, // ONLY SUPER ADMIN(SA) CAN ACCESS
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
        path: '/rdl-1/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.RDL_FLS, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/rdl-2/dashboard',
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
        path: '/buyer/dashboard',
        icon: 'dashboard',
        sales: 'all',
        auth: authRoles.Buyer,
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
        name: 'Procurement',
        icon: 'class',
        children: [
            {
                name: 'Spare Parts',
                path: '/sp-mis/procurement',
            },
            {
                name: 'Tools And Consumables',
                path: '/sp-mis/procurement-tools-and-consumables',
            },
        ],
        sales: false,
        auth: authRoles.SPMIS,
    },
    {
        name: (
            <Typography sx={{ textAlign: 'left' }}>
                Issue Tools And Consumables
            </Typography>
        ),
        path: '/sp-mis/tools-and-consumable/issue',
        icon: 'pan_tool',
        sales: false,

        auth: authRoles.SPMIS, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Report',
        icon: 'report',
        children: [
            {
                name: 'Tools And Consumables',
                path: '/sp-mis/report/tools-and-consumable',
                iconText: 'VP',
            },
        ],
        auth: authRoles.SPMIS,
        sales: false,
    },

    {
        name: 'Purchase Request',
        icon: 'reorder',
        children: [
            {
                name: 'Spare Parts',
                path: '/purchase-user/purchase',
                iconText: 'PL',
            },
            {
                name: 'Tools And Consumables',
                path: '/purchase-user/purchase-tools-and-consumables',
                iconText: 'PL',
            },
        ],
        auth: authRoles.PURCHASERM,
        sales: false,
    },
    {
        name: 'Order Details',
        path: '/purchase-user/order-details',
        icon: 'shopping_cart',
        sales: false,
        auth: authRoles.PURCHASERM, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Order Summary',
        path: '/purchase-user/order-summary',
        icon: 'shopping_cart',
        sales: false,
        auth: authRoles.PURCHASERM, // ONLY SUPER ADMIN(SA) CAN ACCESS
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
                name: 'Buyers',
                // icon: 'people',
                path: '/sup-admin/buyer',
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
                name: 'Sub Muic',
                // icon: 'shopping_cart',
                path: '/sup-admin/sub-muic',
            },

            {
                name: 'SP Categories',
                // icon: 'home',
                path: '/sup-admin/view-categories',
            },

            {
                name: 'Vendors',
                // icon: 'home',
                path: '/sup-admin/view-vendors',
            },

            {
                name: 'Color List',
                // icon: 'add_shopping_cart',
                path: '/sup-admin/view-color-list',
            },
            {
                name: 'Sp Part List',
                // icon: 'add_shopping_cart',
                path: '/sup-admin/view-part-list',
            },

            {
                name: 'Bags',
                // icon: 'add_shopping_cart',
                path: '/sup-admin/bag',
            },
            {
                name: 'Tray Category',
                // icon: 'category',
                path: '/sup-admin/Category',
            },
            {
                name: 'Trays',
                // icon: 'add_shopping_cart',
                path: '/sup-admin/tray',
            },
            {
                name: 'Boxes',
                // icon: 'add_shopping_cart',
                path: '/sup-admin/view-boxes',
            },
            {
                name: 'Tray Racks',
                // icon: 'home',
                path: '/sup-admin/view-trayracks',
            },
            {
                name: 'Payments Terms',
                // icon: 'home',
                path: '/sup-admin/view-payments',
            },
            {
                name: 'Warranty Terms',
                // icon: 'home',
                path: '/sup-admin/view-warranty',
            },

            {
                name: 'Storage',
                // icon: 'home',
                path: '/sup-admin/view-storage',
            },
            {
                name: 'RAM',
                // icon: 'home',
                path: '/sup-admin/view-ram',
            },
        ],
        auth: authRoles.admin,
        sales: false,
    },

    {
        name: 'Forced Actions',
        icon: 'call_to_action',
        children: [
            {
                name: 'In-use Tray (Charge)',
                path: '/sup-admin/ready-for-charging/in-use-wht',
                iconText: 'PL',
            },
            {
                name: 'BQC Tray (Recharge)',
                path: '/sup-admin/ready-for-charging/bqc-tray',
                iconText: 'PL',
            },
            {
                name: 'Ready for RDL-1',
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
                name: 'Unverified Imei Updation',
                icon: 'verified_user',
                path: '/sup-admin/unverified-imei-updation',
                auth: authRoles.admin,
                sales: false,
            },
            {
                name: 'BQC sync',
                icon: 'sync',
                path: '/sup-admin/bqc-sync',
                auth: authRoles.admin,
                sales: false,
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
                name: 'Sorting (BOT To WHT)',
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
                name: 'Assigned to rdl-1',
                path: '/sup-admin/tray-reassign/rdl-1',
                iconText: 'PL',
            },
            {
                name: 'Assigned to rdl-2',
                path: '/sup-admin/tray-reassign/rdl-2',
                iconText: 'PL',
            },
            {
                name: 'Assigned Sorting (ctx to stx)',
                path: '/sup-admin/tray-reassign/sorting/ctx-stx',
                iconText: 'PL',
            },
            {
                name: 'Assigned to pickup',
                path: '/sup-admin/tray-reassign/pick-up',
                iconText: 'PL',
            },
        ],
        auth: authRoles.admin,
        sales: false,
    },

    {
        name: 'Remove Units',
        icon: 'remove',
        children: [
            {
                name: 'Invalid Units From Bag',
                path: '/sup-admin/remove-invalid-units-from-bag',
                iconText: 'PL',
            },
            {
                name: 'Duplicate Units From Tray',
                path: '/sup-admin/remove-duplicate-uic',
                iconText: 'PL',
            },
        ],
        auth: authRoles.admin,
        sales: false,
    },
    {
        name: 'Deleted Items',
        icon: 'restore',
        children: [
            {
                name: 'Trays',
                path: '/sup-admin/manage-deleted-trays',
                iconText: 'PL',
            },
        ],
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
            {
                name: 'Rack Report',
                path: '/sup-admin/report/rack',
                iconText: 'PL',
            },
            {
                name: 'Not Assigned to Rack',
                path: '/sup-admin/report/tray-not-assigned-to-rack',
                iconText: 'PL',
            },
            {
                name: 'Upgrade Report',
                path: '/sup-admin/report/upgrade',
                iconText: 'PL',
            },
        ],
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
        name: 'WHT Trays',
        icon: 'class',
        path: '/mis/manage-wht-trays',
        auth: authRoles.Mis,
        sales: false,
    },
    {
        name: 'STX Trays',
        icon: 'class',
        path: '/mis/manage-stx-trays',
        auth: authRoles.Mis,
        sales: true,
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
        name: 'Bag Transfer',
        icon: 'transfer_within_a_station',
        children: [
            {
                name: 'Transfer',
                path: '/mis/bag-transfer',
                iconText: 'PL',
            },
            {
                name: 'Receive',
                path: '/mis/bag-receive',
                iconText: 'PL',
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
                name: 'Assign to BOT',
                path: '/mis/assign-to-agent/bot',
                iconText: 'VP',
            },
            {
                name: 'Assign to Charging Planner',
                path: '/mis/assign-to-agent/charging',
                iconText: 'NP',
            },
            {
                name: 'Assign to Bqc Planner',
                path: '/mis/assign-to-agent/bqc',
                iconText: 'NP',
            },
            {
                name: 'Assign to Audit',
                path: '/mis/assign-to-agent/audit',
                iconText: 'NP',
            },
            {
                name: 'Assign to RDL-1',
                path: '/mis/assign-to-agent/Rdl-1',
                iconText: 'NP',
            },
            {
                name: 'Assign to RDL-2',
                path: '/mis/assign-to-agent/rdl-2',
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
                name: 'BOT To WHT',
                path: '/mis/sorting/bot-to-wht',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
        sales: false,
    },
    {
        name: 'WHT to RP',
        icon: 'sort',
        children: [
            {
                name: 'Total Repairable Units',
                path: '/mis/sorting/wht-to-rp',
                iconText: 'VP',
            },
            {
                name: 'Parts Not Available',
                path: '/mis/sorting/wht-to-rp-parts-not-available',
                iconText: 'VP',
            },
            {
                name: 'MB/SFT Work Units',
                path: '/mis/sorting/wht-to-rp-mb-sft-work',
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
            {
                name: 'RPA to STX',
                path: '/mis/rpa-to-stx',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
        sales: true,
    },
    {
        name: 'Pickup',
        path: '/mis/merge/pickup',
        icon: 'pool',
        auth: authRoles.Mis,
        sales: false,
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
        name: 'Tray Transfer',
        icon: 'shopping_cart',
        children: [
            {
                name: 'Transfer',
                path: '/mis/tray-transfer',
                iconText: 'VP',
            },
            {
                name: 'Receive',
                path: '/mis/tray/receive',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
        sales: 'all',
    },
    {
        name: 'RPA TO STX',
        icon: 'shopping_cart',
        children: [
            {
                name: 'Assigned Trays',
                path: '/warehouse/rpa-to-stx/assigned-trays',
                iconText: 'VP',
            },
            {
                name: (
                    <Typography sx={{ textAlign: 'left' }}>
                        RPA to STX Work In Progress Trays
                    </Typography>
                ),
                path: '/warehouse/rpa-to-stx-work-in-progess-trays-view',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: true,
    },
    {
        name: 'Rack Change',
        icon: 'track_changes',
        children: [
            {
                name: 'Create Request',
                path: '/mis/rack-change',
                iconText: 'VP',
            },
            {
                name: 'Created Request',
                path: '/mis/rack-change-request',
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
        sales: false,
    },
    {
        name: 'Report',
        icon: 'report',
        children: [
            {
                name: 'Upgrade Units',
                path: '/warehouse/rpt/report/upgrade-units',
                iconText: 'VP',
            },
            {
                name: 'Not Repairable Units',
                path: '/mis/report/not-repairable',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
        sales: false,
    },
    {
        name: 'Bag',
        icon: 'class',
        children: [
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
                name: 'All PMT',
                path: '/warehouse/all-pmt-tray',
                iconText: 'VP',
            },
            {
                name: 'All MMT',
                path: '/warehouse/all-mmt-tray',
                iconText: 'VP',
            },
            {
                name: 'Tray Close Request',
                path: '/wareshouse/pmt-mmt/tray-close-request',
                iconText: 'VP',
            },
            {
                name: 'Issued PMT and MMT',
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
                name: 'BOT Tray',
                path: '/wareshouse/all-bot-tray',
                iconText: 'VP',
            },
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
                name: 'RDL-1 Request',
                path: '/wareshouse/wht/rdl-1-request',
                iconText: 'VP',
            },
            {
                name: 'Return From RDL-1',
                path: '/wareshouse/wht/return-from-rdl-1',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: false,
    },
    {
        name: 'RPT',
        icon: 'shopping_cart',
        children: [
            {
                name: 'RPT Tray',
                path: '/warehouse/rpt-tray',
                iconText: 'VP',
            },
            {
                name: 'RDL-2 Request',
                path: '/wareshouse/rpt/rdl-2-request',
                iconText: 'VP',
            },
            {
                name: 'Return from RDL-2',
                path: '/warehouse/rpt/return-from-rdl-2',
                iconText: 'VP',
            },
            {
                name: 'Can Bin Pending Units',
                path: '/warehouse/can-bin-pending-units',
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
                name: (
                    <Typography sx={{ textAlign: 'left' }}>
                        Sorting Requests (WHT to RP)
                    </Typography>
                ),
                path: '/wareshouse/sorting/wht-to-rp',
                iconText: 'VP',
            },
            {
                name: (
                    <Typography sx={{ textAlign: 'left' }}>
                        Return from sorting (WHT to RP)
                    </Typography>
                ),
                path: '/warehouse/sorting/return-from-wht-to-rp',
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
        ],
        auth: authRoles.Warehouse,
        sales: false,
    },
    {
        name: 'Pickup',
        icon: 'merge_type',
        children: [
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
        ],
        auth: authRoles.Warehouse,
        sales: 'all',
    },
    {
        name: 'Tray Transfer',
        icon: 'shopping_cart',
        children: [
            {
                name: 'Transfer Request',
                path: '/wareshouse/tray-transfer/request',
            },
            {
                name: 'Receive Request',
                path: '/wareshouse/tray/receive/request',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: 'all',
    },
    {
        name: 'RPA / RPB',
        icon: 'shopping_cart',
        children: [
            {
                name: 'RPA',
                path: '/warehouse/rpa-trays',
                iconText: 'VP',
            },
            {
                name: 'RPB',
                path: '/warehouse/rpb-trays',
                iconText: 'VP',
            },
            {
                name: 'Tray Issue/return',
                path: '/warehouse/rpa-rpb-tray-issue-or-return',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: false,
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
            {
                name: 'Display Grading Request',
                path: '/warehouse/stx/display-grading-issue-requests',
                iconText: 'VP',
            },
            {
                name: 'Return from Display Grading',
                path: '/warehouse/stx/return-from-display-grading',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: true,
    },

    {
        name: 'Rack Change',
        icon: 'shopping_cart',
        children: [
            {
                name: 'Scan Out',
                path: '/warehouse/rack-change/scan-out',
                iconText: 'VP',
            },
            {
                name: 'Scan In',
                path: '/warehouse/rack-change/scan-in',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
        sales: 'all',
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
            {
                name: 'Upgrade Units',
                path: '/warehouse/rpt/report/upgrade-units',
                iconText: 'VP',
            },
            {
                name: 'Units In Can Bin',
                path: '/warehouse/rpt/report/units-in-can-bin',
                iconText: 'VP',
            },
            {
                name: 'Units In PMT Bin',
                path: '/warehouse/rpt/report/units-in-pmt-bin',
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
                name: 'BOT Tray',
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
        name: 'Assign for Display grading',
        icon: 'class',
        path: '/mis/assign-to-agent-for-display-grading',
        auth: authRoles.Mis,
        sales: true,
    },
    {
        name: 'STX Utility',
        icon: 'search',
        children: [
            // {
            //     name: 'Ctx to Stx Scan Uic',
            //     path: '/mis/stx-utility',
            //     iconText: 'VP',
            // },
            {
                name: 'Stx Utility Scan Uic',
                path: '/mis/stx-to-stx-utility',
                iconText: 'VP',
            },
            {
                name: 'Tray',
                path: '/mis/stx-utility-tray-view',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
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
            {
                name: 'Sales Stock (MUIC)',
                path: '/mis/report/sales-stock-with-muic',
                iconText: 'VP',
            },
            {
                name: 'Sales Stock (SUB-MUIC)',
                path: '/mis/report/sales-stock',
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
            {
                name: 'BOT to WHT',
                path: '/sorting/request',
                iconText: 'VP',
            },
            {
                name: 'WHT to RP',
                path: '/sorting/wht-to-rp/request',
                iconText: 'VP',
            },
            {
                name: 'Rp tray',
                path: '/sorting/wht-to-rp/rp-tray',
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
        name: 'Display Grading',
        icon: 'merge_type',
        path: '/sorting/display-grading-requests',
        auth: authRoles.sorting,
        sales: true,
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
        name: 'RDL-1 Requests',
        icon: 'class',
        path: '/rdl-1/tray',
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
        icon: 'repeat',
        children: [
            {
                name: 'Opened Packets',

                path: '/reporting/opened-packets',
            },
            {
                name: 'Total Packet Delivered',

                path: '/reporting/delivery/item',
            },
            {
                name: (
                    <Typography sx={{ textAlign: 'left' }}>
                        Units Available in Processing
                    </Typography>
                ),

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
                name: 'Bags Ready to BOT',
                path: '/reporting/bags/closed',
            },
            {
                name: 'Bags Issued to BOT',
                path: '/reporting/bags/issued',
            },
        ],
        sales: false,
        auth: authRoles.reporting,
    },

    {
        name: 'BOT-Tray',
        icon: 'shopping_cart',
        children: [
            {
                name: 'Sorting Pending',
                path: '/reporting/bot-tray/sorting-pending',
            },
            {
                name: 'Sorting In-progress',
                path: '/reporting/bot-tray/sorting-inprogress',
            },
        ],
        sales: false,
        auth: authRoles.reporting,
    },
    {
        name: 'Model Mismatch',
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
        name: 'Product Mismatch Tray',
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
                name: 'Rdl-1 Pending',
                path: '/reporting/wht/ready-for-rdl-1',
            },
            {
                name: 'RDL-1 In-Progress',
                path: '/reporting/wht/in-rdl-1',
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
                name: (
                    <Typography sx={{ textAlign: 'left' }}>
                        Sales Bucket Transfer Pending
                    </Typography>
                ),
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
        name: (
            <Typography sx={{ textAlign: 'left' }}>
                Weekly/Month Wise Purchase Report
            </Typography>
        ),
        icon: 'report',
        path: '/reporting/month-wise-purchase-details',
        sales: false,
        auth: authRoles.reporting,
    },
    {
        name: 'Unverified imei report',
        icon: 'report',
        path: '/reporting/unverified-imei',
        sales: 'all',
        auth: authRoles.reporting,
    },
    {
        name: 'Rdl-2 Output',
        icon: 'poll',
        path: '/reporting/rdl-2-output',
        sales: false,
        auth: authRoles.reporting,
    },
    {
        name: 'Track',
        icon: 'track_changes',
        children: [
            {
                name: 'Item Track',
                path: '/reporting/track-item',
            },
            {
                name: 'Tray Track',
                path: '/reporting/track-tray',
            },
            {
                name: 'Part Inventory Ledger',
                path: '/reporting/inventory-ledger',
            },
        ],
        sales: 'all',
        auth: authRoles.reporting,
    },
    {
        name: 'Rdl 1 Done Units',
        icon: 'art_track',
        path: '/reporting/rdl-1-done-units',
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
        path: '/rdl-2/tray',
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
        name: 'Ready for Sales',
        icon: 'class',
        children: [
            {
                name: 'Muic',
                path: '/sales/muic-basis-ready-for-sales',
            },
            {
                name: 'Sub Muic',
                path: '/sales/ready-for-sales',
            },
        ],
        sales: true,
        auth: authRoles.Sales_Agent,
    },

    {
        name: 'Buyers',
        icon: 'class',
        path: '/sales/Buyer-con-sales',
        auth: authRoles.Sales_Agent,
        sales: true,
    },
    // {
    //     name: 'Ready for sales units',
    //     icon: 'transform',
    //     path: '/sales/ready-for-sales-units',
    //     auth: authRoles.Sales_Agent,
    //     sales: true,
    // },
    {
        name: 'Ready for Pricing',
        icon: 'class',
        children: [
            {
                name: 'Muic',
                path: '/pricing/muic-base-ready-for-pricing',
            },
            {
                name: 'Sub Muic',
                path: '/pricing/ready-for-pricing',
            },
        ],
        sales: true,
        auth: authRoles.pricing_Agent,
    },
    {
        name: 'Ready for Sales',
        icon: 'class',
        children: [
            {
                name: 'Muic',
                path: '/pricing/muic-base-ready-for-sales',
            },
            {
                name: 'Sub Muic',
                path: '/pricing/ready-for-sales',
            },
        ],
        sales: true,
        auth: authRoles.pricing_Agent,
    },

    {
        name: 'Bagging',
        icon: 'save',
        path: '/bagging/bag/scan',
        auth: authRoles.bagging,
        sales: false,
    },
    {
        name: 'Sp tray',
        icon: 'shopping_cart',
        children: [
            {
                name: 'Part issue',
                path: '/sp-user/sp-tray',
            },
            {
                name: 'Issue to RDL-2',
                path: '/sp-user/ready-to-rdl-2',
            },
            {
                name: 'Return from RDL--2',
                path: '/sp-user/return-from-rdl-2',
            },
        ],
        sales: false,
        auth: authRoles.RMWAREHOUSE,
    },
    {
        name: 'Tools And Consumables',
        icon: 'pan_tool',
        children: [
            {
                name: 'Issue Requests',
                path: '/sp-user/requests-for-tools-and-consumables',
            },
        ],
        sales: false,
        auth: authRoles.RMWAREHOUSE,
    },
    {
        name: 'RPB Tray',
        icon: 'shopping_cart',
        path: '/rp-bqc/issued-trays',
        auth: authRoles.RPBQC,
        sales: false,
    },
    {
        name: 'Pending Items',
        icon: 'save',
        path: '/rp-bqc/pending-items',
        auth: authRoles.RPBQC,
        sales: false,
    },
    {
        name: 'RPA Tray',
        icon: 'shopping_cart',
        path: '/rp-audit/issued-trays',
        auth: authRoles.RPAUDIT,
        sales: false,
    },
    {
        name: 'Pending Items',
        icon: 'save',
        path: '/rp-audit/pending-items',
        auth: authRoles.RPAUDIT,
        sales: false,
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
