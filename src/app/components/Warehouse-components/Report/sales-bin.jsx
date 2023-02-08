import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    TableCell,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Card,
    TablePagination,
} from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from '../../../../axios'

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
    const [page, setPage] = React.useState(0)
    const [item, setItem] = useState([])
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [data, setData] = useState([])
    const [sortDate, setSortDate] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setData((_) =>
            item
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((d, index) => {
                    d.id = page * rowsPerPage + index + 1
                    return d
                })
        )
    }, [page, item, rowsPerPage])

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            const { location } = jwt_decode(admin)
            const fetchData = async () => {
                try {
                    let res = await axiosWarehouseIn.post(
                        'salesBinItem/' + location
                    )
                    if (res.status == 200) {
                        setItem(res.data.data)
                    }
                } catch (error) {
                    alert(error)
                }
            }
            fetchData()
        } else {
            navigate('/')
        }
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const tableData = useMemo(() => {
        return (
            <Table id="example">
                <TableHead>
                    <TableRow>
                        <TableCell>Record.NO</TableCell>

                        <TableCell>UIC</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Added Agent Name</TableCell>
                        <TableCell>Added Time</TableCell>
                        <TableCell>From Tray ID</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((data, index) => (
                        <TableRow tabIndex={-1}>
                            <TableCell>{data.id}</TableCell>

                            <TableCell>{data.uic_code?.code}</TableCell>
                            <TableCell>{data.sales_bin_grade}</TableCell>

                            <TableCell>
                                {data.sales_bin_wh_agent_name}
                            </TableCell>
                            <TableCell>
                                {data?.sales_bin_date != undefined
                                    ? new Date(
                                          data?.sales_bin_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>{data.wht_tray}</TableCell>
                            <TableCell>{data.sales_bin_desctiption}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }, [item, data])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Report', path: '/' },
                        { name: 'Sales Bin' },
                    ]}
                />
            </div>

            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                {tableData}
            </Card>
            <TablePagination
                sx={{ px: 2 }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={item.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={({ target: { value } }) =>
                    setRowsPerPage(value)
                }
            />
        </Container>
    )
}

export default SimpleMuiTable
