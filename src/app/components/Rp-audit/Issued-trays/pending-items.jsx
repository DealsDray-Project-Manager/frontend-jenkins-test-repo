import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Button, Typography, Table, TextField, Box } from '@mui/material'
import { axiosRpAuditAgent } from '../../../../axios'
import Swal from 'sweetalert2'
import '../../../../app.css'
import useAuth from 'app/hooks/useAuth'

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
    const [trayData, setTray] = useState([])
    const navigate = useNavigate()
    const { user } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { user_name } = jwt_decode(admin)
                    let response = await axiosRpAuditAgent.post(
                        `/issuedTrays/${user_name}`
                    )
                    if (response.status === 200) {
                        setTray(response.data.data)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchData()
    }, [])

    const handelStart = (e, code, model) => {
        e.preventDefault()
        navigate(`/rp-audit/pending-items/start-rp-audit/${model}/${code}`)
    }
    const handelAwbn = async (e) => {
        if (e.target.value.length === 11) {
            navigate(`/rp-audit/pending-items/start-rp-audit/${e.target.value}`)
        }
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ ml: 2 }}
                >
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'uic',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>UIC</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'imei',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>IMEI</>
                </Typography>
            ),
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
            name: 'rdl_repair_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL-2 Status</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.status || '',
            },
        },
        {
            name: 'rdl_repair_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL-2 Description</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.description || '',
            },
        },
        {
            name: 'rdl_repair_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL-2 Tray</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.rdl_two_tray || '',
            },
        },
        {
            name: 'rdl_repair_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL-2 User</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.rdl_two_user || '',
            },
        },

        // {
        //     name: 'uic',
        //     label: (
        //         <Typography variant="subtitle1" fontWeight="bold">
        //             <>Action</>
        //         </Typography>
        //     ),
        //     options: {
        //         filter: true,
        //         customBodyRender: (value, tableMeta) => {
        //             return (
        //                 <Button
        //                     sx={{
        //                         m: 1,
        //                     }}
        //                     variant="contained"
        //                     onClick={(e) =>
        //                         handelStart(e, value, tableMeta.rowData[3])
        //                     }
        //                     style={{ backgroundColor: 'green' }}
        //                     component="span"
        //                 >
        //                     Start
        //                 </Button>
        //             )
        //         },
        //     },
        // },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Pending Units', path: '/' }]}
                />
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    sx={{ mb: 1 }}
                    id="outlined-password-input"
                    type="text"
                    name="doorsteps_diagnostics"
                    label="SCAN UIC"
                    // onChange={(e) => setAwbn(e.target.value)}
                    onChange={(e) => {
                        handelAwbn(e)
                    }}
                    onKeyPress={(e) => {
                        if (user.serverType == 'Live') {
                            // Prevent manual typing by intercepting key presses
                            e.preventDefault()
                        }
                    }}
                    onPaste={(e) => {
                        if (user.serverType == 'Live') {
                            // Prevent manual typing by intercepting key presses
                            e.preventDefault()
                        }
                    }}
                    inputProps={{
                        style: {
                            width: 'auto',
                        },
                    }}
                />
                <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Tray ID :{trayData?.[0]?.code}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                        <>Tray Status:{trayData?.[0]?.sort_id}</>
                    </Typography>
                </Box>
            </Box>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Pending Units'}
                    data={trayData?.[0]?.temp_array}
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
