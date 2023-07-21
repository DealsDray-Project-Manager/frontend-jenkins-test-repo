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
    const [summary, setSummary] = useState({})
    const { trayId } = useParams()
    const [buttonLoading, setButtonLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem('prexo-authentication')
                if (token) {
                    const { user_name } = jwt_decode(token)
                    let obj = {
                        trayId: trayId,
                        user_name: user_name,
                    }
                    const res = await axiosRdlTwoAgent.post('/traySummary', obj)
                    if (res.status == 200) {
                        setTrayData(res.data.data)
                        setSummary(res.data.summary)
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
            name: 'rdl_repair_report',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Description</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.description,
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
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>MUIC</Typography>
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

    const spTrayItems = [
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
            name: 'part_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Part Id</Typography>,
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'part_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Part Name</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'quantity',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'rdl_two_description',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Description</Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'rdl_two_status',
            label: <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>,
            options: {
                filter: false,
                sort: false,
            },
        },
    ]

    // HANDEL CLOSE TRAY
    const handelCloseTray = async (e) => {
        try {
            e.preventDefault()
            setButtonLoading(true)
            let obj = {
                rpTrayId: trayData?.code,
                sptrayId: trayData?.sp_tray,
            }
            const res = await axiosRdlTwoAgent.post('/closeSpAndRp', obj)
            if (res.status == 200) {
                setButtonLoading(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                navigate('/rdl-two/tray')
            } else {
                setButtonLoading(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            alert(error)
        }
    }

    /************************************************************************** */
    // const tableExpected = useMemo(() => {
    return (
        <>
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Action', path: '/' },
                            { name: 'Tray summary' },
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
                            SP Tray : {trayData?.sp_tray}
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
                            title={`Sp tray:- ${trayData?.sp_tray}`}
                            data={summary?.spTray?.actual_items}
                            columns={spTrayItems}
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
                            data={summary?.morePartRequred}
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

                    <Box sx={{ textAlign: 'right', p: 2 }}>
                        <Button
                            sx={{
                                m: 1,
                            }}
                            onClick={(e) => {
                                handelCloseTray(e)
                            }}
                            disabled={buttonLoading}
                            variant="contained"
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
