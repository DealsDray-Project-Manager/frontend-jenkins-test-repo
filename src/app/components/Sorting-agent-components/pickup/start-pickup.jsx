import React, { useEffect, useMemo, useState } from 'react'

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

import { useParams } from 'react-router-dom'
// import jwt from "jsonwebtoken"
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { axiosSortingAgent } from '../../../../axios'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'

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
    const [tray, setTray] = useState([])
    const { trayId } = useParams()
    /**************************************************************************** */
    const [awbn, setAwbn] = useState('')
    const [open, setOpen] = useState(false)
    const [description, setDescription] = useState([])
    const [itemDetails, setItemDetails] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    /*********************************************************** */

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosSortingAgent.post(
                        '/pickup/getTray/' + trayId
                    )
                    if (response.status === 200) {
                        setTray(response.data.data)
                    } else {
                        alert(response.data.message)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [refresh])

    const handleClose = () => {
        setOpen(false)
        setLoading(false)
        setAwbn('')
    }

    const handelAwbn = async (e) => {
        if (e.target.value.length === 11) {
            try {
                let obj = {
                    uic: e.target.value,
                    fromTray: trayId,
                    toTray: tray?.[1]?.code,
                }
                let res = await axiosSortingAgent.post(
                    '/pickup/itemTransferUicScan',
                    obj
                )
                if (res?.status === 200) {
                    setItemDetails(res.data.data)
                    if (
                        res.data.data.pickup_toTray == undefined ||
                        res.data.data.pickup_toTray == '' ||
                        res.data.data.pickup_toTray == null
                    ) {
                        addActualitemTop(res.data.data)
                    } else {
                        setOpen(true)
                    }
                } else {
                    alert(res.data.message)
                }
            } catch (error) {
                setAwbn('')

                alert(error)
            }
        }
    }

    const addActualitemTop = async (dataItem) => {
        try {
            setLoading(true)

            let obj = {
                fromTray: trayId,
                toTray: tray[1].code,
                item: dataItem,
                trayType: tray[1].type_taxanomy,
            }
            let res = await axiosSortingAgent.post('/pickup/itemTransfer', obj)
            if (res?.status === 200) {
                alert(res.data.message)
                handleClose()
                setAwbn('')
                setLoading(false)
                setRefresh((refresh) => !refresh)
            } else {
                alert(res.data.message)
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
                    fromTray: trayId,
                    toTray: tray[1].code,
                    item: itemDetails,
                    trayType: tray[1].type_taxanomy,
                }
                let res = await axiosSortingAgent.post(
                    '/pickup/itemTransfer',
                    obj
                )
                if (res?.status === 200) {
                    alert(res.data.message)
                    setAwbn('')
                    setLoading(false)
                    setRefresh((refresh) => !refresh)
                } else {
                    alert(res.data.message)
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    /************************************************************************** */

    const handelIssue = async (e, trayId) => {
        e.preventDefault()
        try {
            if (description == '') {
                alert('Please Add Description')
            } else {
                setLoading2(true)
                let obj = {
                    fromTray: trayId,
                    toTray: tray?.[1].code,
                    toTrayLength: tray?.[1]?.items?.length,
                    toTrayLimit: tray?.[1]?.limit,
                    allItem: tray[0]?.temp_array,
                }

                let res = await axiosSortingAgent.post('/pickup/closeTray', obj)
                if (res.status === 200) {
                    alert(res.data.message)
                    setLoading2(false)
                    navigate('/sorting/pickup/request')
                } else {
                    alert(res.data.message)
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    /***************************************************************************************** */

    const tableFrom = useMemo(() => {
        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', m: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4>FROM TRAY ITEMS - {tray[0]?.code}</h4>
                    <Box sx={{ mr: 4 }}>
                        <h4 style={{ marginLeft: '10px' }}>Total</h4>
                        <p style={{ fontSize: '21px', textAlign: 'center' }}>
                            {tray[0]?.temp_array?.length}/{tray[0]?.limit}
                        </p>
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
                                <TableCell>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Model</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tray[0]?.temp_array?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.brand_name}</TableCell>
                                    <TableCell>{data?.model_name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [tray[0]?.temp_array])

    const TableToTray = useMemo(() => {
        return (
            <Paper sx={{ width: '98%', overflow: 'hidden', m: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4>TO TRAY ITEMS - {tray?.[1]?.code}</h4>
                    <Box sx={{ mr: 4 }}>
                        <h4 style={{ marginLeft: '5px' }}>Total</h4>
                        <p style={{ fontSize: '21px', textAlign: 'center' }}>
                            {tray[1]?.items?.length}/{tray[1]?.limit}
                        </p>
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
                                <TableCell>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>Model</TableCell>
                                <TableCell>Brand</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {tray?.[1]?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.brand_name}</TableCell>
                                    <TableCell>{data?.model_name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [tray?.[1]?.items])

    return (
        <>
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
                        {itemDetails?.pickup_toTray == '' ||
                        itemDetails?.pickup_toTray == undefined ||
                        itemDetails?.pickup_toTray == null ? (
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
                                    <h4>To:-{itemDetails?.pickup_toTray}</h4>
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

            <Box
                sx={{
                    mt: 1,
                    height: 70,
                    borderRadius: 1,
                }}
            >
                <Box
                    sx={{
                        float: 'left',
                    }}
                >
                    <h4 style={{ marginLeft: '13px' }}>FROM TRAY - {trayId}</h4>
                    <TextField
                        sx={{ m: 1 }}
                        id="outlined-password-input"
                        type="text"
                        name="doorsteps_diagnostics"
                        label="SCAN UIC"
                        // inputRef={(input) => input && input.focus()}
                        value={awbn}
                        onChange={(e) => {
                            setAwbn(e.target.value)
                            handelAwbn(e)
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
                    }}
                >
                    <h4 style={{ marginRight: '13px' }}>
                        Assigned Date --{' '}
                        {new Date(tray?.[0]?.requested_date).toLocaleString(
                            'en-GB',
                            {
                                hour12: true,
                            }
                        )}
                    </h4>
                </Box>
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    {tableFrom}
                </Grid>
                <Grid item xs={6}>
                    {TableToTray}
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
                            tray?.[0]?.actual_items?.length !==
                            tray?.[0]?.items?.length
                                ? true
                                : loading2 == true
                                ? true
                                : false
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            handelIssue(e, trayId)
                        }}
                    >
                        Close Tray
                    </Button>
                </Box>
            </div>
        </>
    )
}
