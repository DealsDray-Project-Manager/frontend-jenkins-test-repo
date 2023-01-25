import React, { useEffect, useState, useMemo } from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
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
    MenuItem,
    InputLabel,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import { H1, H3, H4 } from 'app/components/Typography'
import { axiosAuditAgent, axiosSuperAdminPrexo } from '../../../../axios'
import ChargingDetails from './Report/charging-user-report'
import Botuser from './Report/bot-user-rport'
import BqcUserReport from './Report/bqc-user-report'
import AmazonDetails from './Report/amazon-data'

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
    const [open, setOpen] = React.useState(false)
    const [reportData, setReportData] = useState({})

    const [username, setUserName] = useState('')
    const [uic, setUic] = useState('')
    const [addButDis, setAddButDis] = useState(false)
    const [closeButDis, SetCloseButDis] = useState(false)

    const [state, setState] = useState({})

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
                    setReportData(res.data.data)
                    handleOpen()
                } else {
                    setUic('')
                    alert(res.data.message)
                }
            }
        } catch (error) {
            alert(error)
        }
    }
    const handleClose = () => {
        setState({})
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const handelAdd = async (e) => {
        if (e.keyCode !== 32) {
            try {
                setAddButDis(true)
                let obj = {
                    username: username,
                    uic: uic,
                    trayId: trayId,
                }
                obj.stage = state.stage
                if (state.stage == 'Accept') {
                    obj.type = state.tray_type
                } else if (
                    state.stage == 'Upgrade' ||
                    state.stage == 'Downgrade'
                ) {
                    obj.type = 'WHT'
                    obj.grade = state.tray_grade
                    obj.reason = state.reason
                    obj.description = state.description
                } else {
                    obj.type = 'WHT'
                    obj.description = state.description
                }
                let res = await axiosAuditAgent.post('/traySegrigation', obj)
                if (res.status == 200) {
                    handleClose()
                    alert(res.data.message)
                    setUic('')

                    setAddButDis(false)
                    setRefresh((refresh) => !refresh)
                } else {
                    if (res.data.status == 2) {
                        setUic('')
                        setAddButDis(false)

                        if (window.confirm('Tray is full you want to Close?')) {
                            handelClose(res.data.trayId, 'no')
                        }
                    } else if (res.data.status == 4) {
                        setUic('')

                        setAddButDis(false)
                        alert(res.data.message)
                        handleClose()
                    } else {
                        alert(res.data.message)
                    }
                }
            } catch (error) {
                alert(error)
            }
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

    const handleChange = ({ target: { name, value } }) => {
        if (name === 'stage') {
            setState({
                [name]: value,
            })
        } else {
            setState({
                ...state,
                [name]: value,
            })
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
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="lg"
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    All Informations
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {reportData?.delivery?.bqc_software_report?.final_grade ==
                        undefined ||
                    reportData?.delivery?.bqc_software_report?.final_grade ==
                        '' ? (
                        <H3>Grade not found</H3>
                    ) : (
                        <H3>
                            Grade :{' '}
                            {
                                reportData?.delivery?.bqc_software_report
                                    ?.final_grade
                            }
                        </H3>
                    )}
                    <Grid sx={{ mt: 1 }} container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            <AmazonDetails Order={reportData?.order} />
                        </Grid>
                        <Grid item lg={4} md={6} xs={12}>
                            <Botuser BOt={reportData?.delivery?.bot_report} />
                        </Grid>
                        <Grid item lg={4} md={6} xs={12}>
                            <ChargingDetails
                                Charging={reportData?.delivery?.charging}
                            />
                        </Grid>
                        <Grid item lg={4} md={6} xs={12}>
                            <BqcUserReport
                                BqcUserReport={reportData?.delivery?.bqc_report}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <TextField
                        label="Select"
                        sx={{
                            width: '140px',
                        }}
                        select
                        onChange={handleChange}
                        name="stage"
                    >
                        <MenuItem value="Accept">Accept</MenuItem>
                        <MenuItem value="Upgrade">Upgrade</MenuItem>
                        <MenuItem value="Downgrade">Downgrade</MenuItem>
                        <MenuItem value="Repair">Repair</MenuItem>
                    </TextField>
                    {state.stage === 'Accept' ? (
                        <TextField
                            label="Select Tray"
                            sx={{
                                width: '140px',
                            }}
                            select
                            onChange={handleChange}
                            name="tray_type"
                        >
                            <MenuItem value="CTA">CTA</MenuItem>
                            <MenuItem value="CTB">CTB</MenuItem>
                            <MenuItem value="CTC">CTC</MenuItem>
                            <MenuItem value="CTD">CTD</MenuItem>
                        </TextField>
                    ) : null}
                    {state.stage === 'Upgrade' ? (
                        <>
                            <TextField
                                label="Select Grade"
                                sx={{
                                    width: '140px',
                                }}
                                select
                                onChange={handleChange}
                                name="tray_grade"
                            >
                                {reportData?.delivery?.bqc_software_report
                                    ?.final_grade !== 'A' ? (
                                    <MenuItem value="A">A</MenuItem>
                                ) : null}
                                {reportData?.delivery?.bqc_software_report
                                    ?.final_grade !== 'B' &&
                                reportData?.delivery?.bqc_software_report
                                    ?.final_grade !== 'A' ? (
                                    <MenuItem value="B">B</MenuItem>
                                ) : null}
                                {reportData?.delivery?.bqc_software_report
                                    ?.final_grade !== 'C' &&
                                reportData?.delivery?.bqc_software_report
                                    ?.final_grade !== 'A' &&
                                reportData?.delivery?.bqc_software_report
                                    ?.final_grade !== 'B' ? (
                                    <MenuItem value="C">C</MenuItem>
                                ) : null}
                            </TextField>
                            <TextField
                                label="Upgrade Reason"
                                sx={{
                                    width: '140px',
                                }}
                                select
                                onChange={handleChange}
                                name="reason"
                            >
                                <MenuItem value="Reason-1">Reason-1</MenuItem>
                                <MenuItem value="Reason-2">Reason-2</MenuItem>
                                <MenuItem value="Reason-3">Reason-3</MenuItem>
                                <MenuItem value="Reason-4">Reason-4</MenuItem>
                            </TextField>
                            <TextField
                                label="Description"
                                sx={{
                                    width: '140px',
                                }}
                                onChange={handleChange}
                                name="description"
                            />
                        </>
                    ) : null}
                    {state.stage === 'Downgrade' ? (
                        <>
                            <TextField
                                label="Select Grade"
                                sx={{
                                    width: '140px',
                                }}
                                select
                                onChange={handleChange}
                                name="tray_grade"
                            >
                                {reportData?.delivery?.bqc_software_report
                                    ?.final_grade !== 'B' &&
                                reportData?.delivery?.bqc_software_report
                                    ?.final_grade !== 'D' &&
                                reportData?.delivery?.bqc_software_report
                                    ?.final_grade !== 'C' ? (
                                    <MenuItem value="B">B</MenuItem>
                                ) : null}
                                {reportData?.delivery?.bqc_software_report
                                    ?.final_grade !== 'C' &&
                                reportData?.delivery?.bqc_software_report
                                    ?.final_grade !== 'D' ? (
                                    <MenuItem value="C">C</MenuItem>
                                ) : null}

                                {reportData?.delivery?.bqc_software_report
                                    ?.final_grade !== 'D' ? (
                                    <MenuItem value="D">D</MenuItem>
                                ) : null}
                            </TextField>
                            <TextField
                                label="Downgrade Reason"
                                sx={{
                                    width: '140px',
                                }}
                                select
                                onChange={handleChange}
                                name="reason"
                            >
                                <MenuItem value="Reason-1">Reason-1</MenuItem>
                                <MenuItem value="Reason-2">Reason-2</MenuItem>
                                <MenuItem value="Reason-3">Reason-3</MenuItem>
                                <MenuItem value="Reason-4">Reason-4</MenuItem>
                            </TextField>
                            <TextField
                                label="Description"
                                sx={{
                                    width: '140px',
                                }}
                                onChange={handleChange}
                                name="description"
                            />
                        </>
                    ) : null}
                    {state.stage === 'Repair' ? (
                        <>
                            <TextField
                                label="Description"
                                sx={{
                                    width: '140px',
                                }}
                                onChange={handleChange}
                                name="description"
                            />
                        </>
                    ) : null}
                    <Button
                        sx={{ ml: 2 }}
                        disabled={
                            state.stage == undefined ||
                            (state.stage == 'Accept' &&
                                state.tray_type == undefined) ||
                            (state.stage == 'Upgrade' &&
                                state.tray_grade == undefined) ||
                            (state.stage == 'Upgrade' &&
                                state.reason == undefined) ||
                            (state.stage == 'Upgrade' &&
                                state.description == undefined) ||
                            (state.stage == 'Downgrade' &&
                                state.tray_grade == undefined) ||
                            (state.stage == 'Downgrade' &&
                                state.reason == undefined) ||
                            (state.stage == 'Downgrade' &&
                                state.description == undefined) ||
                            (state.stage == 'Repair' &&
                                state.description == undefined) ||
                            addButDis
                        }
                        onClick={(e) => handelAdd(e)}
                        variant="contained"
                        color="primary"
                    >
                        ADD
                    </Button>
                </DialogActions>
            </BootstrapDialog>

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
                        label="Please Enter UIC"
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
