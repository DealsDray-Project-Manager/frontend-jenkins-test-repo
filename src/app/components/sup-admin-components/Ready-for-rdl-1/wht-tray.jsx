import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import {
    Button,
    Checkbox,
    Typography,
    Table,
    TableContainer,
} from '@mui/material'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo } from '../../../../axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
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
    const [isAlive, setIsAlive] = useState(true)
    const [isCheck, setIsCheck] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [whtTrayList, setWhtTrayList] = useState([])
    const [submitButDis, setSubmitButDis] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWht = async () => {
            try {
                setIsLoading(true)
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    const res = await axiosSuperAdminPrexo.post('/auditDoneWht')
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
    const handelReadyForRdl = async () => {
        try {
            setSubmitButDis(true)
            let obj1 = {
                ischeck: isCheck,
                status: 'Audit Done Closed By Warehouse',
            }
            let checkStatus = await axiosSuperAdminPrexo.post(
                '/tray/checkStatus',
                obj1
            )
            if (checkStatus.status == 200) {
                let obj = {
                    ischeck: isCheck,
                    type: 'Ready to RDL-1',
                }
                let res = await axiosSuperAdminPrexo.post(
                    '/forceFullReadySend',
                    obj
                )
                setIsCheck([])
                if (res.status === 200) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res.data.message,
                        confirmButtonText: 'Ok',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setIsCheck([])
                            setSubmitButDis(false)
                            setIsAlive((isAlive) => !isAlive)
                        }
                    })
                } else if (res.status == 202) {
                    setSubmitButDis(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                }
            } else {
                setSubmitButDis(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: checkStatus?.data?.message,
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    const handelViewItem = (trayId) => {
        navigate('/sup-admin/wht/view-item/' + trayId)
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
                // setCellProps: () => ({ align: 'center' }),
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
                    <>Tray ID</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'display',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray Display Name</>
                </Typography>
            ),
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
            name: 'warehouse',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Warehouse</>
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
                    routeSegments={[{ name: 'Ready For RDL-1', path: '/' }]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                disabled={submitButDis || isCheck.length === 0}
                onClick={(e) => {
                    handelReadyForRdl(e)
                }}
            >
                Ready For RDL-1
            </Button>

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
        </Container>
    )
}

export default SimpleMuiTable
