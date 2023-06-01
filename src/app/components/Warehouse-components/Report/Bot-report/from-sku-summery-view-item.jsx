import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosWarehouseIn } from '../../../../../axios'
import { Button, Typography } from '@mui/material'
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
    const [botTray, setBotTray] = useState([])
    const navigate = useNavigate()
    const { trayId, muic } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let user = localStorage.getItem('prexo-authentication')
                if (user) {
                    let { location } = jwt_decode(user)
                    let res = await axiosWarehouseIn.post(
                        '/bot-tray-report-item-details/' +
                            location +
                            '/' +
                            trayId +
                            '/' +
                            muic
                    )
                    if (res.status === 200) {
                        setBotTray(res.data.data.temp_array)
                    } else {
                     
                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: res?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                        navigate('/bot-tray-report')
                    }
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

    const handelViewTray = (e, muic) => {
        e.preventDefault()
        navigate('/bot-tray-report-details/' + trayId + '/' + muic)
    }

    const columns = [
        {
            name: 'index',
            label: <Typography sx={{fontWeight:'bold', ml:2}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'uic',
            label: <Typography sx={{fontWeight:'bold'}}>UIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: <Typography sx={{fontWeight:'bold'}}>MUIC</Typography>,
            options: {
                filter: true,
                customBodyRender: () => {
                    return botTray[0]?.muic
                },
            },
        },
        {
            name: 'Brand',
            label: <Typography sx={{fontWeight:'bold'}}>Brand</Typography>,
            options: {
                filter: true,
                customBodyRender: () => {
                    return botTray[0]?.brand
                },
            },
        },
        {
            name: 'Model',
            label: <Typography sx={{fontWeight:'bold'}}>Model</Typography>,
            options: {
                filter: true,
                customBodyRender: () => {
                    return botTray[0]?.model
                },
            },
        },

        {
            name: 'awbn_number',
            label: <Typography sx={{fontWeight:'bold'}}>Tracking ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'order_id',
            label: <Typography sx={{fontWeight:'bold'}}>Order ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'order_date',
            label: <Typography sx={{fontWeight:'bold'}}>Order Date</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'bag_id',
            label: <Typography sx={{fontWeight:'bold'}}>BOT ID</Typography>,
            options: {
                filter: true,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Report', path: '/' },
                        { name: 'Bot-Report' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Report'}
                data={botTray?.[0]?.item}
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
