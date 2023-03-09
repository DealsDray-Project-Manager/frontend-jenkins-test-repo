import React, { useEffect, useState, useMemo } from 'react'
import { styled, alpha } from '@mui/material/styles'
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
    FormControl,
    InputLabel,
    Select,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import jwt_decode from 'jwt-decode'

import CloseIcon from '@mui/icons-material/Close'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'




import { axiosWarehouseIn ,axiosRDL_oneAgent} from '../../../../axios'



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
    const [description, setDescription] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false)
    const [auditReport, setauditReport] = useState()
    const [trackingid,setTrackingid]=useState()
    const [openStatus, setopenStatus] = useState(false)
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [responseData, setresponseData] = useState('');

    /*********************************************************** */


    const schema = Yup.object().shape({

        description: Yup.string()
            .when('selected_status', (selected_status, schema) => {
                if (
                    selected_status == 'Battery Boosted' ||
                    selected_status == 'Charge jack Replaced & Boosted' ||
                    selected_status == 'Battery Damage' ||
                    selected_status == 'Repair Required' ||
                    selected_status == 'Dead'||
                    selected_status == 'Select an Option'
                ) {
                    return schema.required('Required')
                }
            })
            .nullable(),

        model_reg: Yup.string()
            .when('selected_status', (selected_status, schema) => {
                if (
                    selected_status == 'Battery Damage'
                ) {
                    return schema.required('Required')
                }
            })
            .nullable(),
        part_list: Yup.string()
            .when('selected_status', (selected_status, schema) => {
                if (
                    selected_status == 'Repair Required'
                ) {
                    return schema.required('Required')
                }
            })
            .nullable(),
    })

    let admin = localStorage.getItem('prexo-authentication')
    let user_name1
    if (admin) {
        let { user_name } = jwt_decode(admin)
        user_name1 = user_name
    }

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
        reset({})
        setOpen(false)
        setUic('')
        setTextDisable(false)
    }
    const handleClckOpen = () => {
        reset({})
        setOpen(true)
    }
    const handleStatusOpen = () => {
        setOpen(false)
        setopenStatus(true)
    }

    const handleStatusclose = () => {
        setopenStatus(false)
        setUic('')
         reset({})
        setTextDisable(false)
    }


    const statusSubmit=async (values)=>{
        values.RDL_agent= user_name1
        responseData.Rdl_status=values
        addActualitem(responseData)
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosWarehouseIn.post(
                    '/getWhtTrayItem/' + trayId + '/' + 'Issued to RDL_one'
                )
                if (response.status === 200) {
                    setTrayData(response.data.data)
                    console.log('kkk');
                } else {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: response?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                    navigate(-1)
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
                    setauditReport(res?.data?.data?.audit_report)
                    setTrackingid(res?.data?.data?.tracking_id)
                    handleClckOpen()
                    setresponseData(res?.data?.data)
                    // addActualitem(res.data.data)
                    setUic('')
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

    console.log(auditReport, "audit report");
    /************************************************************************** */
    const addActualitem = async (obj) => {
        if (trayData.items.length < trayData?.actual_items?.length) {

            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: "All items Scanned",
                confirmButtonText: 'Ok',
            })
        } else {
            try {
                let objData = {
                    trayId: trayId,
                    item: obj,
                }
                setTextDisable(true)
                let res = await axiosRDL_oneAgent.post(
                    '/wht-add-actual-item',
                    objData
                )
                if (res.status == 200) {
                    setUic('')
                    setresponseData('')
                    setTextDisable(false)
                    setRefresh((refresh) => !refresh)
                    handleStatusclose()
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

        console.log('poooddd');
        try {
            if (trayData?.actual_items?.length == trayData?.items?.length) {
                setLoading(true)
                let obj = {
                    trayId: trayId,
                    description: description,
                    sortId: trayData?.sort_id,
                }
                let res = await axiosRDL_oneAgent.post(
                    '/issue-to-agent-wht',
                    obj
                )
                if (res.status == 200) {
                    console.log('fffff');

                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: "Succesfully Closed",
                        confirmButtonText: 'Ok',
                    })
                    if (trayData?.sort_id == 'Send for RDL_one') {
                        setLoading(false)
                        navigate('/wareshouse/wht/RDL-request')
                    } else {
                        setLoading(false)
                        navigate('/wareshouse/wht/RDL-request')
                    }
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
                    title: "Please Verify Actual Data",
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
                        <h5>Items</h5>
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
                                <TableCell>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>MUIC</TableCell>
                                <TableCell>BOT Tray</TableCell>
                                <TableCell>BOT Agent</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trayData?.items?.map((data, index) => (
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
                        <h5>Added Items</h5>
                        <TextField
                            sx={{ mt: 1 }}
                            id="outlined-password-input"
                            type="text"
                            disabled={textDisable}
                            name="doorsteps_diagnostics"
                            inputRef={(input) => input && input.focus()}
                            label="SCAN UIC"
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
        <>


            <Dialog open={open} onClose={handleClose} fullWidth
                maxWidth="xs">
                <DialogTitle>Audit Report</DialogTitle>
                <DialogContent>
                    <InputLabel >Exact Grade</InputLabel>
                    <TextField
                        fullWidth
                        value={auditReport?.orgGrade}
                        InputProps={{
                            readOnly: true,
                        }} />
                    <InputLabel >Audit Recommended Grade</InputLabel>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={auditReport?.grade}
                        InputProps={{
                            readOnly: true,
                        }} />
                    <InputLabel >Stage</InputLabel>
                    <TextField
                        fullWidth
                        value={auditReport?.stage}
                        InputProps={{
                            readOnly: true,
                        }} />
                    <InputLabel >Reason</InputLabel>
                    <TextField
                        fullWidth
                        value={auditReport?.reason}
                        InputProps={{
                            readOnly: true,
                        }} />
                    <InputLabel >Description</InputLabel>
                    <TextField
                        fullWidth
                        value={auditReport?.description}
                        InputProps={{
                            readOnly: true,
                        }} />

                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Cancel</Button> */}
                    <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={handleClose}
                            style={{ backgroundColor: 'red' }}
                            component="span"
                        >
                            Cancel
                        </Button>
                    {/* <Button onClick={handleStatusOpen} color="primary">
                        Add Status
                    </Button> */}
                    <Button
                            sx={{
                                m: 1,
                            }}
                            type='submit'
                            variant="contained"
                            onClick={handleStatusOpen}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                             Add Status
                        </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={openStatus} onClose={handleStatusclose} fullWidth
                maxWidth="xs">
                <DialogTitle>RDL Status</DialogTitle>
                <DialogContent>
                    <DialogTitle>Select an Option</DialogTitle>
                    <FormControl>
                        <Select
                            select
                            fullWidth
                            maxWidth="xs"
                            label="Select an Option"
                            {...register('selected_status')}
                            error={errors.selected_status ? true : false}
                            helperText={errors.selected_status?.message}
                            style={{ minWidth: 300 }}
                            defaultValue="Select an Option"
                        >
                            <MenuItem value="Battery Boosted" onClick={()=>setSelectedStatus('Battery Boosted')}>Battery Boosted</MenuItem>
                            <MenuItem value="Charge jack Replaced & Boosted" onClick={()=>setSelectedStatus('Charge jack Replaced & Boosted')}>Charge jack Replaced & Boosted</MenuItem>
                            <MenuItem value="Battery Damage"  onClick={()=>setSelectedStatus('Battery Damage')}>Battery Damage</MenuItem>
                            <MenuItem value="Repair Required" onClick={()=>setSelectedStatus('Repair Required')}>Repair Required</MenuItem>
                            <MenuItem value="Dead" onClick={()=>setSelectedStatus('Dead')}>Dead</MenuItem>
                        </Select>
                    </FormControl>
                    {
                    selectedStatus =='Battery Boosted'||
                    selectedStatus =='Charge jack Replaced & Boosted'||
                    selectedStatus =='Battery Damage'||
                    selectedStatus =='Repair Required'
                    
                    ?
                    <TextField
                                defaultValue={getValues('description')}
                                label="Description"
                                variant="outlined"
                                type="text"
                               
                                {...register('description')}
                                error={errors.description? true : false}
                                helperText={errors.description?.message}
                                fullWidth
                                sx={{ mt: 2 }}
                            />:""
                    }
                    {
                    selectedStatus =='Battery Damage'?
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
                            />:""
                    }
                     {
                    selectedStatus =='Repair Required'?
                    <TextField
                                defaultValue={getValues('part_list')}
                                label=" Part List"
                                variant="outlined"
                                type="text"
                                {...register('part_list')}
                                error={errors?.part_list ? true : false}
                                helperText={errors?. part_list?.message}
                                fullWidth
                                sx={{ mt: 2 }}
                            />:""
                    }

                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleStatusclose}>Cancel</Button> */}
                    <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={handleStatusclose}
                            style={{ backgroundColor: 'red' }}
                            component="span"
                        >
                            Cancel
                        </Button>
                    {/* <Button  type='submit' color="success"  onClick={
                        handleSubmit(statusSubmit)
                   }>
                        Submit
                    </Button> */}
                    <Button
                            sx={{
                                m: 1,
                            }}
                            type='submit'
                            variant="contained"
                            onClick={
                                handleSubmit(statusSubmit)
                           }
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Submit
                        </Button>
                </DialogActions>
            </Dialog>

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
                    <h4 style={{ marginLeft: '13px' }}>
                        AGENT NAME - {trayData?.issued_user_name}
                    </h4>

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
                    <textarea
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}

                        style={{ width: '300px', height: '60px' }}
                        placeholder="Description"
                    ></textarea>
                    <Button
                        sx={{ m: 3, mb: 9 }}
                        variant="contained"
                        disabled={
                            loading == true || description == '' ? true : false
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            if (window.confirm('You Want to Close?')) {
                                handelIssue(e)
                            }
                        }}
                    >
                        Close
                    </Button>
                </Box>
            </div>
        </>
    )
}

