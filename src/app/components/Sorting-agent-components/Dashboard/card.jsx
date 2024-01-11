import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon } from '@mui/material'
import jwt_decode from 'jwt-decode'
import { axiosSortingAgent } from '../../../../axios'
import { useNavigate } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import Swal from 'sweetalert2'

const StatCard3 = () => {
    const [count, setCount] = useState({})
    const navigate = useNavigate()
    const { logout, user } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            let user = localStorage.getItem('prexo-authentication')
            if (user) {
                let { user_name } = jwt_decode(user)
                try {
                    let res = await axiosSortingAgent.post(
                        '/dashboard/' + user_name
                    )
                    if (res.status === 200) {
                        setCount(res.data.data)
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    })
                }
            }
        }
        fetchData()
    }, [])

    const statList = [
        {
            icon: 'sort',
            amount: count.sorting,
            title: 'Sorting Requests BOT-WHT',
            path: '/sorting/request',
            sales: false,
        },
        {
            icon: 'sort',
            amount: count.ctxtoStxSorting,
            title: 'Sorting Requests CTX-STX',
            path: '/sorting/ctx/request',
            sales: true,
        },
        {
            icon: 'merge_type',
            amount: count.merge,
            title: 'Tray Merge',
            path: '/sorting/merge',
            sales: 'all',
        },
        {
            icon: 'merge_type',
            amount: count.displayGradingRequest,
            title: 'Display Grading',
            path: '/sorting/display-grading-requests',
            sales: true,
        },
        {
            icon: 'merge_type',
            amount: count.pickup,
            title: 'Pickup From Tray',
            path: '/sorting/pickup/request',
            sales: false,
        },
        {
            icon: 'merge_type',
            amount: count.pickupToTray,
            title: 'Pickup To Tray',
            path: '/sorting/pickup/to-tray',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.whtToRpTraySorting,
            title: 'WHT to RP Sorting',
            path: '/sorting/wht-to-rp/request',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.rpTrayCount,
            title: 'RP Tray',
            path: '/sorting/wht-to-rp/rp-tray',
            sales: false,
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
