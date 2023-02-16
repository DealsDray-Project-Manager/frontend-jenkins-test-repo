import React, { useEffect, useState, useMemo, useRef } from 'react'

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
    MenuItem,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle,
    IconButton,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import jwt_decode from 'jwt-decode'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// import jwt from "jsonwebtoken"
import { axiosWarehouseIn } from '../../../../../axios'
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
    const [loading, setLoading] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    /**************************************************************************** */
    const [uic, setUic] = useState('')
    const [addButDis, setAddButDis] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [stateData, setStateData] = useState({})
    const [itemDataVer, setItemDataVer] = useState({})
    const [open, setOpen] = React.useState(false)

    /*********************************************************** */

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosWarehouseIn.post(
                    '/readyForAuditView/' + trayId + '/' + 'Ready to Audit'
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

    const schema = Yup.object().shape({
        stage: Yup.string().required('Required*').nullable(),

        grade: Yup.string()
            .when('stage', (stage, schema) => {
                if (stage == 'Shift to Sales Bin') {
                    return schema.required('Required')
                }
            })
            .nullable(),
        description: Yup.string()
            .when('stage', (stage, schema) => {
                if (stage == 'Shift to Sales Bin') {
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

    const handelUic = async (e) => {
        if (e.target.value.length === 11) {
            try {
                let obj = {
                    uic: e.target.value,
                    trayId: trayId,
                }
                setTextDisable(true)

                let res = await axiosWarehouseIn.post(
                    '/check-uic-ready-for-audit',
                    obj
                )
                if (res?.status == 200) {
                    setItemDataVer(res.data.data)
                    setTextDisable(false)

                    handleOpen()
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
    const onSubmit = async (e,value) => {
       
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                const { user_name } = jwt_decode(admin)
                try {
                    setAddButDis(true)
                    let obj = {
                        uic: uic,
                        trayId: trayId,
                        item: itemDataVer,
                        username: user_name,
                    }
                    obj.stage = stateData.stage
                    if (stateData.stage == 'Shift to Sales Bin') {
                        console.log('wor')
                        obj.grade = value.grade
                        obj.description = value.description
                    }
                    let res = await axiosWarehouseIn.post(
                        '/readyForAudit/itemSegrigation',
                        obj
                    )
                    if (res.status == 200) {
                        handleClose()
                        setAddButDis(false)
                        setUic('')
                        alert(res.data.message)

                        setRefresh((refresh) => !refresh)
                    } else {
                        handleClose()
                        setUic('')
                        setAddButDis(false)

                        alert(res.data.message)
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
        reset({})
        setOpen(true)
    }

    /************************************************************************** */
    const handelIssue = async (e, sortId) => {
        try {
            setLoading(true)
            let obj = {
                trayId: trayId,
                sortId: trayData?.sort_id,
                temp_array: trayData?.temp_array?.length,
            }
            let res = await axiosWarehouseIn.post(
                '/readyForAudit/closeTray',
                obj
            )
            if (res.status == 200) {
                alert(res.data.message)
                navigate('/wareshouse/wht/ready-for-audit')
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
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
                        <h5>Sales Bin</h5>
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5>Total</h5>
                            <p style={{ paddingLeft: '5px', fontSize: '22px' }}>
                                {trayData?.temp_array?.length}/{trayData?.limit}
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
                            {trayData?.temp_array?.map((data, index) => (
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
    }, [trayData?.temp_array])
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
                        <h5>Leave the Item in the tray</h5>
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5>Total</h5>
                            <p style={{ marginLeft: '5px', fontSize: '24px' }}>
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

    return (
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
                        {...register('stage')}
                        error={errors.stage ? true : false}
                        helperText={errors.stage?.message}
                        onChange={(e) => {
                            handleChange(e)
                        }}
                        name="stage"
                    >
                        <MenuItem value="Leave the Item in the tray">
                            Leave the Item in the tray
                        </MenuItem>

                        <MenuItem value="Shift to Sales Bin">
                            Shift to Sales Bin
                        </MenuItem>
                    </TextField>
                    {stateData?.stage == 'Shift to Sales Bin' ? (
                        <>
                            <TextField
                                label="Select Grade"
                                select
                                fullWidth
                                {...register('grade')}
                                error={errors.grade ? true : false}
                                helperText={errors.grade?.message}
                                sx={{
                                    mb: 2,
                                }}
                              
                                name="grade"
                            >
                                <MenuItem value="A">A</MenuItem>
                                <MenuItem value="B">B</MenuItem>
                                <MenuItem value="C">C</MenuItem>
                                <MenuItem value="D">D</MenuItem>
                            </TextField>
                            <TextField
                                label="Description"
                                fullWidth
                                name="description"
                                sx={{
                                    mb: 2,
                                }}
                                {...register('description')}
                                error={errors.description ? true : false}
                                helperText={errors.description?.message}
                                type="text"
                                variant="outlined"
                            />
                        </>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ ml: 2 }}
                        disabled={
                           
                            addButDis
                        }
                        onClick={handleSubmit(onSubmit)}
                        variant="contained"
                        color="primary"
                    >
                        ADD
                    </Button>
                </DialogActions>
            </BootstrapDialog>

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
                    <TextField
                        sx={{ mt: 1, ml: 1 }}
                        id="outlined-password-input"
                        type="text"
                        disabled={textDisable}
                        name="doorsteps_diagnostics"
                        label="SCAN UIC"
                        inputRef={(input) => input && input.focus()}

                        autoFocus
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
                    }}
                >
                    <h4 style={{ marginRight: '13px' }}>
                        Brand -- {trayData?.brand}
                    </h4>
                    <h4 style={{ marginRight: '13px' }}>
                        Model -- {trayData?.model}
                    </h4>
                </Box>
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
                    <Button
                        sx={{ m: 3, mb: 9 }}
                        variant="contained"
                        disabled={
                            trayData?.items?.length !==
                                trayData?.temp_array?.length +
                                    trayData?.actual_items?.length ||
                            loading == true
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            if (window.confirm('You Want to Issue?')) {
                                handelIssue(e)
                            }
                        }}
                    >
                        Close
                    </Button>
                </Box>
            </div>
        </Box>
    )
}
