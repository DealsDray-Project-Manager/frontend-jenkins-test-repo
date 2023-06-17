import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from 'axios'
import jwt_decode from 'jwt-decode'
import { Button, Typography, Card, Box } from '@mui/material'
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

    const handelDetailPage = (e, trayId) => {
        e.preventDefault()
        navigate('')
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
            name: 'part_no',
            label: <Typography sx={{fontWeight:'bold'}}>Spare Part Number</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: <Typography sx={{fontWeight:'bold'}}>Spare Part Name</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: <Typography sx={{fontWeight:'bold'}}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography sx={{fontWeight:'bold'}}>Model</Typography>,
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
            name: 'avl_qty',
            label: <Typography sx={{fontWeight:'bold'}}>Available Quantity</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'req_qty',
            label: <Typography sx={{fontWeight:'bold'}}>Available Quantity</Typography>,
            options: {
                filter: true,
            },
        }
    ]

    const columns1 = [
        {
            index:1,
            part_no:'SPN000736',
            name:'Camera Glass/Black-XIOMI MI A2',
            brand:'Xiomi',
            model:'MI A2',
            muic:'KG888',
            avl_qty:1,
            req_qty:2
        },
        {
            index:2,
            part_no:'SPN000735',
            name:'Camera Glass/Black-XIOMI MI A2',
            brand:'Xiomi',
            model:'MI A2',
            muic:'KG888',
            avl_qty:0,
            req_qty:2
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'WHT', path: '/' },
                        { name: 'RDL-2-Requests' },
                    ]}
                />
            </div>
            <Card>
            <MUIDataTable
                title={'Requests'}
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
            <Box>
            <Button 
                sx={{
                    float:'right',
                    mr:2
                }}
                variant="contained"
                onClick={(e) => handelDetailPage(e)}
                style={{ backgroundColor: 'green' }}
                component="span"
            >
                Create Request                            
            </Button>
            </Box>
            <br />
            </Card>
        </Container>
    )
}

export default SimpleMuiTable
