import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    TextField,
    Checkbox,
} from '@mui/material'
import useAuth from 'app/hooks/useAuth'
import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import { SimpleCard, Breadcrumb } from 'app/components'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosWarehouseIn } from '../../../../axios'
import Swal from 'sweetalert2'

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
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

/**************************************************************************** */
const PaginationTable = () => {
    const [bagData, setBagData] = useState([])
    const [bagId, setBagId] = useState('')
    const [bagSuccess, setbagSuccess] = useState(false)
    const [awbn, setAwbn] = useState('')
    const [uic, setUic] = useState(false)
    const [sleaves, setSleaves] = useState(false)
    const [loading, setLoading] = useState(false)
    const [goButDis, setGoButDis] = useState(false)
    const [disAwbnText, SetDisAwbText] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()
    console.log(user)

    const handelCheckBagId = async (e) => {
        try {
            setGoButDis(true)
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                let { location } = jwt_decode(admin)
                let obj = {
                    location: location,
                    bagId: bagId,
                }
                let res = await axiosWarehouseIn.post('/checkBagId', obj)
                if (res.status == 200) {
                    setGoButDis(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                    getitem()
                    setbagSuccess(true)
                } else {
                    setGoButDis(false)
                    setbagSuccess(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                }
            } else {
                navigate('/')
            }
        } catch (error) {
            setbagSuccess(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }
    const getitem = async () => {
        try {
            let response = await axiosWarehouseIn.post('/getBagItem/' + bagId)
            if (response.status === 200) {
                setBagData(response.data.data)
            } else if (response.status == 201) {
                setBagData(response.data.data)

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
    const handelAwbn = async (e) => {
        if (e.target.value.length >= 12) {
            if (bagId == '') {
                Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: ' Please Fill The Input',
                    confirmButtonText: 'Ok',
                })
            } else {
                try {
                    SetDisAwbText(true)
                    let admin = localStorage.getItem('prexo-authentication')
                    if (admin) {
                        let { location } = jwt_decode(admin)
                        let obj = {
                            awbn: e.target.value,
                            bagId: bagId,
                            location: location,
                        }
                        let res = await axiosWarehouseIn.post('/checkAwbn', obj)
                        if (res.status == 200) {
                            if (
                                res.data.message == 'AWBN Number Is Duplicate'
                            ) {
                                setAwbn('')
                                handelSubmitStock(res.data.data, 'Duplicate')
                            } else if (
                                res.data.message == 'AWBN Number Is Invalid'
                            ) {
                                setAwbn('')
                                handelSubmitStock(res.data.data, 'Invalid')
                            } else {
                                setAwbn('')
                                handelSubmitStock(res.data.data, 'Valid')
                            }
                        } else {
                            SetDisAwbText(false)

                            Swal.fire({
                                position: 'top-center',
                                icon: 'error',
                                title: res?.data?.message,
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
        }
    }
    const handelSubmitStock = async (awbn, status) => {
        if (bagId == '') {
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Please Fill The Input',
                confirmButtonText: 'Ok',
            })
        } else if (bagData[0]?.items != undefined) {
            if (
                bagData[0]?.items?.filter(function (item) {
                    return item.status != 'Duplicate'
                }).length == bagData[0]?.limit
            ) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Bag Is Full',
                    confirmButtonText: 'Ok',
                })
            } else {
                try {
                    let obj = {
                        bag_id: bagId,
                        awbn_number: awbn.tracking_id,
                        order_id: awbn.order_id,
                        order_date: awbn.order_date,
                        status: status,
                        sotckin_date: Date.now(),
                        old_item_details: awbn.old_item_details,
                    }
                    let res = await axiosWarehouseIn.post(
                        '/stockInToWarehouse',
                        obj
                    )
                    if (res.status == 200) {
                        SetDisAwbText(false)
                        setAwbn('')
                        getitem()
                    } else {
                        SetDisAwbText(false)

                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: res?.data?.messsage,
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
    }
    const handeleUic = () => {
        if (uic == false) {
            setUic(true)
        } else {
            setUic(false)
        }
    }
    const handeleSleaves = () => {
        if (sleaves == false) {
            setSleaves(true)
        } else {
            setSleaves(false)
        }
    }
    const handelClose = async (e) => {
        try {
            setLoading(true)
            if (
                bagData[0]?.items.filter(function (item) {
                    return item.status == 'Duplicate'
                }).length != 0
            ) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Please Remove Duplicate Items',
                    confirmButtonText: 'Ok',
                })
                setLoading(false)
            } else if (
                bagData[0]?.items.filter(function (item) {
                    return item.status == 'Invalid'
                }).length != 0
            ) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: 'Invalid item found request to admin remove',
                    confirmButtonText: 'Ok',
                })
                setLoading(false)
            } else if (bagData[0]?.items.length == bagData[0]?.limit) {
                let obj = {
                    bagId: bagId,
                    uic: uic,
                    sleaves: sleaves,
                    stage: 'Closed',
                    username: user.username,
                }
                let res = await axiosWarehouseIn.post('/bagClosing', obj)
                if (res.status == 200) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                    setLoading(false)
                    window.location.reload(false)
                } else {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                }
            } else {
                let obj = {
                    bagId: bagId,
                    uic: uic,
                    sleaves: sleaves,
                    stage: 'Pre-closure',
                    username: user.username,
                }
                let res = await axiosWarehouseIn.post('/bagClosing', obj)
                if (res.status == 200) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Bag going to Pre-closure',
                        confirmButtonText: 'Ok',
                    })
                    setLoading(false)
                    window.location.reload(false)
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
    const handelDelete = async (id, awbn, state) => {
        try {
            let obj = {
                id: id,
                bagId: bagId,
                awbn: awbn,
                state: state,
            }
            let data = await axiosWarehouseIn.post('/stockin', obj)
            if (data.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: data?.data?.message,
                    confirmButtonText: 'Ok',
                })
                getitem()
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
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Bag', path: '/' },
                        { name: 'Scan' },
                    ]}
                />
            </div>

            <SimpleCard title="Item">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'row',
                        }}
                    >
                        <TextField
                            size="medium"
                            variant="outlined"
                            type="text"
                            label="Bag ID"
                            onChange={(e) => setBagId(e.target.value)}
                            autoComplete="off" // Disable autocomplete suggestions
                        />
                        <Button
                            sx={{ ml: 2, mb: 1, mt: 1, mr: 2, height: '37px' }}
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={bagId == '' || goButDis}
                            onClick={handelCheckBagId}
                        >
                            GO
                        </Button>
                        {bagSuccess ? (
                            <>
                                <TextField
                                    id="outlined-password-input"
                                    type="text"
                                    inputRef={(input) => input && input.focus()}
                                    name="doorsteps_diagnostics"
                                    label="SCAN AWBN"
                                    value={awbn}
                                    autoComplete="off" // Disable autocomplete suggestions
                                    disabled={disAwbnText}
                                    onChange={(e) => {
                                        setAwbn(e.target.value)
                                        handelAwbn(e)
                                    }}
                                    
                                    onKeyPress={(e) => {
                                        if (user.serverType == 'Live') {
                                            // Prevent manual typing by intercepting key presses
                                            e.preventDefault()
                                        }
                                    }}
                                    onPaste={(e) => {
                                        if (user.serverType == 'Live') {
                                            // Prevent manual typing by intercepting key presses
                                            e.preventDefault()
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            width: 'auto',
                                        },
                                    }}
                                />
                            </>
                        ) : (
                            ''
                        )}
                    </Box>
                    {bagData.length != 0 ? (
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
                                <h4>Total </h4>
                                <h4
                                    style={{
                                        marginLeft: '-2px',
                                        fontSize: '24px',
                                    }}
                                >
                                    {
                                        bagData[0]?.items?.filter(function (
                                            item
                                        ) {
                                            return item.status != 'Duplicate'
                                        }).length
                                    }
                                    /{bagData[0]?.limit}
                                </h4>
                            </Box>

                            <Box
                                sx={{
                                    m: 2,
                                }}
                            >
                                <h4>Valid</h4>
                                <h4
                                    style={{
                                        marginLeft: '13px',
                                        fontSize: '24px',
                                    }}
                                >
                                    {
                                        bagData[0]?.items?.filter(function (
                                            item
                                        ) {
                                            return item.status == 'Valid'
                                        }).length
                                    }
                                </h4>
                            </Box>
                            <Box
                                sx={{
                                    m: 2,
                                }}
                            >
                                <h4>Invalid</h4>
                                <h4
                                    style={{
                                        marginLeft: '13px',
                                        fontSize: '24px',
                                    }}
                                >
                                    {
                                        bagData[0]?.items?.filter(function (
                                            item
                                        ) {
                                            return item.status == 'Invalid'
                                        }).length
                                    }
                                </h4>
                            </Box>

                            <Box
                                sx={{
                                    m: 2,
                                }}
                            >
                                <h4>Duplicate</h4>
                                <h4
                                    style={{
                                        marginLeft: '16px',
                                        fontSize: '24px',
                                    }}
                                >
                                    {
                                        bagData[0]?.items?.filter(function (
                                            item
                                        ) {
                                            return item.status == 'Duplicate'
                                        }).length
                                    }
                                </h4>
                            </Box>
                        </Box>
                    ) : (
                        ''
                    )}
                </Box>

                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{ fontWeight: 'bold', fontSize: '14px' }}
                            >
                                S.NO
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 'bold', fontSize: '14px' }}
                            >
                                AWBN Number
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 'bold', fontSize: '14px' }}
                            >
                                Order ID
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 'bold', fontSize: '14px' }}
                            >
                                Order Date
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 'bold', fontSize: '14px' }}
                            >
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bagData[0]?.items?.map((data, index) => (
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data?.awbn_number}</TableCell>
                                <TableCell>{data?.order_id}</TableCell>
                                <TableCell>
                                    {data?.order_date == null
                                        ? 'No Order Date'
                                        : new Date(
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
                                {data.status == 'Valid' ||
                                data.status == 'Invalid' ? null : (
                                    <TableCell>
                                        <Button
                                            sx={{
                                                ml: 2,
                                            }}
                                            variant="contained"
                                            style={{ backgroundColor: 'red' }}
                                            component="span"
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        'You want to Remove?'
                                                    )
                                                ) {
                                                    handelDelete(
                                                        data._id,
                                                        data?.awbn_number,
                                                        data.status
                                                    )
                                                }
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
                {bagData[0]?.items?.length != 0 && bagData.length != 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            mt: 2,
                            mr: 3,
                            ml: 3,
                        }}
                    >
                        <Box>
                            <Checkbox
                                onClick={(e) => handeleUic()}
                                sx={{ ml: 3 }}
                            />
                            <label>UIC Label</label>

                            <Checkbox
                                onClick={(e) => handeleSleaves()}
                                sx={{ ml: 3 }}
                            />
                            <label>Sleeves</label>
                            <Button
                                sx={{
                                    ml: 2,
                                }}
                                variant="contained"
                                style={{ backgroundColor: 'red' }}
                                component="span"
                                disabled={loading == true ? true : false}
                                onClick={(e) => {
                                    if (window.confirm('You want to Close?')) {
                                        handelClose(e)
                                    }
                                }}
                            >
                                Close
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    ''
                )}
            </SimpleCard>
        </Container>
    )
}

export default PaginationTable
