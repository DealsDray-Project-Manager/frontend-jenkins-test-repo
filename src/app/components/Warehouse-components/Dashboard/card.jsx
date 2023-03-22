import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon } from '@mui/material'
import { axiosWarehouseIn } from '../../../../axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const StatCard3 = () => {
    const [count, setCount] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            let user = localStorage.getItem('prexo-authentication')
            if (user) {
                let { location } = jwt_decode(user)
                try {
                    let res = await axiosWarehouseIn.post(
                        '/dashboard/' + location
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
        },
        {
            icon: 'move_to_inbox',
            amount: count.issuedPmtAndMMt,
            title: 'Issued PMT and MMT',
            path: '/wareshouse/pmt-mmt/issued',
        },
        {
            icon: 'class',
            amount: count.bagCloseRequest,
            title: 'Bag Close Request',
            path: '/wareshouse/bag/bag-close-requests',
        },
        {
            icon: 'move_to_inbox',
            amount: count.trayCloseRequest,
            title: 'Tray Close Request',
            path: '/wareshouse/pmt-mmt/tray-close-request',
        },

        {
            icon: 'new_releases',
            amount: count.botToRelease,
            title: 'BOT To Release',
            path: '/wareshouse/bot/release',
        },
        {
            icon: 'shopping_cart',
            amount: count.whtTray,
            title: 'WHT tray',
            path: '/wareshouse/wht/tray',
        },
        {
            icon: 'shopping_cart',
            amount: count.inusetWht,
            title: 'In Use WHT tray',
            path: '/wareshouse/wht/in-use',
        },
        {
            icon: 'shopping_cart',
            amount: count.chargingRequest,
            title: 'Charging Request',
            path: '/wareshouse/wht/charging-request',
        },
        {
            icon: 'shopping_cart',
            amount: count.inChargingWht,
            title: 'In-charging WHT',
            path: '/wareshouse/wht/in-charging',
        },
        {
            icon: 'shopping_cart',
            amount: count.returnFromCharging,
            title: 'Return From Charging',
            path: '/wareshouse/wht/return-from-charging',
        },
        {
            icon: 'shopping_cart',
            amount: count.bqcRequest,
            title: 'BQC Request',
            path: '/wareshouse/wht/bqc-request',
        },
        {
            icon: 'shopping_cart',
            amount: count.returnFromBqc,
            title: 'Return From BQC',
            path: '/wareshouse/wht/return-from-bqc',
        },
        {
            icon: 'shopping_cart',
            amount: count.readyForAudit,
            title: 'Ready for Audit',
            path: '/wareshouse/wht/ready-for-audit',
        },

        {
            icon: 'shopping_cart',
            amount: count.auditRequest,
            title: 'Audit Request',
            path: '/wareshouse/wht/audit-request',
        },
        {
            icon: 'shopping_cart',
            amount: count.otherTrayAuditDone,
            title: 'Return from Audit',
            path: '/wareshouse/wht/return-from-audit',
        },
        {
            icon: 'shopping_cart',
            amount: count.rdlFlsRequest,
            title: 'RDL-FLS Requests',
            path: '/wareshouse/wht/rdl-fls-request',
        },
        {
            icon: 'shopping_cart',
            amount: count.returnFromRdlFls,
            title: 'Return from RDL-FLS',
            path: '/wareshouse/wht/return-from-rdl-fls',
        },
        {
            icon: 'sort',
            amount: count.sortingRequest,
            title: 'Sorting Request',
            path: '/wareshouse/sorting/request',
        },
        {
            icon: 'sort',
            amount: count.inSortingWht,
            title: 'In Sorting WHT',
            path: '/wareshouse/wht/in-sorting',
        },
        {
            icon: 'sort',
            amount: count.returnFromSorting,
            title: 'Return From Sorting',
            path: '/wareshouse/sorting/return-from-sorting',
        },
        {
            icon: 'merge_type',
            amount: count.mergeRequest,
            title: 'Merge Request',
            path: '/wareshouse/merge/request',
        },
        {
            icon: 'merge_type',
            amount: count.returnFromMerge,
            title: 'Return From Merge',
            path: '/wareshouse/merge/return-from-merge',
        },
        {
            icon: 'merge_type',
            amount: count.pickupRequest,
            title: 'Pickup Request',
            path: '/wareshouse/wht/pickup/request',
        },
        {
            icon: 'merge_type',
            amount: count.returnFromPickup,
            title: 'Return From Pickup',
            path: '/wareshouse/wht/pickup/return-from-pickup',
        },
        {
            icon: 'shopping_cart',
            amount: count.allCtxTray,
            title: 'CTX Tray',
            path: '/wareshouse/ctx/all',
        },
        {
            icon: 'shopping_cart',
            amount: count.ctxTransferRequest,
            title: 'CTX Transfer Request',
            path: '/wareshouse/ctx/transfer/request',
        },
        {
            icon: 'shopping_cart',
            amount: count.ctxTransferRequest,
            title: 'CTX Transfer Receive',
            path: '/wareshouse/ctx/receive/request',
        },
    ]

    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    return (
        <div>
            <Grid container spacing={3}>
                {statList.map((item, ind) => (
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
                ))}
            </Grid>
        </div>
    )
}

export default StatCard3
