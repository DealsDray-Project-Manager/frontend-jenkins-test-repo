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
    Grid,
    MenuItem,
    InputLabel,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { useNavigate, useLocation } from 'react-router-dom'
import { H1, H3, H4 } from 'app/components/Typography'
import { axiosAuditAgent, axiosSuperAdminPrexo } from '../../../../axios'
import ChargingDetails from './Report/charging-user-report'
import Botuser from './Report/bot-user-rport'
import BqcUserReport from './Report/bqc-user-report'
import AmazonDetails from './Report/amazon-data'
import BqcApiReport from './Report/bqc-api-data'

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
    const { state } = useLocation()
    const [addButDis, setAddButDis] = useState(false)
    const { reportData, trayId, username, uic } = state
    const [stateData, setStateData] = useState({})
    const [open, setOpen] = React.useState(false)

    const handelAdd = async (e) => {
        if (e.keyCode !== 32) {
            try {
                setAddButDis(true)
                let obj = {
                    username: username,
                    uic: uic,
                    trayId: trayId,
                }
                obj.stage = stateData.stage
                if (stateData.stage == 'Accept') {
                    obj.type = stateData.tray_type
                } else if (
                    stateData.stage == 'Upgrade' ||
                    stateData.stage == 'Downgrade'
                ) {
                    obj.type = 'WHT'
                    obj.grade = stateData.tray_grade
                    obj.reason = stateData.reason
                    obj.description = stateData.description
                } else {
                    obj.type = 'WHT'
                    obj.description = stateData.description
                }
                let res = await axiosAuditAgent.post('/traySegrigation', obj)
                if (res.status == 200) {
                    alert(res.data.message)
                    navigate(-1)
                } else {
                    if (res.data.status == 2) {
                        setAddButDis(false)
                        if (window.confirm('Tray is full you want to Close?')) {
                            handelCloseTray(res.data.trayId, 'no')
                        }
                    } else if (res.data.status == 4) {
                        setAddButDis(false)
                        alert(res.data.message)
                    } else {
                        alert(res.data.message)
                    }
                }
            } catch (error) {
                alert(error)
            }
        }
    }

    const handleChange = ({ target: { name, value } }) => {
        if (name === 'stage') {
            setStateData({
                [name]: value,
            })
        } else {
            setStateData({
                ...stateData,
                [name]: value,
            })
        }
    }
    const handleClose = () => {
        setOpen(false)
        setStateData({})
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handelCloseTray = async (id, from) => {
        try {
            let res = await axiosAuditAgent.post('/trayClose/' + id)
            if (res.status == 200) {
                alert(res.data.message)
                navigate(-1)
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <Box>
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
                        Add
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <TextField
                            label="Select"
                            fullWidth
                            select
                            sx={{
                                mb: 2,
                            }}
                            onChange={handleChange}
                            name="stage"
                        >
                            <MenuItem value="Accept">Accept</MenuItem>
                            <MenuItem value="Upgrade">Upgrade</MenuItem>
                            <MenuItem value="Downgrade">Downgrade</MenuItem>
                            <MenuItem value="Repair">Repair</MenuItem>
                        </TextField>
                        {stateData.stage === 'Accept' ? (
                            <TextField
                                label="Select Tray"
                                select
                                fullWidth
                                sx={{
                                    mb: 2,
                                }}
                                onChange={handleChange}
                                name="tray_type"
                            >
                                {reportData?.delivery?.bqc_software_report
                                    ?.final_grade == 'A' ? (
                                    <MenuItem value="CTA">CTA</MenuItem>
                                ) : reportData?.delivery?.bqc_software_report
                                      ?.final_grade == 'B' ? (
                                    <MenuItem value="CTB">CTB</MenuItem>
                                ) : reportData?.delivery?.bqc_software_report
                                      ?.final_grade == 'C' ? (
                                    <MenuItem value="CTC">CTC</MenuItem>
                                ) : reportData?.delivery?.bqc_software_report
                                      ?.final_grade == 'D' ? (
                                    <MenuItem value="CTD">CTD</MenuItem>
                                ) : null}
                            </TextField>
                        ) : null}
                        {stateData.stage === 'Upgrade' ? (
                            <>
                                <TextField
                                    label="Select Grade"
                                    fullWidth
                                    sx={{
                                        mb: 2,
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
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                    select
                                    onChange={handleChange}
                                    name="reason"
                                >
                                    <MenuItem value="Wrong cosmetic input by BQC operator">
                                        Wrong cosmetic input by BQC operator
                                    </MenuItem>
                                    <MenuItem value="Wrong assisted test input by BQC operator">
                                        Wrong assisted test input by BQC
                                        operator
                                    </MenuItem>
                                    <MenuItem value="Bqc workflow grading issue">
                                        Bqc workflow grading issue
                                    </MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </TextField>
                                <TextField
                                    label="Description"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                    onChange={handleChange}
                                    name="description"
                                />
                            </>
                        ) : null}
                        {stateData.stage === 'Downgrade' ? (
                            <>
                                <TextField
                                    label="Select Grade"
                                    fullWidth
                                    sx={{
                                        mb: 2,
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
                                    fullWidth
                                    select
                                    sx={{
                                        mb: 2,
                                    }}
                                    onChange={handleChange}
                                    name="reason"
                                >
                                    <MenuItem value="Wrong cosmetic input by BQC operator">
                                        Wrong cosmetic input by BQC operator
                                    </MenuItem>
                                    <MenuItem value="Wrong assisted test input by BQC operator">
                                        Wrong assisted test input by BQC
                                        operator
                                    </MenuItem>
                                    <MenuItem value="Bqc workflow grading issue">
                                        Bqc workflow grading issue
                                    </MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </TextField>
                                <TextField
                                    label="Description"
                                    fullWidth
                                    onChange={handleChange}
                                    name="description"
                                />
                            </>
                        ) : null}
                        {stateData.stage === 'Repair' ? (
                            <>
                                <TextField
                                    label="Description"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                    onChange={handleChange}
                                    name="description"
                                />
                            </>
                        ) : null}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{ ml: 2 }}
                            disabled={
                                stateData.stage == undefined ||
                                (stateData.stage == 'Accept' &&
                                    stateData.tray_type == undefined) ||
                                (stateData.stage == 'Upgrade' &&
                                    stateData.tray_grade == undefined) ||
                                (stateData.stage == 'Upgrade' &&
                                    stateData.reason == undefined) ||
                                (stateData.stage == 'Upgrade' &&
                                    stateData.description == undefined) ||
                                (stateData.stage == 'Downgrade' &&
                                    stateData.tray_grade == undefined) ||
                                (stateData.stage == 'Downgrade' &&
                                    stateData.reason == undefined) ||
                                (stateData.stage == 'Downgrade' &&
                                    stateData.description == undefined) ||
                                (stateData.stage == 'Repair' &&
                                    stateData.description == undefined) ||
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
                <Box
                    sx={{
                        mt: 2,
                        ml: 2,
                    }}
                >
                    {reportData?.delivery?.bqc_software_report?.final_grade ==
                        undefined ||
                    reportData?.delivery?.bqc_software_report?.final_grade ==
                        '' ? (
                        <H3>Grade: Not found</H3>
                    ) : (
                        <H3>
                            Grade :{' '}
                            {
                                reportData?.delivery?.bqc_software_report
                                    ?.final_grade
                            }
                        </H3>
                    )}
                    <H3>UIC : {uic}</H3>
                </Box>
                <Grid sx={{ mt: 1 }} container spacing={3}>
                    <Grid item lg={3} md={6} xs={12}>
                        <AmazonDetails Order={reportData?.order} />
                    </Grid>
                    <Grid item lg={3} md={6} xs={12}>
                        <Botuser BOt={reportData?.delivery?.bot_report} />
                    </Grid>
                    <Grid item lg={3} md={6} xs={12}>
                        <ChargingDetails
                            Charging={reportData?.delivery?.charging}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} xs={12}>
                        <BqcUserReport
                            BqcUserReport={reportData?.delivery?.bqc_report}
                        />
                    </Grid>
                    {reportData?.delivery?.bqc_software_report?.final_grade !==
                    'A' ? (
                        <Grid item lg={6} md={6} xs={12}>
                            <BqcApiReport
                                BqcApiReport={
                                    reportData?.delivery?.bqc_software_report
                                }
                                grade={
                                    reportData?.delivery?.bqc_software_report
                                        ?.final_grade
                                }
                            />
                        </Grid>
                    ) : null}
                </Grid>
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
                    <Button
                        sx={{ ml: 2 }}
                        onClick={(e) => handleOpen()}
                        variant="contained"
                        color="primary"
                    >
                        ADD
                    </Button>
                </Box>
            </Box>
        </>
    )
}