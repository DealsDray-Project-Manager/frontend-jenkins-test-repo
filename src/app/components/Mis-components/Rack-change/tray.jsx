import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosMisUser } from '../../../../axios'
import { Button, Typography, Checkbox,Table } from '@mui/material'
import Swal from 'sweetalert2'
import AssignDialogBox from './assign'
import { Warehouse } from '@mui/icons-material'
import useAuth from 'app/hooks/useAuth'
import '../../../../app.css'


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
    const [isCheck, setIsCheck] = useState([])
    const { user } = useAuth()
    const [trayDetails, setTrayDetails] = useState({
        sort_id: '',
        current_rack: '',
    })
    const [warehouseUser, setWarehouseUser] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    setIsLoading(true)
                    let { location } = jwt_decode(admin)
                    let response = await axiosMisUser.post(
                        '/getRackTray/' + location
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
        setIsCheck([])
        setWarehouseUser([])
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    const handleClick = (e) => {
        const { id, checked } = e.target

        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }
    // GET WAREHOUSE AND SHOW THE DILOG BOX
    const handelWarehouse = async () => {
        try {
            const res = await axiosMisUser.post(
                `/getWarehouseUsers/${user.location}/${user.warehouse}`
            )
            if (res.status == 200) {
                setWarehouseUser(res.data.data)
                handleDialogOpen()
            }
        } catch (error) {
            alert(error)
        }
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
                filter: false,
                sort: false,
                customBodyRender: (value, dataIndex) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                handleClick(e)
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
            name: 'type_taxanomy',
            label: <Typography sx={{ fontWeight: 'bold' }}>Type</Typography>,
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
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        (value == 0 ? tableMeta.rowData[5] : value) +
                        '/' +
                        tableMeta.rowData[6]
                    )
                },
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
            name: 'sort_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>,
            options: {
                filter: true,
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
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                disabled={isCheck.length === 0}
                onClick={(e) => {
                    handelWarehouse(e)
                }}
            >
                Assign To Warehouse
            </Button>
                <Table className="custom-table">

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
                    warehouseUser={warehouseUser}
                    isCheck={isCheck}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
