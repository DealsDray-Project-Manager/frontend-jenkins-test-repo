import React, { useEffect, useState } from 'react'
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

import { axiosSortingAgent, axiosWarehouseIn } from '../../../../axios'

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
                    let response = await axiosWarehouseIn.post(
                        '/viewTrayFromAndTo/' + location + '/' + trayId
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
                    alert(res.data.message)
                }
            } catch (error) {
                setAwbn('')

                alert(error)
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
                handleClose()
                setLoading(false)
            } else {
                alert(res.data.message)
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
                }
                let res = await axiosSortingAgent.post(
                    '/mergeDoneTraySendToWarehouse',
                    obj
                )
                if (res.status === 200) {
                    alert(res.data.message)
                    setLoading2(false)
                    navigate('/sorting/merge')
                } else {
                    alert(res.data.message)
                }
            }
        } catch (error) {
            alert(error)
        }
    }

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
                    <Paper sx={{ width: '95%', overflow: 'hidden', m: 1 }}>
                        <h4>FROM TRAY ITEMS - {tray[0]?.code}</h4>

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
                                        <TableCell>Order Id</TableCell>
                                        <TableCell>AWBN</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tray[0]?.actual_items?.map(
                                        (data, index) => (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                            >
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {data?.uic}
                                                </TableCell>
                                                <TableCell>
                                                    {data?.order_id}
                                                </TableCell>
                                                <TableCell>
                                                    {data?.awbn_number ==
                                                    undefined
                                                        ? data?.tracking_id
                                                        : data?.awbn_number}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ width: '98%', overflow: 'hidden', m: 1 }}>
                        <h4>TO TRAY ITEMS - {tray?.[1]?.code}</h4>
                        <TextField
                            sx={{ m: 1 }}
                            id="outlined-password-input"
                            type="text"
                            name="doorsteps_diagnostics"
                            label="Please Enter UIC"
                            value={awbn}
                            // onChange={(e) => setAwbn(e.target.value)}
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
                                        <TableCell>Order Id</TableCell>
                                        <TableCell>AWBN</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {tray?.[1]?.items?.map((data, index) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{data?.uic}</TableCell>
                                            <TableCell>
                                                {data?.order_id}
                                            </TableCell>
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
                            tray?.[0]?.actual_items?.length !== 0
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
