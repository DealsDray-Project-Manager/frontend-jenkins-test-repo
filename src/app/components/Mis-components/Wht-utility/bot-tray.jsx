import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosBot, axiosMisUser, axiosWarehouseIn } from '../../../../axios'
import jwt_decode from 'jwt-decode'
import { Button, Typography } from '@mui/material'

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
    const [trayData, setTrayData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem('prexo-authentication')
                if (token) {
                    let res = await axiosMisUser.post('/whtUtility/botTray')
                    if (res.status == 200) {
                        setTrayData(res.data.data)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
        return () => setIsAlive(false)
    }, [isAlive])

    const handelViewTray = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/tray/item/' + id)
    }

    const handelClose = async (trayId) => {
        navigate('/warehouse/wht-utility/Bot-tray/resticker/' + trayId)
        // try {
        //     let obj = {
        //         trayId: trayId,
        //         bagId: null,
        //     }
        //     let res = await axiosWarehouseIn.post('/traycloseBot', obj)
        //     if (res.status == 200) {
        //         alert(res.data.message)
        //         setIsAlive((isAlive) => !isAlive)
        //     } else {
        //         alert(res.data.message)
        //     }
        // } catch (error) {
        //     alert(error)
        // }
    }

    const columns = [
        {
            name: 'index',
            label: <Typography sx={{fontWeight:'bold', ml:2}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    // dataIndex.rowIndex + 1,
                    <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'code',
            label: <Typography sx={{fontWeight:'bold'}}>Tray ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'Tray Id',
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'items',
            label: <Typography sx={{fontWeight:'bold'}}>Quantity</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.length + '/' + tableMeta?.rowData[2],
            },
        },
        {
            name: 'type_taxanomy',
            label: <Typography sx={{fontWeight:'bold'}}>Tray type</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: <Typography sx={{fontWeight:'bold'}}>Status</Typography>,
            options: {
                filter: true,
            },
        },

        {
            name: 'code',
            label: <Typography sx={{fontWeight:'bold'}}>Actions</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                onClick={() => {
                                    navigate(
                                        '/mis/assign-to-agent/bot/uic-genaration/' +
                                            value
                                    )
                                }}
                                style={{ backgroundColor: 'primery' }}
                            >
                                UIC
                            </Button>
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                disabled={
                                    tableMeta.rowData[5] ==
                                    'Wht-utility Resticker Done'
                                }
                                variant="contained"
                                onClick={(e) => {
                                    handelClose(value)
                                }}
                                style={{ backgroundColor: 'green' }}
                            >
                                Resticker
                            </Button>
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                disabled={
                                    tableMeta.rowData[5] == 'Wht-utility-work'
                                }
                                variant="contained"
                                onClick={(e) => {
                                    navigate(
                                        '/warehouse/wht-utility/Bot-tray/close/' +
                                            value
                                    )
                                }}
                                style={{ backgroundColor: 'red' }}
                            >
                                Close
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
                <Breadcrumb routeSegments={[{ name: 'Tray', path: '/' }]} />
            </div>

            <MUIDataTable
                title={'Tray'}
                data={trayData}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                    download: false,
                    print: false,
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
