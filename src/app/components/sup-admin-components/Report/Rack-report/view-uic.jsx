import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { axiosSuperAdminPrexo, axiosWarehouseIn } from '../../../../../axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import { Typography, Box, Table } from '@mui/material'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import SaveIcon from '@mui/icons-material/Save'
import '../../../../../app.css'
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
    const [rackId, setRackId] = useState({
        rack_id: '',
        code: '',
    })
    const { trayId } = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosSuperAdminPrexo.post(
                        '/viewUnitsDataRack/' + trayId
                    )
                    if (response.status === 200) {
                        setRackId({
                            rack_id: response?.data?.data?.rack_id,
                            code: response?.data?.data?.code,
                        })
                        setWhtTray(response.data.data.items)
                    }
                }
            } catch (error) {
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

    const download = async (e) => {
        let arr = []
        setLoading(true)
        for (let x of whtTray) {
            let obj = {
                UIC: x?.uic,
                MUIC: x?.muic,
                Brand: x?.brand_name,
                Model: x?.model_name,
                'Tracking Id': x?.tracking_id,
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
        FileSaver.saveAs(data, `${rackId?.code} -Tray Details` + fileExtension)
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
            name: 'uic',
            label: <Typography sx={{ fontWeight: 'bold' }}>UIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: <Typography sx={{ fontWeight: 'bold' }}>MUIC</Typography>,
            options: {
                filter: true,
            },
        },

        {
            name: 'brand_name',
            label: <Typography sx={{ fontWeight: 'bold' }}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model_name',
            label: <Typography sx={{ fontWeight: 'bold' }}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'tracking_id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Tracking ID</Typography>
            ),
            options: {
                filter: true,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Tray Items', path: '/' }]}
                />
            </div>
            <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
                <Box>
                    <Typography>Tray Id:{rackId?.code}</Typography>
                    <Typography>Rack Id:{rackId?.rack_id}</Typography>
                </Box>

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
                    title={'items'}
                    data={whtTray}
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
