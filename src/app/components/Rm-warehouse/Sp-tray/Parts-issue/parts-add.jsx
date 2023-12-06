import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosRmUserAgent, axiosSuperAdminPrexo } from '../../../../../axios'
import {
    Button,
    Box,
    Typography,
    TextField,
    MenuItem,
    Table,
} from '@mui/material'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'
import '../../../../../app.css'

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
    const { user } = useAuth()
    const [tray, setTray] = useState({})
    const { trayId } = useParams()
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [description, setDescription] = useState([])
    const [rackiddrop, setrackiddrop] = useState([])
    const [rackId, setRackId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post(
                    '/trayracks/view/' + user.warehouse
                )
                if (res.status == 200) {
                    setrackiddrop(res.data.data)
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

    useEffect(() => {
        try {
            const fetchData = async () => {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { user_name } = jwt_decode(admin)
                    let obj = {
                        trayId: trayId,
                        username: user_name,
                        status: 'Assigned to sp warehouse',
                    }
                    let res = await axiosRmUserAgent.post(
                        '/spTrayPartIssue',
                        obj
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

    const handleAdd = (partId, boxId) => {
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
            setloading(true)
            let obj = {
                trayId: trayId,
                rackId: rackId,
            }
            const res = await axiosRmUserAgent.post('/spTrayClose', obj)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setloading(false)
                navigate('/sp-user/sp-tray')
            } else {
                setloading(false)
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
                <Typography sx={{ fontWeight: 'bold' }}>Record No</Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customHeadRender: (columnMeta) => (
                    <th style={{ width: '9%', borderBottom: '1px solid #ddd' }}>
                        {columnMeta.label}
                    </th>
                ),
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
            name: 'box_id',
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
                <Typography sx={{ fontWeight: 'bold' }}>
                    Qty to be Picked
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) => (
                    <Typography sx={{ ml: 6 }}>
                        {value}{' '}
                        {/* Apply the desired alignment, 'center' in this case */}
                    </Typography>
                ),
            },
        },
        {
            name: 'avl_qty_box',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Avl stock</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) => (
                    <Typography sx={{ ml: 3 }}>
                        {value}{' '}
                        {/* Apply the desired alignment, 'center' in this case */}
                    </Typography>
                ),
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
                            disabled={tableMeta.rowData[7] == 'Added'}
                            variant="contained"
                            style={{ backgroundColor: '#206CE2' }}
                            onClick={(e) => {
                                handleAdd(value, tableMeta.rowData[2])
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
            <Table className="custom-table">
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
            <Box sx={{ float: 'right' }}>
                <TextFieldCustOm
                    sx={{ m: 1, mt: 3 }}
                    label="Rack ID"
                    select
                    style={{ width: '150px' }}
                    name="rack_id"
                >
                    {rackiddrop?.map((data) => (
                        <MenuItem
                            onClick={(e) => {
                                setRackId(data.rack_id)
                            }}
                            value={data.rack_id}
                        >
                            {data.rack_id}
                        </MenuItem>
                    ))}
                </TextFieldCustOm>
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
                        tray?.items?.length !== tray?.temp_array?.length ||
                        rackId == '' ||
                        description == '' ||
                        loading
                    }
                    style={{ backgroundColor: '#206CE2' }}
                    onClick={(e) => {
                        handleViewSpIssue(e)
                    }}
                >
                    Close
                </Button>
            </Box>
        </Container>
    )
}

export default SimpleMuiTable
