import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon, RepairIcon } from '@mui/material'
import jwt_decode from 'jwt-decode'
import { axiosSalsAgent } from '../../../../axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const StatCard3 = () => {
    const [count, setCount] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            let user = localStorage.getItem('prexo-authentication')
            if (user) {
                let { location, user_name } = jwt_decode(user)

                try {
                    let res = await axiosSalsAgent.post(
                        '/dashboard/' + location + '/' + user_name
                    )
                    if (res?.status === 200) {
                        setCount(res?.data.data)
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
            icon: 'branding_watermark',
            amount: count?.viewPriceCount,
            title: 'Ready for sales (SUB MUIC)',
            path: '/sales/ready-for-sales',
        },
        {
            icon: 'branding_watermark',
            amount: count?.viewPriceCountMuicBasis,
            title: 'Ready for sales (MUIC)',
            path: '/sales/muic-basis-ready-for-sales',
        },
        {
            icon: 'branding_watermark',
            amount: count.buyerCount,
            title: 'Buyer',
            path: '/sales/Buyer-con-sales',
        },
        // {
        //     icon: 'branding_watermark',
        //     amount: count.readyForSalesCount,
        //     title: 'Ready for sales uint',
        //     path: '/sales/ready-for-sales-units',
        // },
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
