import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosSuperAdminPrexo, axiosWarehouseIn } from '../../../../../axios'
import { Button, Typography, Table } from '@mui/material'
import Swal from 'sweetalert2'
import AssignDialogBox from './dialog-for-rack'
import useAuth from 'app/hooks/useAuth'
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
    const [whtTray, setWhtTray] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const navigate = useNavigate()
    const [isAlive, setIsAlive] = useState(true)
    const { user } = useAuth()
    const [curRackId, setCurRackId] = useState('')
    const [showRack, setShowRack] = useState([])
    const [trayId, setTrayId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    setIsLoading(true)
                    let { location } = jwt_decode(admin)
                    let obj = {
                        screen: 'MIS',
                        location: location,
                    }
                    let response = await axiosWarehouseIn.post(
                        '/rackChangeRequest',
                        obj
                    )
                    if (response.status === 200) {
                        setIsLoading(false)
                        setWhtTray(response.data.data)
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
    }, [isAlive])

    const handleDialogClose = () => {
        setCurRackId('')
        setTrayId('')
        setShouldOpenEditorDialog(false)
        setShowRack([])
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    // GET WAREHOUSE AND SHOW THE DILOG BOX
    const handelWarehouse = async (id, rackId) => {
        try {
            setTrayId(id)
            setCurRackId(rackId)
            let res = await axiosSuperAdminPrexo.post(
                '/trayracks/view/' + user.warehouse
            )
            if (res.status == 200) {
                setShowRack(res.data.data)
                handleDialogOpen()
            }
        } catch (error) {
            alert(error)
        }
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
            name: 'code',
            label: <Typography sx={{ fontWeight: 'bold' }}>Tray ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'rack_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Rack ID</Typography>,

            options: {
                filter: true,
            },
        },
        {
            name: 'rackData', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Display</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => value?.[0]?.display,
            },
        },
        {
            name: 'type_taxanomy',
            label: <Typography sx={{ fontWeight: 'bold' }}>Type</Typography>,
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
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.length + '/' + tableMeta.rowData[5],
            },
        },
        {
            name: 'brand',
            label: <Typography sx={{ fontWeight: 'bold' }}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography sx={{ fontWeight: 'bold' }}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'issued_user_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Scan Out User
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'rdl_2_user_temp',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Scan In User
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'sort_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: <Typography sx={{ fontWeight: 'bold' }}>Actions</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <Button
                                sx={{ mb: 2 }}
                                variant="contained"
                                color="primary"
                                onClick={(e) => {
                                    handelWarehouse(value, tableMeta.rowData[2])
                                }}
                            >
                                Change Rack
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
                    routeSegments={[{ name: 'Rack Change', path: '/' }]}
                />
            </div>
        <Table className="custom-table" >

            <MUIDataTable
                title={'Tray'}
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
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
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
                    curRackId={curRackId}
                    trayId={trayId}
                    showRack={showRack}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
