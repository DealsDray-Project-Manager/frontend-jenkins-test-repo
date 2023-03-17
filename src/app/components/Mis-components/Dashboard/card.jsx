import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon } from '@mui/material'
import { axiosMisUser } from '../../../../axios'
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
                    let res = await axiosMisUser.post(
                        '/dashboardData/' + location
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
            icon: 'reorder',
            amount: count.orders,
            title: 'Orders',
            path: '/mis/orders',
        },
        {
            icon: 'reorder',
            amount: count.badOrders,
            title: 'Bad Orders',
            path: '/mis/bad-orders',
        },
        {
            icon: 'reorder',
            amount: count.delivered,
            title: 'Delivered Orders',
            path: '/mis/recon-sheet/delivered-orders',
        },
        {
            icon: 'reorder',
            amount: count.notDelivered,
            title: 'Not Delivered Orders',
            path: '/mis/recon-sheet/not-delivered-orders',
        },
        {
            icon: 'shopping_cart',
            amount: count.delivery,
            title: 'Delivery',
            path: '/mis/delivery',
        },
        {
            icon: 'shopping_cart',
            amount: count.badDelivery,
            title: 'Bad Delivery',
            path: '/mis/bad-delivery',
        },
        {
            icon: 'format_indent_decrease',
            amount: count.uicGented,
            title: 'UIC Generated',
            path: '/mis/uic-manage/uic-generated',
        },
        {
            icon: 'format_indent_decrease',
            amount: count.uicNotGenrated,
            title: 'UIC Not Generated',
            path: '/mis/uic-manage/uic-not-generated',
        },
        {
            icon: 'format_indent_decrease',
            amount: count.uicDownloaded,
            title: 'UIC Downloaded',
            path: '/mis/uic-manage/uic-downloaded',
        },
        {
            icon: 'assignment',
            amount: count.assigBot,
            title: 'Assign To Bot',
            path: '/mis/assign-to-agent/bot',
        },
        {
            icon: 'assignment',
            amount: count.assigCharging,
            title: 'Assign To Charging',
            path: '/mis/assign-to-agent/charging',
        },
        {
            icon: 'assignment',
            amount: count.bqc,
            title: 'Assign To BQC',
            path: '/mis/assign-to-agent/bqc',
        },
        {
            icon: 'assignment',
            amount: count.audit,
            title: 'Assign To Audit',
            path: '/mis/assign-to-agent/audit',
        },
        
        {
            icon: 'art_track',
            amount: count.rdl,
            title: 'Assign To RDL-FLS',
            path: '/mis/assign-to-agent/Rdl-fls',
        },
        {
            icon: 'art_track',
            amount: count.rdl_two,
            title: 'Assign To RDL-Repair',
            path: '/mis/assign-to-agent/Rdl-repair',
        },
        {
            icon: 'sort',
            amount: count.botToWht,
            title: 'BOT To WHT',
            path: '/mis/sorting/bot-to-wht',
        },
        {
            icon: 'merge_type',
            amount: count.whtMerge,
            title: 'WHT Merge',
            path: '/mis/merge/wht',
        },
        {
            icon: 'merge_type',
            amount: count.mmtMerge,
            title: 'MMT Merge',
            path: '/mis/merge/mmt',
        },
        {
            icon: 'merge_type',
            amount: count.readyToTransfer,
            title: 'Transfer CTX',
            path: '/mis/ctx/transfer',
        },
        {
            icon: 'art_track',
            amount: count.trackItem,
            title: 'Track Item',
            path: '/mis/track/item',
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
