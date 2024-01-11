import React, { useState, useEffect, useMemo } from 'react'
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
import { H1, H3, H4 } from 'app/components/Typography'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import useAuth from 'app/hooks/useAuth'
import ChargingDetails from '../../Audit-components/Audit-request/Report/charging-user-report'
import Botuser from '../../Audit-components/Audit-request/Report/bot-user-rport'
import BqcUserReport from '../../Audit-components/Audit-request/Report/bqc-user-report'
import AmazonDetails from '../../Audit-components/Audit-request/Report/amazon-data'
import BqcApiReport from './Rpbqc-agent-report'
import BqcApiAllReport from '../../Audit-components/Audit-request/Report/bqc-all-api-report'
import RpBqcApiAllReport from '../../Audit-components/Audit-request/Report/rp-bqc-done-report-all'
import PrevChargingReport from '../../Audit-components/Audit-request/Report/prev-charging'
import PrevBqcReport from '../../Audit-components/Audit-request/Report/pre-bqc-report'
import RdlOneReport from '../../Audit-components/Audit-request/Report/rdl-1-report'
import RdlTwoReport from '../../Audit-components/Audit-request/Report/rdl-2-report'
import RpbqcReport from './Rpbqc-agent-report'
import RpBqcSummary from './rp-bqc-summary'
import Swal from 'sweetalert2'
import {
    axiosAuditAgent,
    axiosRpAuditAgent,
    axiosRpBqcAgent,
} from '../../../../axios'

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

function StartRpAudit() {
    const [resDataUic, setresDataUic] = useState({})
    const [open, setOpen] = useState(false)
    const { uic, model } = useParams()
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const [popdata, setPopData] = useState({})
    const [gradeInfo, setGradeInfo] = useState([])
    const navigate = useNavigate()
    const [allDropDwon, setAllDropDwon] = useState({
        color: [],
        ram: [],
        storage: [],
    })
    const [subMuic, setSubMuic] = useState('')
    const [currentSubmuicCount, setCurrentSubMuicCount] = useState('')

    useEffect(() => {
        const fetchPartList = async () => {
            try {
                let obj = {
                    grade: resDataUic?.orderAndDelivery?.[0]
                        .rp_bqc_software_report?.final_grade,
                }
                let res = await axiosAuditAgent.post('/getColorStorageRam', obj)

                if (res.status == 200) {
                    setAllDropDwon({
                        ram: res.data.data.ram,
                        storage: res.data.data.storage,
                        color: res.data.data.color,
                    })
                    setGradeInfo(res.data.allCategory)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPartList()
    }, [resDataUic])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let obj = {
                    username: user.username,
                    uic: uic,
                    type: 'RP-Audit In Progress',
                }
                const res = await axiosRpAuditAgent.post('/startRpAudit', obj)
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
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchData()
    }, [])

    const handleChangeThePopValue = ({ target: { name, value } }) => {
        if (name == 'ram_verification') {
            setPopData({
                ...popdata,
                [name]: value,
                storage_verification: undefined,
            })
        } else if (name == 'color') {
            setPopData({
                ...popdata,
                [name]: value,
                ram_verification: undefined,
                storage_verification: undefined,
            })
        } else {
            setPopData({
                ...popdata,
                [name]: value,
            })
        }
        if (name == 'storage_verification') {
            fetchSubmuic(value)
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
            let obj = {
                uic: uic,
                status: popdata.status,
                description: popdata.description,
                username: user.username,
                subMuic: subMuic,
                rp_audit_grade: popdata.rp_audit_grade,
                muic: resDataUic?.orderAndDelivery?.[0]?.products?.[0]?.muic,
                color: popdata.color,
                storage_verification: popdata.storage_verification,
                ram_verification: popdata.ram_verification,
                currentSubMuicCount: currentSubmuicCount,
                grade: resDataUic?.orderAndDelivery?.[0]?.bqc_software_report
                    ?.final_grade,
            }
            if (popdata?.status == 'RP-Audit Passed') {
                obj.grade = popdata.rp_audit_grade
            }
            const res = await axiosRpAuditAgent.post('/add-rpAudit-data', obj)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                navigate('/rp-audit/pending-items')
            } else {
                navigate('/rp-audit/pending-items')
                Swal.fire({
                    icon: 'error',
                    title: 'Repair Audit Failed',
                    confirmButtonText: 'Ok',
                    text: res.data.message,
                })
                setPopData({})
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
                ram: popdata.ram_verification,
                color: popdata.color,
                muic: resDataUic?.orderAndDelivery?.[0]?.products?.[0]?.muic,
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
                    <RpBqcSummary
                        BqcSowftwareReport={
                            resDataUic?.orderAndDelivery?.[0]
                                ?.rp_bqc_software_report
                        }
                        grade={
                            resDataUic?.orderAndDelivery?.[0]
                                ?.rp_bqc_software_report?.final_grade
                        }
                        imei={resDataUic?.orderAndDelivery?.[0]?.imei}
                        cimei_1={
                            resDataUic?.orderAndDelivery?.[0]?.charging?.cimei_1
                        }
                        cimei_2={
                            resDataUic?.orderAndDelivery?.[0]?.charging?.cimei_2
                        }
                    />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <AmazonDetails
                        Order={resDataUic?.orderAndDelivery?.[0]?.orders?.[0]}
                    />
                    <Botuser
                        BOt={resDataUic?.orderAndDelivery?.[0]?.bot_report}
                        botUsername={
                            resDataUic?.orderAndDelivery?.[0]?.agent_name
                        }
                        BotDoneDate={
                            resDataUic?.orderAndDelivery?.[0]
                                ?.tray_closed_by_bot
                        }
                    />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <PrevChargingReport Charging={resDataUic?.preChargeData} />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <ChargingDetails
                        Charging={resDataUic?.orderAndDelivery?.[0]?.charging}
                        ChargeDoneDate={
                            resDataUic?.orderAndDelivery?.[0]
                                ?.charging_done_date
                        }
                    />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <PrevBqcReport BqcUserReport={resDataUic?.preBqcData} />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <BqcUserReport
                        BqcUserReport={
                            resDataUic?.orderAndDelivery?.[0]?.bqc_report
                        }
                        BqcAgentName={
                            resDataUic?.orderAndDelivery?.[0]?.agent_name_bqc
                        }
                        BqcDoneDate={
                            resDataUic?.orderAndDelivery?.[0]?.bqc_out_date
                        }
                    />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <RdlOneReport
                        RdlOneReport={
                            resDataUic?.orderAndDelivery?.[0]
                                ?.rdl_fls_one_report
                        }
                    />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <RdlTwoReport
                        RdlTwoReport={
                            resDataUic?.orderAndDelivery?.[0]?.rdl_two_report
                        }
                    />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <RpbqcReport
                        Rpbqc={resDataUic?.orderAndDelivery?.[0]?.rp_bqc_report}
                    />
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <RpBqcApiAllReport
                        BqcSowftwareReport={
                            resDataUic?.orderAndDelivery?.[0]
                                ?.rp_bqc_software_report
                        }
                    />
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <BqcApiAllReport
                        BqcSowftwareReport={
                            resDataUic?.orderAndDelivery?.[0]
                                ?.bqc_software_report
                        }
                    />
                </Grid>
            </Grid>
        )
    }, [resDataUic])

    return (
        <Container>
            {' '}
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Pending Items', path: '/' },
                        { name: 'Start RP-Audit' },
                    ]}
                />
            </div>
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
                    RP-Audit Done Action
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Select Status"
                        variant="outlined"
                        fullWidth
                        select
                        onChange={handleChangeThePopValue}
                        name="status"
                        sx={{
                            mb: 2,
                        }}
                    >
                        <MenuItem
                            disabled={
                                resDataUic?.orderAndDelivery?.[0]
                                    ?.rp_bqc_software_report?.final_grade ==
                                    undefined ||
                                resDataUic?.orderAndDelivery?.[0]
                                    .rp_bqc_software_report?.final_grade == ''
                            }
                            value="RP-Audit Passed"
                        >
                            RP-Audit Passed
                        </MenuItem>
                        <MenuItem value="RP-Audit Failed">
                            RP-Audit Failed
                        </MenuItem>
                    </TextField>
                    {popdata?.status == 'RP-Audit Passed' ? (
                        <TextField
                            label="Select Grade"
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            select
                            onChange={handleChangeThePopValue}
                            name="rp_audit_grade"
                        >
                            {gradeInfo?.map((upGradeData) => (
                                <MenuItem
                                    key={upGradeData?.code}
                                    value={upGradeData?.code}
                                >
                                    {upGradeData?.code}
                                </MenuItem>
                            ))}
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
                        onChange={handleChangeThePopValue}
                        name="color"
                    >
                        {allDropDwon?.color?.map((data) => (
                            <MenuItem value={data?.name}>{data?.name}</MenuItem>
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
                        onChange={handleChangeThePopValue}
                        value={popdata?.ram_verification}
                        name="ram_verification"
                    >
                        {allDropDwon?.ram?.map((data) => (
                            <MenuItem value={data?.name}>{data?.name}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Select storage"
                        fullWidth
                        select
                        value={popdata?.storage_verification}
                        sx={{
                            mb: 2,
                        }}
                        disabled={
                            popdata.color == undefined ||
                            popdata.ram_verification == undefined
                        }
                        onChange={handleChangeThePopValue}
                        name="storage_verification"
                    >
                        {allDropDwon?.storage?.map((data) => (
                            <MenuItem value={data?.name}>{data?.name}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Remark"
                        variant="outlined"
                        fullWidth
                        name="description"
                        onChange={handleChangeThePopValue}
                        sx={{
                            mb: 2,
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
                        sx={{
                            m: 1,
                        }}
                        disabled={
                            loading ||
                            (popdata?.rp_audit_grade == undefined &&
                                popdata?.status == 'RP-Audit Passed') ||
                            popdata?.status == undefined ||
                            popdata?.color == undefined ||
                            popdata?.ram_verification == undefined ||
                            popdata?.storage_verification == undefined ||
                            popdata?.description == undefined
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    {resDataUic?.orderAndDelivery?.[0]?.rp_bqc_software_report
                        ?.final_grade == undefined ||
                    resDataUic?.orderAndDelivery?.[0].rp_bqc_software_report
                        ?.final_grade == '' ? (
                        <H3>Grade: Not found</H3>
                    ) : (
                        <H3>
                            Grade :{' '}
                            {
                                resDataUic?.orderAndDelivery?.[0]
                                    .rp_bqc_software_report?.final_grade
                            }
                        </H3>
                    )}

                    <H3 sx={{ mt: 2 }}>UIC : {uic}</H3>
                    <H3 sx={{ mt: 2 }}>
                        RP-BQC Done Timestamp :{' '}
                        {new Date(
                            resDataUic?.orderAndDelivery?.[0]?.rp_bqc_done_date
                        ).toLocaleString('en-GB', {
                            hour12: true,
                        })}
                    </H3>
                </Box>
                <Box
                    sx={{
                        float: 'right',
                    }}
                >
                    <Button
                        fullwidth
                        variant="contained"
                        style={{ backgroundColor: 'green' }}
                        component="span"
                        onClick={(e) => {
                            setOpen(true)
                        }}
                        disabled={loading}
                    >
                        RP-Audit Done
                    </Button>
                </Box>
            </Box>
            {gridData}
        </Container>
    )
}

export default StartRpAudit
