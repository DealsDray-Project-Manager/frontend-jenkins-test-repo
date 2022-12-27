import React from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon } from '@mui/material'

const StatCard3 = () => {
    const statList = [
        {
            icon: 'people',
            amount: 69,
            title: 'Users',
        },
        {
            icon: 'location_on_outlined',
            amount: 2,
            title: 'Locations',
        },
        {
            icon: 'home',
            amount: 2,
            title: 'Warehouses',
        },
        {
            icon: 'branding_watermark',
            amount: 29,
            title: 'Brands',
        },
        {
            icon: 'shopping_cart',
            amount: 10,
            title: 'Products',
        },
        {
            icon: 'add_shopping_cart',
            amount: 8,
            title: 'Bags',
        },
        {
            icon: 'add_shopping_cart',
            amount: 17,
            title: 'Trays',
        },
        {
            icon: 'battery_charging_full',
            amount: 15,
            title: 'Ready For Charging',
        },
        {
            icon: 'leak_remove',
            amount: 10,
            title: 'Remove invalid item',
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
                                    {item.amount.toLocaleString()}
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
