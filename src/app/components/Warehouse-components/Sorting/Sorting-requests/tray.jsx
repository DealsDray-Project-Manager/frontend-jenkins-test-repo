import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { axiosMisUser } from '../../../../../axios'
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
    const [isAlive, setIsAlive] = useState(true)
    const [botTray, setBotTray] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosMisUser.post(
                        '/view-sorting-item/' + location + '/' + 'warehouse'
                    )
                    if (response.status === 200) {
                        setBotTray(response.data.data)
                    } else {
                        alert(response.data.message)
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

    const handelViewTrayForSorting = (e, code) => {
        e.preventDefault()
        navigate('/wareshouse/sorting/request/approve/' + code)
    }

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'tray',
            label: 'BOT Tray Id',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.[0]?.botTray?.join(', '),
            },
        },
        {
            name: '_id',
            label: 'Sorting Agent',
            options: {
                filter: true,
            },
        },
        {
            name: 'tray',
            label: 'Assigned Date',
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
            label: 'Status',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.[0]?.sort_id,
            },
        },
        {
            name: 'tray',
            label: 'WHT Tray',
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
            label: 'Actions',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return value == 'Assigned to sorting agent' ? (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={(e) =>
                                handelViewTrayForSorting(
                                    e,
                                    tableMeta.rowData[6]
                                )
                            }
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Handover to Agent
                        </Button>
                    ) : (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={(e) =>
                                handelViewTrayForSorting(
                                    e,
                                    tableMeta.rowData[2]
                                )
                            }
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Issue Trays
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

            <MUIDataTable
                title={'Tray'}
                data={botTray}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                    download:false,
                    print:false,
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
