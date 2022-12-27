import React from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon } from '@mui/material'

const StatCard3 = () => {
    const statList = [
        {
            icon: 'reorder',
            amount: 1000,
            title: 'Orders',
        },
        {
            icon: 'shopping_cart',
            amount: 300,
            title: 'Deliverys',
        },
        {
            icon: 'reorder',
            amount: 700,
            title: 'Not Delivered Orders',
        },
        {
            icon: 'format_indent_decrease',
            amount: 12,
            title: 'UIC Generated',
        },
        {
            icon: 'format_indent_decrease',
            amount: 11,
            title: 'UIC Not Generated',
        },
        {
            icon: 'assignment',
            amount: 15,
            title: 'Assign To Bot',
        },
        {
            icon: 'assignment',
            amount: 12,
            title: 'Assign To Charging',
        },
        {
            icon: 'assignment',
            amount: 10,
            title: 'Assign To Bqc',
        },
        {
            icon: 'assignment',
            amount: 15,
            title: 'Assign To Audit',
        },
        {
            icon: 'sort',
            amount: 20,
            title: 'BOT To WHT',
        },
        {
            icon: 'merge_type',
            amount: 10,
            title: 'WHT Merge',
        },
        {
            icon: 'merge_type',
            amount: 15,
            title: 'MMT Merge',
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
