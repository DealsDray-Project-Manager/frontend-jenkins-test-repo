import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Button, Typography } from '@mui/material'
import { axiosWarehouseIn } from '../../../../../axios'
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
    const [isAlive, setIsAlive] = useState(true)
    const [botTray, setBotTray] = useState([])
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    setIsLoading(true)
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/tray-for-release/' +
                            location +
                            '/' +
                            'Closed By Sorting Agent' +
                            '/' +
                            'BOT'
                    )
                    if (response.status === 200) {
                        setIsLoading(false)
                        setBotTray(response.data.data)
                    }
                } else {
                    navigate('/')
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
    }, [isAlive])

    const handelRelease = async (e, trayId) => {
        try {
            setLoading(true)
            let res = await axiosWarehouseIn.post(
                '/approve-release-bot-tray/' + trayId
            )
            if (res.status === 200) {
                setLoading(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setIsAlive((isAlive) => !isAlive)
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

    const handelViewTray = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/bot/release/view-item/' + id)
    }

    const columns = [
        {
            name: 'index',
            label: <Typography sx={{fontWeight:'bold', ml:1}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'issued_user_name',
            label: <Typography sx={{fontWeight:'bold'}}>Sorting Agent</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: <Typography sx={{fontWeight:'bold'}}>Tray ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'type_taxanomy',
            label: <Typography sx={{fontWeight:'bold'}}>Tray Category</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: <Typography sx={{fontWeight:'bold'}}>Max</Typography>,
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'items',
            label: <Typography sx={{fontWeight:'bold'}}>Quantity</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.length + '/' + tableMeta.rowData[4],
            },
        },
        {
            name: 'sort_id',
            label: <Typography sx={{fontWeight:'bold'}}>Status</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: <Typography sx={{fontWeight:'bold'}}>Actions</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                style={{ backgroundColor: '#206CE2' }}
                                onClick={(e) => {
                                    handelViewTray(e, value)
                                }}
                            >
                                View
                            </Button>
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                disabled={loading}
                                onClick={(e) => {
                                    if (
                                        window.confirm('You Want to Release?')
                                    ) {
                                        handelRelease(e, value)
                                    }
                                }}
                                style={{ backgroundColor: 'green' }}
                                component="span"
                            >
                                Release Tray
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
                        { name: 'BOT', path: '/' },
                        { name: 'Bot-To-Release' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Tray'}
                data={botTray}
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
        </Container>
    )
}

export default SimpleMuiTable
