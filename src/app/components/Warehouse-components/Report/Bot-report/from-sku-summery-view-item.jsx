import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosWarehouseIn } from '../../../../../axios'
import { Button } from '@mui/material'

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
                        alert(res.data.message)
                        navigate('/bot-tray-report')
                    }
                }
            } catch (error) {
                alert(error)
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
            label: 'Record No',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'uic',
            label: 'UIC',
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: 'MUIC',
            options: {
                filter: true,
                customBodyRender: () => {
                    return botTray[0]?.muic
                },
            },
        },
        {
            name: 'Brand',
            label: 'Brand',
            options: {
                filter: true,
                customBodyRender: () => {
                    return botTray[0]?.brand
                },
            },
        },
        {
            name: 'Model',
            label: 'Model',
            options: {
                filter: true,
                customBodyRender: () => {
                    return botTray[0]?.model
                },
            },
        },

        {
            name: 'awbn_number',
            label: 'Tracking Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'order_id',
            label: 'Order Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'order_date',
            label: 'Order Date',
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString(
                        'en-GB',
                        {
                            hour12: true,
                        }
                    ),
            },
        },
        {
            name: 'bag_id',
            label: 'BOT ID',
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
