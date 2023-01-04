import React, { useEffect ,useState} from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon } from '@mui/material'
import { axiosMisUser } from '../../../../axios'
import jwt_decode from 'jwt-decode'


const StatCard3 = () => {
    const [count,setCount]=useState({})
   useEffect(()=>{
     const fetchData= async()=>{
        let user=localStorage.getItem("prexo-authentication")
        if(user){
            let { location } = jwt_decode(user)
            try {
                let res=await axiosMisUser.post("/dashboardData/" + location)
                if(res.status  === 200){
                    setCount(res.data.data)
                }
            } catch (error) {
                alert(error)
            }
        }
     }
     fetchData()
   },[])
    const statList = [
        {
            icon: 'reorder',
            amount: count.orders,
            title: 'Orders',
        },
        {
            icon: 'shopping_cart',
            amount: count.badOrders,
            title: 'Bad Orders',
        },
        {
            icon: 'format_indent_decrease',
            amount: count.delivered,
            title: 'Delivered Orders',
        },
        {
            icon: 'reorder',
            amount: count.notDelivered,
            title: 'Not Delivered Orders',
        },
        {
            icon: 'format_indent_decrease',
            amount: count.delivery,
            title: 'Delivery',
        },
        {
            icon: 'assignment',
            amount: count.badDelivery,
            title: 'Bad Delivery',
        },
        {
            icon: 'assignment',
            amount: count.uicGented,
            title: 'UIC Generated',
        },
        {
            icon: 'assignment',
            amount: count.uicNotGenrated,
            title: 'UIC Not Generated',
        },
        {
            icon: 'assignment',
            amount: count.uicDownloaded,
            title: 'UIC Downloaded',
        },
        {
            icon: 'sort',
            amount: count.assigBot,
            title: 'Assign To Bot',
        },
        {
            icon: 'merge_type',
            amount: count.assigCharging,
            title: 'Assign To Charging',
        },
        {
            icon: 'merge_type',
            amount: count.bqc,
            title: 'Assign To BQC',
        },
        {
            icon: 'merge_type',
            amount: count.audit,
            title: 'Assign To Audit',
        },
        {
            icon: 'merge_type',
            amount: count.botToWht,
            title: 'BOT To WHT',
        },
        {
            icon: 'merge_type',
            amount: count.whtMerge,
            title: 'WHT Merge',
        },
        {
            icon: 'merge_type',
            amount: count.mmtMerge,
            title: 'MMT Merge',
        },
        {
            icon: 'merge_type',
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
