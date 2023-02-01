import React, { useEffect, useState, useMemo } from 'react'
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
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from '../../../../../axios'
import Checkbox from '@mui/material/Checkbox'
// import jwt from "jsonwebtoken"
import jwt_decode from 'jwt-decode'

export default function DialogBox() {
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
    /******************************************************************************** */

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosWarehouseIn.post(
                    '/getBagItemRequest/' + trayId + '/' + 'Received From BOT'
                )
                if (response.status === 200) {
                    setEmployeeData(response.data.data)
                } else {
                    alert(response.data.message)
                    navigate(-1)
                }
            } catch (error) {
                alert(error)
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
                    alert(res.data.message)
                }
            } catch (error) {
                alert(error)
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
    console.log(employeeData[0]?.items[0]?.bag_id)
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
                alert(response.data.message)
            }
        } catch (error) {
            alert(error)
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
                    addActualitem(res.data.data)
                } else if (res.status == 202) {
                    setTextDisable(false)
                    alert(res.data.message)
                }
            } catch (error) {
                setTextDisable(false)
                alert(error)
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
            alert('Bag Is Full')
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
                    alert(res.data.message)
                }
            } catch (error) {
                alert(error)
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
                    alert('Please Add Description')
                    setLoading(false)
                } else if (
                    employeeData[0]?.type_taxanomy == 'BOT' &&
                    bagReuse == false
                ) {
                    alert('Please confirm bag release')
                    setLoading(false)
                } else if (
                    employeeData[0]?.actual_items?.filter(function (item) {
                        return item.status == 'Duplicate'
                    })?.length != 0
                ) {
                    alert('Please Remove Duplicate Items')
                    setLoading(false)
                } else if (
                    employeeData[0]?.actual_items?.length ==
                    employeeData[0]?.items?.length
                ) {
                    let obj = {
                        trayId: trayId,
                        description: description,
                        bagId: bagId,
                        location: location,
                    }
                    if (employeeData?.[0]?.type_taxanomy != 'BOT') {
                        let res = await axiosWarehouseIn.post('/trayclose', obj)
                        if (res.status == 200) {
                            alert(res.data.message)
                            setLoading(false)
                            navigate('/wareshouse/pmt-mmt/tray-close-request')
                        } else {
                            alert(res.data.message)
                        }
                    } else {
                        let res = await axiosWarehouseIn.post(
                            '/traycloseBot',
                            obj
                        )
                        if (res.status == 200) {
                            alert(res.data.message)
                            setLoading(false)
                            navigate('/wareshouse/bag/bag-close-requests')
                        } else {
                            alert(res.data.message)
                        }
                    }
                } else {
                    alert('Please Verify Actual Data')
                }
            }
        } catch (error) {
            alert(error)
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
                alert(data.data.message)
                getitem()
            } else {
                alert(data.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }
    /***************************************************************************************** */
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    /******************************************************************************** */
    const tableExpected = useMemo(() => {
        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', m: 1 }}>
                <h4>Expected</h4>

                <Box
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
                                <TableCell>Bag Id</TableCell>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeData[0]?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell>{index + 1}</TableCell>
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
            <Paper sx={{ width: '98%', overflow: 'hidden', m: 1 }}>
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
                            m: 2,
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
                                        <TableCell>{index + 1}</TableCell>
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
        <>
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
        </>
    )
}