import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
// import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import { axiosMisUser } from '../../../../axios'
import {
    Button,
    MenuItem,
    TableCell,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Card,
    TablePagination,
    TextField,
    Box,
} from '@mui/material'

function Search() {
    const [data, setdata] = useState('')
    const [deliveryData, setdeliveryData] = useState()
    const [orderData, setorderData] = useState()
    const [invalidimei, setinvalidimei] = useState({
        error: 'false',
    })

    const searchIMEI = async (e) => {
        e.preventDefault()
        try {
            const fetchData = async () => {
                const value = data
                setinvalidimei({ error: 'false' })
                await axiosMisUser
                    .post('/imeiDeliverySearch', value)
                    .then((response) => {
                        console.log('response')
                        if (response?.data?.error) {
                            alert('invalid IMEI')
                            setinvalidimei({ error: 'true' })
                        }
                        setdeliveryData(response?.data?.resultdata)
                    })
                await axiosMisUser
                    .post('/imeiOrderSearch', value)
                    .then((response) => {
                        if (response?.data?.error) {
                            setinvalidimei({ error: 'true' })
                            alert('invalid IMEI')
                        }
                        setorderData(response?.data?.resultdata)
                    })
            }
            fetchData()
        } catch (error) {
            alert(error)
        }
    }

    const DeiveryTable = styled(Table)(() => ({
        minWidth: 750,
        width: 9000,
        height: 100,
        whiteSpace: 'pre',
        '& thead': {
            '& th:first-of-type': {
                paddingLeft: 16,
            },
        },
        '& td': {
            borderBottom: 'none',
        },
        '& td:first-of-type': {
            paddingLeft: '16px !important',
        },
    }))

    const OrderTable = styled(Table)(() => ({
        minWidth: 750,
        width: 3000,
        height: 100,
        whiteSpace: 'pre',
        '& thead': {
            '& th:first-of-type': {
                paddingLeft: 16,
            },
        },
        '& td': {
            borderBottom: 'none',
        },
        '& td:first-of-type': {
            paddingLeft: '16px !important',
        },
    }))

    const OrderSearchData = useMemo(() => {
        return (
            <>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Order Timestamp</TableCell>
                        <TableCell>Delivery Status</TableCell>
                        <TableCell>Order Status</TableCell>
                        <TableCell>Buyback Category</TableCell>
                        <TableCell>Partner ID</TableCell>
                        <TableCell>Partner Email</TableCell>
                        <TableCell>Partner Shop</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>Old Item Details</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>GEP Order</TableCell>
                        <TableCell>Base Discount Price</TableCell>
                        <TableCell>Partner Purchase Price</TableCell>
                        <TableCell>GC Amount Redeemed</TableCell>
                        <TableCell>GC Redeem Time</TableCell>
                        <TableCell>VC Eligible</TableCell>
                        <TableCell>
                            Customer Declaration Physical Defect Present
                        </TableCell>
                        <TableCell>Exchange Facilitation Fee</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderData?.length !== 0 ? (
                        orderData?.map((data, index) => (
                            <TableRow>
                                <TableCell>{data?.order_id}</TableCell>
                                <TableCell>
                                    {data?.order_date != undefined
                                        ? new Date(
                                              data?.order_date
                                          ).toLocaleDateString('en-GB')
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.order_timestamp != undefined
                                        ? new Date(
                                              data?.order_timestamp
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>

                                <TableCell
                                    style={
                                        data?.delivery_status === 'Delivered'
                                            ? { color: 'green' }
                                            : { color: 'red' }
                                    }
                                >
                                    {data?.delivery_status}
                                </TableCell>

                                <TableCell
                                    style={
                                        data?.order_status === 'printed'
                                            ? { color: 'green' }
                                            : { color: 'red' }
                                    }
                                >
                                    {data?.order_status}
                                </TableCell>
                                <TableCell>{data?.buyback_category}</TableCell>
                                <TableCell>{data?.partner_id}</TableCell>
                                <TableCell>{data?.partner_email}</TableCell>
                                <TableCell>{data?.partner_shop}</TableCell>
                                <TableCell>{data?.item_id}</TableCell>
                                <TableCell>{data?.old_item_details}</TableCell>
                                <TableCell>{data?.imei}</TableCell>
                                <TableCell>{data?.gep_order}</TableCell>
                                <TableCell>{data?.base_discount}</TableCell>
                                <TableCell>
                                    {data?.partner_purchase_price}
                                </TableCell>
                                <TableCell>
                                    {data?.gc_amount_redeemed}
                                </TableCell>
                                <TableCell>
                                    {data?.gc_redeem_time != undefined
                                        ? new Date(
                                              data?.gc_redeem_time
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>{data?.vc_eligible}</TableCell>
                                <TableCell>
                                    {
                                        data?.customer_declaration_physical_defect_present
                                    }
                                </TableCell>
                                <TableCell>
                                    {data?.exchange_facilitation_fee}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <tableCell>Order Not Exist.</tableCell>
                        </TableRow>
                    )}
                </TableBody>
            </>
        )
    }, [])

    const deliverySearchData = useMemo(() => {
        return (
            <>
                <TableHead>
                    <TableRow>
                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>UIC Status</TableCell>
                        <TableCell>UIC</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>Stockin Date</TableCell>
                        <TableCell>Bag ID</TableCell>
                        <TableCell>Stockin Status</TableCell>
                        <TableCell>Bag close Date</TableCell>
                        <TableCell>BOT Agent Name</TableCell>

                        <TableCell>Assigned to BOT Agent Date</TableCell>
                        <TableCell>Tray ID</TableCell>
                        <TableCell>Tray Type</TableCell>
                        <TableCell>Tray Status</TableCell>
                        <TableCell>Tray Location</TableCell>
                        <TableCell>Tray Closed Time BOT</TableCell>
                        <TableCell>
                            {' '}
                            Tray Received From BOT Time Warehouse
                        </TableCell>
                        <TableCell> Tray Closed Time Warehouse</TableCell>
                        <TableCell>Sorting Agent Name</TableCell>

                        <TableCell>Handover to Sorting Date</TableCell>
                        <TableCell>WHT Tray</TableCell>
                        <TableCell>WHT Tray Assigned Date</TableCell>
                        <TableCell>WHT Tray Received From Sorting</TableCell>
                        <TableCell>WHT Tray Closed After Sorting</TableCell>
                        <TableCell>Charging Username</TableCell>
                        <TableCell>Charging Assigned Date</TableCell>
                        <TableCell>Charge In Date</TableCell>
                        <TableCell>Charge Done Date</TableCell>
                        <TableCell>
                            {' '}
                            Tray Received From Charging Time Warehouse
                        </TableCell>
                        <TableCell>
                            {' '}
                            Charging Done Tray Closed Time Warehouse
                        </TableCell>
                        <TableCell>BQC Agent Name</TableCell>
                        <TableCell>Assigned to BQC</TableCell>
                        <TableCell>BQC Done Date</TableCell>
                        <TableCell>
                            {' '}
                            Tray Received From BQC Time Warehouse
                        </TableCell>
                        <TableCell>
                            {' '}
                            BQC Done Tray Closed Time Warehouse
                        </TableCell>

                        <TableCell>Issued to Audit Date</TableCell>

                        <TableCell>Audit Agnet Name</TableCell>
                        <TableCell>Audit Done Date</TableCell>

                        <TableCell>Audit Done Tray Recieved Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {deliveryData?.length !== 0 ? (
                        deliveryData?.map((data, index) => (
                            <TableRow>
                                <TableCell>{data?.tracking_id}</TableCell>
                                <TableCell>{data?.order_id}</TableCell>
                                <TableCell
                                    style={
                                        data?.uic_status === 'printed'
                                            ? { color: 'green' }
                                            : { color: 'red' }
                                    }
                                >
                                    {data?.uic_status}
                                </TableCell>
                                <TableCell>{data?.uic_code?.code}</TableCell>
                                <TableCell>{data?.imei}</TableCell>
                                <TableCell>{data?.item_id}</TableCell>
                                <TableCell>
                                    {data?.stockin_date != undefined
                                        ? new Date(
                                              data?.stockin_date
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>{data?.bag_id}</TableCell>
                                <TableCell>{data?.stock_in_status}</TableCell>
                                <TableCell>
                                    {data?.bag_close_date != undefined
                                        ? new Date(
                                              data?.bag_close_date
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>{data?.agent_name}</TableCell>
                                <TableCell>
                                    {data?.assign_to_agent != undefined
                                        ? new Date(
                                              data?.assign_to_agent
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>{data?.tray_id}</TableCell>
                                <TableCell>{data?.tray_type}</TableCell>
                                <TableCell>{data?.tray_status}</TableCell>
                                <TableCell>{data?.tray_location}</TableCell>
                                <TableCell>
                                    {data?.tray_closed_by_bot != undefined
                                        ? new Date(
                                              data?.tray_closed_by_bot
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.bot_done_received != undefined
                                        ? new Date(
                                              data?.bot_done_received
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.tray_close_wh_date != undefined
                                        ? new Date(
                                              data?.tray_close_wh_date
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.sorting_agent_name}
                                </TableCell>
                                <TableCell>
                                    {data?.handover_sorting_date != undefined
                                        ? new Date(
                                              data?.handover_sorting_date
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>{data?.wht_tray}</TableCell>
                                <TableCell>
                                    {data?.wht_tray_assigned_date != undefined
                                        ? new Date(
                                              data?.wht_tray_assigned_date
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.received_from_sorting != undefined
                                        ? new Date(
                                              data?.received_from_sorting
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.closed_from_sorting != undefined
                                        ? new Date(
                                              data?.closed_from_sorting
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.agent_name_charging}
                                </TableCell>
                                <TableCell>
                                    {data?.assign_to_agent_charging != undefined
                                        ? new Date(
                                              data?.assign_to_agent_charging
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.charging_in_date != undefined
                                        ? new Date(
                                              data?.charging_in_date
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.charging_done_date != undefined
                                        ? new Date(
                                              data?.charging_done_date
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.charging_done_received != undefined
                                        ? new Date(
                                              data?.charging_done_received
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.charging_done_close != undefined
                                        ? new Date(
                                              data?.charging_done_close
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>{data?.agent_name_bqc}</TableCell>
                                <TableCell>
                                    {data?.assign_to_agent_bqc != undefined
                                        ? new Date(
                                              data?.assign_to_agent_bqc
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.bqc_out_date != undefined
                                        ? new Date(
                                              data?.bqc_out_date
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.bqc_done_received != undefined
                                        ? new Date(
                                              data?.bqc_done_received
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.bqc_done_close != undefined
                                        ? new Date(
                                              data?.bqc_done_close
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.issued_to_audit != undefined
                                        ? new Date(
                                              data?.issued_to_audit
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>{data?.audit_user_name}</TableCell>
                                <TableCell>
                                    {data?.audit_done_date != undefined
                                        ? new Date(
                                              data?.audit_done_date
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {data?.audit_done_recieved != undefined
                                        ? new Date(
                                              data?.audit_done_recieved
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            {invalidimei?.error === 'false' ? (
                                <TableCell>Delivery Not Exist.</TableCell>
                            ) : (
                                ''
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </>
        )
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'IMEI Search', path: '/' },
                        { name: 'Search' },
                    ]}
                />
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}
            >
                <Box>
                    <TextField
                        label="Search IMEI"
                        variant="outlined"
                        onChange={(e) => {
                            setdata(() => ({ ...data, value: e.target.value }))
                        }}
                        sx={{ mb: 3, mt: 3 }}
                    />
                </Box>
                <Box>
                    <Button
                        sx={{ mb: 2, mt: 4, ml: 3 }}
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                            searchIMEI(e)
                        }}
                    >
                        Search
                    </Button>
                </Box>
            </Box>

            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle">
                Orders
            </Typography>
            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                <OrderTable>{OrderSearchData}</OrderTable>
            </Card>

            <Typography
                sx={{ flex: '1 1 100%', mt: 4 }}
                variant="h6"
                id="tableTitle"
            >
                Delivery
            </Typography>
            <Card
                sx={{ maxHeight: '100%', overflow: 'auto' }}
                elevation={6}
            >
                <DeiveryTable>{deliverySearchData}</DeiveryTable>
            </Card>
        </Container>
    )
}

export default Search
