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
} from '@mui/material'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { useNavigate, useLocation } from 'react-router-dom'
import { H1, H3, H4 } from 'app/components/Typography'
import { axiosAuditAgent } from '../../../../axios'
import ChargingDetails from './Report/charging-user-report'
import Botuser from './Report/bot-user-rport'
import BqcUserReport from './Report/bqc-user-report'
import AmazonDetails from './Report/amazon-data'
import BqcApiReport from './Report/bqc-api-data'
import BqcApiAllReport from './Report/bqc-all-api-report'
import PrevChargingReport from './Report/prev-charging'
import PrevBqcReport from './Report/pre-bqc-report'
import RdlOneReport from './Report/rdl-1-report'
import RdlTwoReport from './Report/rdl-2-report'
import useAuth from 'app/hooks/useAuth'

import Swal from 'sweetalert2'

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
    const [allDropDwon, setAllDropDwon] = useState({
        color: [],
        ram: [],
        storage: [],
    })
    const { state } = useLocation()
    const [gradeInfo, setGradeInfo] = useState({
        downArray: [],
        upArray: [],
        flagToHigh: 0,
    })
    const [addButDis, setAddButDis] = useState(false)
    const { reportData, trayId, username, uic, ctxTray, whtTrayId } = state
    const [stateData, setStateData] = useState({})
    const [open, setOpen] = React.useState(false)
    const [butDis, setButDis] = useState(false)
    const [subMuic, setSubMuic] = useState('')
    const [currentSubmuicCount, setCurrentSubMuicCount] = useState('')
    const { user } = useAuth()

    useEffect(() => {
        const fetchPartList = async () => {
            try {
                let obj = {
                    grade: reportData?.delivery?.bqc_software_report
                        ?.final_grade,
                }
                let res = await axiosAuditAgent.post('/getColorStorageRam', obj)
                if (res.status == 200) {
                    setAllDropDwon({
                        ram: res.data.data.ram,
                        storage: res.data.data.storage,
                        color: res.data.data.color,
                    })
                    setGradeInfo({
                        downArray: res.data.downArray,
                        upArray: res.data.upArray,
                        flagToHigh: res.data.flagToHigh,
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPartList()
    }, [])

    const handelAdd = async (e, stageType) => {
        if (e.keyCode !== 32) {
            setButDis(true)
            try {
                setAddButDis(true)
                let obj = {
                    username: username,
                    uic: uic,
                    trayId: trayId,
                    muic: reportData?.muic,
                    color: stateData.color,
                    storage_verification: stateData.storage_verification,
                    ram_verification: stateData.ram_verification,
                    stage: 'BQC Not Done / Unverified imei',
                    subMuic: subMuic,
                    actionUser: user.username,
                    currentSubMuicCount: currentSubmuicCount,
                }
                if (
                    stageType == 'Device not to be checked for BQC' ||
                    stageType == 'Device not to be processed for BQC'
                ) {
                    obj.type = 'WHT'
                } else {
                    if (
                        reportData?.delivery?.bqc_software_report
                            ?.final_grade !== undefined
                    ) {
                        obj.orgGrade =
                            reportData.delivery.bqc_software_report.final_grade
                    }
                    obj.stage = stateData.stage
                    if (stateData?.stage == 'Accept') {
                        obj.type = stateData.tray_type
                    } else if (
                        stateData?.stage == 'Upgrade' ||
                        stateData?.stage == 'Downgrade'
                    ) {
                        obj.type = 'WHT'
                        obj.grade = stateData.tray_grade
                        obj.reason = stateData.reason
                        obj.description = stateData.description
                    } else if (
                        stateData?.stage == 'Direct Downgrade' ||
                        stateData?.stage == 'Direct Upgrade'
                    ) {
                        obj.type = stateData.tray_type
                        obj.grade = stateData.tray_grade
                        obj.description = stateData.description
                    } else {
                        obj.type = 'WHT'
                        obj.description = stateData.description
                    }
                }

                let res = await axiosAuditAgent.post('/traySegrigation', obj)
                if (res.status == 200) {
                    setButDis(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
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
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: error,
                })
            }
        }
    }

    const handleChange = ({ target: { name, value } }) => {
        if (name === 'stage') {
            setStateData({
                [name]: value,
                description: stateData.description,
                storage_verification: stateData.storage_verification,
                ram_verification: stateData.ram_verification,
                color: stateData.color,
            })
        } else if (name == 'ram_verification') {
            setStateData({
                ...stateData,
                [name]: value,
                storage_verification: undefined,
            })
        } else if (name == 'color') {
            setStateData({
                ...stateData,
                [name]: value,
                ram_verification: undefined,
                storage_verification: undefined,
            })
        } else {
            setStateData({
                ...stateData,
                [name]: value,
            })
        }
        if (name == 'storage_verification') {
            fetchSubmuic(value)
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
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                navigate(-1)
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
    /*----------------------------FETCH / CHECK SUB MUIC ------------------------------*/
    const fetchSubmuic = async (storage) => {
        try {
            let obj = {
                storage: storage,
                ram: stateData.ram_verification,
                color: stateData.color,
                muic: reportData.muic,
            }
            const subMuicRes = await axiosAuditAgent.post('/fetchSubMuic', obj)
            if (subMuicRes.status == 200) {
                setSubMuic(subMuicRes.data.subMuic)
                setCurrentSubMuicCount(subMuicRes.data.currentSubMuicCount)
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
    const gridData = useMemo(() => {
        return (
            <Grid sx={{ mt: 1 }} container spacing={3}>
                <Grid item lg={12} md={12} xs={12}>
                    <BqcApiReport
                        BqcSowftwareReport={
                            reportData?.delivery?.bqc_software_report
                        }
                        grade={
                            reportData?.delivery?.bqc_software_report
                                ?.final_grade
                        }
                        imei={reportData?.delivery?.imei}
                        cimei_1={reportData?.delivery?.charging?.cimei_1}
                        cimei_2={reportData?.delivery?.charging?.cimei_2}
                    />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <AmazonDetails Order={reportData?.order} />
                    <Botuser
                        BOt={reportData?.delivery?.bot_report}
                        botUsername={reportData?.delivery?.agent_name}
                        BotDoneDate={reportData?.delivery?.tray_closed_by_bot}
                    />
                </Grid>
                {Object.keys(reportData?.preChargeData)?.length != 0 ? (
                    <Grid item lg={4} md={6} xs={12}>
                        <PrevChargingReport
                            Charging={reportData?.preChargeData}
                        />
                    </Grid>
                ) : null}
                <Grid item lg={4} md={6} xs={12}>
                    <ChargingDetails
                        Charging={reportData?.delivery?.charging}
                        ChargeDoneDate={
                            reportData?.delivery?.charging_done_date
                        }
                    />
                </Grid>
                {Object.keys(reportData?.preBqcData)?.length != 0 ? (
                    <Grid item lg={4} md={6} xs={12}>
                        <PrevBqcReport BqcUserReport={reportData?.preBqcData} />
                    </Grid>
                ) : null}
                <Grid item lg={4} md={6} xs={12}>
                    <BqcUserReport
                        BqcUserReport={reportData?.delivery?.bqc_report}
                        BqcAgentName={reportData?.delivery?.agent_name_bqc}
                        BqcDoneDate={reportData?.delivery?.bqc_out_date}
                    />
                </Grid>
                {reportData?.delivery?.rdl_fls_one_report != undefined ? (
                    <Grid item lg={4} md={6} xs={12}>
                        <RdlOneReport
                            RdlOneReport={
                                reportData?.delivery?.rdl_fls_one_report
                            }
                        />
                    </Grid>
                ) : null}
                {reportData?.delivery?.rdl_two_report != undefined ? (
                    <Grid item lg={4} md={6} xs={12}>
                        <RdlTwoReport
                            RdlTwoReport={reportData?.delivery?.rdl_two_report}
                        />
                    </Grid>
                ) : null}
                <Grid item lg={12} md={12} xs={12}>
                    <BqcApiAllReport
                        BqcSowftwareReport={
                            reportData?.delivery?.bqc_software_report
                        }
                    />
                </Grid>
            </Grid>
        )
    }, [reportData])

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
                            label="Select status"
                            fullWidth
                            select
                            sx={{
                                mb: 2,
                            }}
                            onChange={handleChange}
                            value={stateData?.stage}
                            name="stage"
                        >
                            <MenuItem value="Accept">Accept</MenuItem>
                            {gradeInfo?.flagToHigh !== '2' ? (
                                <MenuItem value="Upgrade">Upgrade</MenuItem>
                            ) : null}
                            {gradeInfo?.flagToHigh !== '1' ? (
                                <MenuItem value="Downgrade">Downgrade</MenuItem>
                            ) : null}

                            {gradeInfo?.flagToHigh !== '2' ? (
                                <MenuItem value="Direct Upgrade">
                                    Direct Upgrade
                                </MenuItem>
                            ) : null}
                            {gradeInfo?.flagToHigh !== '1' ? (
                                <MenuItem value="Direct Downgrade">
                                    Direct Downgrade
                                </MenuItem>
                            ) : null}

                            <MenuItem value="Repair">Repair</MenuItem>
                        </TextField>
                        {stateData.stage === 'Accept' ? (
                            <>
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
                                    <MenuItem
                                        value={
                                            reportData?.delivery
                                                ?.bqc_software_report
                                                ?.final_grade
                                        }
                                    >
                                        {`CT${reportData?.delivery?.bqc_software_report?.final_grade}`}{' '}
                                        - (
                                        {ctxTray?.map((trayData) =>
                                            reportData?.delivery
                                                ?.bqc_software_report
                                                ?.final_grade ==
                                                trayData?.tray_grade &&
                                            trayData.sort_id ==
                                                'Issued to Audit'
                                                ? trayData?.code
                                                : null
                                        )}
                                        )
                                    </MenuItem>
                                </TextField>
                            </>
                        ) : null}
                        {stateData.stage === 'Upgrade' ||
                        stateData.stage == 'Direct Upgrade' ? (
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
                                    {gradeInfo?.upArray?.map((upGradeData) => (
                                        <MenuItem
                                            key={upGradeData?.code}
                                            value={upGradeData?.code}
                                        >
                                            {upGradeData?.code}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {stateData.stage === 'Upgrade' ? (
                                    <>
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
                                                Wrong cosmetic input by BQC
                                                operator
                                            </MenuItem>
                                            <MenuItem value="Wrong assisted test input by BQC operator">
                                                Wrong assisted test input by BQC
                                                operator
                                            </MenuItem>
                                            <MenuItem value="Bqc workflow grading issue">
                                                Bqc workflow grading issue
                                            </MenuItem>
                                            <MenuItem value="Other">
                                                Other
                                            </MenuItem>
                                        </TextField>
                                    </>
                                ) : null}
                            </>
                        ) : null}
                        {stateData.stage === 'Downgrade' ||
                        stateData.stage == 'Direct Downgrade' ? (
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
                                    {gradeInfo?.downArray?.map(
                                        (upGradeData) => (
                                            <MenuItem
                                                key={upGradeData?.code}
                                                value={upGradeData?.code}
                                            >
                                                {upGradeData?.code}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>

                                {stateData.stage === 'Downgrade' ? (
                                    <>
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
                                                Wrong cosmetic input by BQC
                                                operator
                                            </MenuItem>
                                            <MenuItem value="Wrong assisted test input by BQC operator">
                                                Wrong assisted test input by BQC
                                                operator
                                            </MenuItem>
                                            <MenuItem value="Bqc workflow grading issue">
                                                Bqc workflow grading issue
                                            </MenuItem>
                                            <MenuItem value="Other">
                                                Other
                                            </MenuItem>
                                        </TextField>
                                    </>
                                ) : null}
                            </>
                        ) : null}
                        {stateData.stage == 'Direct Downgrade' ||
                        stateData.stage == 'Direct Upgrade' ? (
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
                                <MenuItem value={stateData.tray_grade}>
                                    {`CT${stateData.tray_grade}`} - (
                                    {ctxTray?.map((trayData) =>
                                        trayData.tray_grade ==
                                            stateData.tray_grade &&
                                        trayData.sort_id == 'Issued to Audit'
                                            ? trayData?.code
                                            : null
                                    )}
                                    )
                                </MenuItem>
                            </TextField>
                        ) : null}

                        <TextField
                            label="Select color"
                            fullWidth
                            select
                            // disabled={
                            //     stateData.storage_verification != undefined
                            // }
                            sx={{
                                mb: 2,
                            }}
                            onChange={handleChange}
                            name="color"
                        >
                            {allDropDwon?.color?.map((data) => (
                                <MenuItem value={data?.name}>
                                    {data?.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Select Ram"
                            fullWidth
                            select
                            sx={{
                                mb: 2,
                            }}
                            // disabled={
                            //     stateData.storage_verification != undefined
                            // }
                            onChange={handleChange}
                            value={stateData?.ram_verification}
                            name="ram_verification"
                        >
                            {allDropDwon?.ram?.map((data) => (
                                <MenuItem value={data?.name}>
                                    {data?.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Select storage"
                            fullWidth
                            select
                            value={stateData?.storage_verification}
                            sx={{
                                mb: 2,
                            }}
                            disabled={
                                stateData.color == undefined ||
                                stateData.ram_verification == undefined
                            }
                            onChange={handleChange}
                            name="storage_verification"
                        >
                            {allDropDwon?.storage?.map((data) => (
                                <MenuItem value={data?.name}>
                                    {data?.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Audit Remark"
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={handleChange}
                            name="description"
                            inputProps={{
                                autoComplete: 'off', // Add this line
                            }}
                        />
                        <TextField
                            label="Sub Muic"
                            fullWidth
                            disabled
                            value={subMuic}
                            name="sub_muic"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{ ml: 2 }}
                            disabled={
                                subMuic == '' ||
                                stateData.stage == undefined ||
                                stateData.color == undefined ||
                                stateData.description == undefined ||
                                stateData.storage_verification == undefined ||
                                stateData.ram_verification == undefined ||
                                (stateData.stage == 'Accept' &&
                                    stateData.tray_type == undefined) ||
                                (stateData.stage == 'Direct Downgrade' &&
                                    stateData.tray_type == undefined) ||
                                (stateData.stage == 'Direct Upgrade' &&
                                    stateData.tray_type == undefined) ||
                                (stateData.stage == 'Upgrade' &&
                                    stateData.tray_grade == undefined) ||
                                (stateData.stage == 'Direct Downgrade' &&
                                    stateData.tray_grade == undefined) ||
                                (stateData.stage == 'Direct Upgrade' &&
                                    stateData.tray_grade == undefined) ||
                                (stateData.stage == 'Upgrade' &&
                                    stateData.reason == undefined) ||
                                (stateData.stage == 'Downgrade' &&
                                    stateData.tray_grade == undefined) ||
                                (stateData.stage == 'Downgrade' &&
                                    stateData.reason == undefined) ||
                                addButDis
                            }
                            onClick={(e) =>
                                handelAdd(e, 'Device to be processed for BQC')
                            }
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
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        {reportData?.delivery?.bqc_software_report
                            ?.final_grade == undefined ||
                        reportData?.delivery?.bqc_software_report
                            ?.final_grade == '' ? (
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
                        <H3 sx={{ mt: 2 }}>Tray ID : {whtTrayId}</H3>
                        <H3 sx={{ mt: 2 }}>UIC : {uic}</H3>
                    </Box>
                    <Box>
                        {reportData?.delivery?.bqc_software_report ==
                            undefined ||
                        reportData?.delivery?.bqc_software_report
                            ?.final_grade == undefined ||
                        (reportData?.delivery?.imei
                            ?.match(/[0-9]/g)
                            ?.join('') !==
                            reportData?.delivery?.bqc_software_report
                                ?.mobile_imei &&
                            reportData?.delivery?.imei
                                ?.match(/[0-9]/g)
                                ?.join('') !==
                                reportData?.delivery?.bqc_software_report
                                    ?.mobile_imei2 &&
                            reportData?.delivery?.imei
                                ?.match(/[0-9]/g)
                                ?.join('') !==
                                reportData?.delivery?.bqc_software_report
                                    ?._ro_ril_miui_imei0 &&
                            reportData?.delivery?.imei
                                ?.match(/[0-9]/g)
                                ?.join('') !==
                                reportData?.delivery?.charging?.cimei_1 &&
                                reportData?.delivery?.imei
                                ?.match(/[0-9]/g)
                                ?.join('') !==
                                reportData?.delivery?.charging?.cimei_2) ? (
                            <Button
                                sx={{ mr: 2 }}
                                onClick={(e) =>
                                    handelAdd(
                                        e,
                                        'Device not to be processed for BQC'
                                    )
                                }
                                disabled={butDis}
                                variant="contained"
                                color="primary"
                            >
                                ADD to WHT
                            </Button>
                        ) : (
                            <Button
                                sx={{ mr: 2 }}
                                disabled={butDis}
                                onClick={(e) => handleOpen()}
                                variant="contained"
                                color="primary"
                            >
                                ADD
                            </Button>
                        )}
                    </Box>
                </Box>
                {gridData}
            </Box>
        </>
    )
}
