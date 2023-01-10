import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Button } from '@mui/material'
import { axiosWarehouseIn } from '../../../../../axios'

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
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/tray-for-release/' +
                            location +
                            '/' +
                            'Closed By Sorting Agent' + "/" + "BOT"
                     )
                    if (response.status === 200) {
                        setBotTray(response.data.data)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [isAlive])

    const handelRelease = async (e, trayId) => {
        try {
            setLoading(true)
            let res = await axiosWarehouseIn.post(
                '/approve-release-bot-tray/' + trayId
            )
            if (res.status === 200) {
                setLoading(false)
                alert(res.data.message)
                setIsAlive((isAlive) => !isAlive)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handelViewTray = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/bot/release/view-item/' + id)
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
            name: 'issued_user_name',
            label: 'Sorting Agent',
            options: {
                filter: true,
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
            label: 'Tray Category',
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'Max',
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'items',
            label: 'Quantity',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.length + '/' + tableMeta.rowData[4],
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
            name: 'code',
            label: 'Action',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                style={{ backgroundColor: '#206CE2' }}
                                onClick={(e) => {
                                    handelViewTray(e, value)
                                }}
                            >
                                View
                            </Button>
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                disabled={loading}
                                onClick={(e) => {
                                    if (
                                        window.confirm('You Want to Release?')
                                    ) {
                                        handelRelease(e, value)
                                    }
                                }}
                                style={{ backgroundColor: 'green' }}
                                component="span"
                            >
                                Release Tray
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
                    routeSegments={[
                        { name: 'BOT', path: '/pages' },
                        { name: 'Bot-To-Release' },
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
