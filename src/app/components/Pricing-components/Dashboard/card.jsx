import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon, RepairIcon } from '@mui/material'
import jwt_decode from 'jwt-decode'
import { axiospricingAgent } from '../../../../axios'
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
                    let res = await axiospricingAgent.post(
                        '/dashboard/' + location
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
            icon: 'class',
            amount: count?.radyForPricing,
            title: 'Ready for Pricing (SUB MUIC)',
            units: count?.unitsCount,
            path: '/pricing/ready-for-pricing',
        },
        {
            icon: 'class',
            amount: count?.readyForPricingMuicBasis,
            title: 'Ready for Pricing (MUIC)',
            units: count?.unitsCountMuicBasis,
            path: '/pricing/muic-base-ready-for-pricing',
        },
        {
            icon: 'save',
            amount: count?.viewPriceCount,
            title: 'Ready for Sales (SUB MUIC)',
            units: count?.unitsCountSales,
            path: '/pricing/ready-for-sales',
        },
        {
            icon: 'save',
            amount: count?.viewPricedCountMuicBasis,
            title: 'Ready for Sales (MUIC)',
            units: count?.unitsCountSalesMuicBasis,
            path: '/pricing/muic-base-ready-for-sales',
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
                                <Paragraph sx={{ m: 0, color: textMuted }}>
                                    Units : {item?.units}
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
