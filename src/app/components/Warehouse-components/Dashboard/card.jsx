import React from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon } from '@mui/material'

const StatCard3 = () => {
    const statList = [
        {
            icon: 'class',
            amount: 2,
            title: 'Bag Issue Request',
        },
        {
            icon: 'class',
            amount: 1,
            title: 'Bag Close Request',
        },
        {
            icon: 'move_to_inbox',
            amount: 2,
            title: 'Tray Close Request',
        },
        {
            icon: 'move_to_inbox',
            amount: 0,
            title: 'Issued PMT And MMT',
        },
        {
            icon: 'new_releases',
            amount: 0,
            title: 'BOT To Release',
        },
        {
            icon: 'new_releases',
            amount: 0,
            title: 'BOT To Release',
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
