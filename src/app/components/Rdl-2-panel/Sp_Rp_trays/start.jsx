import React, { useEffect, useState, useMemo } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useParams, useNavigate } from 'react-router-dom'
import { axiosRdlTwoAgent, axiosWarehouseIn } from '../../../../axios'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

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
    const [isCheck, setIsCheck] = useState([])
    const navigate = useNavigate()
    const [trayData, setTrayData] = useState({})
    const { trayId } = useParams()
    const [username, setUsername] = useState('')
    const [uic, setUic] = useState('')
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location, user_name } = jwt_decode(admin)
                    setUsername(user_name)
                    let response = await axiosWarehouseIn.post(
                        '/getWhtTrayItem/' +
                            trayId +
                            '/' +
                            'Rdl-2 inprogress/' +
                            location
                    )
                    if (response.status === 200) {
                        setTrayData(response.data.data)
                    } else {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: response?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                        navigate(-1)
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
    }, [refresh])

    const handelUic = async (uicCode) => {
        try {
            if (uicCode.length == 11) {
                let res = await axiosRdlTwoAgent.post(
                    '/uicScan/' + uicCode + '/' + trayId
                )
                if (res.status === 200) {
                    // setReportData(res.data.data)
                    navigate('/rdl-two/tray/tray/unit-information-display', {
                        state: {
                            reportData: res.data.data,
                            trayId: trayId,
                            username: username,
                            uic: uicCode,
                            whtTrayId: trayId,
                        },
                    })
                } else {
                    setUic('')
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res?.data?.message,
                    })
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
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
            name: 'rdl_repair_report',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Repair Status
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.status,
            },
        },
        {
            name: 'rdl_repair_report',
            label: <Typography sx={{ fontWeight: 'bold' }}>Reason</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.reason,
            },
        },
        {
            name: '',
            label: <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>,
            options: {
                filter: true,
            },
        },
    ]

    /************************************************************************** */
    // const tableExpected = useMemo(() => {
    return (
        <>
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Requests', path: '/' },
                            { name: 'Order' },
                        ]}
                    />
                </div>
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            sx={{ fontSize: 'large', fontWeight: 'bold' }}
                        >
                            Issued date :{' '}
                            {new Date(trayData?.assigned_date).toLocaleString(
                                'en-GB',
                                {
                                    hour12: true,
                                }
                            )}
                        </Typography>
                        <Typography>
                            {trayData?.items?.length} Mobile To Repair
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', mb: 2, mt: 2 }}>
                        <Typography sx={{}}>
                            RP Tray : {trayData?.code}
                        </Typography>
                        <Typography sx={{ ml: 5 }}>
                            SP Tray : {trayData?.sp_tray}
                        </Typography>
                        <Typography sx={{ ml: 5 }}>
                            BRAND : {trayData?.brnad}
                        </Typography>
                        <Typography sx={{ ml: 5 }}>
                            MODEL : {trayData?.model}
                        </Typography>
                    </Box>

                    <Box sx={{}}>
                        <TextFieldCustOm
                            label="Scan UIC"
                            type="text"
                            style={{ width: '200px' }}
                            onChange={(e) => {
                                setUic(e.target.value)
                                handelUic(e.target.value)
                            }}
                            inputRef={(input) => input && input.focus()}
                        />
                    </Box>
                    <MUIDataTable
                        title={'Units'}
                        data={trayData?.actual_items}
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
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
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
                    <Box sx={{ textAlign: 'right' }}>
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            disabled={
                                trayData?.actual_items?.length !==
                                trayData?.items?.length
                            }
                            onClick={(e) => {
                                navigate('/rdl-two/Traysummary')
                            }}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Close Tray
                        </Button>
                    </Box>
                </>
            </Container>
        </>
    )
}

export default SimpleMuiTable
