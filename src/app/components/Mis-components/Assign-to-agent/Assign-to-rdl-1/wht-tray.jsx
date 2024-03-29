import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Checkbox, Typography, Table, Box } from '@mui/material'
import Swal from 'sweetalert2'
import { axiosMisUser } from '../../../../../axios'
import { useNavigate } from 'react-router-dom'
import AssignDialogBox from './user-dailog'
import jwt_decode from 'jwt-decode'
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
    const [isCheck, setIsCheck] = useState([])
    const [whtTrayList, setWhtTrayList] = useState([])
    const [RDLUsers, setRDLUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWht = async () => {
            try {
                setIsLoading(true)
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    const res = await axiosMisUser.post(
                        '/auditDoneWht/' + location
                    )
                    if (res.status === 200) {
                        setIsLoading(false)
                        setWhtTrayList(res.data.data)
                    }
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
        fetchWht()
        return () => setIsAlive(false)
    }, [isAlive])

    const handleClick = (e) => {
        const { id, checked } = e.target

        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }

    const handelReadyForRdl = () => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let res = await axiosMisUser.post(
                        '/assignToAgent/rdl-1/users/' + 'RDL-1/' + location
                    )
                    if (res.status == 200) {
                        setRDLUsers(res.data.data)
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

    const handleDialogClose = () => {
        setIsCheck([])
        setRDLUsers([])
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    const handelViewItem = (trayId) => {
        navigate('/mis/assign-to-agent/Rdl-1/view-item/' + trayId)
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
            name: 'code', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray Id</>
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
            name: 'rackData', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Display</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value?.[0]?.display,
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
                sort: true,
                customBodyRender: (value, tableMeta) =>
                    value.length + '/' + tableMeta.rowData[7],
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
                filter: false,
                sort: false,
            },
        },
        {
            name: 'products', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Priority</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (
                    <PriorityRenderer value={value?.[0]?.out_of_stock} />
                ),
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
                customBodyRender: (value, tableMeta) => {
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
                        { name: 'Assign-to-RDL-1', path: '/' },
                        { name: 'RDL-1' },
                    ]}
                />
            </div>

            <Table className="custom-table">
                <MUIDataTable
                    title={'WHT Tray'}
                    data={whtTrayList}
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
            <Box sx={{ textAlign: 'right', mt: 1 }}>
                <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    color="primary"
                    disabled={isCheck.length === 0}
                    onClick={(e) => {
                        handelReadyForRdl(e)
                    }}
                >
                    Assign For RDL-1
                </Button>
            </Box>

            {shouldOpenEditorDialog && (
                <AssignDialogBox
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setIsAlive={setIsAlive}
                    RDLUsers={RDLUsers}
                    isCheckk={isCheck}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
