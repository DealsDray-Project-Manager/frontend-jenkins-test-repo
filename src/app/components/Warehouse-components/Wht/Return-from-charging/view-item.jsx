import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosBot } from '../../../../../axios'
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
    const [trayData, setTrayData] = useState([])
    const { trayId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let token = localStorage.getItem('prexo-authentication')
                if (token) {
                    let res = await axiosBot.post('/trayItem/' + trayId)
                    if (res.status === 200) {
                        setIsLoading(false)
                        setTrayData(res.data.data)
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
    }, [])

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
            name: 'uic',
            label: 'UIC',
            options: {
                filter: true,
            },
        },
        {
            name: 'imei',
            label: 'IMEI',
            options: {
                filter: true,
            },
        },
        {
            name: 'Brand',
            label: 'Brand',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return trayData.brand
                },
            },
        },
        {
            name: 'model',
            label: 'Model',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return trayData.model
                },
            },
        },
        {
            name: 'charging',
            label: 'Battery Status',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.battery_status
                },
            },
        },
        {
            name: 'charging',
            label: 'Charge Percentage',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.charge_percentage
                },
            },
        },
        {
            name: 'charging',
            label: 'Body Condiation',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.body_condition
                },
            },
        },
        {
            name: 'charging',
            label: 'Display Condiation',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.display_condition
                },
            },
        },
        {
            name: 'charging',
            label: 'Lock Status',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.lock_status
                },
            },
        },
        {
            name: 'charging',
            label: 'Charging Jack Type',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.charging_jack_type
                },
            },
        },
        {
            name: 'charging',
            label: 'Body Part missing',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.part_name
                },
            },
        },
        {
            name: 'charging',
            label: 'CIMEI-1',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.cimei_1
                },
            },
        },
        {
            name: 'charging',
            label: 'CIMEI-2',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.cimei_2
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
                        { name: 'Return-from-charging' },
                    ]}
                />
            </div>
            <MUIDataTable
                title={'Tray'}
                data={trayData.actual_items}
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
