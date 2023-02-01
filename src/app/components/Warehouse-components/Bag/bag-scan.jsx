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
import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import { SimpleCard, Breadcrumb } from 'app/components'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosWarehouseIn } from '../../../../axios'

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

const PaginationTable = () => {
    const [bagData, setBagData] = useState([])
    /**************************************************************************** */
    const [bagId, setBagId] = useState('')
    const [bagSuccess, setbagSuccess] = useState(false)
    const [awbn, setAwbn] = useState('')
    const [uic, setUic] = useState(false)
    const [sleaves, setSleaves] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handelCheckBagId = async (e) => {
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                let { location } = jwt_decode(admin)
                let obj = {
                    location: location,
                    bagId: bagId,
                }
                let res = await axiosWarehouseIn.post('/checkBagId', obj)
                if (res.status == 200) {
                    alert(res.data.message)
                    getitem()
                    setbagSuccess(true)
                } else {
                    setbagSuccess(false)
                    alert(res.data.message)
                }
            } else {
                navigate('/')
            }
        } catch (error) {
            setbagSuccess(false)
            alert(error.response.data.message)
        }
    }
    const getitem = async () => {
        try {
            let response = await axiosWarehouseIn.post('/getBagItem/' + bagId)
            if (response.status === 200) {
                setBagData(response.data.data)
                //   dataTableFun()
            } else if (response.status == 201) {
                setBagData(response.data.data)
                alert(response.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }
    const handelAwbn = async (e) => {
        if (e.target.value.length >= 12) {
            if (bagId == '') {
                alert('Please Fill The Input')
            } else {
                try {
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
                            alert(res.data.message)
                        }
                    }
                } catch (error) {
                    alert(error.response.data.message)
                }
            }
        }
    }
    const handelSubmitStock = async (awbn, status) => {
        if (bagId == '') {
            alert('Please Fill the Input')
        } else if (bagData[0]?.items != undefined) {
            if (
                bagData[0]?.items?.filter(function (item) {
                    return item.status != 'Duplicate'
                }).length == bagData[0]?.limit
            ) {
                alert('Bag Is Full')
            } else {
                try {
                    let obj = {
                        bag_id: bagId,
                        awbn_number: awbn.tracking_id,
                        order_id: awbn.order_id,
                        order_date: awbn.order_date,
                        status: status,
                        sotckin_date: Date.now(),
                    }
                    let res = await axiosWarehouseIn.post(
                        '/stockInToWarehouse',
                        obj
                    )
                    if (res.status == 200) {
                        setAwbn('')
                        getitem()
                    } else {
                        alert(res.data.message)
                    }
                } catch (error) {
                    alert(error)
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
                alert('Please Remove Duplicate Items')
                setLoading(false)
            } else if (
                bagData[0]?.items.filter(function (item) {
                    return item.status == 'Invalid'
                }).length != 0
            ) {
                alert('Invalid item found request to admin remove')
                setLoading(false)
            } else if (bagData[0]?.items.length == bagData[0]?.limit) {
                let obj = {
                    bagId: bagId,
                    uic: uic,
                    sleaves: sleaves,
                    stage: 'Closed',
                }
                let res = await axiosWarehouseIn.post('/bagClosing', obj)
                if (res.status == 200) {
                    alert(res.data.message)
                    setLoading(false)
                    window.location.reload(false)
                } else {
                    alert(res.data.message)
                }
            } else {
                let obj = {
                    bagId: bagId,
                    uic: uic,
                    sleaves: sleaves,
                    stage: 'Pre-closure',
                }
                let res = await axiosWarehouseIn.post('/bagClosing', obj)
                if (res.status == 200) {
                    alert('Bag going to Pre-closure')
                    setLoading(false)
                    window.location.reload(false)
                }
            }
        } catch (error) {
            alert(error)
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
                alert(data.data.message)
                getitem()
            }
        } catch (error) {
            alert(error)
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
                        justifyContent: 'row',
                        mb: 3,
                    }}
                >
                    <TextField
                        size="medium"
                        variant="outlined"
                        type="text"
                        label="Bag ID"
                        onChange={(e) => setBagId(e.target.value)}
                    />
                    <Button
                        sx={{ ml: 2, mb: 1, mt: 1 }}
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={bagId == ''}
                        onClick={handelCheckBagId}
                    >
                        GO
                    </Button>
                    {bagSuccess ? (
                        <>
                            <Box sx={{ ml: 2 }}>
                                <TextField
                                    id="outlined-password-input"
                                    type="text"
                                    name="doorsteps_diagnostics"
                                    label="Please Enter AWB Number"
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
                        </>
                    ) : (
                        ''
                    )}
                </Box>

                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.NO</TableCell>
                            <TableCell>AWBN Number</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Status</TableCell>
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
