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
} from '@mui/material'
import { useParams } from 'react-router-dom'
// import jwt from "jsonwebtoken"
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'

import { axiosSortingAgent, axiosWarehouseIn } from '../../../../axios'

export default function DialogBox() {
    const navigate = useNavigate()
    const [tray, setTray] = useState([])
    const { trayId } = useParams()
    /**************************************************************************** */
    const [awbn, setAwbn] = useState('')
    const [description, setDescription] = useState([])
    const [itemDetails, setItemDetails] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const { user } = useAuth()
    const [textDisable, setTextDisable] = useState(false)

    /*********************************************************** */

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let obj={
                        location:location,
                        fromTray:trayId,
                        type:"tray-merging-page"
                    }
                    let response = await axiosWarehouseIn.post(
                        '/viewTrayFromAndTo',obj
                    )
                    if (response.status === 200) {
                        setTray(response.data.data)
                    } else {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: response?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchData()
    }, [refresh])

    const handleClose = () => {
        setLoading(false)
        setAwbn('')
    }

    const handelAwbn = async (e) => {
        if (e.target.value.length === 11) {
            try {
                setTextDisable(true)
                let obj = {
                    uic: e.target.value,
                    trayId: trayId,
                    wht_tray: tray?.wht,
                }

                let res = await axiosSortingAgent.post(
                    '/cheack-uic-for-sorting',
                    obj
                )
                if (res?.status === 200) {
                    addActualitem(res.data.data)
                } else {
                    setTextDisable(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                }
            } catch (error) {
                setAwbn('')
                setTextDisable(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
    }

    /************************************************************************** */
    const addActualitem = async (data) => {
        try {
            handleClose()
            let obj = {
                fromTray: trayId,
                toTray: tray[1].code,
                item: data,
                trayType: tray[1].type_taxanomy,
            }
            let res = await axiosSortingAgent.post('/itemShifteToMmtTray', obj)
            if (res?.status === 200) {
                setRefresh((refresh) => !refresh)
                setAwbn('')
                setTextDisable(false)
            } else {
                setTextDisable(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
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
    /************************************************************************** */
    const handelIssue = async (e, trayId) => {
        e.preventDefault()
        try {
            if (description == '') {
                Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: 'Please Add Description',
                    confirmButtonText: 'Ok',
                })
            } else {
                setLoading2(true)
                let obj = {
                    fromTray: trayId,
                    toTray: tray?.[1].code,
                    type: tray?.[1]?.type_taxanomy,
                }
                let res = await axiosSortingAgent.post(
                    '/mergeDoneTraySendToWarehouse',
                    obj
                )
                if (res.status === 200) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                    setLoading2(false)
                    navigate('/sorting/merge')
                } else {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
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

    const tableFrom = useMemo(() => {
        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', m: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        ml:1
                    }}
                >
                    <h4 >FROM TRAY ITEMS - {tray[0]?.code}</h4>

                    <Box>
                        <h5 >Total</h5>
                        <p style={{ margin: '5px', fontSize: '22px' }}>
                            {tray?.[0]?.actual_items?.length}/{tray?.[0]?.limit}
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
                                <TableCell sx={{pl:2}}>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>Order Id</TableCell>
                                <TableCell>AWBN</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tray[0]?.actual_items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{pl:2}}>{index + 1}</TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.order_id}</TableCell>
                                    <TableCell>
                                        {data?.awbn_number == undefined
                                            ? data?.tracking_id
                                            : data?.awbn_number}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [tray[0]?.actual_items, tray[0]?.code])

    const toTrayTable = useMemo(() => {
        return (
            <Paper sx={{ width: '98%', overflow: 'hidden', m: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        ml:1,
                    }}
                >
                    <h4>TO TRAY ITEMS - {tray?.[1]?.code}</h4>
                    <Box>
                        <h5 style={{ marginLeft: '8px' }}>Total</h5>
                        <p style={{ margin: '5px', fontSize: '22px' }}>
                            {tray?.[1]?.items?.length}/{tray?.[1]?.limit}
                        </p>
                    </Box>
                </Box>
                <TextField
                    sx={{ m: 1 }}
                    id="outlined-password-input"
                    type="text"
                    name="doorsteps_diagnostics"
                    label="Scan UIC"
                    value={awbn}
                    disabled={textDisable}
                    // onChange={(e) => setAwbn(e.target.value)}
                    onChange={(e) => {
                        setAwbn(e.target.value)
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

                <TableContainer>
                    <Table
                        style={{ width: '100%' }}
                        id="example"
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{pl:2}}>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>Order Id</TableCell>
                                <TableCell>AWBN</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {tray?.[1]?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{pl:2}}>{index + 1}</TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.order_id}</TableCell>
                                    <TableCell>
                                        {data?.awbn_number == undefined
                                            ? data?.tracking_id
                                            : data?.awbn_number}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [tray?.[1]?.items, awbn, textDisable, tray?.[1]?.code])

    /***************************************************************************************** */
    return (
        <>
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
                </Box>
                <Box
                    sx={{
                        float: 'right',
                    }}
                >
                    <h4 style={{ marginRight: '13px' }}>
                        Assigned Date --{' '}
                        {new Date(tray?.[0]?.assigned_date).toLocaleString(
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
                    {toTrayTable}
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
                            tray.length == 0 ||
                            (tray?.[0]?.actual_items?.length !== 0 &&
                                tray?.[0]?.type_taxanomy == 'MMT')
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
