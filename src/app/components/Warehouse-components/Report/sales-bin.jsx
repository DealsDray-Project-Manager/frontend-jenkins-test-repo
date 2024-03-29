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
    TextField,
    Box,
    Button,
    Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { axiosWarehouseIn } from '../../../../axios'
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

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '150%',
    whiteSpace: 'pre',
    '& thead': {
        '& th:first-of-type': {
            paddingLeft: 16,
        },
    },
    '& td': {
        borderBottom: 'none',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
    borderCollapse: 'separate',
    borderSpacing: '0',
    '& th, & td': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)', // Lighter border color
        borderRight: '1px solid rgba(0, 0, 0, 0.2)',
        padding: '8px',
        textAlign: 'left',
    },
    '& th:last-child, & td:last-child': {
        borderRight: 'none',
    },
}))

const SimpleMuiTable = () => {
    const [page, setPage] = React.useState(0)
    const [item, setItem] = useState([])
    const [rowsPerPage, setRowsPerPage] = React.useState(100)
    const [data, setData] = useState([])
    const [tableMessage, setTableMessage] = useState('')
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
                        '/salesBinItem/' + location
                    )
                    if (res.status == 200) {
                        if (res.data.data?.length == 0) {
                            setTableMessage('Sorry no records found')
                        } else {
                            setItem(res.data.data)
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
        } else {
            navigate('/')
        }
    }, [])

    const download = (e) => {
        const fileExtension = '.xlsx'
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const ws = XLSX.utils.json_to_sheet(item, { header: [] })

        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, 'sales-bin' + fileExtension)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const searchItem = async (inputData) => {
        try {
            let res = await axiosWarehouseIn.post(
                '/salesBinItem/search/' + inputData
            )
            if (res.status == 200) {
                setRowsPerPage(10)
                setPage(0)
                setItem(res.data.data)
            } else {
                setTableMessage(res.data.message)
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

    const tableData = useMemo(() => {
        return (
            <ProductTable elevation={6}>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{ fontSize: '16px', fontWeight: 'bold', p: 2 }}
                        >
                            Record.NO
                        </TableCell>
                        <TableCell
                            sx={{ fontSize: '16px', fontWeight: 'bold' }}
                        >
                            UIC
                        </TableCell>
                        <TableCell
                            sx={{ fontSize: '16px', fontWeight: 'bold' }}
                        >
                            Grade
                        </TableCell>
                        <TableCell
                            sx={{ fontSize: '16px', fontWeight: 'bold' }}
                        >
                            Added User Name
                        </TableCell>
                        <TableCell
                            sx={{ fontSize: '16px', fontWeight: 'bold' }}
                        >
                            Added Time
                        </TableCell>
                        <TableCell
                            sx={{ fontSize: '16px', fontWeight: 'bold' }}
                        >
                            From Tray ID
                        </TableCell>
                        <TableCell
                            sx={{ fontSize: '16px', fontWeight: 'bold' }}
                        >
                            Description
                        </TableCell>
                    </TableRow>
                </TableHead>
                {tableMessage !== '' ? (
                    <h4 style={{ textAlign: 'center' }}>{tableMessage}</h4>
                ) : (
                    <TableBody>
                        {data.map((data, index) => (
                            <TableRow tabIndex={-1}>
                                <TableCell sx={{ paddingLeft: '30px' }}>
                                    {data.id}
                                </TableCell>

                                <TableCell>{data.uic_code}</TableCell>
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
                                <TableCell>
                                    {data.sales_bin_desctiption}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </ProductTable>
        )
    }, [item, data, tableMessage])

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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <TextField
                    onChange={(e) => {
                        searchItem(e.target.value)
                    }}
                    label="Search"
                    variant="outlined"
                    sx={{ mb: 1 }}
                />
                <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                        download(e)
                    }}
                >
                    Download
                </Button>
            </Box>
            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                {tableData}
            </Card>
            <TablePagination
                sx={{ px: 2 }}
                rowsPerPageOptions={[50, 100, 150]}
                component="div"
                count={item.length}
                rowsPerPage={rowsPerPage}
                page={page}
                showFirstButton="true"
                showLastButton="true"
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
