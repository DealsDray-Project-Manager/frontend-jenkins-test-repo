import React, { useEffect, useState, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import {
    Box,
    Button,
    Grid,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle,
    IconButton,
    MenuItem,
    TextField,
} from '@mui/material'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
// import jwt from "jsonwebtoken"
import Swal from 'sweetalert2'
import { H1, H3, H4 } from 'app/components/Typography'
import useAuth from 'app/hooks/useAuth'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import {
    axiosMisUser,
    axiosRpAuditAgent,
    axiosRpBqcAgent,
} from '../../../../axios'
import ChargingDetails from '../../Audit-components/Audit-request/Report/charging-user-report'
import RdlOneReport from '../../Audit-components/Audit-request/Report/rdl-1-report'
import RdlTwoReport from '../../Audit-components/Audit-request/Report/rdl-2-report'

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
    const { state } = useLocation()
    const { uic, model } = useParams()
    const [deviceButDis, setDeviceButDis] = useState(false)
    const [resDataUic, setresDataUic] = useState({})
    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const [rpAudit, setRpAudit] = useState([])
    const [tray, setTray] = useState([])
    const [loading, setLoading] = useState(false)
    const [popdata, setPopData] = useState({
        status: '',
        description: '',
        rpa_tray: '',
        rp_audit_user: '',
    })

    /*********************************************************** */

    useEffect(() => {
        const fetchData = async () => {
            let obj = {
                username: user.username,
                uic: uic,
                type: 'Issued to RP-BQC',
            }
            const res = await axiosRpBqcAgent.post('/pedning-item', obj)
            if (res.status === 200) {
                setresDataUic(res.data.data)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res.data.message,
                })
                navigate(-1)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchRpbqcUsers = async () => {
            const res = await axiosMisUser.post(
                `/get-charging-users/${'RP-Audit'}/${user.location}`
            )
            if (res.status == 200) {
                setRpAudit(res.data.data)
            }
        }
        fetchRpbqcUsers()
    }, [])

    const handleChangeThePopValue = ({ target: { name, value } }) => {
        setPopData({
            ...popdata,
            [name]: value,
        })
    }

    // GET RBQC TRAY
    const handelFetchRbqcTray = async (username) => {
        try {
            const res = await axiosRpAuditAgent.post(
                `/getRpAuditTrayRpBqcSelection/${username}`
            )
            if (res.status === 200) {
                setTray(res.data.data)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }
    // HANDEL SUBMIT
    const handelSubmit = async () => {
        try {
            setLoading(true)
            handleClose()
            setDeviceButDis(true)
            let obj = {
                uic: uic,
                status: popdata.status,
                description: popdata.description,
                username: user.username,
                rpa_tray: popdata.rpa_tray,
                rp_audit_user: popdata.rp_audit_user,
            }
            const res = await axiosRpBqcAgent.post('/add-rpbqc-data', obj)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                navigate('/rp-bqc/pending-items')
            } else {
                navigate('/rp-bqc/pending-items')
                setDeviceButDis(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res.data.message,
                })
                setPopData({
                    status: '',
                    description: '',
                })
            }
        } catch (error) {
            setDeviceButDis(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }

    return (
        <Box
            sx={{
                textAlign: 'center', // Add this line for center alignment
                alignItems: 'center',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
        >
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
                    RP-BQC Done Action
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Select Status"
                        variant="outlined"
                        fullWidth
                        select
                        onChange={handleChangeThePopValue}
                        name="status"
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="RP-BQC Passed">RP-BQC Passed</MenuItem>
                        <MenuItem value="RP-BQC Failed">RP-BQC Failed</MenuItem>
                    </TextField>
                    {popdata?.status == 'RP-BQC Passed' ? (
                        <>
                            <TextField
                                label="Select RP-Audit User"
                                variant="outlined"
                                fullWidth
                                select
                                onChange={handleChangeThePopValue}
                                name="rp_audit_user"
                                sx={{ mt: 2 }}
                            >
                                {rpAudit.map((data) => (
                                    <MenuItem
                                        key={data.user_name}
                                        value={data.user_name}
                                        onClick={(e) => {
                                            handelFetchRbqcTray(data.user_name)
                                        }}
                                    >
                                        {data.user_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Select RPA Tray"
                                variant="outlined"
                                fullWidth
                                select
                                name="rpa_tray"
                                onChange={handleChangeThePopValue}
                                sx={{ mt: 2 }}
                            >
                                {tray.map((data) => (
                                    <MenuItem key={data.code} value={data.code}>
                                        {data.code}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </>
                    ) : null}

                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        name="description"
                        onChange={handleChangeThePopValue}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            m: 1,
                        }}
                        disabled={
                            loading ||
                            popdata.status == '' ||
                            popdata.description == '' ||
                            deviceButDis ||
                            (popdata.status == 'RP-BQC Passed' &&
                                popdata.rpa_tray == '') ||
                            (popdata.status == 'RP-BQC Passed' &&
                                popdata.rp_audit_user == '')
                        }
                        variant="contained"
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            handelSubmit(e)
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </BootstrapDialog>

            <H3>UIC: {uic}</H3>
            <H3>Model: {model}</H3>
            <Grid container spacing={3}>
                <Grid item lg={6} md={12} xs={12}>
                    <ChargingDetails
                        Charging={resDataUic?.charging}
                        state="Bqc"
                    />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <RdlOneReport
                        RdlOneReport={resDataUic?.rdl_fls_one_report}
                    />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <RdlTwoReport RdlTwoReport={resDataUic?.rdl_two_report} />
                </Grid>
            </Grid>

            <Box
                sx={{
                    mb: 4,
                    float: 'right',
                }}
            >
                <Button
                    sx={{
                        ml: 2,
                    }}
                    fullwidth
                    variant="contained"
                    style={{ backgroundColor: 'green' }}
                    component="span"
                    onClick={(e) => {
                        setOpen(true)
                    }}
                    disabled={deviceButDis}
                >
                    RP-BQC Done
                </Button>
            </Box>
        </Box>
    )
}
