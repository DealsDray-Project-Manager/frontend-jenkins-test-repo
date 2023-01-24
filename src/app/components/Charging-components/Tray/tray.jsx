import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Button } from '@mui/material'
import { axiosCharging } from '../../../../axios'

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
    const [tray, setTray] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        try {
            let token = localStorage.getItem('prexo-authentication')
            if (token) {
                const { user_name } = jwt_decode(token)
                const fetchData = async () => {
                    let res = await axiosCharging.post(
                        '/assigned-tray/' + user_name
                    )
                    if (res.status == 200) {
                        setTray(res.data.data)
                    }
                }
                fetchData()
            } else {
                navigate('/')
            }
        } catch (error) {
            alert(error)
        }
    }, [])

    const handelViewTray = (e, id) => {
        e.preventDefault()
        navigate('/charging/tray/charging-in/' + id)
    }
    const handelChargingDone = (e, id) => {
        e.preventDefault()
        navigate('/charging/tray/charging-out/' + id)
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
                    value.length + '/' + tableMeta.rowData[4],
            },
        },
        {
            name: 'sort_id',
            label: 'status',
            options: {
                filter: true,
            },
        },
        {
            name: 'assigned_date',
            label: 'Assigned Date',
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
                filter: false,
                sort:false,
                customBodyRender: (value, tableMeta) => {
                    return tableMeta.rowData[6] == 'Issued to Charging' ||
                        tableMeta.rowData[6] == 'Issued to Recharging' ? (
                        <Button
                            sx={{ m: 1 }}
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#206CE2' }}
                            onClick={(e) => {
                                handelViewTray(e, value)
                            }}
                        >
                            Charging IN
                        </Button>
                    ) : (
                        <Button
                            sx={{ m: 1 }}
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: 'green' }}
                            onClick={(e) => {
                                handelChargingDone(e, value)
                            }}
                        >
                            Charging Done
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
                        { name: 'Charging-Request', path: '/' },
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
