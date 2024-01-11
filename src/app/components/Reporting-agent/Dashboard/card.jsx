import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { H3, Paragraph } from 'app/components/Typography'
import { Grid, Card, IconButton, Icon, RepairIcon } from '@mui/material'
import jwt_decode from 'jwt-decode'
import { axiosMisUser, axiosReportingAgent } from '../../../../axios'
import { useNavigate } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import Swal from 'sweetalert2'

const StatCard3 = () => {
    const [count, setCount] = useState({})
    const { logout, user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            let user = localStorage.getItem('prexo-authentication')
            if (user) {
                let { location } = jwt_decode(user)
                try {
                    let res = await axiosReportingAgent.post(
                        '/dashboard/' + location
                    )
                    if (res.status === 200) {
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
        }
        fetchData()
    }, [])

    const statList = [
        {
            icon: 'reorder',
            amount: count.allOrders || 0,
            title: 'Total Order Placed',
            lastOrderDate: count.allOrdersLastDate,
            path: '/reporting/all-orders',
            sales: false,
        },
        {
            icon: 'reorder',
            amount: count.allDelivery || 0,
            lastOrderDate: count.deliveredOrderOrderLastDate,
            title: 'Total Packet Delivered',
            path: '/reporting/delivery/item',
            sales: false,
        },
        {
            icon: 'reorder',
            lastOrderDate: count.notDeliveredOrdersLastOrderDate,
            amount: count.notDeliveredOrders || 0,
            title: 'Not Delivered Packets',
            path: '/reporting/not-delivered-orders',
            sales: false,
        },

        {
            icon: 'reorder',
            lastOrderDate: count.deliveredOrderOrderLastDate,
            amount: count.deliveredOrder?.[0]?.totalItemCount || 0,
            xxTray: count?.notDeliveredXxTray,
            title: 'Opened Packets',
            path: '/reporting/opened-packets',
            sales: false,
        },
        {
            icon: 'reorder',
            amount: count.processingUnits || 0,
            lastOrderDate: count.processingUnitsLastDate?.[0]?.maxDate,
            title: 'Total Units Available In Processing',
            path: '/reporting/units/processing',
            sales: false,
        },
        {
            icon: 'reorder',
            lastOrderDate: count.readyForSaleLastAuditDate,
            amount: count.readyForSale || 0,
            title: 'Total Units Ready for Sale',
            path: '/reporting/units/ready-for-sales',
            sales: 'all',
        },
        {
            icon: 'class',
            amount: count.closedBagItemCount?.[0]?.totalItemCount || 0,
            lastOrderDate:
                count?.closedBagLastDeliveryDate?.[0]?.maxDeliveryDate,
            itemCount: count.closedBag || 0,
            title: 'Bags Ready to BOT',
            path: '/reporting/bags/closed',
            sales: false,
        },
        {
            icon: 'class',
            amount: count.bagsIssuedToBotUnits?.[0]?.totalItemCount || 0,
            itemCount: count.bagsIssuedToBotBag || 0,
            title: 'Bags Issued to BOT',
            path: '/reporting/bags/issued',
            sales: false,
        },

        {
            icon: 'shopping_cart',
            amount: count.sortingPendingBotItemsCount?.[0]?.totalItemCount || 0,
            lastOrderDate:
                count?.sortingPendingBotIDeliveryDate?.[0]?.maxDeliveryDate,
            itemCount: count.sortingPendingBot || 0,
            title: 'BOT Sorting Pending',
            path: '/reporting/bot-tray/sorting-pending',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.botIssuedToSortingUnits?.[0]?.totalItemCount || 0,
            itemCount: count.botIssuedToSortingTray || 0,
            title: 'BOT Sorting In-progress',
            path: '/reporting/bot-tray/sorting-inprogress',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.mmtTrayItemCount?.[0]?.totalItemCount || 0,
            lastOrderDate:
                count?.mmtTrayLastDeliveryDate?.[0]?.maxDeliveryDate || '-',
            itemCount: count.mmtTray || 0,
            title: 'Model Mismatch Tray',
            path: '/reporting/mmt-tray',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.inMergingMmtItemCount?.[0]?.totalItemCount || 0,
            lastOrderDate:
                count?.inMergingMmtLastDeliveryDate?.[0]?.maxDeliveryDate,
            itemCount: count.inMergingMmt || 0,
            title: 'Model Mismatch Tray Merge In Progress',
            path: '/reporting/mmt/in-merging',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.pmtTrayCount?.[0]?.totalItemCount,
            lastOrderDate:
                count?.pmtTrayCountLastDeliveryDate?.[0]?.maxDeliveryDate,
            itemCount: count.pmtTray || 0,
            title: 'Product Mismatch Tray',
            path: '/reporting/pmt-tray',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.inuseWhtItemCount?.[0]?.totalItemCount || 0,
            itemCount: count.inuseWht || 0,
            title: 'Inuse Wht',
            path: '/reporting/wht/inuse',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count?.readyToMergeItemCount?.[0]?.totalItemCount || 0,
            itemCount: count.readyToMerge || 0,
            title: 'Wht Ready to Merge',
            path: '/reporting/wht/ready-for-merge',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count?.inMergingWhtItemCount?.[0]?.totalItemCount || 0,
            itemCount: count.inMergingWht || 0,
            title: 'Wht Merge In Progress',
            path: '/reporting/wht/in-merging',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count?.readyToChargeItemCount?.[0]?.totalItemCount || 0,
            itemCount: count.readyToCharge || 0,
            title: 'Charge Pending',
            path: '/reporting/wht/ready-for-charge',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count?.rechargingItemCount?.[0]?.totalItemCount || 0,
            itemCount: count.recharging || 0,
            title: 'Recharge Pending',
            path: '/reporting/wht/recharge',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count?.InChargingItemCount?.[0]?.totalItemCount || 0,
            itemCount: count.InCharging || 0,
            title: 'Charging In Progress',
            path: '/reporting/wht/in-charging',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count?.readyToBqcItemCount?.[0]?.totalItemCount || 0,
            itemCount: count.readyToBqc || 0,

            title: 'BQC Pending',

            path: '/reporting/wht/ready-for-bqc',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count?.inBqcItemCount?.[0]?.totalItemCount || 0,
            itemCount: count.inBqc || 0,
            title: 'BQC In progress',
            path: '/reporting/wht/in-bqc',

            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count?.readyToAuditItemCount?.[0]?.totalItemCount || 0,
            itemCount: count.readyToAudit || 0,

            title: 'Audit Pending',
            path: '/reporting/wht/ready-for-audit',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count?.inAuditItemCount?.[0]?.totalItemCount || 0,
            itemCount: count.inAudit || 0,

            title: 'Audit In progress',
            path: '/reporting/wht/in-audit',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count?.readyToRdlFlsItemCount?.[0]?.totalItemCount || 0,
            itemCount: count.readyToRdlFls || 0,

            title: 'Rdl-1 Pending',
            path: '/reporting/wht/ready-for-rdl-1',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count?.inRdlFlsItemCount?.[0]?.totalItemCount || 0,
            itemCount: count.inRdlFls || 0,

            title: 'RDL-1 In-progress',
            path: '/reporting/wht/in-rdl-1',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount:
                count?.ctxTransferPendingToSalesItemCount?.[0]
                    ?.totalItemCount || 0,
            itemCount: count.ctxTransferPendingToSales || 0,

            title: 'Sale Bucket Transfer Pending',
            path: '/reporting/ctx/transfer-pending-to-sales',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount:
                count?.ctxTransferToSalesInProgressItemCount?.[0]
                    ?.totalItemCount || 0,
            itemCount: count.ctxTransferToSalesInProgress || 0,

            title: 'Sale Bucket In Progress',
            path: '/reporting/ctx/transfer-to-sales/in-progress',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.monthWisePurchase || 0,
            title: 'Weekly/Month Wise Purchase',
            path: '/reporting/month-wise-purchase-details',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.rdlOneDoneUnits || 0,
            title: 'RDL 1 Done Units',
            path: '/reporting/rdl-1-done-units',
            sales: false,
        },
    ]

    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    const SingleGrid = ({ item, textMuted }) => {
        return (
            <Grid key={item?.title} item md={3} sm={6} xs={12}>
                <Card
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                        navigate(item?.path)
                    }}
                    elevation={3}
                    sx={{ p: '20px', display: 'flex', height: '170px' }}
                >
                    <div>
                        <IconButton
                            size="small"
                            sx={{
                                padding: '8px',
                                background: 'rgba(0, 0, 0, 0.01)',
                            }}
                        >
                            <Icon sx={{ color: textMuted }}>{item?.icon}</Icon>
                        </IconButton>
                    </div>
                    <Box ml={2}>
                        <H3 sx={{ mt: '-4px', fontSize: '32px' }}>
                            {item?.amount}
                        </H3>
                        <Paragraph sx={{ mb: 1, color: textMuted }}>
                            {item?.title}
                        </Paragraph>

                        <Paragraph sx={{ color: textMuted }}>
                            {item?.title == 'Total Order Placed' ? (
                                <>
                                    Last Order:
                                    {new Date(
                                        item?.lastOrderDate?.order_date
                                    ).toLocaleString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </>
                            ) : null}
                        </Paragraph>

                        <Paragraph sx={{ color: textMuted }}>
                            {item?.title ==
                            'Total Units Available In Processing' ? (
                                <>
                                    Last Action:
                                    {new Date(
                                        item?.lastOrderDate
                                    ).toLocaleString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </>
                            ) : null}
                        </Paragraph>

                        <Paragraph sx={{ color: textMuted }}>
                            {item?.title == 'Opened Packets' ||
                            item?.title == 'Total Packet Delivered' ? (
                                <>
                                    Last Delivery:
                                    {new Date(
                                        item?.lastOrderDate?.delivery_date
                                    ).toLocaleString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </>
                            ) : null}
                        </Paragraph>

                        <Paragraph sx={{ color: textMuted }}>
                            {item?.title == 'Not Delivered Packets' ? (
                                <>
                                    Last Order:
                                    {new Date(
                                        item?.lastOrderDate?.order_date
                                    ).toLocaleString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </>
                            ) : null}
                        </Paragraph>

                        <Paragraph sx={{ color: textMuted }}>
                            {item?.title == 'Total Units Ready for Sale' ? (
                                <>
                                    Last Audit Done:
                                    {new Date(
                                        item?.lastOrderDate?.audit_done_close
                                    ).toLocaleString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </>
                            ) : null}
                        </Paragraph>

                        <Paragraph sx={{ color: textMuted }}>
                            {item?.title !== 'Total Units Ready for Sale' &&
                            item?.title !== 'Not Delivered Packets' &&
                            item?.title !== 'Opened Packets' &&
                            item?.title !== 'Total Order Placed' &&
                            item?.title !== 'Total Packet Delivered' &&
                            item?.title !== 'RDL 1 Done Units' &&
                            item?.title !== 'Month Wise Purchase' &&
                            item?.title !== 'Bags Ready to BOT' &&
                            item?.title !== 'Bags Issued to BOT' &&
                            item?.title !==
                                'Total Units Available In Processing' ? (
                                <>
                                    Trays :{item.itemCount ? item.itemCount : 0}
                                </>
                            ) : null}
                            {item?.title == 'Bags Ready to BOT' || item?.title == 'Bags Issued to BOT' ? (
                                <>Bags :{item.itemCount ? item.itemCount : 0}</>
                            ) : null}
                        </Paragraph>

                        <Paragraph sx={{ color: textMuted }}>
                            {item?.title == 'Bag Ready to BOT' ? (
                                <>
                                    Last Delivery:
                                    {new Date(
                                        item?.lastOrderDate
                                    ).toLocaleString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </>
                            ) : null}
                        </Paragraph>

                        <Paragraph sx={{ color: textMuted }}>
                            {item?.title == 'BOT Sorting Pending' ? (
                                <>
                                    Last Delivery:
                                    {new Date(
                                        item?.lastOrderDate
                                    ).toLocaleString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </>
                            ) : null}
                        </Paragraph>

                        <Paragraph sx={{ color: textMuted }}>
                            {item?.title == 'Model Mismatch Tray' ? (
                                <>
                                    Last Delivery:
                                    {new Date(
                                        item?.lastOrderDate
                                    ).toLocaleString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </>
                            ) : null}
                        </Paragraph>

                        <Paragraph sx={{ color: textMuted }}>
                            {item?.title ==
                            'Model Mismatch Tray Merge In Progress' ? (
                                <>
                                    Last Delivery:
                                    {new Date(
                                        item?.lastOrderDate
                                    ).toLocaleString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </>
                            ) : null}
                        </Paragraph>

                        <Paragraph sx={{ color: textMuted }}>
                            {item?.title == 'Product Mismatch Tray' ? (
                                <>
                                    Last Delivery:
                                    {new Date(
                                        item?.lastOrderDate
                                    ).toLocaleString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </>
                            ) : null}
                        </Paragraph>
                    </Box>
                </Card>
            </Grid>
        )
    }

    return (
        <div>
            <Grid container spacing={3}>
                {statList?.map((item, ind) =>
                    item?.sales == 'all' ? (
                        <SingleGrid item={item} textMuted={textMuted} />
                    ) : item?.sales == true && user.cpc_type == 'Sales' ? (
                        <SingleGrid item={item} textMuted={textMuted} />
                    ) : item?.sales == false && user.cpc_type !== 'Sales' ? (
                        <SingleGrid item={item} textMuted={textMuted} />
                    ) : null
                )}
            </Grid>
        </div>
    )
}

export default StatCard3
