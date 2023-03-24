import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Button } from '@mui/material'
import Swal from 'sweetalert2'

import { axiosWarehouseIn } from '../../../../../axios'

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
    const [tray, setTray] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/tray-for-release/' +
                            location +
                            '/' +
                            'Audit Done' +
                            '/' +
                            'WHT'
                    )
                    if (response.status === 200) {
                        setTray(response.data.data)
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
    }, [isAlive])

    const handelClose = async (e, id) => {
        e.preventDefault()
        try {
            let res = await axiosWarehouseIn.post('/wht-relase/' + id)
            if (res.status === 200) {
               
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setIsAlive((isAlive) => !isAlive)
            } else {
               
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
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

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'code',
            label: 'Tray Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'type_taxanomy',
            label: 'Tray Type',
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: 'Status',
            options: {
                filter: true,
            },
        },
        {
            name: 'issued_user_name',
            label: 'Agent Name',
            options: {
                filter: true,
            },
        },

        {
            name: 'brand',
            label: 'Brand',
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: 'Model',
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'limit',
            options: {
                filter: true,
                display: false,
            },
        },

        {
            name: 'items',
            label: 'Quantity',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    0 + '/' + tableMeta.rowData[7],
            },
        },
        {
            name: 'closed_time_bot',
            label: 'Audit Done Date',
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'code',
            label: 'Action',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                style={{ backgroundColor: 'green' }}
                                onClick={(e) => {
                                    handelClose(e, value)
                                }}
                            >
                                Release
                            </Button>
                        </>
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
                        { name: 'WHT', path: '/' },
                        { name: 'Return-from-Audit' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Tray'}
                data={tray}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                    download:false,
                    print:false,
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
        </Container>
    )
}

export default SimpleMuiTable
