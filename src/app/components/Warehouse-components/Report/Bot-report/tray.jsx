import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
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

    useEffect(() => {
        try {
            const fetchData = async () => {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let res = await axiosWarehouseIn.post(
                        '/getBotTrayReportScreen/' + location
                    )
                    if (res.status === 200) {
                        setBotTray(res.data.data)
                    }
                }
            }
            fetchData()
        } catch (error) {
            alert(error)
        }
    }, [])

    const handelViewTray = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/tray/item/' + id)
    }
    const handelSkuSummery = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/report/bot/sku-summery/' + id)
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
            name: 'code',
            label: 'Tray Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'max',
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
                    value?.length + '/' + tableMeta.rowData[2],
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
            name: 'sort_id',
            label: 'Status',
            options: {
                filter: true,
            },
        },
        {
            name: 'temp_array',
            label: 'SKU Count',
            options: {
                filter: true,
                customBodyRender: (value) => value?.length,
            },
        },
        {
            name: 'actual_items',
            label: 'SKU Summery',
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value.map((reptile, index) => (
                        <p>
                            {index + 1}-{reptile}
                        </p>
                    ))
                },
            },
        },
        {
            name: 'code',
            label: 'SKU Count',
            options: {
                filter: true,
                customBodyRender: (value) => {
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
                                View Item
                            </Button>
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                style={{ backgroundColor: 'green' }}
                                onClick={(e) => {
                                    handelSkuSummery(e, value)
                                }}
                            >
                                View Sku
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
                        { name: 'Report', path: '/pages' },
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
