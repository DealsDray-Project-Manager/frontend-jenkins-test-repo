import React, { useEffect, useState } from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Button,
    Card,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'
import { axiosWarehouseIn } from '../../../../../axios'
import { Breadcrumb } from 'app/components'
// import jwt from "jsonwebtoken"
import jwt_decode from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
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

export default function StickyHeadTable({ props }) {
    const [mmtTray, setMmtTray] = useState([])
    const [loading, setLoading] = useState(false)
    const [userAgent, setUserAgent] = useState('')
    const navigate = useNavigate()
    const { mmtTrayId } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/viewTrayFromAndTo/' + location + '/' + mmtTrayId
                    )
                    if (response.status === 200) {
                        setMmtTray(response.data.data)
                    } else {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: response?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                    }
                } else {
                    navigate('/')
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

    const handelExvsAt = (e, code) => {
        e.preventDefault()
        navigate('/wareshouse/request/approve/item-verifiying/' + code)
    }

    /******************************************************************************* */
    const handelIssue = async (e, type) => {
        try {
            setLoading(true)
            let res = await axiosWarehouseIn.post(
                '/sortingAgnetStatus/' +
                    mmtTray[0]?.issued_user_name +
                    '/' +
                    mmtTray?.[0]?.code
            )
            if (res.status === 200) {
                let flag = false
                for (let x of mmtTray) {
                    if (x.items.length !== x.actual_items.length) {
                        flag = true
                        break
                    }
                }
                if (flag == false) {
                    let obj = {
                        fromTray: mmtTray[0].code,
                        toTray: mmtTray[1].code,
                        username: mmtTray[0]?.issued_user_name,
                    }
                    let res = await axiosWarehouseIn.post(
                        '/mmtTraySendToSorting',
                        obj
                    )
                    if (res.status == 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: res?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                        setLoading(false)
                        navigate('/wareshouse/merge/request')
                    } else {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: res?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                    }
                } else {
                    setLoading(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'warning',
                        title: 'Please Issue All Tray',
                        confirmButtonText: 'Ok',
                    })
                }
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.data,
                    confirmButtonText: 'Ok',
                })
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

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Merge', path: '/' },
                        { name: 'Merge-Requests', path: '/' },
                        { name: 'Merge-Tray' },
                    ]}
                />
            </div>
            <Box
                sx={{
                    m: 3,
                }}
            >
                <Card>
                    <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <Box sx={{ml:3}}>
                    <Typography sx={{fontSize:'20px', fontWeight:'bold'}}>Tray</Typography>
                    </Box>
                    <Box
                    sx={{
                        float: 'right',
                        mr:2
                    }}
                >
                    <h4>
                        Assigned Date -{' '}
                        {new Date(
                            mmtTray[0]?.status_change_time
                        ).toLocaleString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })}
                    </h4>
                    <h4>Agent Name- {mmtTray[0]?.issued_user_name}</h4>
                </Box>
                    </Box>

                    
                <Box sx={{}}>
                    {/* <Paper sx={{ width: '100%', overflow: 'auto' }}> */}
                    
                        <TableContainer>
                            <Table
                                id="example"
                                style={{ width: '100%' }}
                                aria-label="sticky table"
                            >
                                <TableHead>
                                    <TableRow >
                                        <TableCell sx={{fontWeight:'bold', fontSize:'16px', p:2}}>Record.No</TableCell>
                                        <TableCell sx={{fontWeight:'bold', fontSize:'16px' }}>Tray Id</TableCell>
                                        <TableCell sx={{fontWeight:'bold', fontSize:'16px' }}>Rack Id</TableCell>
                                        <TableCell sx={{fontWeight:'bold', fontSize:'16px' }}>Tray Type</TableCell>
                                        <TableCell sx={{fontWeight:'bold', fontSize:'16px' }}>Quantity</TableCell>
                                        <TableCell sx={{fontWeight:'bold', fontSize:'16px' }}>Status</TableCell>
                                        <TableCell sx={{fontWeight:'bold', fontSize:'16px' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mmtTray.map((data, index) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                        >
                                            <TableCell sx={{p:4}}>{index + 1}</TableCell>
                                            <TableCell>{data.code}</TableCell>
                                            <TableCell>{data.rack_id}</TableCell>
                                            <TableCell>
                                                {data.type_taxanomy}
                                            </TableCell>
                                            <TableCell>
                                                {data.items.length}/{data.limit}
                                            </TableCell>
                                            <TableCell>
                                                {data.sort_id ==
                                                    'Sorting Request Sent To Warehouse' &&
                                                data.type_taxanomy == 'BOT'
                                                    ? 'Not Issued'
                                                    : data.type_taxanomy ==
                                                          'WHT' &&
                                                      data.items.length !== 0
                                                    ? 'Not Issued'
                                                    : data.type_taxanomy ==
                                                      'WHT'
                                                    ? 'New WHT'
                                                    : 'Issued'}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    disabled={
                                                        data.items.length ===
                                                        data.actual_items.length
                                                            ? true
                                                            : false
                                                    }
                                                    onClick={(e) =>
                                                        handelExvsAt(
                                                            e,
                                                            data.code
                                                        )
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            'green',
                                                    }}
                                                    component="span"
                                                >
                                                    {data.items.length ===
                                                    data.actual_items.length
                                                        ? 'Scanned'
                                                        : 'Issue'}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    {/* </Paper> */}
                </Box>
                <div style={{ float: 'right' }}>
                    <Box sx={{ float: 'right' }}>
                        <Button
                            sx={{ m: 3, mb: 9 }}
                            variant="contained"
                            disabled={loading}
                            style={{ backgroundColor: 'green' }}
                            onClick={(e) => {
                                handelIssue(e, 'Assigned to sorting agent')
                            }}
                        >
                            Issue To Agent
                        </Button>
                    </Box>
                </div>
                </Card>
            </Box>
        </Container>
    )
}
