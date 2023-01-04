import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon } from '@mui/material'
import { axiosWarehouseIn } from '../../../../axios'
import jwt_decode from 'jwt-decode'

const StatCard3 = () => {
    const [count, setCount] = useState({})
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
                    alert(error)
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
        },
        {
            icon: 'class',
            amount: count.issuedPmtAndMMt,
            title: 'Issued PMT and MMT',
        },
        {
            icon: 'class',
            amount: count.bagCloseRequest,
            title: 'Bag Close Request',
        },
        {
            icon: 'move_to_inbox',
            amount: count.trayCloseRequest,
            title: 'Tray Close Request',
        },

        {
            icon: 'new_releases',
            amount: count.botToRelease,
            title: 'BOT To Release',
        },
        {
            icon: 'new_releases',
            amount: count.whtTray,
            title: 'WHT tray',
        },
        {
            icon: 'new_releases',
            amount: count.inusetWht,
            title: 'In Use WHT tray',
        },
        {
            icon: 'new_releases',
            amount: count.chargingRequest,
            title: 'Charging Request',
        },
        {
            icon: 'new_releases',
            amount: count.inChargingWht,
            title: 'In-charging WHT',
        },
        {
            icon: 'new_releases',
            amount: count.returnFromCharging,
            title: 'Return From Charging',
        },
        {
            icon: 'new_releases',
            amount: count.bqcRequest,
            title: 'BQC Request',
        },
        {
            icon: 'new_releases',
            amount: count.returnFromBqc,
            title: 'Return From BQC',
        },
        {
            icon: 'new_releases',
            amount: count.sortingRequest,
            title: 'Sorting Request',
        },
        {
            icon: 'new_releases',
            amount: count.inSortingWht,
            title: 'In Sorting WHT',
        },
        {
            icon: 'new_releases',
            amount: count.returnFromSorting,
            title: 'Return From Sorting',
        },
        {
            icon: 'new_releases',
            amount: count.mergeRequest,
            title: 'Merge Request',
        },
        {
            icon: 'new_releases',
            amount: count.returnFromMerge,
            title: 'Return From Merge',
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
