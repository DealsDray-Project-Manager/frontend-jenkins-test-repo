import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from '../../../../../axios'
import jwt_decode from 'jwt-decode'
import { Button, Typography, Table } from '@mui/material'
import Swal from 'sweetalert2'
import '../../../../../app.css'

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
    const [tray, setTray] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    setIsLoading(true)
                    let { location } = jwt_decode(admin)
                    let res = await axiosWarehouseIn.post(
                        '/ctxTray/' +
                            'Transfer Request sent to Warehouse/' +
                            location
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setTray(res.data.data)
                    }
                } else {
                    navigate('/')
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

    const handelDetailPage = (e, trayId) => {
        e.preventDefault()
        navigate('/wareshouse/tray-transfer/request/approve/' + trayId)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'code',
            label: <Typography sx={{ fontWeight: 'bold' }}>Tray ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'rack_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Rack ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'rackData', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Display</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
                customBodyRender: (value) => value?.[0]?.display,
            },
        },
        {
            name: 'recommend_location',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Sales Location
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: <Typography sx={{ fontWeight: 'bold' }}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography sx={{ fontWeight: 'bold' }}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'limit',
            options: {
                filter: false,
                sort: false,
                display: false,
            },
        },

        {
            name: 'items',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value.length + '/' + tableMeta.rowData[8],
            },
        },
        {
            name: 'code',
            label: <Typography sx={{ fontWeight: 'bold' }}>Action</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={(e) => handelDetailPage(e, value)}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Approve
                        </Button>
                    )
                },
            },
        },
    ]
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Tray Transfer', path: '/' },
                        { name: 'Transfer-Requests' },
                    ]}
                />
            </div>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Requests'}
                    data={tray}
                    columns={columns}
                    options={{
                        filterType: 'textField',
                        responsive: 'simple',
                        download: false,
                        print: false,
                        textLabels: {
                            body: {
                                noMatch: isLoading
                                    ? 'Loading...'
                                    : 'Sorry, there is no matching data to display',
                            },
                        },
                        selectableRows: 'none', // set checkbox for each row
                        // search: false, // set search option
                        // filter: false, // set data filter option
                        // download: false, // set download option
                        // print: false, // set print option
                        // pagination: true, //set pagination option
                        // viewColumns: false, // set column option
                        customSort: (data, colIndex, order) => {
                            return data.sort((a, b) => {
                                if (colIndex === 1) {
                                    return (
                                        (a.data[colIndex].price <
                                        b.data[colIndex].price
                                            ? -1
                                            : 1) * (order === 'desc' ? 1 : -1)
                                    )
                                }
                                return (
                                    (a.data[colIndex] < b.data[colIndex]
                                        ? -1
                                        : 1) * (order === 'desc' ? 1 : -1)
                                )
                            })
                        },
                        elevation: 0,
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                    }}
                />
            </Table>
        </Container>
    )
}

export default SimpleMuiTable
