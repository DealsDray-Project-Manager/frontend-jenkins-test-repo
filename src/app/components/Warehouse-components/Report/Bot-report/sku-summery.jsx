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
    const { trayId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const fetchData = async () => {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let obj = {
                        location: location,
                        botTray: trayId,
                    }
                    let res = await axiosWarehouseIn.post(
                        '/bot-tray-report',
                        obj
                    )
                    if (res.status === 200) {
                        setBotTray(res.data.data.temp_array)
                    }
                }
            }
            fetchData()
        } catch (error) {
            alert(error)
        }
    }, [])

    const handelViewTray = (e, muic) => {
        e.preventDefault()
        navigate(
            '/wareshouse/report/bot/sku-summery/details/' + trayId + '/' + muic
        )
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
            name: 'muic',
            label: 'MUIC',
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: 'Brand Name',
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: 'Model Name',
            options: {
                filter: true,
            },
        },

        {
            name: 'item',
            label: 'Units',
            options: {
                filter: true,
                customBodyRender: (value) => value?.length,
            },
        },
        {
            name: 'wht_tray',
            label: 'Open WHT',
            options: {
                filter: true,
                customBodyRender: (value) => value?.join(', '),
            },
        },
        {
            name: 'muic',
            label: 'Action',
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
                            style={{ backgroundColor: 'green' }}
                            onClick={(e) => {
                                handelViewTray(e, value)
                            }}
                        >
                            Details
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
                        { name: 'Report', path: '/' },
                        { name: 'Bot-Report' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Report'}
                data={botTray}
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
