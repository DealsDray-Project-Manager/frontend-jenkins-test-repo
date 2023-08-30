import React, { useEffect, useState, useMemo } from 'react'
import {
    Box,
    Button,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    IconButton,
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useParams, useNavigate } from 'react-router-dom'
import { axiosSortingAgent, axiosWarehouseIn } from '../../../../../axios'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
import useAuth from 'app/hooks/useAuth'


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

export default function DialogBox() {
    const navigate = useNavigate()
    const [trayData, setTrayData] = useState({})
    const { trayId } = useParams()
    const [rpTray, setRpTray] = useState({})
    const [open, setOpen] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    const [description, setDescription] = useState('')
    const [itemDetails, setItemDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    /**************************************************************************** */
    const [uic, setUic] = useState('')
    const { user } = useAuth()
    const [refresh, setRefresh] = useState(false)
    /*********************************************************** */
    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { user_name } = jwt_decode(admin)
                    let response = await axiosSortingAgent.post(
                        '/sorting/wht-to-rp/' + trayId + '/' + user_name
                    )
                    if (response.status === 200) {
                        setTrayData(response.data.data)
                        setRpTray(response.data.rpTray)
                    } else {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: response?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                        navigate(-1)
                    }
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
    }, [refresh])
    /************************************************************************** */
    const handelAwbn = async (e) => {
        if (e.target.value.length === 11) {
            try {
                setTextDisable(true)
                let obj = {
                    uic: e.target.value,
                    whtTray: trayId,
                    rpTray: rpTray?.code,
                }
                let res = await axiosSortingAgent.post(
                    '/whtToRp/itemTransferUicScan',
                    obj
                )
                if (res?.status === 200) {
                    setItemDetails(res.data.data)
                    if (
                        res.data.data.rp_tray == undefined ||
                        res.data.data.rp_tray == '' ||
                        res.data.data.rp_tray == null
                    ) {
                        addActualitemTop(res.data.data)
                    } else {
                        setOpen(true)
                    }
                } else {
                    setTextDisable(false)
                    setUic('')
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message,
                    })
                }
            } catch (error) {
                setUic('')
                alert(error)
            }
        }
    }

    const addActualitemTop = async (dataItem) => {
        try {
            setLoading(true)
            let obj = {
                whtTray: trayId,
                rpTray: rpTray?.code,
                item: dataItem,
                trayType: rpTray?.type_taxanomy,
            }
            let res = await axiosSortingAgent.post('/whtToRp/itemTransfer', obj)
            if (res?.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                handleClose()
                setUic('')
                setLoading(false)
                setTextDisable(false)
                setRefresh((refresh) => !refresh)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                })
                setLoading(false)
                setTextDisable(false)
            }
        } catch (error) {
            alert(error)
        }
    }

    /************************************************************************** */
    const addActualitem = async (e) => {
        try {
            if (e.keyCode !== 32) {
                handleClose()
                setLoading(true)
                let obj = {
                    whtTray: trayId,
                    rpTray: rpTray?.code,
                    item: itemDetails,
                    trayType: rpTray?.type_taxanomy,
                }
                let res = await axiosSortingAgent.post(
                    '/whtToRp/itemTransfer',
                    obj
                )
                if (res?.status === 200) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                    setUic('')
                    setTextDisable(false)
                    setLoading(false)
                    setRefresh((refresh) => !refresh)
                } else {
                    setTextDisable(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res?.data?.message,
                    })
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    /************************************************************************** */
    const handelIssue = async (e) => {
        e.preventDefault()
        try {
            setLoading2(true)
            let obj = {
                whtTray: trayId,
                rpTray: rpTray?.code,
                toTrayLength: rpTray?.items?.length,
                toTrayLimit: rpTray?.limit,
                allItem: rpTray?.temp_array,
                screen: 'Starting - page',
            }
            if (obj.toTrayLength == obj.allItem.length) {
                obj['type'] = 'RPT'
            }
            let res = await axiosSortingAgent.post('/whtToRp/closeTray', obj)
            if (res.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setLoading2(false)
                navigate('/sorting/wht-to-rp/request')
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleClose = () => {
        setOpen(false)
        setLoading(false)
        setTextDisable(false)
        setUic('')
    }

    /************************************************************************** */
    const tableExpected = useMemo(() => {
        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', m: 1 }}>
                <Box sx={{}}>
                    <Box
                        sx={{
                            float: 'left',
                            ml: 2,
                        }}
                    >
                        <h5>WHT Tray ID: {trayData?.code}</h5>
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 5,
                        }}
                    >
                        <Box sx={{}}>
                            <h5 style={{ marginLeft: '9px' }}>Total</h5>
                            <p style={{ paddingLeft: '5px', fontSize: '22px' }}>
                                {trayData?.actual_items?.length} /{' '}
                                {trayData?.limit}
                            </p>
                        </Box>
                    </Box>
                </Box>
                <TableContainer>
                    <Table
                        style={{ width: '100%' }}
                        id="example"
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 2 }}>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>MUIC</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trayData?.actual_items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>

                                    <TableCell>{data?.muic}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [trayData?.actual_items])

    const tableActul = useMemo(() => {
        return (
            <Paper sx={{ width: '98%', overflow: 'hidden', m: 1 }}>
                <Box sx={{}}>
                    <Box
                        sx={{
                            float: 'left',
                            ml: 2,
                        }}
                    >
                        <h5>RP Tray ID: {rpTray?.code}</h5>
                        <TextField
                            sx={{ mt: 1 }}
                            id="outlined-password-input"
                            type="text"
                            inputRef={(input) => input && input.focus()}
                            name="doorsteps_diagnostics"
                            disabled={textDisable}
                            label="SCAN UIC"
                            value={uic}
                            onChange={(e) => {
                                setUic(e.target.value)
                                handelAwbn(e)
                            }}
                            onKeyPress={(e) => {
                                if (user.serverType == 'Live') {
                                    // Prevent manual typing by intercepting key presses
                                    e.preventDefault()
                                }
                            }}
                            onPaste={(e) => {
                                if (user.serverType == 'Live') {
                                    // Prevent manual typing by intercepting key presses
                                    e.preventDefault()
                                }
                            }}
                            inputProps={{
                                style: {
                                    width: 'auto',
                                },
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 5,
                        }}
                    >
                        <Box sx={{}}>
                            <h5 style={{ marginLeft: '14px' }}>Total</h5>

                            <p style={{ marginLeft: '5px', fontSize: '24px' }}>
                                {rpTray?.items?.length} / {rpTray?.limit}
                            </p>
                        </Box>
                    </Box>
                </Box>
                <TableContainer>
                    <Table
                        style={{ width: '100%' }}
                        id="example"
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 2 }}>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>MUIC</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rpTray?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>

                                    <TableCell>{data?.muic}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [rpTray?.items, textDisable, uic])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Sorting request wht-rp', path: '/' },
                        { name: 'Sorting' },
                    ]}
                />
            </div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    width="600px"
                >
                    You are moving
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                    >
                        {itemDetails?.rp_tray == '' ||
                        itemDetails?.rp_tray == undefined ||
                        itemDetails?.rp_tray == null ? (
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <h4>MUIC:-{itemDetails?.muic}</h4>
                                    <h4>UIC:-{itemDetails?.uic}</h4>
                                    <h4>From:-{trayId}</h4>
                                </Grid>
                                <Grid item xs={6}>
                                    <h4>
                                        Model Name:-{itemDetails?.model_name}
                                    </h4>
                                    <h4>
                                        Brand Name:-{itemDetails?.brand_name}
                                    </h4>
                                    <h4>To:-{trayId}</h4>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <h4>MUIC:-{itemDetails?.muic}</h4>
                                    <h4>UIC:-{itemDetails?.uic}</h4>
                                    <h4>From:-{trayId}</h4>
                                </Grid>
                                <Grid item xs={6}>
                                    <h4>
                                        Model Name:-{itemDetails?.model_name}
                                    </h4>
                                    <h4>
                                        Brand Name:-{itemDetails?.brand_name}
                                    </h4>
                                    <h4>To:-{itemDetails?.rp_tray}</h4>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            ml: 2,
                        }}
                        fullwidth
                        variant="contained"
                        style={{ backgroundColor: 'primery' }}
                        disabled={loading}
                        component="span"
                        onClick={(e) => {
                            addActualitem(e)
                        }}
                    >
                        YES
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <Box>
                <Box
                    sx={{
                        float: 'left',
                    }}
                >
                    <h4 style={{ marginLeft: '13px' }}>
                        Issued Date:{' '}
                        {new Date(trayData?.assigned_date).toLocaleString(
                            'en-GB',
                            {
                                hour12: true,
                            }
                        )}
                    </h4>
                    <h4 style={{ marginLeft: '13px' }}>
                        Brand: {trayData?.brand}
                    </h4>
                    <h4 style={{ marginLeft: '13px' }}>
                        Model: {trayData?.model}
                    </h4>
                </Box>
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    {tableExpected}
                </Grid>
                <Grid item xs={6}>
                    {tableActul}
                </Grid>
            </Grid>
            <div style={{ float: 'right' }}>
                <Box sx={{ float: 'right' }}>
                    <textarea
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        style={{ width: '300px', height: '60px' }}
                        placeholder="Description"
                    ></textarea>
                    <Button
                        sx={{ m: 3, mb: 9 }}
                        variant="contained"
                        disabled={
                            trayData?.actual_items?.length !==
                                trayData?.items?.length ||
                            description == '' ||
                            loading2
                        }
                        style={{ backgroundColor: 'primery' }}
                        onClick={(e) => {
                            handelIssue(e)
                        }}
                    >
                        Close Tray
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
