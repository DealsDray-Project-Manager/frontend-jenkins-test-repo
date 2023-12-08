import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosSuperAdminPrexo, axiosWarehouseIn } from '../../../../../axios'
import { Button, Typography, Table, Box } from '@mui/material'
import Swal from 'sweetalert2'
import '../../../../../app.css'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'

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
    const [whtTray, setWhtTray] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { rackId } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let response = await axiosSuperAdminPrexo.post(
                    `/viewTrayWithoutRack`
                )
                if (response.status === 200) {
                    setIsLoading(false)
                    setWhtTray(response.data.data)
                }
            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: error,
                })
            }
        }
        fetchData()
    }, [])

    const handelViewItem = (id) => {
        navigate('/sup-admin/report/rack/view-tray/view-items/' + id)
    }

    const download = async (e) => {
        let arr = []
        setLoading(true)
        for (let x of whtTray) {
            let obj = {
                'Tray ID': x?.code,
                Quantity: '',
                Brand: x?.brand,
                Model: x?.model,
                Status: x?.sort_id,
            }
            if (x?.items_length == 0) {
                obj['Quantity'] = `${x?.actual_items}/${x?.limit}`
            } else {
                obj['Quantity'] = `${x?.items_length}/${x?.limit}`
            }

            arr.push(obj)
        }

        const fileExtension = '.xlsx'
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const ws = XLSX.utils.json_to_sheet(arr)

        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'array',
        })

        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, `Not Assigned to Rack Report` + fileExtension)
        setLoading(false)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
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
            name: 'code',
            label: <Typography sx={{ fontWeight: 'bold' }}>Tray ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'actual_items',
            label: 'acutual_items',
            options: {
                filter: true,
                display: false,
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
            name: 'items_length',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        (value == 0 ? tableMeta.rowData[2] : value) +
                        '/' +
                        tableMeta.rowData[3]
                    )
                },
            },
        },

        {
            name: 'brand',
            label: <Typography sx={{ fontWeight: 'bold' }}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography sx={{ fontWeight: 'bold' }}>Model</Typography>,
            options: {
                filter: true,
            },
        },

        {
            name: 'sort_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>,
            options: {
                filter: true,
            },
        },
        // {
        //     name: 'last_action_user',
        //     label: (
        //         <Typography sx={{ fontWeight: 'bold' }}>
        //             Last Modified User
        //         </Typography>
        //     ),
        //     options: {
        //         filter: true,
        //     },
        // },
        // {
        //     name: 'last_action_time',
        //     label: (
        //         <Typography sx={{ fontWeight: 'bold' }}>
        //             Last Modified Timestamp
        //         </Typography>
        //     ),
        //     options: {
        //         filter: true,
        //         customBodyRender: (value) =>
        //             new Date(value).toLocaleString('en-GB', {
        //                 hour12: true,
        //             }),
        //     },
        // },
        {
            name: 'code',
            label: <Typography sx={{ fontWeight: 'bold' }}>Action</Typography>,
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
                                onClick={() => handelViewItem(value)}
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
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Not Assigned to Rack', path: '/' },
                        { name: 'Tray' },
                    ]}
                />
            </div>
            <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
                <LoadingButton
                    sx={{ mb: 1 }}
                    variant="contained"
                    color="secondary"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    onClick={(e) => {
                        download(e)
                    }}
                >
                    <span>Download</span>
                </LoadingButton>
            </Box>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Tray'}
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
        </Container>
    )
}

export default SimpleMuiTable
