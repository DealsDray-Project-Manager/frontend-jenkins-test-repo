import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosWarehouseIn } from '../../../../../axios'
import { Button, Typography, Table } from '@mui/material'
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
    const [tray, setTray] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    setIsLoading(true)
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/stxTray/' + 'all' + '/' + location
                    )
                    if (response.status === 200) {
                        setIsLoading(false)
                        setTray(response.data.data)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    const handelViewItem = (id) => {
        navigate('/warehouse/stx/view-units/' + id)
    }
    // CHANGE RACK
    const handelChangeRack = async (id) => {
        navigate('/warehouse/tray/rack-change/' + id)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    fontWeight="bold"
                    variant="subtitle1"
                    marginLeft="7px"
                >
                    Record No
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'code',
            label: (
                <Typography fontWeight="bold" variant="subtitle1">
                    Tray ID
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: (
                <Typography fontWeight="bold" variant="subtitle1">
                    Tray Name
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'tray_grade',
            label: (
                <Typography fontWeight="bold" variant="subtitle1">
                    Tray Grade
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'rackDetails',
            label: (
                <Typography fontWeight="bold" variant="subtitle1">
                    Rack Display
                </Typography>
            ),

            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.[0]?.display,
            },
        },
        {
            name: 'rack_id',
            label: (
                <Typography
                    fontWeight="bold"
                    variant="subtitle1"
                    sx={{ mr: 1 }}
                >
                    Rack ID
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'actual_items',
            label: 'acutual_items',
            options: {
                filter: true,
                display: false,
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
            name: 'items_length',
            label: (
                <Typography fontWeight="bold" variant="subtitle1">
                    Quantity
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        (value == 0 ? tableMeta.rowData[6] : value) +
                        '/' +
                        tableMeta.rowData[7]
                    )
                },
            },
        },

        {
            name: 'issued_user_name',
            label: (
                <Typography fontWeight="bold" variant="subtitle1">
                    User Name
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'brand',
            label: (
                <Typography fontWeight="bold" variant="subtitle1">
                    Brand
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: (
                <Typography fontWeight="bold" variant="subtitle1">
                    Model
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'sort_id',
            label: (
                <Typography fontWeight="bold" variant="subtitle1">
                    Status
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'code',
            label: (
                <Typography fontWeight="bold" variant="subtitle1">
                    Action
                </Typography>
            ),
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
                                onClick={() => handelViewItem(value)}
                                style={{ backgroundColor: 'green' }}
                                component="span"
                            >
                                View
                            </Button>
                            {/* <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                onClick={() => handelChangeRack(value)}
                                component="span"
                            >
                                Change Rack
                            </Button> */}
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
                        { name: 'STX', path: '/' },
                        { name: 'STX-Tray' },
                    ]}
                />
            </div>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Tray'}
                    data={tray}
                    columns={columns}
                    options={{
                        filterType: 'textField',
                        responsive: 'simple',
                        download: false,
                        print: false,
                        showFirstButton: 'true',
                        showLastButton: 'true',
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
                                    (a.data[colIndex] < b.data[colIndex]
                                        ? -1
                                        : 1) * (order === 'desc' ? 1 : -1)
                                )
                            })
                        },
                        elevation: 0,
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                    }}
                />
            </Table>
        </Container>
    )
}

export default SimpleMuiTable
