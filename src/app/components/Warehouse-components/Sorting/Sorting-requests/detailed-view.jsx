import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosWarehouseIn } from '../../../../../axios'
import { Button, Box } from '@mui/material'
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
    const [isAlive, setIsAlive] = useState(true)
    const [botTray, setBotTray] = useState([])
    const [loading, setLoading] = useState(false)
    const [userAgent, setUserAgent] = useState('')
    const { trayId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosWarehouseIn.post(
                    '/get-tray-sorting-requests/' + trayId
                )
                if (response.status === 200) {
                    setBotTray(response.data.data)
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
    useEffect(() => {
        const userStatusApiCall = async () => {
            try {
                let res = await axiosWarehouseIn.post(
                    '/sortingAgnetStatus/' + botTray[0]?.issued_user_name
                )
                if (res.status === 200) {
                    setUserAgent(res.data.data)
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
        if (botTray[0]?.issued_user_name !== undefined) {
            userStatusApiCall()
        }
    }, [botTray])

    const handelExvsAt = (e, code) => {
        e.preventDefault()
        navigate('/wareshouse/request/approve/item-verifiying/' + code)
    }

    const handelIssue = async (e, type) => {
        try {
            if (userAgent !== 'User is free') {
                alert(userAgent)
            } else {
                setLoading(true)
                let flag = false
                for (let x of botTray) {
                    if (x.items.length !== x.actual_items.length) {
                        flag = true
                        break
                    }
                }
                if (flag == false) {
                    let obj = {
                        allTray: botTray,
                        type: type,
                        username: botTray[0]?.issued_user_name,
                    }
                    let res = await axiosWarehouseIn.post(
                        '/assign-to-sorting-confirm',
                        obj
                    )
                    if (res.status == 200) {
                      
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: res?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                        setLoading(false)
                        navigate('/wareshouse/sorting/request')
                    } else {
                        setLoading(false)
                      
                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: res?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                    }
                } else {
                    setLoading(false)
                   
                    Swal.fire({
                        position: 'top-center',
                        icon: 'warning',
                        title: "Please Issue All Tray",
                        confirmButtonText: 'Ok',
                    })
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
            name: 'type_taxanomy',
            label: 'Tray Type',
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
                    value?.length + '/' + tableMeta.rowData[3],
            },
        },
        {
            name: 'sort_id',
            label: 'Status',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return value == 'Sorting Request Sent To Warehouse' &&
                        tableMeta.rowData[6] == 'BOT'
                        ? 'Not Issued'
                        : tableMeta.rowData[6] == 'WHT' &&
                          tableMeta.rowData[4]?.length !== 0
                        ? 'Not Issued'
                        : tableMeta.rowData[6] == 'WHT'
                        ? 'New WHT'
                        : 'Issued'
                },
            },
        },
        {
            name: 'type_taxanomy',
            label: 'Action',
            options: {
                filter: false,
                sort_id: false,
                customBodyRender: (value, tableMeta) => {
                    return tableMeta.rowData[6] == 'BOT' ||
                        (tableMeta.rowData[6] == 'WHT' &&
                            tableMeta.rowData[4]?.length !== 0) ? (
                        <Button
                            variant="contained"
                            disabled={
                                tableMeta.rowData[4]?.length ===
                                tableMeta.rowData[7]?.length
                                    ? true
                                    : false
                            }
                            onClick={(e) =>
                                handelExvsAt(e, tableMeta.rowData[1])
                            }
                            style={{ backgroundColor: 'primery' }}
                            component="span"
                        >
                            {tableMeta.rowData[4]?.length ===
                            tableMeta.rowData[7]?.length
                                ? 'Scanned'
                                : ' Issue Now'}
                        </Button>
                    ) : null
                },
            },
        },
        {
            name: 'actual_items',
            label: 'Quantity',
            options: {
                filter: false,
                display: false,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Sorting', path: '/' },
                        { name: 'Request-Approve' },
                    ]}
                />
            </div>

            <Box
                sx={{
                    float: 'right',
                }}
            >
                <h4>
                    Assigned Date -{' '}
                    {new Date(botTray[0]?.status_change_time).toLocaleString(
                        'en-GB',
                        {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        }
                    )}
                </h4>
                <h4>Agent Name- {botTray[0]?.issued_user_name}</h4>
            </Box>

            <MUIDataTable
                title={'Tray'}
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
            <Box sx={{ float: 'right' }}>
                {botTray?.[0]?.sort_id == 'Assigned to sorting agent' ? (
                    <Button
                        sx={{ m: 3, mb: 9 }}
                        variant="contained"
                        disabled={
                            botTray?.[0]?.items.length !==
                            botTray?.[0]?.actual_items.length
                                ? true
                                : loading == true
                                ? true
                                : false
                        }
                        style={{ backgroundColor: 'primery' }}
                        onClick={(e) => {
                            handelIssue(e, 'Issued to sorting agent')
                        }}
                    >
                        Handover Done
                    </Button>
                ) : botTray?.[0]?.sort_id !== 'Issued to sorting agent' ? (
                    <Button
                        sx={{ m: 3, mb: 9 }}
                        variant="contained"
                        disabled={loading || userAgent == ''}
                        style={{ backgroundColor: 'primery' }}
                        onClick={(e) => {
                            handelIssue(e, 'Assigned to sorting agent')
                        }}
                    >
                        Assign To Agent
                    </Button>
                ) : null}
            </Box>
        </Container>
    )
}

export default SimpleMuiTable
