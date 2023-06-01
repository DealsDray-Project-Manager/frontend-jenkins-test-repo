import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Checkbox, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo } from '../../../../axios'
import { useNavigate } from 'react-router-dom'

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
    const [isLoading, setIsLoading] = useState(false)
    const [submitButDis, setSubmitButDis] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWht = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post(
                    '/chargeDoneFourDifferenceTray'
                )
                if (res.status === 200) {
                    setIsLoading(false)
                    setWhtTrayList(res.data.data)
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

    const handelReadyForCharging = async () => {
        try {
            setSubmitButDis(true)
            let obj = {
                ischeck: isCheck,
                status: 'Recharging',
            }
            let res = await axiosSuperAdminPrexo.post(
                '/ready-for-charging',
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
                    icon: 'error',
                    title: 'Oops...',
                    text: res?.data?.message,
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
            label: <Typography sx={{fontWeight:'bold', ml:2}}>Select</Typography>,
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
            label: <Typography sx={{fontWeight:'bold'}}>Record No</Typography>,
            options: {
                filter: true,
                sort: true,
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'code', // field name in the row object
            label: <Typography sx={{fontWeight:'bold'}}>Tray ID</Typography>,  // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'warehouse',
            label: <Typography sx={{fontWeight:'bold'}}>Warehouse</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'type_taxanomy',
            label: <Typography sx={{fontWeight:'bold'}}>Tray Category</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: <Typography sx={{fontWeight:'bold'}}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography sx={{fontWeight:'bold'}}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: <Typography sx={{fontWeight:'bold'}}>Tray Name</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'Limit',
            options: {
                filter: true,
                display: false,
            },
        },
        {
            label: <Typography sx={{fontWeight:'bold'}}>Name</Typography>,
            name: 'name',
            hide: true,
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: <Typography sx={{fontWeight:'bold'}}>Quantity</Typography>,
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) =>
                    value.length + '/' + tableMeta.rowData[8],
            },
        },
        {
            name: 'closed_time_bot',
            label: <Typography sx={{fontWeight:'bold'}}>Charging Done Date</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'sort_id',
            label: <Typography sx={{fontWeight:'bold'}}>Status</Typography>,
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'code',
            label: <Typography sx={{fontWeight:'bold'}}>Action</Typography>,
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
                    routeSegments={[{ name: 'Ready For Charging', path: '/' }]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                disabled={submitButDis || isCheck.length === 0}
                onClick={(e) => {
                    handelReadyForCharging(e)
                }}
            >
                Ready For Recharging
            </Button>
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
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
                            )
                        })
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        </Container>
    )
}

export default SimpleMuiTable
