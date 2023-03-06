import { Breadcrumb } from 'app/components'
import React, { useState, useMemo } from 'react'
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography'
import { axiosMisUser } from '../../../../axios'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import {
    Button,
    TableCell,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Card,
    TextField,
    Box,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    MenuItem,
} from '@mui/material'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const DeiveryTable = styled(Table)(() => ({
    minWidth: 750,
    width: 5000,
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
    width: 8000,
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
const TempOrderStyle = styled(Table)(() => ({
    minWidth: 750,
    width: 2200,
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}))
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
}

function Search() {
    const [data, setdata] = useState('')
    const [deliveryData, setdeliveryData] = useState([])
    const [orderData, setorderData] = useState([])
    const [tempOrders, setTempOrders] = useState([])
    const [tempDelivery, setTempDelivery] = useState([])
    const [show, setShow] = useState(false)
    const [open, setOpen] = React.useState(false)
    const [botTray, setBotTray] = useState([])
    const [bag, setBag] = useState([])
    const [botUsers, setBotUsers] = useState([])

    const schema = Yup.object().shape({
        bot_agent: Yup.string().required('Required*').nullable(),
        tray_id: Yup.string().required('Required*').nullable(),
        bag_id: Yup.string().required('Required*').nullable()
    })
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const searchOldUic = async () => {
        try {
            setShow(false)
            let res = await axiosMisUser.post('/whtutility/search/' + data)
            if (res.status == 200) {
                setShow(true)
                setorderData(res.data.orgOrder)
                setdeliveryData(res.data.orgDelivery)
                setTempOrders(res.data.tempOrder)
                setTempDelivery(res.data.tempDelivery)
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }

    /*----------------IMPORT ORDER------------------------*/
    const importOrder = async () => {
        try {
            let res = await axiosMisUser.post(
                '/whtutility/importOrder',
                tempOrders[0]
            )
            if (res.status == 200) {
                alert(res.data.message)
                searchOldUic()
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }
    const onsubmit = async (value) => {
        try {
            let obj = {
                utilty: tempDelivery[0],
                extra: value,
            }
            let res = await axiosMisUser.post('/whtUtility/addDelivery', obj)
            if (data.status == 200) {
                alert(res.data.message)
                window.location.reload(false)
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }




    
    const handleOpen = async () => {
        try {
            let res = await axiosMisUser.post(
                '/whtUtility/bagAndBotTray/' + tempDelivery?.[0]?.partner_shop
            )
            if (res.status == 200) {
                console.log(res.data)
                setBotUsers(res.data.botUsers)
                setBag(res.data.bag)
                setBotTray(res.data.tray)
                reset({})
                setOpen(true)
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }

    const tempOrderSearchData = useMemo(() => {
        return (
            <TempOrderStyle>
                <TableHead>
                    <TableRow>
                        <TableCell>Delivery Status</TableCell>
                        <TableCell>Order Imported TimeStamp</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Date</TableCell>

                        <TableCell>Order Status</TableCell>

                        <TableCell>Item ID</TableCell>
                        <TableCell>Old Item Details</TableCell>

                        <TableCell>IMEI</TableCell>

                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Delivery Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tempOrders.length === 0 ? (
                        <TableCell
                            colSpan={8}
                            align="center"
                            sx={{ verticalAlign: 'top' }}
                        >
                            <Typography variant="p" gutterBottom>
                                Sorry no records found
                            </Typography>
                        </TableCell>
                    ) : null}
                    {tempOrders?.map((data, index) => (
                        <TableRow>
                            <TableCell
                                style={
                                    data?.delivery_status == 'Pending'
                                        ? { color: 'red' }
                                        : { color: 'green' }
                                }
                            >
                                {data?.delivery_status}
                            </TableCell>
                            <TableCell>
                                {new Date(data?.created_at).toLocaleString(
                                    'en-GB',
                                    {
                                        hour12: true,
                                    }
                                )}
                            </TableCell>
                            <TableCell>{data?.order_id?.toString()}</TableCell>
                            <TableCell>
                                {data?.order_date == null
                                    ? ''
                                    : new Date(data?.order_date).toLocaleString(
                                          'en-GB',
                                          {
                                              year: 'numeric',
                                              month: '2-digit',
                                              day: '2-digit',
                                          }
                                      )}
                            </TableCell>

                            <TableCell>
                                {data?.order_status?.toString()}
                            </TableCell>

                            <TableCell>{data?.item_id?.toString()}</TableCell>
                            <TableCell>
                                {data?.old_item_details?.toString()}
                            </TableCell>

                            <TableCell>{data?.imei?.toString()}</TableCell>

                            <TableCell>{data?.tracking_id}</TableCell>
                            <TableCell>
                                {data?.delivery_date == null
                                    ? ''
                                    : new Date(
                                          data?.delivery_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TempOrderStyle>
        )
    }, [tempOrders])
    const OrderSearchData = useMemo(() => {
        return (
            <OrderTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Delivery Status</TableCell>
                        <TableCell>Order Imported TimeStamp</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Order TimeStamp</TableCell>
                        <TableCell>Order Status</TableCell>
                        <TableCell>Partner ID</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>Old Item Details</TableCell>
                        <TableCell>Brand Name</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>MUIC</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>Base Disscount</TableCell>
                        <TableCell>Diganostic</TableCell>
                        <TableCell>Partner Purchase Price</TableCell>
                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Delivery Date</TableCell>
                        <TableCell>Order ID Replaced</TableCell>
                        <TableCell>Deliverd With OTP</TableCell>
                        <TableCell>Deliverd With Bag Exception</TableCell>
                        <TableCell>GC Amount Redeemed</TableCell>
                        <TableCell>GC Amount Refund</TableCell>
                        <TableCell>GC Redeem Time</TableCell>
                        <TableCell>GC Amount Refund Time</TableCell>
                        <TableCell>Diagonstic Status</TableCell>
                        <TableCell>VC Eligible</TableCell>
                        <TableCell>
                            Customer Declaration Physical Defect Present
                        </TableCell>
                        <TableCell>
                            Customer Declaration Physical Defect Type
                        </TableCell>
                        <TableCell>Partner Price No Defect</TableCell>
                        <TableCell>Revised Partner Price</TableCell>
                        <TableCell>Delivery Fee</TableCell>
                        <TableCell>Exchange Facilitation Fee</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderData.length === 0 ? (
                        <TableCell
                            colSpan={8}
                            align="center"
                            sx={{ verticalAlign: 'top' }}
                        >
                            <Typography variant="p" gutterBottom>
                                Sorry no records found
                            </Typography>
                        </TableCell>
                    ) : null}
                    {orderData?.map((data, index) => (
                        <TableRow>
                            <TableCell
                                style={
                                    data?.delivery_status == 'Pending'
                                        ? { color: 'red' }
                                        : { color: 'green' }
                                }
                            >
                                {data?.delivery_status}
                            </TableCell>
                            <TableCell>
                                {new Date(data?.created_at).toLocaleString(
                                    'en-GB',
                                    {
                                        hour12: true,
                                    }
                                )}
                            </TableCell>
                            <TableCell>{data?.order_id?.toString()}</TableCell>
                            <TableCell>
                                {data?.order_date == null
                                    ? ''
                                    : new Date(data?.order_date).toLocaleString(
                                          'en-GB',
                                          {
                                              year: 'numeric',
                                              month: '2-digit',
                                              day: '2-digit',
                                          }
                                      )}
                            </TableCell>
                            <TableCell>
                                {data?.order_timestamp == null
                                    ? ''
                                    : new Date(
                                          data?.order_timestamp
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })}
                            </TableCell>
                            <TableCell>
                                {data?.order_status?.toString()}
                            </TableCell>

                            <TableCell>
                                {data?.partner_id?.toString()}
                            </TableCell>

                            <TableCell>{data?.item_id?.toString()}</TableCell>
                            <TableCell>
                                {data?.old_item_details?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.products?.[0]?.brand_name}
                            </TableCell>
                            <TableCell>
                                {data?.products?.[0]?.model_name}
                            </TableCell>
                            <TableCell>{data?.products?.[0]?.muic}</TableCell>
                            <TableCell>{data?.imei?.toString()}</TableCell>
                            <TableCell>
                                ₹{data?.base_discount?.toString()}
                            </TableCell>
                            <TableCell>{data?.diagnostic}</TableCell>
                            <TableCell>
                                ₹{data?.partner_purchase_price}
                            </TableCell>
                            <TableCell>{data?.tracking_id}</TableCell>
                            <TableCell>
                                {data?.delivery_date == null
                                    ? ''
                                    : new Date(
                                          data?.delivery_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })}
                            </TableCell>
                            <TableCell>{data?.order_id_replaced}</TableCell>
                            <TableCell>{data?.deliverd_with_otp}</TableCell>
                            <TableCell>
                                {data?.deliverd_with_bag_exception}
                            </TableCell>
                            <TableCell>
                                {data?.gc_amount_redeemed?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.gc_amount_refund?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.gc_redeem_time == null
                                    ? ''
                                    : new Date(
                                          data?.gc_redeem_time
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })}
                            </TableCell>
                            <TableCell>
                                {data?.gc_amount_refund_time == null
                                    ? ''
                                    : new Date(
                                          data?.gc_amount_refund_time
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })}
                            </TableCell>
                            <TableCell>
                                {data?.diagnstic_status?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.vc_eligible?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.customer_declaration_physical_defect_present?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.customer_declaration_physical_defect_type?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.partner_price_no_defect?.toString()}
                            </TableCell>
                            <TableCell>
                                ₹{data?.revised_partner_price?.toString()}
                            </TableCell>
                            <TableCell>
                                ₹{data?.delivery_fee?.toString()}
                            </TableCell>
                            <TableCell>
                                ₹{data?.exchange_facilitation_fee?.toString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </OrderTable>
        )
    }, [orderData])
    const deliverySearchData = useMemo(() => {
        return (
            <DeiveryTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Delivery Status</TableCell>
                        <TableCell>Delivery Imported Date</TableCell>
                        <TableCell>UIC</TableCell>
                        <TableCell>UIC Status</TableCell>
                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>GEP Order</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>Partner Purchase Price</TableCell>
                        <TableCell>Partner Shop</TableCell>
                        <TableCell>Base Discount</TableCell>
                        <TableCell>Diagnostics Discount</TableCell>
                        <TableCell>Storage Disscount</TableCell>
                        <TableCell>Buyback Category</TableCell>
                        <TableCell>Doorsteps Diagnostics</TableCell>
                        <TableCell>Actual Delivered Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {deliveryData.length === 0 ? (
                        <TableCell
                            colSpan={8}
                            align="center"
                            sx={{ verticalAlign: 'top' }}
                        >
                            <Typography variant="p" gutterBottom>
                                Sorry no records found
                            </Typography>
                        </TableCell>
                    ) : null}
                    {deliveryData?.map((data, index) => (
                        <TableRow>
                            <TableCell
                                style={
                                    data?.result?.length != 0
                                        ? { color: 'green' }
                                        : { color: 'red' }
                                }
                            >
                                {data?.result?.length != 0
                                    ? 'Match'
                                    : 'Not Match'}
                            </TableCell>
                            <TableCell>
                                {new Date(data?.created_at).toLocaleString(
                                    'en-GB',
                                    {
                                        hour12: true,
                                    }
                                )}
                            </TableCell>
                            <TableCell>{data?.uic_code?.code}</TableCell>
                            <TableCell
                                style={
                                    data?.uic_status == 'Printed'
                                        ? { color: 'green' }
                                        : data?.uic_status == 'Created'
                                        ? { color: 'orange' }
                                        : { color: 'red' }
                                }
                            >
                                {data?.uic_status}
                            </TableCell>
                            <TableCell>
                                {data?.tracking_id?.toString()}
                            </TableCell>
                            <TableCell>{data?.order_id?.toString()}</TableCell>
                            <TableCell>
                                {data?.order_date == null
                                    ? ''
                                    : new Date(data?.order_date).toLocaleString(
                                          'en-GB',
                                          {
                                              year: 'numeric',
                                              month: '2-digit',
                                              day: '2-digit',
                                          }
                                      ) == 'Invalid Date'
                                    ? data?.order_date
                                    : new Date(data?.order_date).toLocaleString(
                                          'en-GB',
                                          {
                                              year: 'numeric',
                                              month: '2-digit',
                                              day: '2-digit',
                                          }
                                      )}
                            </TableCell>
                            <TableCell>{data?.item_id?.toString()}</TableCell>
                            <TableCell>{data?.gep_order?.toString()}</TableCell>
                            <TableCell>{data?.imei?.toString()}</TableCell>
                            <TableCell>
                                {data?.partner_purchase_price?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.partner_shop?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.base_discount?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.diagnostics_discount?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.storage_disscount?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.buyback_category?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.doorsteps_diagnostics?.toString()}
                            </TableCell>
                            <TableCell>
                                {new Date(data?.delivery_date).toLocaleString(
                                    'en-GB',
                                    {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    }
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </DeiveryTable>
        )
    }, [deliveryData])
    const tempDeliverySearchData = useMemo(() => {
        return (
            <TempOrderStyle>
                <TableHead>
                    <TableRow>
                        <TableCell>Old UIC</TableCell>
                        <TableCell>Temp Delivery Imported Date</TableCell>
                        <TableCell>UIC</TableCell>
                        <TableCell>UIC Status</TableCell>
                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>Partner Shop</TableCell>
                        <TableCell>Last Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tempDelivery.length === 0 ? (
                        <TableCell
                            colSpan={8}
                            align="center"
                            sx={{ verticalAlign: 'top' }}
                        >
                            <Typography variant="p" gutterBottom>
                                Sorry no records found
                            </Typography>
                        </TableCell>
                    ) : null}
                    {tempDelivery?.map((data, index) => (
                        <TableRow>
                            <TableCell>{data?.old_uic}</TableCell>
                            <TableCell>
                                {new Date(data?.created_at).toLocaleString(
                                    'en-GB',
                                    {
                                        hour12: true,
                                    }
                                )}
                            </TableCell>
                            <TableCell>{data?.uic_code?.code}</TableCell>
                            <TableCell
                                style={
                                    data?.uic_status == 'Printed'
                                        ? { color: 'green' }
                                        : data?.uic_status == 'Created'
                                        ? { color: 'orange' }
                                        : { color: 'red' }
                                }
                            >
                                {data?.uic_status}
                            </TableCell>
                            <TableCell>
                                {data?.tracking_id?.toString()}
                            </TableCell>
                            <TableCell>{data?.order_id?.toString()}</TableCell>
                            <TableCell>
                                {data?.order_date == null
                                    ? ''
                                    : new Date(data?.order_date).toLocaleString(
                                          'en-GB',
                                          {
                                              year: 'numeric',
                                              month: '2-digit',
                                              day: '2-digit',
                                          }
                                      ) == 'Invalid Date'
                                    ? data?.order_date
                                    : new Date(data?.order_date).toLocaleString(
                                          'en-GB',
                                          {
                                              year: 'numeric',
                                              month: '2-digit',
                                              day: '2-digit',
                                          }
                                      )}
                            </TableCell>
                            <TableCell>{data?.item_id?.toString()}</TableCell>

                            <TableCell>{data?.imei?.toString()}</TableCell>

                            <TableCell>{data?.partner_shop}</TableCell>
                            <TableCell>{data?.type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TempOrderStyle>
        )
    }, [tempDelivery])

    return (
        <Container>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="xs"
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    Add Delivery
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Select Bag Id"
                        variant="outlined"
                        select
                        fullWidth
                        name="bag_id"
                        {...register('bag_id')}
                        error={errors.bag_id ? true : false}
                        helperText={errors.bag_id?.message}
                        sx={{ mt: 2 }}
                    >
                        {bag.map((bagData) => (
                            <MenuItem value={bagData.code} key={bagData.code}>
                                {bagData.code}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Select Tray Id"
                        variant="outlined"
                        select
                        fullWidth
                        sx={{ mt: 2 }}
                        name="tray_id"
                        {...register('tray_id')}
                        error={errors.tray_id ? true : false}
                        helperText={errors.tray_id?.message}
                    >
                        {botTray.map((BotData) => (
                            <MenuItem value={BotData.code} key={BotData.code}>
                                {BotData.code}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Select Bot Agent"
                        variant="outlined"
                        select
                        fullWidth
                        name="bot_agent"
                        {...register('bot_agent')}
                        error={errors.bot_agent ? true : false}
                        helperText={errors.bot_agent?.message}
                        sx={{ mt: 2 }}
                    >
                        {botUsers.map((botAgentData) => (
                            <MenuItem
                                value={botAgentData.user_name}
                                key={botAgentData.user_name}
                            >
                                {botAgentData.user_name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            m: 1,
                        }}
                        variant="contained"
                        style={{ backgroundColor: 'green' }}
                        type="submit"
                        onClick={handleSubmit(onsubmit)}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'WHT Utility', path: '/' }]}
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
                        label="Search Old UIC"
                        variant="outlined"
                        onChange={(e) => {
                            setdata(e.target.value)
                        }}
                    />
                </Box>
                <Box>
                    <Button
                        sx={{ mb: 2, mt: 1, ml: 3 }}
                        variant="contained"
                        color="primary"
                        disabled={data == ''}
                        onClick={(e) => {
                            searchOldUic(e)
                        }}
                    >
                        Search
                    </Button>
                </Box>
            </Box>
            {show !== false ? (
                <>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                    >
                        Temp Orders
                    </Typography>
                    <Card
                        sx={{ maxHeight: '100%', overflow: 'auto' }}
                        elevation={6}
                    >
                        {tempOrderSearchData}
                    </Card>
                    <Typography
                        sx={{ flex: '1 1 100%', mt: 4 }}
                        variant="h6"
                        id="tableTitle"
                    >
                        Live Orders
                    </Typography>
                    <Card
                        sx={{ maxHeight: '100%', overflow: 'auto' }}
                        elevation={6}
                    >
                        {OrderSearchData}
                    </Card>
                    {show == true && orderData.length == 0 ? (
                        <Box
                            sx={{
                                float: 'right',
                            }}
                        >
                            <Button
                                sx={{
                                    mt: 1,
                                }}
                                variant="contained"
                                onClick={(e) => {
                                    importOrder()
                                }}
                                style={{ backgroundColor: 'green' }}
                            >
                                Add Order
                            </Button>
                        </Box>
                    ) : null}

                    <Typography
                        sx={{ flex: '1 1 100%', mt: 4 }}
                        variant="h6"
                        id="tableTitle"
                    >
                        Temp Delivery
                    </Typography>
                    <Card
                        sx={{ maxHeight: '100%', overflow: 'auto', mb: 4 }}
                        elevation={6}
                    >
                        {tempDeliverySearchData}
                    </Card>
                    <Typography
                        sx={{ flex: '1 1 100%', mt: 4 }}
                        variant="h6"
                        id="tableTitle"
                    >
                        Live Delivery
                    </Typography>
                    <Card
                        sx={{ maxHeight: '100%', overflow: 'auto', mb: 4 }}
                        elevation={6}
                    >
                        {deliverySearchData}
                    </Card>
                    {show == true && deliveryData.length == 0 ? (
                        <Box
                            sx={{
                                float: 'right',
                            }}
                        >
                            <Button
                                sx={{
                                    mb: 1,
                                }}
                                variant="contained"
                                onClick={(e) => {
                                    handleOpen()
                                }}
                                style={{ backgroundColor: 'green' }}
                            >
                                Add Delivery
                            </Button>
                        </Box>
                    ) : null}
                </>
            ) : null}
        </Container>
    )
}

export default Search
