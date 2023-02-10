import React, { useEffect, useState, useMemo } from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
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
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import { axiosAuditAgent } from '../../../../axios'

// import jwt from "jsonwebtoken"
import jwt_decode from 'jwt-decode'
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
    const [trayData, setTrayData] = useState([])
    const { trayId } = useParams()
    const [refresh, setRefresh] = useState(false)

    const [username, setUserName] = useState('')
    const [uic, setUic] = useState('')
    const [closeButDis, SetCloseButDis] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { user_name } = jwt_decode(admin)
                    setUserName(user_name)
                    let response = await axiosAuditAgent.post(
                        '/transactionScreen/' + trayId + '/' + user_name
                    )
                    if (response.status === 200) {
                        setTrayData(response.data.data)
                    } else {
                        alert(response.data.message)
                        navigate(-1)
                    }
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [refresh])

    const handelUic = async (uicCode) => {
        try {
            if (uicCode.length == 11) {
                let res = await axiosAuditAgent.post(
                    '/bqcReport/' + uicCode + '/' + trayId
                )
                if (res.status === 200) {
                    // setReportData(res.data.data)
                    navigate(
                        '/audit/audit-request/start-transaction/information-display',
                        {
                            state: {
                                reportData: res.data.data,
                                trayId: trayId,
                                username: username,
                                uic: uicCode,
                                ctxTray: trayData?.otherTray,
                            },
                        }
                    )
                } else {
                    setUic('')
                    alert(res.data.message)
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    const handelClose = async (id, from) => {
        try {
            SetCloseButDis(true)
            let res = await axiosAuditAgent.post('/trayClose/' + id)
            if (res.status == 200) {
                alert(res.data.message)
                SetCloseButDis(false)
                if (from == 'wht') {
                    navigate('/audit/audit-request')
                } else {
                    setRefresh((refresh) => !refresh)
                }
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }

    const table = useMemo(() => {
        return (
            <Grid container spacing={2}>
                {trayData?.otherTray?.map((data, index) => (
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <h4 style={{ paddingLeft: '10px' }}>
                                Tray Id:- {data.code} - {data?.items?.length} /{' '}
                                {data?.limit}
                            </h4>
                            {data.sort_id == 'Audit Done' ? (
                                <h5 style={{ color: 'red' }}>-Tray Closed</h5>
                            ) : (
                                ''
                            )}
                        </Box>
                        <Paper sx={{ width: '95%', overflow: 'hidden', m: 1 }}>
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
                                        {data?.items?.map((itemData, index) => (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                            >
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {itemData.uic}
                                                </TableCell>
                                                <TableCell>
                                                    {itemData.brand_name}
                                                </TableCell>
                                                <TableCell>
                                                    {itemData.model_name}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        )
    }, [trayData?.otherTray])

    return (
        <>
            <Box sx={{ mt: 1 }}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <h3 style={{ marginLeft: '10px' }}>
                                Tray Id : -{trayId}
                            </h3>
                            <h4 style={{ marginLeft: '10px' }}>
                                Assigned On : -
                                {new Date(
                                    trayData?.wht?.assigned_date
                                ).toLocaleString('en-GB', {
                                    hour12: true,
                                })}
                            </h4>
                        </Grid>
                        <Grid item xs={8}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row-reverse',
                                    mr: 3,
                                }}
                            >
                                <Box sx={{ mr: 4 }}>
                                    <h4>IN CT</h4>
                                    <p
                                        style={{
                                            fontSize: '22px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {trayData?.wht?.actual_items?.length}
                                    </p>
                                </Box>
                                <Box sx={{ mr: 4 }}>
                                    <h4>IN WHT</h4>
                                    <p
                                        style={{
                                            fontSize: '22px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {trayData?.wht?.temp_array?.length}
                                    </p>
                                </Box>
                                <Box
                                    sx={{
                                        mr: 4,
                                    }}
                                >
                                    <h4>Total Count</h4>
                                    <p
                                        style={{
                                            fontSize: '22px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {trayData?.wht?.items?.length}
                                    </p>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ maxHeight: '4px' }}>
                    <TextField
                        sx={{ ml: 1 }}
                        id="outlined-password-input"
                        type="text"
                        autoComplete="off"
                        name="doorsteps_diagnostics"
                        label="SCAN UIC"
                        value={uic}
                        onChange={(e) => {
                            setUic(e.target.value)
                            handelUic(e.target.value)
                        }}
                        inputProps={{
                            style: {
                                width: 'auto',
                            },
                        }}
                    />
                </Box>
                <Box sx={{ mt: 10 }}>{table}</Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        mt: 2,
                        mr: 3,
                        ml: 3,
                        mb: 2,
                    }}
                >
                    <Box>
                        <LoadingButton
                            sx={{
                                ml: 2,
                            }}
                            fullwidth
                            variant="contained"
                            disabled={
                                trayData?.wht?.items?.length !==
                                    trayData?.wht?.actual_items?.length +
                                        trayData?.wht?.temp_array?.length ||
                                closeButDis
                            }
                            loadingPosition="end"
                            style={{ backgroundColor: 'primery' }}
                            component="span"
                            onClick={(e) => {
                                if (window.confirm('You want to Close?')) {
                                    handelClose(trayId, 'wht')
                                }
                            }}
                        >
                            Tray Close
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
