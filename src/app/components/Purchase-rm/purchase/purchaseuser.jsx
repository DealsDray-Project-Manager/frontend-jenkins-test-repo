import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from 'axios'
import jwt_decode from 'jwt-decode'
import { Button, Typography, Card, Box, TextField } from '@mui/material'
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

const SimpleMuiTable = () => {
    const [RDLRequest, setRDLRequest] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // useEffect(() => {
    //     try {
    //         const fetchData = async () => {
    //             let admin = localStorage.getItem('prexo-authentication')
    //             if (admin) {
    //                 setIsLoading(true)
    //                 let { location } = jwt_decode(admin)
    //                 let res = await axiosWarehouseIn.post(
    //                     '/request-for-RDL-fls/' + 'Send for RDL-2/' + location
    //                 )
    //                 if (res.status == 200) {
    //                     setIsLoading(false)
    //                     setRDLRequest(res.data.data)
    //                 }
    //             } else {
    //                 navigate('/')
    //             }
    //         }
    //         fetchData()
    //     } catch (error) {
    //         setIsLoading(false)
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             confirmButtonText: 'Ok',
    //             text: error,
    //         })
    //     }
    // }, [])

    const handleplace = () => {
        navigate('/purchase-user/purchase/order')
    }

    const columns = [
        {
            name: 'index',
            label: <Typography sx={{fontWeight:'bold', ml:2}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'id',
            label: <Typography sx={{fontWeight:'bold'}}>Request ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'date',
            label: <Typography sx={{fontWeight:'bold'}}>Request Date</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sp_no',
            label: <Typography sx={{fontWeight:'bold'}}>Spare Part Number</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sp_name',
            label: <Typography sx={{fontWeight:'bold'}}>Spare Part Name</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sp_mis_name',
            label: <Typography sx={{fontWeight:'bold'}}>SP MIS name</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: <Typography sx={{fontWeight:'bold'}}>MUIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'qty',
            label: <Typography sx={{fontWeight:'bold'}}>Required Quantity</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'status',
            label: <Typography sx={{fontWeight:'bold'}}>Status</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Action</></Typography>,
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

    const columns1 = [
        {
            index:1,
            id:'1223,1224',
            date:'12/06/2023',
            sp_no:'SPN000736',
            sp_name:'Camera Glass/Red-XIOMI MI A2',
            sp_mis_name:'abc',
            muic:'KG888',
            qty:2,
            status:'Pending'
        },
        {
            index:2,
            id:'1200',
            date:'12/06/2023',
            sp_no:'SPN000735',
            sp_name:'Camera Glass/Black-XIOMI MI A2',
            sp_mis_name:'abc',
            muic:'KG888',
            qty:2,
            status:'Pending'
        }
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Requests', path: '/' },
                        // { name: 'RDL-2-Requests' },
                    ]}
                />
            </div>
            <Card>
            <MUIDataTable
                title={'Procurement Requests'}
                data={columns1}
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
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
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
