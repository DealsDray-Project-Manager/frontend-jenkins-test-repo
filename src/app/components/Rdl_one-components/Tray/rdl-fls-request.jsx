import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Button, Typography } from '@mui/material'
import { axiosRDL_oneAgent } from '../../../../axios'
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
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { user_name } = jwt_decode(admin)
                    let res = await axiosRDL_oneAgent.post(
                        '/assigned-tray/' + user_name
                    )
                    if (res.status == 200) {
                        setRDLRequest(res.data.data)
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
        navigate('/rdl-fls/tray/approve/' + trayId)
    }

    const columns = [
        {
            name: 'index',
            label: <Typography variant="subtitle1"fontWeight='bold' sx={{ml:3}}><>Record No</></Typography>,
            options: {
                filter: false,
                sort: false,
                setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'code',
            label: <Typography variant="subtitle1"fontWeight='bold' ><>Tray ID</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'requested_date',
            label: <Typography variant="subtitle1"fontWeight='bold'><>Assigned Date</></Typography>,
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'warehouse',
            label: <Typography variant="subtitle1"fontWeight='bold' ><>Warehouse</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: <Typography variant="subtitle1"fontWeight='bold' ><>Brand</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography variant="subtitle1"fontWeight='bold' ><>Model</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: <Typography variant="subtitle1"fontWeight='bold' ><>Limit</></Typography>,
            options: {
                filter: false,
                sort: false,
                display: false,
            },
        },

        {
            name: 'items',
            label: <Typography variant="subtitle1"fontWeight='bold' ><>Quantity</></Typography>,
            options: {
                filter: true,
                customBodyRender: (items, tableMeta) =>
                    items?.length + '/' + tableMeta.rowData[6],
            },
        },
        {
            name: 'code',
            label: <Typography variant="subtitle1"fontWeight='bold' ><>Action</></Typography>,
            options: {
                filter: false,
                sort: false,
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
                        { name: 'RDL-Requests', path: '/' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Requests'}
                data={RDLRequest}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                    download: false,
                    print: false,
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
        </Container>
    )
}

export default SimpleMuiTable
