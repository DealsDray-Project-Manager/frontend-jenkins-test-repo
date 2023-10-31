import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosMisUser, axiosSuperAdminPrexo } from '../../../../../axios'
import { Button, Typography, Table } from '@mui/material'
import AssignDialogBox from './assign-dailog'
import Swal from 'sweetalert2'
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
    const [isLoading, setIsLoading] = useState(false)
    const [botTray, setBotTray] = useState([])
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [sortingAgent, setSortingAgent] = useState([])
    const [isAlive, setIsAlive] = useState(true)
    const [isCheck, setIsCheck] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)

                let response = await axiosSuperAdminPrexo.post(
                    '/tray/assignedToSorting/botToWh'
                )
                if (response.status === 200) {
                    setIsLoading(false)
                    setBotTray(response.data.data)
                } else {
                    setIsLoading(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: response?.data?.message,
                        confirmButtonText: 'Ok',
                    })
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
    }, [isAlive])

    const handleDialogClose = () => {
        setSortingAgent([])
        setIsCheck([])
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    const handelGetSortingUser = async (bot, location) => {
        try {
            setIsCheck(bot)
            let res = await axiosMisUser.post('/getSortingAgent/' + location)
            if (res.status === 200) {
                setSortingAgent(res.data.data)
                handleDialogOpen()
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

    const handelViewTrayForSorting = (e, code) => {
        e.preventDefault()
        navigate('/wareshouse/sorting/request/approve/' + code)
    }

    const columns = [
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
            name: 'tray',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>BOT Tray ID</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.[0]?.botTray?.join(', '),
            },
        },
        {
            name: 'tray',
            label: <Typography sx={{ fontWeight: 'bold' }}>CPC</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.[0]?.cpc,
            },
        },
        {
            name: '_id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Sorting Agent
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'tray',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Assigned Date
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value?.[0]?.status_change_time).toLocaleString(
                        'en-GB',
                        {
                            hour12: true,
                        }
                    ),
            },
        },
        {
            name: 'tray',
            label: <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.[0]?.sort_id,
            },
        },
        {
            name: 'tray',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>WHT Tray</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.[0]?.WhtTray?.join(', '),
            },
        },
        {
            name: 'code',
            label: 'WHT Tray',
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'sort_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Actions</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={(e) =>
                                handelGetSortingUser(
                                    tableMeta.rowData[1]?.[0]?.botTray,
                                    tableMeta.rowData[2]?.[0]?.cpc
                                )
                            }
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Reassign
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
                        { name: 'Sorting', path: '/' },
                        { name: 'Requests' },
                    ]}
                />
            </div>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Tray'}
                    data={botTray}
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
                    sortingAgent={sortingAgent}
                    isCheck={isCheck}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
