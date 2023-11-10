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
import { axiosBqc, axiosReBqcAgent } from '../../../../axios'
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
    const [popdata, setPopData] = useState({
        status: '',
        description: '',
    })

    /*********************************************************** */

    useEffect(() => {
        const fetchData = async () => {
            let obj = {
                username: user.username,
                uic: uic,
            }
            const res = await axiosReBqcAgent.post('/pedning-item', obj)
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

    const handleChangeThePopValue = ({ target: { name, value } }) => {
        setPopData({
            ...popdata,
            [name]: value,
        })
    }

    const handleClose = () => {
        setOpen(false)
    }
    // HANDEL SUBMIT
    const handelSubmit = async () => {
        try {
            handleClose()
            setDeviceButDis(true)
            let obj = {
                uic: uic,
                status: popdata.status,
                description: popdata.description,
                username: user.username,
            }
            const res = await axiosReBqcAgent.post('/add-rebqc-data', obj)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                navigate('/rebqc/pending-items')
            } else {
                navigate('/rebqc/pending-items')
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
                    REBQC Done Action
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
                        <MenuItem value="REBQC Pass">REBQC Pass</MenuItem>
                        <MenuItem value="REBQC Fail">REBQC Fail</MenuItem>
                    </TextField>

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
                            popdata.status == '' ||
                            popdata.description == '' ||
                            deviceButDis
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
                    REBQC Done
                </Button>
            </Box>
        </Box>
    )
}
