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

    const handlesend = () =>{
        Swal.fire({
            title: 'Sent Successfully',
            icon: 'success'
        })
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
            req_qty:<Box>
                        <TextField
                        sx={{
                            width:'70px',
                            height:'50px',
                            ml:3
                        }}
                        />
                    </Box>
        },
        {
            index:2,
            part_no:'SPN000735',
            name:'Camera Glass/Black-XIOMI MI A2',
            brand:'Xiomi',
            model:'MI A2',
            muic:'KG888',
            avl_qty:0,
            req_qty:<Box>
                        <TextField
                        sx={{
                            width:'70px',
                            height:'50px',
                            ml:3
                        }}
                        />
                    </Box>
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Items for Procurement', path: '/' },
                        { name: 'Procurement List', path: '/' },
                        { name: 'Requests' },
                    ]}
                />
            </div>
            <Card>
                <Box sx={{p:2}}>
                    <Typography sx={{fontSize:'large', fontWeight:'bold'}}>Pre Purchase Requests</Typography>
                    <br />
                    <Typography sx={{fontSize:'16px'}}>Brand : XIOMI</Typography>
                    <Typography sx={{fontSize:'16px'}}>Model : MI A2</Typography>
                </Box>
            <MUIDataTable
            sx={{mt:0}}
                // title={'Pre Purchase Requests'}
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
                    mr:2,
                    mb:2
                }}
                variant="contained"
                onClick={(e) => handlesend(e)}
                style={{ backgroundColor: 'green' }}
                component="span"
            >
                Send Request                            
            </Button>
            </Box>
           
            </Card>
        </Container>
    )
}

export default SimpleMuiTable
