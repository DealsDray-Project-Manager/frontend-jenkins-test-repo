import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosSuperAdminPrexo } from '../../../../axios'
import Swal from 'sweetalert2'

const StatCard3 = () => {
    const [count, setCount] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post(
                    '/superAdminDashboard'
                )
                if (res.status == 200) {
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
        fetchData()
    }, [])

    const statList = [
        {
            icon: 'people',
            amount: count.usersCount,
            title: 'Users',
            link: '/sup-admin/users',
        },
        {
            icon: 'location_on_outlined',
            amount: count.location,
            title: 'Locations',
            link: '/sup-admin/location',
        },
        {
            icon: 'home',
            amount: count.warehouse,
            title: 'Warehouses',
            link: '/sup-admin/warehouse',
        },
        {
            icon: 'branding_watermark',
            amount: count.brand,
            title: 'Brands',
            link: '/sup-admin/brands',
        },
        {
            icon: 'shopping_cart',
            amount: count.products,
            title: 'Products',
            link: '/sup-admin/products',
        },
        {
            icon: 'branding_watermark',
            amount: count.spcategories,
            title: 'SP Categories',
            link: '/sup-admin/view-categories',
        },
        {
            icon: 'nature_people',
            amount: count.vendor,
            title: 'Vendors',
            link: '/sup-admin/view-vendors',
        },
        {
            icon: 'color_lens',
            amount: count.colorList,
            title: 'Color List',
            link: '/sup-admin/view-color-list',
        },
        {
            icon: 'party_mode',
            amount: count.partList,
            title: 'Sp Part List',
            link: '/sup-admin/view-part-list',
        },
        {
            icon: 'shopping_basket',
            amount: count.bag,
            title: 'Bags',
            link: '/sup-admin/bag',
        },
        {
            icon: 'branding_watermark',
            amount: count.ctxCategory,
            title: 'Tray Category',
            link: '/sup-admin/category',
        },
        {
            icon: 'add_shopping_cart',
            amount: count.tray,
            title: 'Trays',
            link: '/sup-admin/tray',
        },
        {
            icon: 'add_box',
            amount: count.boxList,
            title: 'Boxes',
            link: '/sup-admin/view-boxes',
        },
        {
            icon: 'track_changes',
            amount: count.trayRacks,
            title: 'Tray Racks',
            link: '/sup-admin/view-trayracks',
        },
        {
            icon: 'payment',
            amount: count.paymentList,
            title: 'Payments Terms',
            link: '/sup-admin/view-payments',
        },
        {
            icon: 'arrow_upward',
            amount: count.warrantyList,
            title: 'Warranty Terms',
            link: '/sup-admin/view-warranty',
        },
        {
            icon: 'sd_storage',
            amount: count.storageList,
            title: 'Storage',
            link: '/sup-admin/view-storage',
        },
        {
            icon: 'filter_frames',
            amount: count.ramList,
            title: 'RAM',
            link: '/sup-admin/view-ram',
        },

        {
            icon: 'battery_charging_full',
            amount: count.readyForChargingInuse,
            title: 'Ready For Charging (Inuse tray)',
            link: '/sup-admin/ready-for-charging/in-use-wht',
        },
        {
            icon: 'battery_charging_full',
            amount: count.readyForChargingBqc,
            title: 'Ready For Charging (BQC Ready Tray)',
            link: '/sup-admin/ready-for-charging/bqc-tray',
        },
        {
            icon: 'low_priority',
            amount: count.readyForRdl,
            title: 'Ready For RDL-One',
            link: '/sup-admin/ready-for-rdl',
        },
        {
            icon: 'transform',
            amount: count.readyForTransferSales,
            title: 'Ready For Transfer-Sales',
            link: '/sup-admin/ready-for-transfer',
        },
        {
            icon: 'remove',
            amount: count.removeInvalidItem,
            title: 'Remove invalid item',
            link: '/sup-admin/remove-invalid-item',
        },
        {
            icon: 'art_track',
            amount: count.trackItem,
            title: 'Track Item',
            link: '/sup-admin/track-item',
        },
        {
            icon: 'people',
            amount: count.buyerCount,
            title: 'Buyer',
            link: '/sup-admin/view-buyer',
        },
    ]
    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    return (
        <div>
            <Grid container spacing={3}>
                {statList.map((item, ind) => (
                    <Grid key={item.title} item md={3} sm={6} xs={12}>
                        <Card
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                                navigate(item.link)
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
