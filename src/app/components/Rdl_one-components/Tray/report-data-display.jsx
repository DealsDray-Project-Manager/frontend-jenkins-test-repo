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
    FormControl,
    Select,
} from '@mui/material'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { useNavigate, useLocation } from 'react-router-dom'
import { H1, H3, H4 } from 'app/components/Typography'
import {
    axiosAuditAgent,
    axiosRDL_oneAgent,
    axiosSuperAdminPrexo,
} from '../../../../axios'
import ChargingDetails from '../../Audit-components/Audit-request/Report/charging-user-report'
import Botuser from '../../Audit-components/Audit-request/Report/bot-user-rport'
import BqcUserReport from '../../Audit-components/Audit-request/Report/bqc-user-report'
import AmazonDetails from '../../Audit-components/Audit-request/Report/amazon-data'
import BqcApiReport from '../../Audit-components/Audit-request/Report/bqc-api-data'
import BqcApiAllReport from '../../Audit-components/Audit-request/Report/bqc-all-api-report'
import AuditReport from './Report/Audit-report'
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
    const { state } = useLocation()
    const [selectedStatus, setSelectedStatus] = useState('')
    const [addButDis, setAddButDis] = useState(false)
    const { reportData, trayId, username, uic, ctxTray, whtTrayId } = state
    const [open, setOpen] = React.useState(false)

    const schema = Yup.object().shape({
        description: Yup.string()
            .when('selected_status', (selected_status, schema) => {
                if (
                    selected_status == 'Battery Boosted' ||
                    selected_status == 'Charge jack Replaced & Boosted' ||
                    selected_status == 'Battery Damage' ||
                    selected_status == 'Repair Required'
                ) {
                    return schema.required('Required')
                }
            })
            .nullable(),

        model_reg: Yup.string()
            .when('selected_status', (selected_status, schema) => {
                if (selected_status == 'Battery Damage') {
                    return schema.required('Required')
                }
            })
            .nullable(),
        color: Yup.string()
            .when('selected_status', (selected_status, schema) => {
                if (
                    selected_status == 'Battery Damage' ||
                    selected_status == 'Repair Required'
                ) {
                    return schema.required('Required')
                }
            })
            .nullable(),
        part_list: Yup.string()
            .when('selected_status', (selected_status, schema) => {
                if (selected_status == 'Repair Required') {
                    return schema.required('Required')
                }
            })
            .nullable(),
    })
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    })
    const handleClose = () => {
        setOpen(false)
        reset({})
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const onSubmit = async (values) => {
        try {
            setAddButDis(true)
            if (values.selected_status !== 'Battery Damage') {
                values.model_reg = ''
            }
            if (values.selected_status !== 'Repair Required') {
                values.part_list = ''
            }
            if (
                values.selected_status !== 'Repair Required' &&
                values.selected_status !== 'Battery Damage'
            ) {
                values.color = ''
            }
            if (values.selected_status == 'Dead') {
                values.description = ''
            }
            let objData = {
                trayId: trayId,
                rdl_fls_report: values,
                uic: uic,
            }

            let res = await axiosRDL_oneAgent.post(
                '/wht-add-actual-item',
                objData
            )
            if (res.status == 200) {
                setAddButDis(false)
                navigate(-1)
            } else {
                setAddButDis(false)
                alert(res.data.data)
            }
        } catch (error) {
            alert(error)
        }
    }

    const gridData = useMemo(() => {
        return (
            <Grid container spacing={3}>
                <Grid item lg={6} md={12} xs={12}>
                    <AuditReport
                        AuditData={reportData?.delivery?.audit_report}
                    />
                </Grid>
                <Grid item lg={6} md={12} xs={12}>
                    <BqcApiReport
                        BqcSowftwareReport={
                            reportData?.delivery?.bqc_software_report
                        }
                        grade={
                            reportData?.delivery?.bqc_software_report
                                ?.final_grade
                        }
                        imei={reportData?.order?.imei}
                    />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <AmazonDetails Order={reportData?.order} />
                    <Botuser BOt={reportData?.delivery?.bot_report} />
                </Grid>

                <Grid item lg={4} md={6} xs={12}>
                    <ChargingDetails
                        Charging={reportData?.delivery?.charging}
                        ChargeDoneDate={
                            reportData?.delivery?.charging_done_date
                        }
                    />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <BqcUserReport
                        BqcUserReport={reportData?.delivery?.bqc_report}
                    />
                </Grid>
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
                        Add Report
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <TextField
                            select
                            fullWidth
                            label="Select an Option"
                            {...register('selected_status')}
                            error={errors.selected_status ? true : false}
                            helperText={errors.selected_status?.message}
                        >
                            <MenuItem
                                value="Battery Boosted"
                                onClick={() =>
                                    setSelectedStatus('Battery Boosted')
                                }
                            >
                                Battery Boosted
                            </MenuItem>
                            <MenuItem
                                value="Charge jack Replaced & Boosted"
                                onClick={() =>
                                    setSelectedStatus(
                                        'Charge jack Replaced & Boosted'
                                    )
                                }
                            >
                                Charge jack Replaced & Boosted
                            </MenuItem>
                            <MenuItem
                                value="Battery Damage"
                                onClick={() =>
                                    setSelectedStatus('Battery Damage')
                                }
                            >
                                Battery Damage
                            </MenuItem>
                            <MenuItem
                                value="Repair Required"
                                onClick={() =>
                                    setSelectedStatus('Repair Required')
                                }
                            >
                                Repair Required
                            </MenuItem>
                            <MenuItem
                                value="Dead"
                                onClick={() => setSelectedStatus('Dead')}
                            >
                                Dead
                            </MenuItem>
                        </TextField>
                        {selectedStatus == 'Battery Damage' ? (
                            <>
                                <TextField
                                    defaultValue={getValues('model_reg')}
                                    label="Model"
                                    variant="outlined"
                                    type="text"
                                    {...register('model_reg')}
                                    error={errors.model_reg ? true : false}
                                    helperText={errors.model_reg?.message}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                />
                                <TextField
                                    defaultValue={getValues('color')}
                                    label="Color"
                                    variant="outlined"
                                    type="text"
                                    {...register('color')}
                                    error={errors?.color ? true : false}
                                    helperText={errors?.color?.message}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                />
                            </>
                        ) : (
                            ''
                        )}
                        {selectedStatus == 'Repair Required' ? (
                            <>
                                <TextField
                                    defaultValue={getValues('part_list')}
                                    label=" Part List"
                                    variant="outlined"
                                    type="text"
                                    {...register('part_list')}
                                    error={errors?.part_list ? true : false}
                                    helperText={errors?.part_list?.message}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                />
                                <TextField
                                    defaultValue={getValues('color')}
                                    label="Color"
                                    variant="outlined"
                                    type="text"
                                    {...register('color')}
                                    error={errors?.color ? true : false}
                                    helperText={errors?.color?.message}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                />
                            </>
                        ) : (
                            ''
                        )}
                        {selectedStatus == 'Battery Boosted' ||
                        selectedStatus == 'Charge jack Replaced & Boosted' ||
                        selectedStatus == 'Battery Damage' ||
                        selectedStatus == 'Repair Required' ? (
                            <TextField
                                defaultValue={getValues('description')}
                                label="Description"
                                variant="outlined"
                                type="text"
                                {...register('description')}
                                error={errors.description ? true : false}
                                helperText={errors.description?.message}
                                fullWidth
                                sx={{ mt: 2 }}
                            />
                        ) : (
                            ''
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{
                                m: 1,
                            }}
                            type="submit"
                            variant="contained"
                            disabled={addButDis}
                            onClick={handleSubmit(onSubmit)}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
                <Box
                    sx={{
                        mt: 2,
                        ml: 2,
                        mb: 2,
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
                        <H3 sx={{ mt: 2 }}>Tray Id : {whtTrayId}</H3>
                        <H3 sx={{ mt: 2 }}>UIC : {uic}</H3>
                    </Box>
                    <Box>
                        <Button
                            sx={{ mr: 2 }}
                            onClick={(e) => handleOpen()}
                            variant="contained"
                            color="primary"
                        >
                            ADD
                        </Button>
                    </Box>
                </Box>
                {gridData}
            </Box>
        </>
    )
}
