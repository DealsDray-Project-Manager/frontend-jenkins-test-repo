import React, { useEffect, useState, useMemo } from 'react'
import { Box, Button, TextField, Card, Typography } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { axiosRdlTwoAgent } from '../../../../axios'
import jwt_decode from 'jwt-decode'

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
    const navigate = useNavigate()
    const [trayData, setTrayData] = useState({})
    const [summery, setSummery] = useState({})
    const { trayId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem('prexo-authentication')
                if (token) {
                    const { user_name } = jwt_decode(token)
                    const res = await axiosRdlTwoAgent.post(
                        '/traySummery/' + trayId + '/' + user_name
                    )
                    if (res.status == 200) {
                        setTrayData(res.data.data)
                        setSummery(res.data.summery)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            confirmButtonText: 'Ok',
                            text: res.data.message,
                        })
                        navigate(-1)
                    }
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    const UnitsData = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
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
            name: 'uic',
            label: <Typography sx={{ fontWeight: 'bold' }}>UIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: <Typography sx={{ fontWeight: 'bold' }}>MUIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand_name',
            label: <Typography sx={{ fontWeight: 'bold' }}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model_name',
            label: <Typography sx={{ fontWeight: 'bold' }}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'rdl_repair_report',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Repair Status
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.status,
            },
        },
        {
            name: 'rdl_repair_report',
            label: <Typography sx={{ fontWeight: 'bold' }}>Reason</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.reason,
            },
        },
        {
            name: '',
            label: <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>,
            options: {
                filter: true,
            },
        },
    ]

    const more_part_required = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
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
            name: 'uic',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>UIC</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'muic',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>UIC</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'rdl_repair_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Part Details</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true, // enable sorting for Brand colum
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const partRequired = value?.more_part_required

                    if (partRequired && partRequired.length > 0) {
                        const partsList = partRequired.map((data, index) => {
                            return `${index + 1}.${data?.part_name} - ${
                                data?.part_id
                            }`
                        })

                        return partsList.join(', ')
                    }

                    return ''
                },
            },
        },
    ]
    const part_faulty = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
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
            name: 'uic',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>UIC</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'muic',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>UIC</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'rdl_repair_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Part Details</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true, // enable sorting for Brand colum
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const partRequired = value?.part_faulty

                    if (partRequired && partRequired.length > 0) {
                        const partsList = partRequired.map((data, index) => {
                            return `${index + 1}.${data?.part_name} - ${
                                data?.part_id
                            }`
                        })

                        return partsList.join(', ')
                    }

                    return ''
                },
            },
        },
    ]
    const not_reapairable = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
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
            name: 'uic',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>UIC</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'muic',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>UIC</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'rdl_repair_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Part Details</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true, // enable sorting for Brand colum
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const partRequired = value?.not_reapairable

                    if (partRequired && partRequired.length > 0) {
                        const partsList = partRequired.map((data, index) => {
                            return `${index + 1}.${data?.part_name} - ${
                                data?.part_id
                            }`
                        })

                        return partsList.join(', ')
                    }

                    return ''
                },
            },
        },
    ]
    const part_not_available = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
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
            name: 'uic',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>UIC</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'muic',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>UIC</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'rdl_repair_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Part Details</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true, // enable sorting for Brand colum
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const partRequired = value?.part_not_available

                    if (partRequired && partRequired.length > 0) {
                        const partsList = partRequired.map((data, index) => {
                            return `${index + 1}.${data?.part_name} - ${
                                data?.part_id
                            }`
                        })

                        return partsList.join(', ')
                    }

                    return ''
                },
            },
        },
    ]
    const used_parts = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
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
            name: 'uic',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>UIC</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'muic',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>UIC</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'rdl_repair_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Part Details</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true, // enable sorting for Brand colum
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const partRequired = value?.used_parts

                    if (partRequired && partRequired.length > 0) {
                        const partsList = partRequired.map((data, index) => {
                            return `${index + 1}.${data?.part_name} - ${
                                data?.part_id
                            }`
                        })

                        return partsList.join(', ')
                    }

                    return ''
                },
            },
        },
    ]

    const handleclose = () => {
        Swal.fire({
            title: 'Sent Successfully',
            icon: 'success',
        })
    }
    /************************************************************************** */
    // const tableExpected = useMemo(() => {
    return (
        <>
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Requests', path: '/' },
                            { name: 'Order' },
                        ]}
                    />
                </div>
                <>
                    <Box sx={{ mb: 1, ml: 1 }}>
                        <Typography
                            sx={{ fontSize: 'large', fontWeight: 'bold' }}
                        >
                            Tray Summary
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', mb: 2, p: 2 }}>
                        <Typography sx={{}}>
                            RP Tray : {trayData?.code}
                        </Typography>
                        <Typography sx={{ ml: 5 }}>
                            SP Tray : {trayData?.rp_tray}
                        </Typography>
                        <Typography sx={{ ml: 5 }}>
                            BRAND : {trayData?.brand}
                        </Typography>
                        <Typography sx={{ ml: 5 }}>
                            MODEL : {trayData?.model}
                        </Typography>
                    </Box>
                    <Card sx={{ width: '100%', height: '50%' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box sx={{ ml: 3, mt: 2 }}>
                                <Typography
                                    sx={{
                                        fontSize: 'large',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Items
                                </Typography>
                            </Box>
                            <Box sx={{ mr: 3 }}>
                                <h5>Total</h5>
                                <p
                                    style={{
                                        marginLeft: '5px',
                                        fontSize: '22px',
                                    }}
                                >
                                    {trayData?.actual_items?.length}
                                </p>
                            </Box>
                        </Box>

                        <MUIDataTable
                            // title={'Spare Parts Used'}
                            data={trayData?.actual_items}
                            columns={UnitsData}
                            options={{
                                filterType: 'textField',
                                responsive: 'simple',
                                download: false,
                                print: false,
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
                                                    : 1) *
                                                (order === 'desc' ? 1 : -1)
                                            )
                                        }
                                        return (
                                            (a.data[colIndex] < b.data[colIndex]
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    })
                                },
                                elevation: 0,
                                rowsPerPageOptions: [10, 20, 40, 80, 100],
                            }}
                        />
                    </Card>
                    <br />
                    <br />
                    <Card>
                        <MUIDataTable
                            title={'Used Spare Parts'}
                            data={summery?.usedParts}
                            columns={used_parts}
                            options={{
                                filterType: 'textField',
                                responsive: 'simple',
                                download: false,
                                print: false,
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
                                                    : 1) *
                                                (order === 'desc' ? 1 : -1)
                                            )
                                        }
                                        return (
                                            (a.data[colIndex] < b.data[colIndex]
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    })
                                },
                                elevation: 0,
                                rowsPerPageOptions: [10, 20, 40, 80, 100],
                            }}
                        />
                    </Card>
                    <br />
                    <br />
                    <Card>
                        <MUIDataTable
                            title={'Faulty Spare Parts'}
                            data={summery?.partFaulty}
                            columns={part_faulty}
                            options={{
                                filterType: 'textField',
                                responsive: 'simple',
                                download: false,
                                print: false,
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
                                                    : 1) *
                                                (order === 'desc' ? 1 : -1)
                                            )
                                        }
                                        return (
                                            (a.data[colIndex] < b.data[colIndex]
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    })
                                },
                                elevation: 0,
                                rowsPerPageOptions: [10, 20, 40, 80, 100],
                            }}
                        />
                    </Card>
                    <br />
                    <br />
                    <Card>
                        <MUIDataTable
                            title={
                                'Spare part which was allocated with the device but not found in the Spare Tray'
                            }
                            data={summery?.partNotAvailable}
                            columns={part_not_available}
                            options={{
                                filterType: 'textField',
                                responsive: 'simple',
                                download: false,
                                print: false,
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
                                                    : 1) *
                                                (order === 'desc' ? 1 : -1)
                                            )
                                        }
                                        return (
                                            (a.data[colIndex] < b.data[colIndex]
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    })
                                },
                                elevation: 0,
                                rowsPerPageOptions: [10, 20, 40, 80, 100],
                            }}
                        />
                    </Card>
                    <br />
                    <br />
                    <Card>
                        <MUIDataTable
                            title={'More Spare Parts Required List'}
                            data={summery?.morePartRequred}
                            columns={more_part_required}
                            options={{
                                filterType: 'textField',
                                responsive: 'simple',
                                download: false,
                                print: false,
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
                                                    : 1) *
                                                (order === 'desc' ? 1 : -1)
                                            )
                                        }
                                        return (
                                            (a.data[colIndex] < b.data[colIndex]
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    })
                                },
                                elevation: 0,
                                rowsPerPageOptions: [10, 20, 40, 80, 100],
                            }}
                        />
                    </Card>
                    <br />
                    <Card>
                        <MUIDataTable
                            title={'Devices not repairable'}
                            data={summery?.notReapairable}
                            columns={part_not_available}
                            options={{
                                filterType: 'textField',
                                responsive: 'simple',
                                download: false,
                                print: false,
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
                                                    : 1) *
                                                (order === 'desc' ? 1 : -1)
                                            )
                                        }
                                        return (
                                            (a.data[colIndex] < b.data[colIndex]
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    })
                                },
                                elevation: 0,
                                rowsPerPageOptions: [10, 20, 40, 80, 100],
                            }}
                        />
                    </Card>

                    <Box sx={{ textAlign: 'right', p: 2 }}>
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            disabled
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Close & Send
                        </Button>
                    </Box>
                </>
            </Container>
        </>
    )
}

export default SimpleMuiTable
