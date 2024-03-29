import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import {
    Button,
    Checkbox,
    Typography,
    Table,
    Box,
    TableContainer,
} from '@mui/material'
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
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    setIsLoading(true)
                    const res = await axiosMisUser.post(
                        '/RDLoneDoneTray/' + location
                    )
                    if (res.status === 200) {
                        setWhtTrayList(res.data.data)
                        setIsLoading(false)
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

    const handleviewrp = (code) => {
        navigate('/mis/assign-to-agent/rdl-2/view-rp/' + code)
    }

    const handleviewsp = (code) => {
        navigate('/mis/assign-to-agent/rdl-2/view-sp/' + code)
    }

    const handelReadyForRdl = () => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let res = await axiosMisUser.post(
                        '/assignToAgent/rdl-1/users/' + 'RDL-2/' + location
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
        // {
        //     name: 'rack_id',
        //     label: (
        //         <Typography variant="subtitle1" fontWeight="bold">
        //             <>Rack Id</>
        //         </Typography>
        //     ),
        //     options: {
        //         filter: true,
        //     },
        // },
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
            label: 'Tray Id',
            options: {
                filter: false,
                sort: false,
                display: false,
            },
        },
        {
            name: 'spTray',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>SP Quantity</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) =>
                    value?.length == 0 || value == undefined
                        ? 'SP NR'
                        : value?.actual_items?.length + '/' + value?.limit,
            },
        },
        {
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RP Quantity</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) =>
                    value?.length == 0 || value == undefined
                        ? ''
                        : value?.length + '/' + tableMeta?.rowData[4],
            },
        },
        {
            name: 'spTray', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>SP Tray Details</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <span>{value?.code}</span>
                            <br />
                            <span>{value?.sort_id}</span>
                            <br />

                            <Button
                                sx={{
                                    m: 1,
                                }}
                                disabled={
                                    value?.length == 0 || value == undefined
                                }
                                variant="contained"
                                onClick={() => handleviewsp(value?.code)}
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
        {
            name: 'code', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RP Tray Details</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <span>{value}</span>
                            <br />
                            <span>{tableMeta?.rowData[11]}</span>

                            <br />
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                onClick={() => handleviewrp(value)}
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

        {
            name: 'rack', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RP Tray Rack</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div>
                            <span>Rack Id: {value?.[0]?.rack_id}</span>
                            <br />
                            <span>Rack Display: {value?.[0]?.display}</span>
                        </div>
                    )
                },
            },
        },
        {
            name: 'rackIdForSP', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>SP Tray Rack</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div>
                            <span>Rack Id: {value?.[0]?.rack_id}</span>
                            <br />
                            <span>Rack Display: {value?.[0]?.display}</span>
                        </div>
                    )
                },
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
            name: 'products',
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
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Assign to Agent', path: '/' },
                        { name: 'RDL-2' },
                    ]}
                />
            </div>

            <Table className="custom-table">
                <MUIDataTable
                    title={'Assign to RDL-2'}
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
                        selectableRows: 'none', // set checkbox for each row
                        // search: false, // set search option
                        // filter: false, // set data filter option
                        // download: false, // set download option
                        // print: false, // set print option
                        // pagination: true, //set pagination option
                        // viewColumns: false, // set column option
                        elevation: 0,
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                    }}
                />
            </Table>
            <Box sx={{ textAlign: 'right' }}>
                <Button
                    sx={{
                        m: 1,
                    }}
                    variant="contained"
                    disabled={isCheck.length == 0}
                    onClick={() => handelReadyForRdl()}
                    style={{ backgroundColor: 'primary' }}
                    component="span"
                >
                    Assign for RDL-2
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
