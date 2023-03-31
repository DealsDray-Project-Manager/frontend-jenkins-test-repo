import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon, RepairIcon } from '@mui/material'
import jwt_decode from 'jwt-decode'
import { axiosMisUser, axiosReportingAgent } from '../../../../axios'
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
                    let res = await axiosReportingAgent.post(
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
            icon: 'reorder',
            amount: count.allOrders,
            title: 'All Orders',
            path: '/reporting/all-orders',
        },
        {
            icon: 'reorder',
            amount: count.deliveredOrder,
            title: 'Delivered Orders',
            path: '/reporting/delivered-orders',
        },
        {
            icon: 'reorder',
            amount: count.notDeliveredOrders,
            title: 'Not Delivered Orders',
            path: '/reporting/not-delivered-orders',
        },
        {
            icon: 'reorder',
            amount: count.processingUnits,
            title: 'Processing Units',
            path: '/reporting/units/processing',
        },
        {
            icon: 'reorder',
            amount: count.readyForSale,
            title: 'Ready for Sales',
            path: '/reporting/units/ready-for-sales',
        },
        {
            icon: 'class',
            amount: count.closedBag,
            title: 'Bag Ready to Bot',
            path: '/reporting/bags/closed',
        },
        {
            icon: 'shopping_cart',
            amount: count.sortingPendingBot,
            title: 'Bot Tray Ready to Sorting',
            path: '/reporting/bot-tray/sorting-pending',
        },
        {
            icon: 'shopping_cart',
            amount: count.mmtTray,
            title: 'MMT Tray',
            path: '/reporting/mmt-tray',
        },
        {
            icon: 'shopping_cart',
            amount: count.pmtTray,
            title: 'PMT Tray',
            path: '/reporting/pmt-tray',
        },
        {
            icon: 'shopping_cart',
            amount: count.inuseWht,
            title: 'Inuse Wht',
            path: '/reporting/wht/inuse',
        },
        {
            icon: 'shopping_cart',
            amount: count.readyToMerge,
            title: 'Wht Ready to Merge',
            path: '/reporting/wht/ready-for-merge',
        },
        {
            icon: 'shopping_cart',
            amount: count.readyToCharge,
            title: 'Ready to Charge',
            path: '/reporting/wht/ready-for-charge',
        },
        {
            icon: 'shopping_cart',
            amount: count.readyToBqc,
            title: 'Ready for Bqc',
            path: '/reporting/wht/ready-for-bqc',
        },
        {
            icon: 'shopping_cart',
            amount: count.readyToAudit,
            title: 'Ready for Audit',
            path: '/reporting/wht/ready-for-audit',
        },
        {
            icon: 'shopping_cart',
            amount: count.readyToRdlFls,
            title: 'Ready for Rdl-fls',
            path: '/reporting/wht/ready-for-rdl-fls',
        },
    ]
    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    return (
        <div>
            <Grid container spacing={3}>
                {statList?.map((item, ind) => (
                    <Grid key={item?.title} item md={3} sm={6} xs={12}>
                        <Card
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                                navigate(item?.path)
                            }}
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
                                        {item?.icon}
                                    </Icon>
                                </IconButton>
                            </div>
                            <Box ml={2}>
                                <H3 sx={{ mt: '-4px', fontSize: '32px' }}>
                                    {item?.amount}
                                </H3>
                                <Paragraph sx={{ m: 0, color: textMuted }}>
                                    {item?.title}
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
