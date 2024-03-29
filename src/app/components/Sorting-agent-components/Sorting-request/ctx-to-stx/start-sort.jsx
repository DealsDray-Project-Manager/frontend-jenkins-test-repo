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
import {
    axiosSortingAgent,
    axiosWarehouseIn,
    axiosSuperAdminPrexo,
} from '../../../../../axios'

export default function DialogBox() {
    const navigate = useNavigate()
    const [tray, setTray] = useState([])
    const { trayId } = useParams()
    /**************************************************************************** */
    const [awbn, setAwbn] = useState('')
    const [open, setOpen] = useState(false)
    const [description, setDescription] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const { user } = useAuth()
    /*********************************************************** */

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let obj = {
                        location: location,
                        fromTray: trayId,
                        type: 'ctx-to-stx-sorting-page',
                    }
                    let response = await axiosWarehouseIn.post(
                        '/viewTrayFromAndTo',
                        obj
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

    const handelAwbn = async (e) => {
        if (e.target.value.length === 11) {
            try {
                setLoading(true)
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
                    setOpen(true)
                } else {
                    setLoading(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                }
            } catch (error) {
                setAwbn('')

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
            setLoading(true)
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
                setLoading(false)
            } else {
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

    /*-------------------------------------------------------------------------*/
    const handelDuplicateRemove = async (id, arrayType, tray) => {
        try {
            let obj = {
                trayId: tray,
                id: id,
                arrayType: arrayType,
            }
            const res = await axiosSuperAdminPrexo.post(
                '/globeDuplicateRemove',
                obj
            )
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: res?.data?.message,
                    showConfirmButton: true,
                })
                setRefresh((refresh) => !refresh)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
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
                    }}
                >
                    <h4 style={{ marginLeft: '15px' }}>
                        FROM TRAY ITEMS - {tray[0]?.code}
                    </h4>
                    <h4 style={{ marginLeft: '15px' }}>
                        Tray Grade - {tray[0]?.tray_grade}
                    </h4>

                    <Box sx={{ mr: 2 }}>
                        <h5 style={{ marginLeft: '14px' }}>Total</h5>
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
                                <TableCell sx={{ pl: 2 }}>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>MUIC</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Model</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tray[0]?.actual_items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.muic}</TableCell>
                                    <TableCell>{data?.brand_name}</TableCell>
                                    <TableCell>{data?.model_name}</TableCell>

                                    {data?.dup_uic_status !==
                                    'Duplicate' ? null : (
                                        <TableCell>
                                            <Button
                                                sx={{
                                                    ml: 2,
                                                }}
                                                variant="contained"
                                                style={{
                                                    backgroundColor: 'red',
                                                }}
                                                component="span"
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            'You want to Remove?'
                                                        )
                                                    ) {
                                                        handelDuplicateRemove(
                                                            data?._id,
                                                            'Second-main',
                                                            tray[0]?.code
                                                        )
                                                    }
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    )}
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
                    }}
                >
                    <h4 style={{ marginLeft: '15px' }}>
                        TO TRAY ITEMS - {tray?.[1]?.code}
                    </h4>
                    <h4 style={{ marginLeft: '15px' }}>
                        Tray Grade - {tray[1]?.tray_grade}
                    </h4>
                    <Box sx={{ mr: 2 }}>
                        <h5 style={{ marginLeft: '14px' }}>Total</h5>
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
                    disabled={loading}
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
                                <TableCell sx={{ pl: 2 }}>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>MUIC</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Model</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {tray?.[1]?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.muic}</TableCell>
                                    <TableCell>{data?.brand_name}</TableCell>
                                    <TableCell>{data?.model_name}</TableCell>

                                    {data?.dup_uic_status !==
                                    'Duplicate' ? null : (
                                        <TableCell>
                                            <Button
                                                sx={{
                                                    ml: 2,
                                                }}
                                                variant="contained"
                                                style={{
                                                    backgroundColor: 'red',
                                                }}
                                                component="span"
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            'You want to Remove?'
                                                        )
                                                    ) {
                                                        handelDuplicateRemove(
                                                            data?._id,
                                                            'Main',
                                                            tray[1]?.code
                                                        )
                                                    }
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [tray?.[1]?.items, awbn, tray?.[1]?.code])

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
                            tray?.[0]?.actual_items?.length !== 0 &&
                            tray?.[1]?.items?.length < tray?.[1]?.limit
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
