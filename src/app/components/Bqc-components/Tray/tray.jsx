import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosBqc } from '../../../../axios'
import jwt_decode from 'jwt-decode'
import { Button } from '@mui/material'

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
    const [tray, setTray] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem('prexo-authentication')
                if (token) {
                    const { user_name } = jwt_decode(token)
                    let res = await axiosBqc.post('/assigned-tray/' + user_name)
                    if (res.status == 200) {
                        setTray(res.data.data)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    const handelBqcIn = (e, id) => {
        e.preventDefault()
        navigate('/bqc/tray/item-verify/' + id)
    }

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'code',
            label: 'Tray Id',
            options: {
                filter: true,
            },
        },

        {
            name: 'type_taxanomy',
            label: 'Tray Type',
            options: {
                filter: true,
            },
        },

        {
            name: 'brand',
            label: 'Brand',
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: 'Model',
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
            name: 'actual_items',
            label: 'actu',
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'temp_array',
            label: 'temp',
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'sort_id',
            label: 'Status',
            options: {
                filter: true,
            },
        },

        {
            name: 'items',
            label: 'Quantity',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    tableMeta.rowData[6].length == 0 &&
                    tableMeta.rowData[7].length == 0
                        ? value.length + '/' + tableMeta.rowData[5]
                        : tableMeta.rowData[8] === 'BQC work inprogress'
                        ? tableMeta.rowData[6].length +
                          tableMeta.rowData[7].length +
                          '/' +
                          tableMeta.rowData[5]
                        : tableMeta.rowData[6].length !== 0 ||
                          tableMeta.rowData[7].length !== 0
                        ? value.length +
                          tableMeta.rowData[7].length +
                          tableMeta.rowData[6].length +
                          '/' +
                          tableMeta.rowData[5]
                        : '',
            },
        },
        {
            name: 'assigned_date',
            label: 'Assigned Date',
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
            label: 'Action',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Button
                            sx={{ m: 1 }}
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: 'green' }}
                            onClick={(e) => {
                                handelBqcIn(e, value)
                            }}
                        >
                            Start BQC
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
                    routeSegments={[{ name: 'Bqc-Request', path: '/pages' }]}
                />
            </div>

            <MUIDataTable
                title={'Tray'}
                data={tray}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
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
