import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Checkbox, Typography, Table, Box } from '@mui/material'
import { axiosMisUser, axiosWarehouseIn } from '../../../../../axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import AssignDialogBox from './user-dailog'
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
    const [isAlive, setIsAlive] = useState(true)
    const [whtTray, setWhtTray] = useState([])
    const [isCheck, setIsCheck] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [chargingUsers, setChargingUsers] = useState([])
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    setIsLoading(true)
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/plannerPage/' + 'Ready to BQC/' + location
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

    const handleClick = (e) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }

    const handleDialogClose = () => {
        setIsCheck([])
        setChargingUsers([])
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    const handelGetBqcUser = () => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let res = await axiosMisUser.post(
                        '/get-charging-users/' + 'BQC/' + location
                    )
                    if (res.status == 200) {
                        setChargingUsers(res.data.data)
                        handleDialogOpen()
                    }
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
    const handelViewItem = (id) => {
        navigate('/wareshouse/wht/tray/item/' + id)
    }

    const PriorityRenderer = ({ value }) => {
        const [itemsToShow, setItemsToShow] = useState(1)

        const handleViewMore = () => {
            setItemsToShow(itemsToShow + 5)
        }

        return (
            <div>
                {value?.slice(0, itemsToShow)?.map((number, index) => (
                    <Typography
                        key={index}
                        variant="subtitle1"
                        fontWeight="bold"
                        style={{ color: 'red' }}
                    >
                        {`${index + 1}. ${number}`}
                    </Typography>
                ))}
                {itemsToShow < value?.length && (
                    <Button onClick={handleViewMore} color="primary">
                        View More
                    </Button>
                )}
            </div>
        )
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
            name: 'name', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray Name</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'rack_id', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Id</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'rack_display', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Display</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
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
            name: 'jack_type',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Jack type</>
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
                    value.length + '/' + tableMeta.rowData[9],
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
            name: 'out_of_stock', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Priority</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <PriorityRenderer value={value} />,
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
                        { name: 'Assign-to-user', path: '/' },
                        { name: 'BQC' },
                    ]}
                />
            </div>

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
            <Box sx={{ float: 'right' }}>
                <Button
                    sx={{ mt: 1 }}
                    variant="contained"
                    color="primary"
                    disabled={isCheck.length == 0}
                    onClick={() => handelGetBqcUser(true)}
                >
                    Assign For BQC
                </Button>
            </Box>

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
