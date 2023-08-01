import React, { useEffect, useState, useMemo } from 'react'
import useAuth from 'app/hooks/useAuth'
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
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from '../../../../../axios'
import Checkbox from '@mui/material/Checkbox'
// import jwt from "jsonwebtoken"
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo } from '../../../../../axios'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

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

export default function DialogBox() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [employeeData, setEmployeeData] = useState([])
    const { trayId } = useParams()
    const [textDisable, setTextDisable] = useState(false)
    /**************************************************************************** */
    const [awbn, setAwbn] = useState('')
    const [bagReuse, setBagReuse] = useState(false)
    const [description, setDescription] = useState([])
    const [bagStatus, setBagStatus] = useState(0)
    const [loading, setLoading] = useState(false)
    const [rackiddrop, setrackiddrop] = useState([])
    const [rackId, setRackId] = useState('')
    /******************************************************************************** */

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post(
                    '/trayracks/view/' + user.warehouse
                )
                if (res.status == 200) {
                 
                    setrackiddrop(res.data.data)
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosWarehouseIn.post(
                    '/getBagItemRequest/' + trayId + '/' + 'Received From BOT'
                )
                if (response.status === 200) {
                    setEmployeeData(response.data.data)
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
    }, [])
    useEffect(() => {
        const checkBagValidation = async () => {
            try {
                let res = await axiosWarehouseIn.post(
                    '/bagValidation/' + employeeData[0]?.items[0]?.bag_id
                )
                if (res.status === 200) {
                    setBagStatus(res.data.status)
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
        if (
            employeeData[0]?.items[0]?.bag_id !== undefined &&
            employeeData[0].type_taxanomy == 'BOT'
        ) {
            checkBagValidation()
        } else {
            setBagStatus(1)
        }
    }, [employeeData])
    /******************************************************************************** */
    const getitem = async () => {
        try {
            let response = await axiosWarehouseIn.post(
                '/getBagItemRequest/' + trayId + '/' + 'Received From BOT'
            )
            if (response.status === 200) {
                setEmployeeData(response.data.data)

                //   dataTableFun()
            } else if (response.status == 201) {
                setEmployeeData(response.data.data)

                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: response?.data?.message,
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
    /******************************************************************************** */
    const handelAwbn = async (e) => {
        if (e.target.value.length === 11) {
            try {
                let obj = {
                    uic: e.target.value,
                    trayId: trayId,
                }
                setTextDisable(true)
                let res = await axiosWarehouseIn.post('/check-uic', obj)
                if (res?.status == 200) {
                    setAwbn('')
                    setTextDisable(false)
                    getitem()
                } else if (res.status == 202) {
                    setTextDisable(false)

                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                }
            } catch (error) {
                setTextDisable(false)
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
    const addActualitem = async (uic) => {
        if (
            employeeData[0]?.actual_items?.filter(function (item) {
                return item.status == 'Valid'
            }).length +
                employeeData[0]?.actual_items?.filter(function (item) {
                    return item.status == 'Invalid'
                }).length >=
            employeeData[0].limit
        ) {
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Bag Is Full',
                confirmButtonText: 'Ok',
            })
        } else {
            let data = employeeData[0]?.items?.filter(function (item) {
                return item.awbn_number == uic.awbn_number
            })
            setTextDisable(true)
            try {
                let obj = {
                    bag_id: trayId,
                    awbn_number: uic.awbn_number,
                    order_id: uic.order_id,
                    order_date: uic.order_date,
                    uic: uic.uic,

                    stock_in: new Date(),
                    status: data[0].status,
                }
                let res = await axiosWarehouseIn.post('/addActualitem', obj)
                if (res?.status == 200) {
                    setAwbn('')
                    setTextDisable(false)
                    getitem()
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
    }
    /************************************************************************** */
    const handelIssue = async (e, bagId) => {
        e.preventDefault()
        setLoading(true)
        let admin = localStorage.getItem('prexo-authentication')
        try {
            if (admin) {
                let { location } = jwt_decode(admin)
                if (description == '') {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'warning',
                        title: 'Please Add Description',
                        confirmButtonText: 'Ok',
                    })
                    setLoading(false)
                } else if (
                    employeeData[0]?.type_taxanomy == 'BOT' &&
                    bagReuse == false
                ) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'warning',
                        title: 'Please Confirm Bag Release',
                        confirmButtonText: 'Ok',
                    })
                    setLoading(false)
                } else if (
                    employeeData[0]?.actual_items?.filter(function (item) {
                        return item.status == 'Duplicate'
                    })?.length != 0
                ) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'Please Remove Duplicate Items',
                        confirmButtonText: 'Ok',
                    })
                    setLoading(false)
                } else if (
                    employeeData[0]?.actual_items?.length ==
                    employeeData[0]?.items?.length
                ) {
                    let obj = {
                        trayId: trayId,
                        description: description,
                        bagId: bagId,
                        rackId: rackId,
                        location: location,
                    }
                    if (employeeData?.[0]?.type_taxanomy != 'BOT') {
                        let res = await axiosWarehouseIn.post('/trayclose', obj)
                        if (res.status == 200) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: res?.data?.message,
                                confirmButtonText: 'Ok',
                            })
                            setLoading(false)
                            navigate('/wareshouse/pmt-mmt/tray-close-request')
                        } else {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'error',
                                title: res?.data?.message,
                                confirmButtonText: 'Ok',
                            })
                        }
                    } else {
                        let res = await axiosWarehouseIn.post(
                            '/traycloseBot',
                            obj
                        )
                        if (res.status == 200) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: res?.data?.message,
                                confirmButtonText: 'Ok',
                            })
                            setLoading(false)
                            navigate('/wareshouse/bag/bag-close-requests')
                        } else {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'error',
                                title: res?.data?.message,
                                confirmButtonText: 'Ok',
                            })
                        }
                    }
                } else {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'Please verify Actual Data',
                        confirmButtonText: 'Ok',
                    })
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
    /******************************************************************************** */
    const handelDelete = async (id) => {
        try {
            let obj = {
                bagId: trayId,
                id: id,
            }
            let data = await axiosWarehouseIn.post('/actualBagItem', obj)
            if (data.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: data?.data?.message,
                    confirmButtonText: 'Ok',
                })
                getitem()
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: data?.data?.message,
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

    /***************************************************************************************** */
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    /******************************************************************************** */

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
                        <h5>EXPECTED</h5>
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5>Total</h5>
                            <p
                                style={{
                                    paddingLeft: '5px',
                                    fontSize: '22px',
                                    marginBottom: '29px',
                                }}
                            >
                                {employeeData[0]?.items?.length}/
                                {employeeData[0]?.limit}
                            </p>
                        </Box>
                    </Box>
                </Box>

                {/* <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Box
                        sx={{
                            m: 1,
                        }}
                    >
                        <Box sx={{}}>
                            <h5>Total</h5>
                            <p style={{ paddingLeft: '1px', fontSize: '22px' }}>
                                {employeeData[0]?.items?.length}/
                                {employeeData[0]?.limit}
                            </p>
                        </Box>
                    </Box>
                </Box> */}
                <TableContainer>
                    <Table
                        style={{ width: '100%' }}
                        id="example"
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 2 }}>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>Bag Id</TableCell>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeData[0]?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.bag_id}</TableCell>

                                    <TableCell>{data?.order_id}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            data?.order_date
                                        ).toLocaleString('en-GB', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })}
                                    </TableCell>
                                    <TableCell
                                        style={
                                            data.status == 'Valid'
                                                ? { color: 'green' }
                                                : { color: 'red' }
                                        }
                                    >
                                        {data.status}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [employeeData[0]?.items])

    const tableActual = useMemo(() => {
        return (
            <Paper sx={{ width: '97%', overflow: 'hidden', m: 1 }}>
                <Box sx={{}}>
                    <Box
                        sx={{
                            float: 'left',
                            ml: 2,
                        }}
                    >
                        <h5>ACTUAL</h5>
                        <TextField
                            sx={{ m: 0 }}
                            id="outlined-password-input"
                            type="text"
                            name="doorsteps_diagnostics"
                            inputRef={(input) => input && input.focus()}
                            disabled={textDisable}
                            label="SCAN UIC"
                            value={awbn}
                            onChange={(e) => {
                                setAwbn(e.target.value)
                                handelAwbn(e)
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
                        </Box>
                        <p style={{ marginLeft: '5px', fontSize: '24px' }}>
                            {employeeData[0]?.actual_items?.length}/
                            {employeeData[0]?.limit}
                        </p>
                    </Box>
                </Box>

                {/* <Box>
                <h4>ACTUAL</h4>
                <TextField
                    sx={{ m: 1 }}
                    id="outlined-password-input"
                    type="text"
                    name="doorsteps_diagnostics"
                    inputRef={(input) => input && input.focus()}
                    disabled={textDisable}
                    label="SCAN UIC"
                    value={awbn}
                    onChange={(e) => {
                        setAwbn(e.target.value)
                        handelAwbn(e)
                    }}
                    inputProps={{
                        style: {
                            width: 'auto',
                        },
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        
                    }}
                >
                    <Box
                        sx={{
                            // m: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5>Total</h5>
                            <p style={{ marginLeft: '5px', fontSize: '24px' }}>
                                {employeeData[0]?.actual_items?.length}/
                                {employeeData[0]?.limit}
                            </p>
                        </Box>
                    </Box>
                </Box>
                </Box> */}
                <TableContainer>
                    <Table
                        style={{ width: '100%' }}
                        id="example"
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 2 }}>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>Bag Id</TableCell>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeData[0]?.actual_items?.map(
                                (data, index) => (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                    >
                                        <TableCell sx={{ pl: 3 }}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{data?.uic}</TableCell>
                                        <TableCell>{data?.bag_id}</TableCell>
                                        <TableCell>{data?.order_id}</TableCell>
                                        <TableCell>
                                            {new Date(
                                                data?.order_date
                                            ).toLocaleString('en-GB', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                        </TableCell>
                                        <TableCell
                                            style={
                                                data.status == 'Valid'
                                                    ? { color: 'green' }
                                                    : { color: 'red' }
                                            }
                                        >
                                            {data.status}
                                        </TableCell>
                                        {data.status !== 'Valid' ? (
                                            <TableCell>
                                                <Button
                                                    sx={{
                                                        ml: 2,
                                                    }}
                                                    variant="contained"
                                                    style={{
                                                        backgroundColor: 'red',
                                                    }}
                                                    component="span"
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                'Delete the item?'
                                                            )
                                                        ) {
                                                            handelDelete(
                                                                data._id
                                                            )
                                                        }
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </TableCell>
                                        ) : null}
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [employeeData[0]?.actual_items, textDisable, awbn])
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'PMT And MMT', path: '/' },
                        { name: 'Tray-Close-Request', path: '/' },
                        { name: 'Tray Close' },
                    ]}
                />
            </div>
            <Box
            // sx={{
            //     height: 70,
            //     borderRadius: 10,
            // }}
            >
                <Box
                    sx={{
                        float: 'left',
                    }}
                >
                    <h3 style={{ marginLeft: '13px' }}>Tray ID - {trayId}</h3>
                    <h4 style={{ marginLeft: '13px' }}>
                        AGENT NAME - {employeeData[0]?.issued_user_name}
                    </h4>
                </Box>
                <Box
                    sx={{
                        float: 'right',
                    }}
                >
                    <h4 style={{ marginRight: '13px' }}>
                        Closed On --{' '}
                        {new Date(
                            employeeData[0]?.closed_time_bot
                        ).toLocaleString('en-GB', { hour12: true })}
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
                    <TextFieldCustOm
                        sx={{ m: 1 }}
                        label="Rack ID"
                        select
                        style={{ width: '150px' }}
                        name="rack_id"
                    >
                        {rackiddrop?.map((data) => (
                            <MenuItem
                                onClick={(e) => {
                                    setRackId(data.rack_id)
                                }}
                                value={data.rack_id}
                            >
                                {data.rack_id}
                            </MenuItem>
                        ))}
                    </TextFieldCustOm>
                    <textarea
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        style={{ width: '300px', height: '60px' }}
                        placeholder="Description"
                    ></textarea>
                    {employeeData[0]?.type_taxanomy == 'BOT' ? (
                        <>
                            <Checkbox
                                checked={bagReuse}
                                onClick={(e) => {
                                    if (
                                        window.confirm(
                                            bagReuse
                                                ? 'Already Added'
                                                : 'You Want to Release Bag ?'
                                        )
                                    ) {
                                        setBagReuse(true)
                                    }
                                }}
                                {...label}
                            />
                            <label>Bag Release</label>
                        </>
                    ) : (
                        ''
                    )}
                    <Button
                        sx={{ m: 3, mb: 9 }}
                        variant="contained"
                        style={{ backgroundColor: 'primery' }}
                        disabled={
                            loading == true ||
                            rackId == '' ||
                            description == '' ||
                            bagStatus !== 1
                                ? true
                                : false
                        }
                        onClick={(e) => {
                            handelIssue(e, employeeData[0]?.items[0]?.bag_id)
                        }}
                    >
                        Tray Close
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
