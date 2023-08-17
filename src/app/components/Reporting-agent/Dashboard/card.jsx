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
            amount: count.allOrders,
            title: 'Total Order Placed',
            lastOrderDate: count.allOrdersLastDate,
            path: '/reporting/all-orders',
            sales: false,
        },
        {
            icon: 'reorder',
            lastOrderDate: count.deliveredOrderOrderLastDate,
            amount: count.deliveredOrder?.[0]?.totalItemCount,
            xxTray: count?.notDeliveredXxTray,
            title: 'Delivered Packets',
            path: '/reporting/delivered-orders',
            sales: false,
        },
        {
            icon: 'reorder',
            lastOrderDate: count.notDeliveredOrdersLastOrderDate,
            amount: count.notDeliveredOrders,
            title: 'Not Delivered Packets',
            path: '/reporting/not-delivered-orders',
            sales: false,
        },
        {
            icon: 'reorder',
            amount: count.allDelivery,
            lastOrderDate: count.deliveredOrderOrderLastDate,
            title: 'Total Packet Delivered',
            path: '/reporting/delivery/item',
            sales: false,
        },
        {
            icon: 'reorder',
            amount: count.processingUnits,
            lastOrderDate: count.processingUnitsLastDate?.[0]?.maxDate,
            title: 'Total Units Available In Processing',
            path: '/reporting/units/processing',
            sales: false,
        },
        {
            icon: 'reorder',
            lastOrderDate: count.readyForSaleLastAuditDate,
            amount: count.readyForSale,
            title: 'Total Units Ready for Sale',
            path: '/reporting/units/ready-for-sales',
            sales: 'all',
        },
        {
            icon: 'class',
            amount: count.closedBag,
            lastOrderDate:
                count?.closedBagLastDeliveryDate?.[0]?.maxDeliveryDate,
            itemCount: count.closedBagItemCount?.[0]?.totalItemCount,
            title: 'Bag Ready to Bot',
            path: '/reporting/bags/closed',
            sales: false,
        },

        {
            icon: 'shopping_cart',
            amount: count.sortingPendingBot,
            lastOrderDate:
                count?.sortingPendingBotIDeliveryDate?.[0]?.maxDeliveryDate,
            itemCount: count.sortingPendingBotItemsCount?.[0]?.totalItemCount,
            title: 'Bot Sorting Pending',
            path: '/reporting/bot-tray/sorting-pending',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.mmtTray,
            lastOrderDate: count?.mmtTrayLastDeliveryDate?.[0]?.maxDeliveryDate,
            itemCount: count.mmtTrayItemCount?.[0]?.totalItemCount,
            title: 'Model Missmatch Tray',
            path: '/reporting/mmt-tray',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.inMergingMmt,
            lastOrderDate:
                count?.inMergingMmtLastDeliveryDate?.[0]?.maxDeliveryDate,
            itemCount: count.inMergingMmtItemCount?.[0]?.totalItemCount,
            title: 'Model Missmatch Tray Merge In Progress',
            path: '/reporting/mmt/in-merging',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.pmtTray,
            lastOrderDate:
                count?.pmtTrayCountLastDeliveryDate?.[0]?.maxDeliveryDate,
            itemCount: count.pmtTrayCount?.[0]?.totalItemCount,
            title: 'Product Missmatch Tray',
            path: '/reporting/pmt-tray',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.inuseWht,
            itemCount: count.inuseWhtItemCount?.[0]?.totalItemCount,
            title: 'Inuse Wht',
            path: '/reporting/wht/inuse',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.readyToMerge,
            itemCount: count?.readyToMergeItemCount?.[0]?.totalItemCount,
            title: 'Wht Ready to Merge',
            path: '/reporting/wht/ready-for-merge',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.inMergingWht,
            itemCount: count?.inMergingWhtItemCount?.[0]?.totalItemCount,
            title: 'Wht Merge In Progress',
            path: '/reporting/wht/in-merging',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.readyToCharge,
            itemCount: count?.readyToChargeItemCount?.[0]?.totalItemCount,
            title: 'Charge Pending',
            path: '/reporting/wht/ready-for-charge',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.recharging,
            itemCount: count?.rechargingItemCount?.[0]?.totalItemCount,
            title: 'Recharge Pending',
            path: '/reporting/wht/recharge',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.InCharging,
            itemCount: count?.InChargingItemCount?.[0]?.totalItemCount,
            title: 'Charging In Progress',
            path: '/reporting/wht/in-charging',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.readyToBqc,
            itemCount: count?.readyToBqcItemCount?.[0]?.totalItemCount,

            title: 'BQC Pending',

            path: '/reporting/wht/ready-for-bqc',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.inBqc,
            itemCount: count?.inBqcItemCount?.[0]?.totalItemCount,

            title: 'BQC In progress',
            path: '/reporting/wht/in-bqc',

            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.readyToAudit,
            itemCount: count?.readyToAuditItemCount?.[0]?.totalItemCount,

            title: 'Audit Pending',
            path: '/reporting/wht/ready-for-audit',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.inAudit,
            itemCount: count?.inAuditItemCount?.[0]?.totalItemCount,

            title: 'Audit In progress',
            path: '/reporting/wht/in-audit',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.readyToRdlFls,
            itemCount: count?.readyToRdlFlsItemCount?.[0]?.totalItemCount,

            title: 'Rdl One Pending',
            path: '/reporting/wht/ready-for-rdl-fls',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.inRdlFls,
            itemCount: count?.inRdlFlsItemCount?.[0]?.totalItemCount,

            title: 'RDL One In progress',
            path: '/reporting/wht/in-rdl-fls',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.ctxTransferPendingToSales,
            itemCount:
                count?.ctxTransferPendingToSalesItemCount?.[0]?.totalItemCount,

            title: 'Sale Bucket Transfer Pending',
            path: '/reporting/ctx/transfer-pending-to-sales',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.ctxTransferToSalesInProgress,
            itemCount:
                count?.ctxTransferToSalesInProgressItemCount?.[0]
                    ?.totalItemCount,

            title: 'Sale Bucket In Progress',
            path: '/reporting/ctx/transfer-to-sales/in-progress',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.monthWisePurchase,
            title: 'Month Wise Purchase',
            path: '/reporting/month-wise-purchase-details',
            sales: false,
        },
        {
            icon: 'shopping_cart',
            amount: count.rdlOneDoneUnits,
            title: 'RDL 1 Done Units',
            path: '/reporting/rdl-one-done-units',
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
                            {item?.title == 'Delivered Packets' ||
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
                            {item?.title == 'Delivered Packets' ? (
                                <>Tray Count :{item?.xxTray}</>
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
                            item?.title !== 'Delivered Packets' &&
                            item?.title !== 'Total Order Placed' &&
                            item?.title !== 'Total Packet Delivered' &&
                            item?.title !== 'RDL 1 Done Units' &&
                            item?.title !== 'Month Wise Purchase' &&

                            item?.title !==
                                'Total Units Available In Processing' ? (
                                <>
                                    Units :{item.itemCount ? item.itemCount : 0}
                                </>
                            ) : null}
                        </Paragraph>

                        <Paragraph sx={{ color: textMuted }}>
                            {item?.title == 'Bag Ready to Bot' ? (
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
                            {item?.title == 'Bot Sorting Pending' ? (
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
                            {item?.title == 'Model Missmatch Tray' ? (
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
                            'Model Missmatch Tray Merge In Progress' ? (
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
                            {item?.title == 'Product Missmatch Tray' ? (
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
