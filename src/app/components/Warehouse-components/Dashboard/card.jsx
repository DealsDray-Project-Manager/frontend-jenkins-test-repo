import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon } from '@mui/material'
import { axiosWarehouseIn } from '../../../../axios'
import jwt_decode from 'jwt-decode'
import useAuth from 'app/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const StatCard3 = () => {
    const [count, setCount] = useState({})
    const { logout, user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            let user = localStorage.getItem('prexo-authentication')
            if (user) {
                let { location ,user_name} = jwt_decode(user)
                try {
                    let res = await axiosWarehouseIn.post(
                        `dashboard/${location}/${user_name}`
                    )
                    if (res.status === 200) {
                        setCount(res.data.data)
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonText: 'Ok',
                        text: error,
                    })
                }
            }
        }
        fetchData()
    }, [])
    const statList = [
        {
            icon: 'class',
            amount: count.bagIssueRequest,
            title: 'Bag Issue Request',
            path: '/wareshouse/bag/bag-issue-request',
            sales: false,
        },
        {
            icon: 'move_to_inbox',
            amount: count.issuedPmtAndMMt,
            title: 'Issued PMT and MMT',
            path: '/wareshouse/pmt-mmt/issued',
            sales: false,
        },
        {
            icon: 'class',
            amount: count.bagCloseRequest,
            title: 'Bag Close Request',
            path: '/wareshouse/bag/bag-close-requests',
            sales: false,
        },
        {
            icon: 'move_to_inbox',
            amount: count.trayCloseRequest,
            title: 'Tray Close Request',
            path: '/wareshouse/pmt-mmt/tray-close-request',
            sales: false,
        },

        {
            icon: 'new_releases',
            amount: count.botToRelease,
            title: 'BOT To Release',
            path: '/wareshouse/bot/release',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.whtTray,
            title: 'WHT tray',
            path: '/wareshouse/wht/tray',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.inusetWht,
            title: 'In Use WHT tray',
            path: '/wareshouse/wht/in-use',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.chargingRequest,
            title: 'Charging Request',
            path: '/wareshouse/wht/charging-request',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.inChargingWht,
            title: 'In-charging WHT',
            path: '/wareshouse/wht/in-charging',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.returnFromCharging,
            title: 'Return From Charging',
            path: '/wareshouse/wht/return-from-charging',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.bqcRequest,
            title: 'BQC Request',
            path: '/wareshouse/wht/bqc-request',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.returnFromBqc,
            title: 'Return From BQC',
            path: '/wareshouse/wht/return-from-bqc',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.readyForAudit,
            title: 'Ready for Audit',
            path: '/wareshouse/wht/ready-for-audit',
            sales: false,
        },

        {
            icon: 'shopping_cart',
            amount: count.auditRequest,
            title: 'Audit Request',
            path: '/wareshouse/wht/audit-request',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.otherTrayAuditDone,
            title: 'Return from Audit',
            path: '/wareshouse/wht/return-from-audit',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.rdlFlsRequest,
            title: 'RDL-One Requests',
            path: '/wareshouse/wht/rdl-fls-request',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.returnFromRdlFls,
            title: 'Return from RDL-One',
            path: '/wareshouse/wht/return-from-rdl-fls',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.allRpTray,
            title: 'RPT Tray',
            path: '/warehouse/rpt-tray',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.rdlTwoRequests,
            title: 'RDL-two Requests',
            path: '/wareshouse/rpt/rdl-two-request',
            sales: false,
        },
      
        {
            icon: 'shopping_cart',
            amount: count.returnFromRdlTwo,
            title: 'Return from RDL-two',
            path: '/warehouse/rpt/return-from-rdl-two',
            sales: false,
        },
        {
            icon: 'sort',
            amount: count.sortingRequest,
            title: 'Sorting Request (BOT)',
            path: '/wareshouse/sorting/request',
            sales: false,
        },
        {
            icon: 'sort',
            amount: count.inSortingWht,
            title: 'In Sorting WHT',
            path: '/wareshouse/wht/in-sorting',
            sales: false,
        },
        {
            icon: 'sort',
            amount: count.returnFromSorting,
            title: 'Sorting Done (WHT)',
            path: '/wareshouse/sorting/return-from-sorting',
            sales: false,
        },
        {
            icon: 'sort',
            amount: count.whtToRpSortingRequest,
            title: 'Sorting Request (WHT to RP)',
            path: '/wareshouse/sorting/wht-to-rp',
            sales: false,
        },
        {
            icon: 'sort',
            amount: count.returnFromWhtToRpSorting,
            title: 'Sorting Done (WHT to RP)',
            path: '/warehouse/sorting/return-from-wht-to-rp',
            sales: false,
        },
        {
            icon: 'sort',
            amount: count.ctxToStxSortRequest,
            title: 'Sorting Request (CTX)',
            path: '/wareshouse/sorting/ctx/request',
            sales: true,
        },
        {
            icon: 'sort',
            amount: count.sortingDoneCtxToStx,
            title: 'Sorting Done (CTX/STX)',
            path: '/wareshouse/sorting/ctx-to-stx/return-from-sorting',
            sales: true,
        },
        {
            icon: 'merge_type',
            amount: count.mergeRequest,
            title: 'Merge Request',
            path: '/wareshouse/merge/request',
            sales: 'all',
        },
        {
            icon: 'merge_type',
            amount: count.returnFromMerge,
            title: 'Return From Merge',
            path: '/wareshouse/merge/return-from-merge',
            sales: 'all',
        },
        {
            icon: 'merge_type',
            amount: count.pickupRequest,
            title: 'Pickup Request',
            path: '/wareshouse/wht/pickup/request',
            sales: false,
        },
        {
            icon: 'merge_type',
            amount: count.returnFromPickup,
            title: 'Return From Pickup',
            path: '/wareshouse/wht/pickup/return-from-pickup',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.allCtxTray,
            title: 'CTX Tray',
            path: '/wareshouse/ctx/all',
            sales: 'all',
        },
        {
            icon: 'shopping_cart',
            amount: count.allStxtray,
            title: 'STX Tray',
            path: '/wareshouse/stx/all',
            sales: true,
        },
        {
            icon: 'shopping_cart',
            amount: count.ctxTransferRequest,
            title: 'CTX Transfer Request',
            path: '/wareshouse/ctx/transfer/request',
            sales: 'all',
        },
        {
            icon: 'shopping_cart',
            amount: count.ctxReceiveRequest,
            title: 'CTX Receive Request',
            path: '/wareshouse/ctx/receive/request',
            sales: 'all',
        },
        {
            icon: 'shopping_cart',
            amount: count.rackChangeStockOut,
            title: 'Rack Change Scan Out',
            path: '/warehouse/rack-change/scan-out',
            sales: 'all',
        },
        {
            icon: 'shopping_cart',
            amount: count.rackChangeStockin,
            title: 'Rack Change Scan In',
            path: '/warehouse/rack-change/scan-in',
            sales: 'all',
        },
        {
            icon: 'shopping_cart',
            amount: count.copyGradingRequest,
            title: 'Copy Grading Requests',
            path: '/warehouse/stx/copy-grading-issue-requests',
            sales: true,
        },
        {
            icon: 'shopping_cart',
            amount: count.returnFromCopyGrading,
            title: 'Return From Copy Grading',
            path: '/warehouse/stx/return-from-copy-grading',
            sales: true,
        },
    ]

    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    return (
        <div>
            <Grid container spacing={3}>
                {statList.map((item, ind) =>
                    item?.sales == 'all' ? (
                        <Grid key={item.title} item md={3} sm={6} xs={12}>
                            <Card
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => navigate(item.path)}
                                elevation={3}
                                sx={{ p: '20px', display: 'flex' }}
                            >
                                <div>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            padding: '8px',
                                            background: 'rgba(0, 0, 0, 0.01)',
                                        }}
                                    >
                                        <Icon sx={{ color: textMuted }}>
                                            {item.icon}
                                        </Icon>
                                    </IconButton>
                                </div>
                                <Box ml={2}>
                                    <H3 sx={{ mt: '-4px', fontSize: '32px' }}>
                                        {item.amount}
                                    </H3>
                                    <Paragraph sx={{ m: 0, color: textMuted }}>
                                        {item.title}
                                    </Paragraph>
                                </Box>
                            </Card>
                        </Grid>
                    ) : item?.sales == true && user.cpc_type == 'Sales' ? (
                        <Grid key={item.title} item md={3} sm={6} xs={12}>
                            <Card
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => navigate(item.path)}
                                elevation={3}
                                sx={{ p: '20px', display: 'flex' }}
                            >
                                <div>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            padding: '8px',
                                            background: 'rgba(0, 0, 0, 0.01)',
                                        }}
                                    >
                                        <Icon sx={{ color: textMuted }}>
                                            {item.icon}
                                        </Icon>
                                    </IconButton>
                                </div>
                                <Box ml={2}>
                                    <H3 sx={{ mt: '-4px', fontSize: '32px' }}>
                                        {item.amount}
                                    </H3>
                                    <Paragraph sx={{ m: 0, color: textMuted }}>
                                        {item.title}
                                    </Paragraph>
                                </Box>
                            </Card>
                        </Grid>
                    ) : item?.sales == false && user.cpc_type !== 'Sales' ? (
                        <Grid key={item.title} item md={3} sm={6} xs={12}>
                            <Card
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => navigate(item.path)}
                                elevation={3}
                                sx={{ p: '20px', display: 'flex' }}
                            >
                                <div>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            padding: '8px',
                                            background: 'rgba(0, 0, 0, 0.01)',
                                        }}
                                    >
                                        <Icon sx={{ color: textMuted }}>
                                            {item.icon}
                                        </Icon>
                                    </IconButton>
                                </div>
                                <Box ml={2}>
                                    <H3 sx={{ mt: '-4px', fontSize: '32px' }}>
                                        {item.amount}
                                    </H3>
                                    <Paragraph sx={{ m: 0, color: textMuted }}>
                                        {item.title}
                                    </Paragraph>
                                </Box>
                            </Card>
                        </Grid>
                    ) : null
                )}
            </Grid>
        </div>
    )
}

export default StatCard3
