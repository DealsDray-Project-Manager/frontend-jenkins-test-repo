import { authRoles } from 'app/auth/authRoles'

export const navigations = [
    {
        name: 'Dashboard',
        path: '/sup-admin/dashboard',
        icon: 'dashboard',
        auth: authRoles.admin, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/mis/dashboard',
        icon: 'dashboard',
        auth: authRoles.Mis, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/warehouse/dashboard',
        icon: 'dashboard',
        auth: authRoles.Warehouse, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/bot/dashboard',
        icon: 'dashboard',
        auth: authRoles.bot, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/sorting/dashboard',
        icon: 'dashboard',
        auth: authRoles.sorting, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/charging/dashboard',
        icon: 'dashboard',
        auth: authRoles.charging, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/audit/dashboard',
        icon: 'dashboard',
        auth: authRoles.audit, // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Dashboard',
        path: '/bqc/dashboard',
        icon: '',
        auth: authRoles.bqc, // ONLY SUPER ADMIN(SA) CAN ACCESS
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
        name: 'Users',
        icon: 'people',
        path: '/sup-admin/users',
        auth: authRoles.admin,
    },
    {
        name: 'Locations',
        icon: 'location_on_outlined',
        path: '/sup-admin/location',
        auth: authRoles.admin,
    },
    {
        name: 'Warehouses',
        icon: 'home',
        path: '/sup-admin/warehouse',
        auth: authRoles.admin,
    },
    {
        name: 'Brands',
        icon: 'branding_watermark',
        path: '/sup-admin/brands',
        auth: authRoles.admin,
    },
    {
        name: 'Products',
        icon: 'shopping_cart',
        path: '/sup-admin/products',
        auth: authRoles.admin,
    },
    {
        name: 'Bags',
        icon: 'add_shopping_cart',
        path: '/sup-admin/bag',
        auth: authRoles.admin,
    },
    {
        name: 'Trays',
        icon: 'add_shopping_cart',
        path: '/sup-admin/tray',
        auth: authRoles.admin,
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
    },

    {
        name: 'Remove invalid item',
        icon: 'leak_remove',
        path: '/sup-admin/remove-invalid-item',
        auth: authRoles.admin,
    },
    {
        name: 'Ready for RDL',
        icon: 'low_priority',
        path: '/sup-admin/ready-for-rdl',
        auth: authRoles.admin,
    },
    {
        name: 'Track item',
        icon: 'art_track',
        path: '/sup-admin/track-item',
        auth: authRoles.admin,
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
        ],
        auth: authRoles.Mis,
    },
    {
        name: 'Sorting',
        icon: 'sort',
        children: [
            {
                name: 'Bot to Wht',
                path: '/mis/sorting/bot-to-wht',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Mis,
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
                name: 'Pickup',
                path: '/mis/merge/pickup',
                iconText: 'NP',
            },
        ],
        auth: authRoles.Mis,
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
    },
    {
        name: 'WHT Utility',
        icon: 'search',
        path: '/mis/imei-search',
        // children: [
        //     {
        //         name: 'Search',
        //         path: '/mis/imei-search/search',
        //         iconText: 'VP',
        //     },
        // ],
        auth: authRoles.Mis,
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
        ],
        auth: authRoles.Warehouse,
    },
    {
        name: 'Sorting',
        icon: 'sort',
        children: [
            {
                name: 'Sorting Request',
                path: '/wareshouse/sorting/request',
                iconText: 'VP',
            },
            {
                name: 'In-Sorting WHT',
                path: '/wareshouse/wht/in-sorting',
                iconText: 'VP',
            },
            {
                name: 'Return From Sorting',
                path: '/wareshouse/sorting/return-from-sorting',
                iconText: 'VP',
            },
        ],
        auth: authRoles.Warehouse,
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
    },
    {
        name: 'CTX',
        icon: 'shopping_cart',
        path: '/wareshouse/ctx/all',
        auth: authRoles.Warehouse,
    },
    {
        name: 'Bag',
        icon: 'class',
        path: '/bot/bag',
        auth: authRoles.bot,
    },
    {
        name: 'Tray',
        icon: 'shopping_cart',
        path: '/bot/tray',
        auth: authRoles.bot,
    },
    {
        name: 'Sorting Request',
        icon: 'sort',
        path: '/sorting/request',
        auth: authRoles.sorting,
    },
    {
        name: 'Tray Merge',
        icon: 'merge_type',
        path: '/sorting/merge',
        auth: authRoles.sorting,
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
    },

    {
        name: 'Charging Request',
        icon: 'battery_charging_full',
        path: '/charging/tray',
        auth: authRoles.charging,
    },
    {
        name: 'Bqc Request',
        icon: '',
        path: '/bqc/tray',
        auth: authRoles.bqc,
    },
    {
        name: 'Audit Request',
        icon: 'settings_system_daydream',
        path: '/audit/audit-request',
        auth: authRoles.audit,
    },
    {
        name: 'Assigned Tray',
        icon: 'settings_system_daydream',
        path: '/audit/assigned-tray',
        auth: authRoles.audit,
    },

    // {
    //     name: 'Orders',
    //     icon: 'folder',
    //     children: [
    //         {
    //             name: 'Order List',
    //             path: '/pages/order-list',
    //             iconText: 'OL',
    //         },
    //         {
    //             name: 'View Order',
    //             path: '/invoice/fdskfjdsuoiucrwevbgd',
    //             iconText: 'VO',
    //         },
    //     ],
    // },
    // {
    //     name: 'Help Center',
    //     icon: 'help',
    //     children: [
    //         {
    //             name: 'FAQ 1',
    //             path: '/pages/faq-1',
    //             iconText: 'F1',
    //         },
    //         {
    //             name: 'FAQ 2',
    //             path: '/pages/faq-2',
    //             iconText: 'F2',
    //         },
    //     ],
    // },
    // {
    //     name: 'Pricing',
    //     icon: 'money',

    //     children: [
    //         {
    //             name: 'Pricing 1',
    //             iconText: 'P1',
    //             path: '/others/pricing-1',
    //         },
    //         {
    //             name: 'Pricing 2',
    //             iconText: 'P2',
    //             path: '/others/pricing-2',
    //         },
    //         {
    //             name: 'Pricing 3',
    //             iconText: 'P3',
    //             path: '/others/pricing-3',
    //         },
    //         {
    //             name: 'Pricing 4',
    //             iconText: 'P4',
    //             path: '/others/pricing-4',
    //         },
    //     ],
    // },
    // {
    //     name: 'User List',
    //     icon: 'people',
    //     children: [
    //         {
    //             name: 'User List 1',
    //             path: '/pages/user-list-1',
    //             iconText: 'U1',
    //         },
    //         {
    //             name: 'User List 2',
    //             path: '/pages/user-list-2',
    //             iconText: 'U2',
    //         },
    //         {
    //             name: 'User List 3',
    //             path: '/pages/user-list-3',
    //             iconText: 'U3',
    //         },
    //         {
    //             name: 'User List 4',
    //             path: '/pages/user-list-4',
    //             iconText: 'U3',
    //         },
    //     ],
    // },
    // {
    //     name: 'Forms',
    //     icon: 'description',

    //     children: [
    //         {
    //             name: 'Order Form',
    //             path: '/forms/order-form',
    //             iconText: 'OF',
    //         },
    //         {
    //             name: 'Invoice Form',
    //             path: '/forms/invoice-form',
    //             iconText: 'IF',
    //         },
    //         {
    //             name: 'Property Listing Form',
    //             path: '/forms/property-listing-form',
    //             iconText: 'PF',
    //         },
    //         {
    //             name: 'Basic',
    //             path: '/forms/basic',
    //             iconText: 'B',
    //         },
    //         {
    //             name: 'Upload',
    //             path: '/forms/upload',
    //             iconText: 'U',
    //         },
    //         {
    //             name: 'Wizard',
    //             path: '/forms/wizard',
    //             iconText: 'W',
    //         },
    //     ],
    // },
    // {
    //     name: 'Matx List',
    //     icon: 'list',

    //     children: [
    //         {
    //             name: 'List',
    //             path: '/matx-list',
    //             iconText: 'L',
    //         },
    //     ],
    // },
    // {
    //     name: 'Session/Auth',
    //     icon: 'security',
    //     children: [
    //         {
    //             name: 'Sign in',
    //             iconText: 'SI',
    //             path: '/session/signin',
    //         },
    //         {
    //             name: 'Sign up',
    //             iconText: 'SU',
    //             path: '/session/signup',
    //         },
    //         {
    //             name: 'Forgot Password',
    //             iconText: 'FP',
    //             path: '/session/forgot-password',
    //         },
    //         {
    //             name: 'Error',
    //             iconText: '404',
    //             path: '/session/404',
    //         },
    //     ],
    // },
    // {
    //     name: 'Left Sidebar Card',
    //     path: '/page-layouts/Left-sidebar-card',
    //     icon: 'vertical_split',
    // },
    // {
    //     name: 'User Profile',
    //     path: '/page-layouts/user-profile',
    //     icon: 'person',
    // },

    // {
    //     label: 'Apps',
    //     type: 'label',
    // },
    // {
    //     name: 'Ecommerce',
    //     icon: 'shopping_basket',

    //     children: [
    //         {
    //             name: 'Shop',
    //             path: '/ecommerce/shop',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Cart',
    //             path: '/ecommerce/cart',
    //             iconText: 'C',
    //         },
    //         {
    //             name: 'Checkout',
    //             path: '/ecommerce/checkout',
    //             iconText: 'CO',
    //         },
    //     ],
    // },
    // {
    //     name: 'Scrum Board',
    //     icon: 'group_work',
    //     path: '/scrum-board/c5d7498bbcb84d81fc7454448871ac6a6e',
    // },
    // {
    //     name: 'Invoice Builder',
    //     icon: 'receipt',
    //     path: '/invoice/list',
    // },
    // {
    //     name: 'Calendar',
    //     icon: 'date_range',
    //     path: '/calendar',
    // },
    // {
    //     name: 'Chat',
    //     icon: 'chat',
    //     path: '/chat',
    // },
    // {
    //     name: 'Inbox',
    //     icon: 'inbox',
    //     path: '/inbox',
    // },
    // {
    //     name: 'Todo',
    //     icon: 'center_focus_strong',
    //     path: '/todo/list',
    // },
    // {
    //     label: 'Tables',
    //     type: 'label',
    // },
    // {
    //     name: 'CRUD Table',
    //     icon: 'format_list_bulleted',
    //     path: '/crud-table',
    // },
    // {
    //     name: 'Data Table',
    //     icon: 'table_view',

    //     children: [
    //         {
    //             name: 'Simple Mui Table',
    //             path: '/data-table/simple-mui-table',
    //             iconText: 'T1',
    //         },
    //         {
    //             name: 'Expandable Mui Table',
    //             path: '/data-table/expandable-mui-table',
    //             iconText: 'T2',
    //         },
    //     ],
    // },
    // {
    //     label: 'Components',
    //     type: 'label',
    // },
    // {
    //     name: 'Components',
    //     icon: 'favorite',
    //     badge: { value: '30+', color: 'secondary' },
    //     children: [
    //         {
    //             name: 'Auto Complete',
    //             path: '/material/autocomplete',
    //             iconText: 'A',
    //         },
    //         {
    //             name: 'Buttons',
    //             path: '/material/buttons',
    //             iconText: 'B',
    //         },
    //         {
    //             name: 'Checkbox',
    //             path: '/material/checkbox',
    //             iconText: 'C',
    //         },
    //         {
    //             name: 'Dialog',
    //             path: '/material/dialog',
    //             iconText: 'D',
    //         },
    //         {
    //             name: 'Drag and Drop',
    //             iconText: 'D',
    //             path: '/others/drag-and-drop',
    //         },
    //         {
    //             name: 'Expansion Panel',
    //             path: '/material/expansion-panel',
    //             iconText: 'E',
    //         },
    //         {
    //             name: 'Form',
    //             path: '/material/form',
    //             iconText: 'F',
    //         },
    //         {
    //             name: 'Icons',
    //             path: '/material/icons',
    //             iconText: 'I',
    //         },
    //         {
    //             name: 'Menu',
    //             path: '/material/menu',
    //             iconText: 'M',
    //         },
    //         {
    //             name: 'Progress',
    //             path: '/material/progress',
    //             iconText: 'P',
    //         },
    //         {
    //             name: 'Radio',
    //             path: '/material/radio',
    //             iconText: 'R',
    //         },
    //         {
    //             name: 'Switch',
    //             path: '/material/switch',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Slider',
    //             path: '/material/slider',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Snackbar',
    //             path: '/material/snackbar',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Table',
    //             path: '/material/table',
    //             iconText: 'T',
    //         },
    //     ],
    // },
    // {
    //     name: 'Map',
    //     icon: 'add_location',
    //     path: '/map',
    // },
    // {
    //     label: 'Charts',
    //     type: 'label',
    // },
    // {
    //     name: 'Charts',
    //     icon: 'trending_up',

    //     children: [
    //         {
    //             name: 'Echarts',
    //             path: '/charts/echarts',
    //             iconText: 'E',
    //         },
    //         {
    //             name: 'Recharts',
    //             path: '/charts/recharts',
    //             iconText: 'R',
    //         },
    //         {
    //             name: 'Apex Charts',
    //             path: '/charts/apex-charts',
    //             iconText: 'A',
    //         },
    //     ],
    // },
    // {
    //     name: 'Documentation',
    //     icon: 'launch',
    //     type: 'extLink',
    //     path: 'http://demos.ui-lib.com/matx-react-doc/',
    // },
]
export const getfilteredNavigations = (navList = [], role) => {
    return navList.reduce((array, nav) => {
        if (nav.auth) {
            if (nav.auth.includes(role)) {
                array.push(nav)
            }
        } else {
            if (nav.children) {
                nav.children = getfilteredNavigations(nav.children, role)
                array.push(nav)
            } else {
                array.push(nav)
            }
        }
        return array
    }, [])
}
