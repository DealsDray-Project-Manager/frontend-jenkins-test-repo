import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Table, TableContainer, Typography, Card, Box } from '@mui/material'
import { axiosReportingAgent } from '../../../../axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

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

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '100%',
    height:'100%',
    whiteSpace: 'pre',
    '& thead': {
        '& th:first-of-type': {
            paddingLeft: 16,
        },
    },
    '& td': {
        borderBottom: '1px solid #ddd',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const ScrollableTableContainer = styled(TableContainer)
`overflow-x: auto`;

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [whtTray, setWhtTray] = useState([])
    const [dataForDownload, setDataForDownload] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosReportingAgent.post(
                        '/tray/' + 'For All Tray/' + 'WHT/' + location
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

    const handelViewItem = (id) => {
        navigate('/wareshouse/wht/tray/item/' + id)
    }

    

    const download = (e) => {
        let arr = []
        for (let x of dataForDownload) {
            let obj = {
               'Tray ID': x?.code,
               'Brand':x?.brand,
               'Model':x?.model,
               'Tray Display Name':x?.display,
               'Status':x?.sort_id,
               'Assigned date':x?.assigned_date,
               'Assigned To':x?.issued_user_name,
               
            }
            arr.push(obj)
        }
        const fileExtension = '.xlsx'
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const ws = XLSX.utils.json_to_sheet(arr)

        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, 'Delivered Packets' + fileExtension)
    }

    const columns = [
        {
            name: 'index',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold', ml:2}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'code',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Tray ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'display',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold', mr:1}} noWrap>Tray Display Name</Typography>,
            options: {
                filter: true,
            },
        },

        {
            name: 'sort_id',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Status</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'assigned_date',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}} noWrap>Assigned Date</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) => {
                    const date = new Date(value)
                    if (isNaN(date.getTime())) {
                        return ''
                    } else {
                        return date.toLocaleString('en-GB', {
                            hour12: true,
                        })
                    }
                },
            },
        },
        {
            name: 'issued_user_name',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Assigned To</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold', ml:1}}>Action</Typography>,
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
                            onClick={(e) => {
                                handelViewItem(value)
                            }}
                            style={{ backgroundColor: 'green' }}
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
                        { name: 'Tray', path: '/' },
                        { name: 'Items' },
                    ]}
                />
            </div>

                    <>
                    <Card>
                        <Box sx={{ textAlign:'right', mt:2, mr:2 }}>
                        <Button
                            sx={{}}
                            variant="contained"
                            color="success"
                            onClick={(e) => download(e)}
                        >
                            Download XLSX
                        </Button>
                        </Box>
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
                                        (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                        (order === 'desc' ? 1 : -1)
                                    )
                                })
                            },
                            elevation: 0,
                            rowsPerPageOptions: [10, 20, 40, 80, 100],
                        }}
                    />
            </Card>
                    </>
            
           
        </Container>
    )
}

export default SimpleMuiTable
