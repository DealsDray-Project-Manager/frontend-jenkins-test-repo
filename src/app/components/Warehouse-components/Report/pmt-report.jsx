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
} from '@mui/material'
import moment from "moment";
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from '../../../../axios'

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

const SimpleMuiTable = () => {
    const [page, setPage] = React.useState(0)
    const [item, setItem] = useState([])
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [data, setData] = useState([])
    const [sortDate, setSortDate] = useState("");
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
                        trayType: 'PMT',
                    }
                    let res = await axiosWarehouseIn.post(
                        '/mmt-pmt-report',
                        obj
                    )
                    if (res.status == 200) {
                        setItem(res.data.data)
                    }
                } catch (error) {
                    alert(error)
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
                    trayType: 'PMT',
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
            alert(error)
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

  

    const tableData = useMemo(() => {
        return (
            <Table id="example">
                <TableHead>
                    <TableRow>
                        <TableCell>Record.NO</TableCell>
                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Delivery Date</TableCell>
                        <TableCell>UIC</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>MUIC</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Bag ID</TableCell>
                        <TableCell>BOT Agent Name</TableCell>
                        <TableCell>Assigned Date</TableCell>
                        <TableCell>Tray ID</TableCell>
                        <TableCell>Tray Type</TableCell>
                        <TableCell>Tray Closed Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((data, index) => (
                        <TableRow tabIndex={-1}>
                            <TableCell>{data.id}</TableCell>
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
        )
    }, [item, data])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Report', path: '/pages' },
                        { name: 'PMT' },
                    ]}
                />
            </div>
            <Box
               
            >
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
