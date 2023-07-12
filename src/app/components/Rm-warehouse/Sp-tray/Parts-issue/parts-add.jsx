import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosRmUserAgent } from '../../../../../axios'
import { Button, Box, Typography } from '@mui/material'
import Swal from 'sweetalert2'

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
    const [tray, setTray] = useState({})
    const { trayId } = useParams()
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const [description, setDescription] = useState([])

    useEffect(() => {
        try {
            const fetchData = async () => {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { user_name } = jwt_decode(admin)
                    let res = await axiosRmUserAgent.post(
                        '/spTray/part-issue/' + trayId + '/' + user_name
                    )
                    if (res.status == 200) {
                        setTray(res.data.data)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            confirmButtonText: 'Ok',
                            text: res.data.message,
                        })
                        navigate(-1)
                    }
                } else {
                    navigate('/')
                }
            }
            fetchData()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }, [refresh])

    const handleAdd = (partId) => {
        Swal.fire({
            title: 'Are you sure?', 
            text: "You won't be add this part!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let response = await axiosRmUserAgent.post(
                        '/spTray/addParts/' + partId + '/' + trayId
                    )
                    if (response.status == 200) {
                        setRefresh((isAlive) => !isAlive)
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: response?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    })
                }
            }
        })
    }

    const handleViewSpIssue = async (e, code) => {
        e.preventDefault()
        try {
            const res = await axiosRmUserAgent.post('/spTray/close/' + trayId)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                navigate('/sp-user/sp-tray')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                })
            }
        } catch (error) {
            alert(error)
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
            name: 'partId',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Part Number</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'boxid',
            label: <Typography sx={{ fontWeight: 'bold' }}>Box ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'Tray',
            options: {
                filter: true,
                display: false,
            },
        },

        {
            name: 'partName',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Spare Part Name
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'selected_qty',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'status',
            label: <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'partId',
            label: <Typography sx={{ fontWeight: 'bold' }}>Action</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            disabled={tableMeta.rowData[6] == 'Added'}
                            variant="contained"
                            style={{ backgroundColor: '#206CE2' }}
                            onClick={(e) => {
                                handleAdd(value)
                            }}
                        >
                            Add
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
                    
                        { name: 'Part issue', path: '/' },
                        { name: 'Add parts' },
                    ]}
                />
            </div>
            <MUIDataTable
                title={'Parts'}
                data={tray?.items}
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
            <Box sx={{ float: 'right' }}>
                <textarea
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    style={{
                        width: '300px',
                        height: '60px',
                        marginTop: '20px',
                    }}
                    placeholder="Remarks"
                ></textarea>
                <Button
                    sx={{
                        m: 1,
                        mr: 5,
                        mb: 5,
                    }}
                    variant="contained"
                    disabled={
                        tray?.items?.length !== tray?.actual_items?.length ||
                        description == ''
                    }
                    style={{ backgroundColor: '#206CE2' }}
                    onClick={(e) => {
                        handleViewSpIssue(e)
                    }}
                >
                    Close & Send
                </Button>
            </Box>
        </Container>
    )
}

export default SimpleMuiTable
