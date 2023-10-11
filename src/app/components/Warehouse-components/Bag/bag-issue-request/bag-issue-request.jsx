import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from '../../../../../axios'
import jwt_decode from 'jwt-decode'
import { Button, Typography,Table } from '@mui/material'
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
    const [isAlive, setIsAlive] = useState(true)
    const [userList, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            const fetchData = async () => {
                try {
                    setIsLoading(true)
                    let { location } = jwt_decode(admin)
                    let res = await axiosWarehouseIn.post(
                        '/getRequests/' + location
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setRequests(res.data.data)
                    }
                } catch (error) {
                    setIsLoading(false)
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
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const handelDetailPage = (e, bagId) => {
        navigate('/wareshouse/bag/bag-issue-request/approve/' + bagId)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 1 }}>
                    Record No
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
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
            label: <Typography sx={{ fontWeight: 'bold' }}>Bag ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'issued_user_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }} >
                   BOT Agent Name
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
            name: 'limit',
            label: <Typography sx={{ fontWeight: 'bold' }}>Max</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: <Typography sx={{ fontWeight: 'bold' }}>Valid</Typography>,
            options: {
                filter: true,

                customBodyRender: (value, dataIndex) =>
                    value.filter(function (item) {
                        return item.status == 'Valid'
                    }).length,
            },
        },
        {
            name: 'items',
            label: <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.length,
            },
        },
        {
            name: 'track_tray',
            label: <Typography sx={{fontWeight:'bold'}}>Assigned Date</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value?.bag_assign_to_bot).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'code',
            label: <Typography sx={{ fontWeight: 'bold' }}>Action</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => {
                    return (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            disabled={value == 'In Progress'}
                            variant="contained"
                            onClick={(e) => {
                                handelDetailPage(e, value)
                            }}
                            style={{ backgroundColor: 'green' }}
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
                        { name: 'Bag', path: '/' },
                        { name: 'Bag-Issue-Request' },
                    ]}
                />
            </div>
            <Table className="custom-table" >

            <MUIDataTable
                title={'Requests'}
                data={userList}
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
                    selectableRows: 'none', // set checkbox for each row
                    // search: false, // set search option
                    // filter: false, // set data filter option
                    // download: false, // set download option
                    // print: false, // set print option
                    // pagination: true, //set pagination option
                    // viewColumns: false, // set column option
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
            </Table>
        </Container>
    )
}

export default SimpleMuiTable
