import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import { Button, Typography } from '@mui/material'
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
    const [bagList, setBagList] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post(
                    '/getInvalidItemPresentBag'
                )
                if (res.status === 200) {
                    setIsLoading(false)
                    setBagList(res.data.data)
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
        fetchBrand()
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const handelViewItem = (bagId) => {
        navigate('/sup-admin/remove-invalid-item/' + bagId)
    }

    const columns = [
        {
            name: 'index',
            label: <Typography variant="subtitle1" sx={{marginLeft:'7px'}}><strong>Record No</strong></Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'code', // field name in the row object
            label: <Typography variant="subtitle1"><strong>Bag ID</strong></Typography>, // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'cpc',
            label: <Typography variant="subtitle1"><strong>Location</strong></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'warehouse',
            label: <Typography variant="subtitle1"><strong>Warehouse</strong></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: <Typography variant="subtitle1"><strong>Tray Display Name</strong></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: <Typography variant="subtitle1"><strong>Limit</strong></Typography>,
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'items',
            label: <Typography variant="subtitle1"><strong>Quantity</strong></Typography>,
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value, tableMeta) =>
                    value.length + '/' + tableMeta.rowData[5],
            },
        },
        {
            name: 'display',
            label: <Typography variant="subtitle1"><strong>Tray Display</strong></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: <Typography variant="subtitle1"><strong>Status</strong></Typography>,
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'created_at',
            label: <Typography variant="subtitle1"><strong>Creation Date</strong></Typography>,
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'code',
            label: <Typography variant="subtitle1"><strong>Action</strong></Typography>,
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
                    routeSegments={[{ name: 'Remove Invalid Item', path: '/' }]}
                />
            </div>

            <MUIDataTable
                title={'Bag'}
                data={bagList}
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
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        </Container>
    )
}

export default SimpleMuiTable
