import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    Button,
    TableCell,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Card,
    TablePagination,
    MenuItem,
    Box,
    TextField,
    Typography 
} from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from '../../../../axios'
import Swal from 'sweetalert2'

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

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '150%',
    height:'100%',
    whiteSpace: 'pre',
    '& thead': {
        '& th:first-of-type': {
            paddingLeft: 16,
        },
    },
    '& td': {
        borderBottom: '1px solid #ddd',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const SimpleMuiTable = () => {
    const [page, setPage] = React.useState(0)
    const [item, setItem] = useState([])
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [data, setData] = useState([])
    const [sortDate, setSortDate] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setData((_) =>
            item
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((d, index) => {
                    d.id = page * rowsPerPage + index + 1
                    return d
                })
        )
    }, [page, item, rowsPerPage])

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            const { location } = jwt_decode(admin)
            const fetchData = async () => {
                try {
                    let obj = {
                        location: location,
                        trayType: 'MMT',
                    }
                    let res = await axiosWarehouseIn.post(
                        '/mmt-pmt-report',
                        obj
                    )
                    if (res.status == 200) {
                        setItem(res.data.data)
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
        } else {
            navigate('/')
        }
    }, [])

    /****************************************DATE WISE SORT *************************************************** */
    const handelSort = async (e) => {
        e.preventDefault()
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                const { location } = jwt_decode(admin)
                let obj = {
                    date: sortDate,
                    location: location,
                    trayType: 'MMT',
                }
                let res = await axiosWarehouseIn.post(
                    '/sort-mmt-pmt-report',
                    obj
                )
                if (res.status == 200) {
                    setItem(res.data.data)
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const tableData = useMemo(() => {
        return (
            <ProductTable>
            <Table id="example">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Record No</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Tracking ID</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Order ID</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Order Date</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Delivery Date</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>UIC</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>IMEI</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Item ID</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>MUIC</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Brand</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Model</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Bag ID</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>BOT Agent Name</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Assigned Date</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Tray ID</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Tray Type</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Tray Closed Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((data, index) => (
                        <TableRow tabIndex={-1}>
                            <TableCell sx={{pl:4}}>{data.id}</TableCell>
                            <TableCell>{data.tracking_id}</TableCell>
                            <TableCell>{data.order_id}</TableCell>
                            <TableCell>
                                {data?.order[0]?.order_date != undefined
                                    ? new Date(
                                          data?.order[0]?.order_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery_date != undefined
                                    ? new Date(
                                          data?.delivery_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>{data.uic_code?.code}</TableCell>
                            <TableCell>{data.imei}</TableCell>
                            <TableCell>{data.item_id}</TableCell>
                            <TableCell>{data?.product[0]?.muic}</TableCell>
                            <TableCell>
                                {data?.product[0]?.brand_name}
                            </TableCell>
                            <TableCell>
                                {data?.product[0]?.model_name}
                            </TableCell>
                            <TableCell>{data.bag_id}</TableCell>
                            <TableCell>{data.agent_name}</TableCell>
                            <TableCell>
                                {data?.assign_to_agent != undefined
                                    ? new Date(
                                          data?.assign_to_agent
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>{data.tray_id}</TableCell>
                            <TableCell>{data.tray_type}</TableCell>
                            <TableCell>
                                {new Date(
                                    data?.warehouse_close_date
                                ).toLocaleString('en-GB', {
                                    hour12: true,
                                })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </ProductTable>
        )
    }, [item, data])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Report', path: '/' },
                        { name: 'MMT' },
                    ]}
                />
            </div>
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'start',
                    }}
                >
                    <TextField
                        id="filled-select-currency"
                        type="Date"
                        onChange={(e) => {
                            setSortDate(e.target.value)
                        }}
                        inputProps={{
                            max: moment().format('YYYY-MM-DD'),
                        }}
                        sx={{ mt: 1, mb: 1 }}
                        helperText="Please Select MMT closed Date"
                        variant="filled"
                    />
                    <Button
                        sx={{
                            mt: 20,
                            m: 2,
                            height: '38px',
                        }}
                        disabled={sortDate == '' ? true : false}
                        variant="contained"
                        style={{
                            backgroundColor: '#206CE2',
                            marginTop: '23px',
                        }}
                        onClick={(e) => {
                            handelSort(e)
                        }}
                    >
                        Sort
                    </Button>
                </Box>
            </Box>

            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                {tableData}
            </Card>
            <TablePagination
                sx={{ px: 2 }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={item.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={({ target: { value } }) =>
                    setRowsPerPage(value)
                }
            />
        </Container>
    )
}

export default SimpleMuiTable
