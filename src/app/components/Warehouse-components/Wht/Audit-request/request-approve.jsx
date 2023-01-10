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
import { useNavigate } from 'react-router-dom'
import TrayAssignDialogBox from './trayAssignMent'

// import jwt from "jsonwebtoken"
import { axiosWarehouseIn } from '../../../../../axios'
export default function DialogBox() {
    const navigate = useNavigate()
    const [trayData, setTrayData] = useState([])
    const { trayId } = useParams()
    const [loading, setLoading] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    const [userAgent, setUserAgent] = useState('')
    /**************************************************************************** */
    const [uic, setUic] = useState('')
    const [description, setDescription] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [trayIdNotChangeAble, setTrayIdNotChangeAble] = useState({})
    const [otherTrayAssign, setOtherTrayAssign] = useState({
        LUT: '',
        DUT: '',
        RBQ: '',
        CFT: '',
        STA: '',
        STB: '',
        STC: '',
        STD: '',
        WHT: '',
    })

    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    /*********************************************************** */

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosWarehouseIn.post(
                    '/getWhtTrayItem/' + trayId + '/' + 'Send for Audit'
                )
                if (response.status === 200) {
                    setTrayData(response.data.data)
                } else {
                    alert(response.data.message)
                    navigate(-1)
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [refresh])
    useEffect(() => {
        const userStatusApiCall = async () => {
            try {
                let res = await axiosWarehouseIn.post(
                    '/auditUserStatusChecking/' + trayData.issued_user_name
                )
                let trayFetch = await axiosWarehouseIn.post(
                    '/fetchAssignedTrayForAudit/' + trayData.issued_user_name
                )
                if (trayFetch.status == 200) {
                    setOtherTrayAssign({
                        LUT: trayFetch.data.data.LUT,
                        DUT: trayFetch.data.data.DUT,
                        RBQ: trayFetch.data.data.RBQ,
                        CFT: trayFetch.data.data.CFT,
                        STA: trayFetch.data.data.STA,
                        STB: trayFetch.data.data.STB,
                        STC: trayFetch.data.data.STC,
                        STD: trayFetch.data.data.STD,
                        WHT: trayId,
                    })
                    setTrayIdNotChangeAble(trayFetch.data.data)
                }
                if (res.status === 200) {
                    setUserAgent(res.data.data)
                }
            } catch (error) {
                alert(error)
            }
        }
        if (trayData.issued_user_name !== undefined) {
            userStatusApiCall()
        }
    }, [trayData])

    const handelUic = async (e) => {
        if (e.target.value.length === 11) {
            try {
                let obj = {
                    uic: e.target.value,
                    trayId: trayId,
                }
                setTextDisable(true)

                let res = await axiosWarehouseIn.post('/check-uic', obj)
                if (res?.status == 200) {
                    addActualitem(res.data.data)
                } else {
                    setTextDisable(false)
                    setUic('')
                    alert(res.data.message)
                }
            } catch (error) {
                alert(error)
            }
        }
    }
    /************************************************************************** */
    const addActualitem = async (obj) => {
        if (trayData.items.length < trayData?.actual_items?.length) {
            alert('All Items Scanned')
        } else {
            try {
                let objData = {
                    trayId: trayId,
                    item: obj,
                }
                setTextDisable(true)
                let res = await axiosWarehouseIn.post(
                    '/wht-add-actual-item',
                    objData
                )
                if (res.status == 200) {
                    setUic('')
                    setTextDisable(false)
                    setRefresh((refresh) => !refresh)
                }
            } catch (error) {
                alert(error)
            }
        }
    }
    /************************************************************************** */
    const handelIssue = async (e, sortId) => {
        try {
            if (userAgent !== 'User is free') {
                alert(userAgent)
            } else if (
                otherTrayAssign.LUT == '' ||
                otherTrayAssign.DUT == '' ||
                otherTrayAssign.CFT == '' ||
                otherTrayAssign.RBQ == '' ||
                otherTrayAssign.STA == '' ||
                otherTrayAssign.STB == '' ||
                otherTrayAssign.STC == '' ||
                otherTrayAssign.STD == ''
            ) {
                alert('Please assign other tray')
                handleDialogOpen()
            } else {
                if (trayData?.actual_items?.length == trayData?.items?.length) {
                    setLoading(true)
                    let obj = {
                        trayId: Object.values(otherTrayAssign),
                        description: description,
                        username: trayData.issued_user_name,
                    }
                    let res = await axiosWarehouseIn.post(
                        '/auditTrayIssueToAgent',
                        obj
                    )
                    if (res.status == 200) {
                        alert(res.data.message)
                        navigate('/wareshouse/wht/audit-request')
                    } else {
                        alert(res.data.message)
                    }
                } else {
                    setLoading(false)
                    alert('Please Verify Actual Data')
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

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
                        <h4>Expected</h4>
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h4>Total</h4>
                            <p style={{ fontSize: '22px' }}>
                                {
                                    trayData?.items?.filter(function (item) {
                                        return item.status != 'Duplicate'
                                    }).length
                                }
                                /{trayData?.limit}
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
                                <TableCell>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>MUIC</TableCell>
                                <TableCell>BOT Tray</TableCell>
                                <TableCell>BOT Agent</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trayData?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.muic}</TableCell>
                                    <TableCell>{data?.tray_id}</TableCell>
                                    <TableCell>{data?.bot_agent}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [trayData?.items])
    const tableActual = useMemo(() => {
        return (
            <Paper sx={{ width: '98%', overflow: 'hidden', m: 1 }}>
                <Box sx={{}}>
                    <Box
                        sx={{
                            float: 'left',
                            ml: 2,
                        }}
                    >
                        <h4>ACTUAL</h4>
                        <TextField
                            sx={{ mt: 1 }}
                            id="outlined-password-input"
                            type="text"
                            disabled={textDisable}
                            name="doorsteps_diagnostics"
                            inputRef={(input) => input && input.focus()}
                            label="Please Enter UIC"
                            value={uic}
                            onChange={(e) => {
                                setUic(e.target.value)
                                handelUic(e)
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
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h4>Total</h4>
                            <p style={{ fontSize: '24px' }}>
                                {
                                    trayData.actual_items?.filter(function (
                                        item
                                    ) {
                                        return item.status != 'Duplicate'
                                    }).length
                                }
                                /{trayData?.limit}
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
                                <TableCell>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>MUIC</TableCell>
                                <TableCell>BOT Tray</TableCell>
                                <TableCell>BOT Agent</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {trayData?.actual_items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.muic}</TableCell>
                                    <TableCell>{data?.tray_id}</TableCell>
                                    <TableCell>{data?.bot_agent}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [trayData?.actual_items, textDisable, uic])

    console.log(otherTrayAssign)

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
                    <h4 style={{ marginLeft: '13px' }}>TRAY ID - {trayId}</h4>
                    <h4 style={{ marginLeft: '13px' }}>
                        AGENT NAME - {trayData?.issued_user_name}
                    </h4>
                    <Button
                        sx={{ m: 2 }}
                        variant="contained"
                        color="primary"
                        onClick={() => handleDialogOpen()}
                    >
                        Assign Other Tray
                    </Button>
                </Box>
                <Box
                    sx={{
                        float: 'right',
                    }}
                >
                    <h4 style={{ marginRight: '13px' }}>
                        Brand -- {trayData?.brand}
                    </h4>
                    <h4 style={{ marginRight: '13px' }}>
                        Model -- {trayData?.model}
                    </h4>
                </Box>
                {shouldOpenEditorDialog && (
                    <TrayAssignDialogBox
                        handleClose={handleDialogClose}
                        open={handleDialogOpen}
                        setOtherTrayAssign={setOtherTrayAssign}
                        otherTrayAssign={otherTrayAssign}
                        trayIdNotChangeAble={trayIdNotChangeAble}
                    />
                )}
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    {tableExpected}
                </Grid>
                <Grid item xs={6}>
                    {tableActual}
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
                        sx={{ m: 3, mb: 7 }}
                        variant="contained"
                        disabled={
                            loading == true || description == '' ? true : false
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            if (window.confirm('You Want to Issue?')) {
                                handelIssue(e)
                            }
                        }}
                    >
                        Issue To Agent
                    </Button>
                </Box>
            </div>
        </>
    )
}
