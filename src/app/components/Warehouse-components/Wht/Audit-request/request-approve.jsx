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
    Card,
    Typography,
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import TrayAssignDialogBox from './trayAssignMent'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import useAuth from 'app/hooks/useAuth'
// import jwt from "jsonwebtoken"
import { H1, H3, H4 } from 'app/components/Typography'
import { axiosWarehouseIn } from '../../../../../axios'
import { axiosSuperAdminPrexo } from '../../../../../axios'

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

export default function DialogBox() {
    const navigate = useNavigate()
    const [trayData, setTrayData] = useState([])
    const { trayId } = useParams()
    const [loading, setLoading] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    const [userAgent, setUserAgent] = useState('')
    /**************************************************************************** */
    const [uic, setUic] = useState('')
    const { user } = useAuth()
    const [description, setDescription] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [validatedCtx, setValidatedCtx] = useState([])
    const [ctxGrade, setCtxGrade] = useState([])
    const [issuedCtx, setIssuedCtx] = useState([])
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/getWhtTrayItem/' +
                            trayId +
                            '/' +
                            'Send for Audit/' +
                            location
                    )
                    if (response.status === 200) {
                        setTrayData(response.data.data)
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

    useEffect(() => {
        const fetchCtxTray = async () => {
            try {
                const res = await axiosWarehouseIn.post(
                    '/getCtxCategorysForIssue',
                    issuedCtx
                )
                if (res.status === 200) {
                    setCtxGrade(res?.data)
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchCtxTray()
        return () => {}
    }, [issuedCtx])

    useEffect(() => {
        const userStatusApiCall = async () => {
            try {
                let obj = {
                    username: trayData.issued_user_name,
                    brand: trayData.brand,
                    model: trayData.model,
                }
                let res = await axiosWarehouseIn.post(
                    '/auditUserStatusChecking',
                    obj
                )
                let obj2 = {
                    username: trayData.issued_user_name,
                    brand: trayData.brand,
                    model: trayData.model,
                }
                let trayFetch = await axiosWarehouseIn.post(
                    '/fetchAssignedTrayForAudit',
                    obj2
                )
                if (trayFetch.status == 200) {
                    setIssuedCtx(trayFetch.data.grade)
                }
                if (res.status === 200) {
                    setUserAgent(res.data.data)
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
                    setUic('')
                    setTextDisable(false)
                    setRefresh((refresh) => !refresh)
                } else {
                    setTextDisable(false)
                    setUic('')

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
    }
    /************************************************************************** */
    const handelIssue = async (e, sortId) => {
        try {
            if (userAgent !== 'User is free') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: userAgent,
                })
            } else if (validatedCtx?.length !== ctxGrade?.length) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: 'Please Assign ctx tray',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleDialogOpen()
                    }
                })
            } else {
                if (trayData?.actual_items?.length == trayData?.items?.length) {
                    setLoading(true)
                    let obj = {
                        trayId: validatedCtx,
                        description: description,
                        username: trayData.issued_user_name,
                        actioUser: user.username,
                        whtTray: trayId,
                    }
                    let res = await axiosWarehouseIn.post(
                        '/auditTrayIssueToAgent',
                        obj
                    )
                    if (res.status == 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: res?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                        navigate('/wareshouse/wht/audit-request')
                    } else {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: res?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                    }
                } else {
                    setLoading(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'Please verify Actual data',
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
                        <h4>EXPECTED</h4>
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h4 style={{ marginLeft: '10px' }}>Total</h4>
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
                                <TableCell sx={{ pl: 2 }}>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>MUIC</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trayData?.items?.map((data, index) => (
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
                            label="SCAN UIC"
                            value={uic}
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
                            <h4 style={{ marginLeft: '5px' }}>Total</h4>
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
    }, [trayData?.actual_items, textDisable, uic])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'WHT', path: '/' },
                        { name: 'Audit-Requests', path: '/' },
                        { name: 'Approve' },
                    ]}
                />
            </div>
            <Card>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ ml: 2 }}>
                                TRAY ID :- {trayId}
                            </Typography>
                            <Typography sx={{ ml: 2 }}>
                                AGENT NAME :- {trayData?.issued_user_name}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ ml: 2, mt: 1 }}>
                                Brand :- {trayData?.brand}
                            </Typography>
                            <Typography sx={{ ml: 2, mt: 1 }}>
                                Model :- {trayData?.model}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ ml: 2, mt: 1 }}>
                                Already Issued Trays :-{' '}
                                {issuedCtx?.map((item, index) => (
                                    <span key={index}>
                                        {item},{' '}
                                        {(index + 1) % 2 === 0 ? <br /> : ' '}
                                    </span>
                                ))}
                            </Typography>
                        </Box>
                    </Box>

                    <Button
                        sx={{ height: '42px', m: 1 }}
                        variant="contained"
                        color="primary"
                        disabled={validatedCtx?.length !== 0}
                        onClick={() => handleDialogOpen()}
                    >
                        Add Ctx Tray
                    </Button>
                </Box>

                {shouldOpenEditorDialog && (
                    <TrayAssignDialogBox
                        handleClose={handleDialogClose}
                        open={handleDialogOpen}
                        setValidatedCtx={setValidatedCtx}
                        brand={trayData?.brand}
                        model={trayData?.model}
                        ctxGrade={ctxGrade}
                        setCtxGrade={setCtxGrade}
                    />
                )}
            </Card>
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
                            trayData?.actual_items?.length !==
                                trayData?.items?.length ||
                            loading == true ||
                            description == ''
                                ? true
                                : false
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
        </Container>
    )
}
