import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    Button,
    Box,
    IconButton,
    Icon,
    Typography,
    Table,
    TableContainer,
    Card,
} from '@mui/material'
import '../../../../../app.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { axiosSuperAdminPrexo } from '../../../../../axios'

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

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '200%',
    height: '100%',
    whiteSpace: 'pre',
    '& thead': {
        '& th:first-of-type': {
            paddingLeft: 16,
        },
    },
    '& td': {
        borderBottom: '1px solid #ddd',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [trayrackList, setTrayRackList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRacks = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post('/trayRacksReport')
                if (res.status === 200) {
                    setIsLoading(false)
                    setTrayRackList(res.data.data)
                }
            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchRacks()
        return () => {
            setIsAlive(false)
            setIsLoading(true)
        }
    }, [isAlive])

    // HANDEL VIEW
    const handelViewItem = (rackid) => {
        navigate('/sup-admin/report/rack/view-tray/' + rackid)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'rack_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Id</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Name</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'display',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Display</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'parent_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Location</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'warehouse',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Warehouse</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Limit</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'rack_count',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray Count</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'upcoming_tray_count',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Upcoming Tray Count</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'count_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>BOT</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.BOT || '',
            },
        },
        {
            name: 'count_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>MMT</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.MMT || '',
            },
        },
        {
            name: 'count_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>PMT</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.PMT || '',
            },
        },
        {
            name: 'count_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>WHT</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.WHT || '',
            },
        },
        {
            name: 'count_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>CT</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.CT || '',
            },
        },
        {
            name: 'count_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>ST</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.ST || '',
            },
        },
        {
            name: 'count_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RPT</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.RPT || '',
            },
        },
        {
            name: 'count_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>SPT</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.SPT || '',
            },
        },
        {
            name: 'count_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RPA</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.RPA || '',
            },
        },
        {
            name: 'count_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RPB</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.RPB || '',
            },
        },
        {
            name: 'lat_modified_username',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Last Modified User</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'last_modified_time',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Last Modified Timestamp</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    value !== undefined
                        ? new Date(value).toLocaleString('en-GB', {
                              hour12: true,
                          })
                        : null,
            },
        },
        {
            name: 'rack_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Action</Typography>,
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
                    routeSegments={[{ name: 'Racks Report', path: '/' }]}
                />
            </div>
            <Card sx={{ maxHeight: '100%', overflow: 'auto' }}>
                <ProductTable className="custom-table">
                    <MUIDataTable
                        title={'Reports'}
                        data={trayrackList}
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
                                const columnProperties = {
                                    9: 'BOT',
                                    10: 'MMT',
                                    11: 'PMT',
                                    12: 'WHT',
                                    13: 'CT',
                                    14: 'ST',
                                    15: 'RPT',
                                    16: 'SPT',
                                }

                                const property = columnProperties[colIndex]

                                if (property) {
                                    return data.sort((a, b) => {
                                        const aPropertyValue =
                                            getValueByProperty(
                                                a.data[colIndex],
                                                property
                                            )
                                        const bPropertyValue =
                                            getValueByProperty(
                                                b.data[colIndex],
                                                property
                                            )

                                        if (
                                            typeof aPropertyValue ===
                                                'string' &&
                                            typeof bPropertyValue === 'string'
                                        ) {
                                            return (
                                                (order === 'asc' ? 1 : -1) *
                                                aPropertyValue.localeCompare(
                                                    bPropertyValue
                                                )
                                            )
                                        }

                                        return (
                                            (parseFloat(aPropertyValue) -
                                                parseFloat(bPropertyValue)) *
                                            (order === 'desc' ? -1 : 1)
                                        )
                                    })
                                }

                                return data.sort((a, b) => {
                                    const aValue = a.data[colIndex]
                                    const bValue = b.data[colIndex]

                                    if (aValue === bValue) {
                                        return 0
                                    }

                                    if (
                                        aValue === null ||
                                        aValue === undefined
                                    ) {
                                        return 1
                                    }

                                    if (
                                        bValue === null ||
                                        bValue === undefined
                                    ) {
                                        return -1
                                    }

                                    if (
                                        typeof aValue === 'string' &&
                                        typeof bValue === 'string'
                                    ) {
                                        return (
                                            (order === 'asc' ? 1 : -1) *
                                            aValue.localeCompare(bValue)
                                        )
                                    }

                                    return (
                                        (parseFloat(aValue) -
                                            parseFloat(bValue)) *
                                        (order === 'desc' ? -1 : 1)
                                    )
                                })

                                function getValueByProperty(data, property) {
                                    const properties = property.split('.')
                                    let value = properties.reduce(
                                        (obj, key) => obj?.[key],
                                        data
                                    )

                                    return value !== undefined ? value : ''
                                }
                            },
                            elevation: 0,
                            rowsPerPageOptions: [10, 20, 40, 80, 100],
                        }}
                    />
                </ProductTable>
            </Card>
        </Container>
    )
}

export default SimpleMuiTable
