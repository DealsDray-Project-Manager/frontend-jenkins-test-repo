import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import '../../../../../app.css'
import { Button, Checkbox, Typography, Table } from '@mui/material'
import {
    axiosMisUser,
    axiosSuperAdminPrexo,
    axiosWarehouseIn,
} from '../../../../../axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import AssignDialogBox from './user-dailog'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'

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
    const [whtTray, setWhtTray] = useState([])
    const [isCheck, setIsCheck] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [location, setLocation] = useState('')
    const [chargingUsers, setChargingUsers] = useState([])
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [oneStepBackButLoad, setOneStepBackButLoad] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let obj = {
                    trayType: 'WHT',
                    sort_id: 'Send for BQC',
                }
                let response = await axiosSuperAdminPrexo.post(
                    '/tray/assigned',
                    obj
                )
                if (response.status === 200) {
                    setIsLoading(false)
                    setWhtTray(response.data.data)
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
        fetchData()
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const handleClick = (e, locationAdd) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        if (!checked && isCheck.length == 1) {
            setLocation('')
        } else {
            if (location == '') {
                setLocation(locationAdd)
            } else {
                if (location != locationAdd) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please select same location tray',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(false)
                        }
                    })
                }
            }
        }
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }

    const handleDialogClose = () => {
        setIsCheck([])
        setChargingUsers([])
        setLocation('')
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    const handelGetChargingUser = () => {
        const fetchData = async () => {
            try {
                let res = await axiosMisUser.post(
                    '/get-charging-users/' + 'BQC/' + location
                )
                if (res.status == 200) {
                    setChargingUsers(res.data.data)
                    handleDialogOpen()
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchData()
    }
    // ONE STEP BACK API
    const handelOneStepBack = async () => {
        try {
            setOneStepBackButLoad(true)
            let trayIds = []
            for (let x of isCheck) {
                let obj = {
                    tray_status: 'Not-empty',
                    code: x,
                }
                trayIds.push(obj)
            }
            let obj = {
                trayIds: trayIds,
                status: 'Ready to BQC',
                actionDoneBy: user.username,
                currentStatus: 'Send for BQC',
            }
            const res = await axiosSuperAdminPrexo.post('/one-step-back', obj)
            if (res.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                        setOneStepBackButLoad(false)
                    }
                })
            } else {
                setOneStepBackButLoad(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            setOneStepBackButLoad(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }

    const handelViewItem = (id) => {
        navigate('/sup-admin/tray/item-view/' + id)
    }

    const columns = [
        {
            name: 'code',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Select</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                handleClick(e, tableMeta.rowData[5])
                            }}
                            id={value}
                            key={value}
                            checked={isCheck.includes(value)}
                        />
                    )
                },
            },
        },
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
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray ID</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'rack_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack ID</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'rackDetails', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Display</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => value?.[0]?.display,
            },
        },
        {
            name: 'cpc',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>CPC</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Status</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'brand',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Brand</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Model</>
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
                    <>Tray Name</>
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
                filter: false,
                sort: false,
                display: false,
            },
        },
        {
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Quantity</>
                </Typography>
            ),
            options: {
                filter: true,

                customBodyRender: (value, tableMeta) =>
                    value.length + '/' + tableMeta.rowData[10],
            },
        },

        {
            name: 'issued_user_name',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Assigned to</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Action</>
                </Typography>
            ),
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
                            onClick={() => handelViewItem(value)}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            View
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
                        { name: 'Tray-Reassign', path: '/' },
                        { name: 'BQC' },
                    ]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                disabled={isCheck.length == 0}
                onClick={() => handelGetChargingUser(true)}
            >
                Reassign for BQC
            </Button>

            <Table className="custom-table">
                <MUIDataTable
                    title={'WHT'}
                    data={whtTray}
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

            {shouldOpenEditorDialog && (
                <AssignDialogBox
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setIsAlive={setIsAlive}
                    chargingUsers={chargingUsers}
                    isCheck={isCheck}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
