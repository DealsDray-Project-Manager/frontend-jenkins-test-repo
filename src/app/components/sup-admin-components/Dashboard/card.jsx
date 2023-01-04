import React,{useEffect,useState} from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon } from '@mui/material'
import { axiosSuperAdminPrexo } from '../../../../axios'

const StatCard3 = () => {
    const [count,setCount]=useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post(
                    '/superAdminDashboard'
                )
                if(res.status == 200){
                    console.log(res.data.data);
                    setCount(res.data.data)
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])


    const statList = [
        {
            icon: 'people',
            amount: count.usersCount,
            title: 'Users',
        },
        {
            icon: 'location_on_outlined',
            amount: count.location,
            title: 'Locations',
        },
        {
            icon: 'home',
            amount:  count.warehouse,
            title: 'Warehouses',
        },
        {
            icon: 'branding_watermark',
            amount: count.brand,
            title: 'Brands',
        },
        {
            icon: 'shopping_cart',
            amount: count.products,
            title: 'Products',
        },
        {
            icon: 'add_shopping_cart',
            amount: count.bag,
            title: 'Bags',
        },
        {
            icon: 'add_shopping_cart',
            amount: count.tray,
            title: 'Trays',
        },
        {
            icon: 'battery_charging_full',
            amount: count.readyForCharging,
            title: 'Ready For Charging',
        },
        {
            icon: 'leak_remove',
            amount: count.removeInvalidItem,
            title: 'Remove invalid item',
        },
        {
            icon: 'art_track',
            amount: count.trackItem,
            title: 'Track Item',
        },
    ]
    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    return (
        <div>
            <Grid container spacing={3}>
                {statList.map((item, ind) => (
                    <Grid key={item.title} item md={3} sm={6} xs={12}>
                        <Card elevation={3} sx={{ p: '20px', display: 'flex' }}>
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
