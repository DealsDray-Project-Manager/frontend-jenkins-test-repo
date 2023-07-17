import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from 'axios'
import jwt_decode from 'jwt-decode'
import { Button, Typography, Card, Box, TextField } from '@mui/material'
import Swal from 'sweetalert2'
import { axiosPurchaseAgent, axiosSpMisAgent } from '../../../../axios'

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
    const [RDLRequest, setRDLRequest] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const fetchData = async () => {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    setIsLoading(true)
                    let { location } = jwt_decode(admin)
                    let res = await axiosPurchaseAgent.post('/procurment/view')
                    if (res.status == 200) {
                        setIsLoading(false)
                        setRDLRequest(res.data.data)
                    }
                } else {
                    navigate('/')
                }
            }
            fetchData()
        } catch (error) {
            setIsLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }, [])

    const handleplace = () => {
        navigate('/purchase-user/purchase/order')
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
            name: 'request_id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Request ID</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return value?.join(',')
                },
            },
        },
        {
            name: 'request_date',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Request Date
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'spare_part_number',
            label: (
                <Typography sx={{ fontWeight: 'bold' }} noWrap>
                    Spare Part Number
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'spare_part_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }} noWrap>
                    Spare Part Name
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: <Typography sx={{ fontWeight: 'bold' }}>MUIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'requred_qty',
            label: (
                <Typography sx={{ fontWeight: 'bold' }} noWrap>
                    Required Quantity
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'status',
            label: <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Action</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Button
                            sx={{
                                m: 0,
                            }}
                            variant="contained"
                            onClick={() => handleplace()}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Place order
                        </Button>
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Requests', path: '/' }]} />
            </div>
            <Card>
                <MUIDataTable
                    title={'Procurement Requests'}
                    data={RDLRequest}
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
                <br />
            </Card>
        </Container>
    )
}

export default SimpleMuiTable
