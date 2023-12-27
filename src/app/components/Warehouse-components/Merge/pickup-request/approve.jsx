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
} from '@mui/material'
import { axiosWarehouseIn } from '../../../../../axios'
// import jwt from "jsonwebtoken"
import jwt_decode from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'

export default function StickyHeadTable({ props }) {
    const [tray, setTray] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const navigate = useNavigate()
    const { trayId } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/pickup/request/approve/' + location + '/' + trayId
                    )
                    if (response.status === 200) {
                        setTray(response.data.data)
                    } else {
                        alert(response.data.message)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    const handelExvsAt = (e, code) => {
        e.preventDefault()
        navigate(
            '/wareshouse/wht/pickup/request/approve/item-verifying/' + code
        )
    }
    /******************************************************************************* */
    const handelIssue = async (e, type) => {
        try {
            let userStatus = await axiosWarehouseIn.post(
                '/sortingAgnetStatus/' +
                    tray?.[0]?.issued_user_name +
                    '/' +
                    tray?.[0]?.to_tray_for_pickup
            )
            if (userStatus.status === 200) {
                setLoading(true)
                let flag = false
                for (let x of tray) {
                    if (x.items.length !== x.actual_items.length) {
                        flag = true
                        break
                    }
                }
                if (flag == false) {
                    let obj = {
                        fromTray: tray[0].code,
                        toTray: tray[1].code,
                        username: tray[0]?.issued_user_name,
                        actUser: user.username,
                    }

                    let res = await axiosWarehouseIn.post(
                        '/pickup/issueToAgent',
                        obj
                    )

                    if (res.status == 200) {
                        alert(res.data.message)
                        setLoading(false)
                        navigate('/wareshouse/wht/pickup/request')
                    } else {
                        alert(res.data.message)
                    }
                } else {
                    setLoading(false)
                    alert('Please Issue all Tray')
                }
            } else {
                alert(userStatus.data.data)
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <Box
                sx={{
                    m: 3,
                }}
            >
                <Box
                    sx={{
                        float: 'right',
                    }}
                >
                    <h4>
                        Assigned Date -{' '}
                        {new Date(tray[0]?.requested_date).toLocaleString(
                            'en-GB',
                            {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            }
                        )}
                    </h4>
                    <h4>Agent Name- {tray[0]?.issued_user_name}</h4>
                </Box>
                <Box sx={{}}>
                    <Paper sx={{ width: '100%', overflow: 'auto' }}>
                        <TableContainer>
                            <Table
                                id="example"
                                style={{ width: '100%' }}
                                aria-label="sticky table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Record.NO</TableCell>
                                        <TableCell>Tray Id</TableCell>
                                        <TableCell>Rack Id</TableCell>
                                        <TableCell>Rack Display</TableCell>
                                        <TableCell>Tray Type</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tray.map((data, index) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{data.code}</TableCell>
                                            <TableCell>
                                                {data.rack_id}
                                            </TableCell>
                                            <TableCell>
                                                {data?.rackData?.[0]?.display}
                                            </TableCell>
                                            <TableCell>
                                                {data.type_taxanomy}
                                            </TableCell>
                                            <TableCell>
                                                {data.items.length}/{data.limit}
                                            </TableCell>
                                            <TableCell>
                                                {data.items.length !== 0 &&
                                                data?.sort_id ==
                                                    'Pickup Request sent to Warehouse'
                                                    ? 'Not Issued'
                                                    : data.items.length !== 0 &&
                                                      data?.sort_id !==
                                                          'Pickup Request sent to Warehouse'
                                                    ? 'Issued'
                                                    : 'Scanned'}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    disabled={
                                                        data.items.length !==
                                                            0 &&
                                                        data?.sort_id ==
                                                            'Pickup Request sent to Warehouse'
                                                            ? false
                                                            : data.items
                                                                  .length !==
                                                                  0 &&
                                                              data?.sort_id !==
                                                                  'Pickup Request sent to Warehouse'
                                                            ? 'Issued'
                                                            : 'Scanned'
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
                    </Paper>
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
            </Box>
        </>
    )
}
