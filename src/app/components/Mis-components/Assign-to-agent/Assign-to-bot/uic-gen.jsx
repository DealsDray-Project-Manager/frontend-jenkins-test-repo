import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'
import { styled } from '@mui/system'
import {
    Button,
    TableCell,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Card,
    TablePagination,
    Checkbox,
    Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosMisUser } from '../../../../../axios'
import { useParams } from 'react-router-dom'

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
    const navigate = useNavigate()
    const [isCheckAll, setIsCheckAll] = useState(false)
    const [isCheck, setIsCheck] = useState([])
    const [isAlive, setIsAlive] = useState(true)
    const { bagId } = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosMisUser.post('/getBagItemWithUic/' + bagId)
                if (res.status == 200) {
                    setItem(res.data.data)
                } else if (res.status == 202) {
                    alert(res.data.message)
                    navigate(-1)
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [isAlive])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const ProductTable = styled(Table)(() => ({
        minWidth: 750,
        width: 2000,
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
    }))

    const handelUicGen = (e) => {
        e.preventDefault()
        if (isCheck.length == 0) {
            alert('Please Select Atleast One Delivered Data')
        } else {
            setLoading(true)
            let token = localStorage.getItem('prexo-authentication')
            if (token) {
                const { user_name } = jwt_decode(token)

                const addUic = async () => {
                    let count = 0
                    for (let i = 0; i < isCheck.length; i++) {
                        if (
                            item?.[0]?.delivery?.[isCheck[i]].uic_status !=
                            'Pending'
                        ) {
                            alert('Already UIC Created')

                            break
                        }
                        try {
                            let obj = {
                                _id: item?.[0]?.delivery?.[isCheck[i]]._id,
                                email: user_name,
                                created_at: Date.now(),
                            }
                            let res = await axiosMisUser.post(
                                '/addUicCode',
                                obj
                            )
                            if (res.status == 200) {
                            } else {
                                alert(res.data.message)
                            }
                        } catch (error) {
                            alert(error)
                        }
                        count++
                    }
                    if (count == isCheck.length) {
                        alert('Successfully Generated')
                        setLoading(false)
                        setIsCheck([])
                        setIsAlive((isAlive) => !isAlive)
                    }
                }
                addUic()
            }
        }
    }

    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToCSV = (fileName) => {
        if (isCheck.length == 0) {
            alert('Please Select Atleast One Data')
        } else {
            let arr = []
            let status = false
            let changeStatus = async () => {
                for (let i = 0; i < isCheck.length; i++) {
                    if (
                        item?.[0]?.delivery?.[isCheck[i]].uic_code == undefined
                    ) {
                        alert('Please Generate UIC')
                        status = true
                        break
                    } else {
                        try {
                            let res = await axiosMisUser.post(
                                '/changeUicStatus/' +
                                    item?.[0]?.delivery?.[isCheck[i]]?._id
                            )
                            if (res.status == 200) {
                            } else {
                                alert(res.data.message)
                            }
                        } catch (error) {
                            alert(error)
                        }
                        let obj = {
                            UIC: item?.[0]?.delivery?.[isCheck[i]]?.uic_code
                                ?.code,
                            IMEI: item?.[0]?.delivery?.[
                                isCheck[i]
                            ]?.imei?.replace(/[^a-zA-Z0-9 ]/g, ''),
                            Model: item?.[0]?.delivery?.[
                                isCheck[i]
                            ]?.order_old_item_detail?.replace(
                                /[^a-zA-Z0-9 ]/g,
                                ' '
                            ),
                        }

                        arr.push(obj)
                    }
                }
                if (status == false) {
                    download(arr, fileName)
                }
            }
            changeStatus()
        }
    }
    function download(arr, fileName) {
        const ws = XLSX.utils.json_to_sheet(arr)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
        setIsCheck([])
        setIsAlive((isAlive) => !isAlive)
    }

    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll)
        setIsCheck(item?.[0]?.delivery?.map((li, index) => index.toString()))
        if (isCheckAll) {
            setIsCheck([])
        }
    }
    const handleClick = (e) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }

    const tableData = useMemo(() => {
        return (
            <ProductTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {' '}
                            <Checkbox
                                onClick={(e) => {
                                    handleSelectAll()
                                }}
                                checked={
                                    item?.[0]?.delivery?.length ==
                                    isCheck.length
                                        ? true
                                        : false
                                }
                            />{' '}
                            Select All
                        </TableCell>
                        <TableCell>S.NO</TableCell>
                        <TableCell>UIC Status</TableCell>
                        <TableCell>UIC Generated Admin</TableCell>
                        <TableCell>UIC Generated Time</TableCell>
                        <TableCell>UIC Code</TableCell>
                        <TableCell>UIC Downloaded Time</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Actual Delivery Date</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>Old Item Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {item?.[0]?.delivery?.map((data, index) => (
                        <TableRow tabIndex={-1}>
                            <TableCell>
                                {' '}
                                <Checkbox
                                    onClick={(e) => {
                                        handleClick(e)
                                    }}
                                    id={index}
                                    key={index}
                                    checked={isCheck.includes(
                                        index?.toString()
                                    )}
                                />
                            </TableCell>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell
                                style={
                                    data?.uic_status == 'Pending'
                                        ? { color: 'red' }
                                        : data?.uic_status == 'Created'
                                        ? { color: 'orange' }
                                        : { color: 'green' }
                                }
                            >
                                {data?.uic_status}
                            </TableCell>
                            <TableCell>{data?.uic_code?.user}</TableCell>
                            <TableCell>
                                {' '}
                                {data?.uic_code?.created_at == undefined
                                    ? ''
                                    : new Date(
                                          data?.uic_code?.created_at
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })}
                            </TableCell>
                            <TableCell>{data?.uic_code?.code}</TableCell>
                            <TableCell>
                                {data?.download_time == undefined
                                    ? ''
                                    : new Date(
                                          data?.download_time
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })}
                            </TableCell>
                            <TableCell>{data.order_id?.toString()}</TableCell>
                            <TableCell>
                                {data.tracking_id?.toString()}
                            </TableCell>
                            <TableCell>
                                {new Date(data?.delivery_date).toLocaleString(
                                    'en-GB',
                                    {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    }
                                )}
                            </TableCell>
                            <TableCell>
                                {new Date(data.order_order_date).toLocaleString(
                                    'en-GB',
                                    {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    }
                                )}
                            </TableCell>
                            <TableCell>{data.imei?.toString()}</TableCell>
                            <TableCell>{data.item_id?.toString()}</TableCell>
                            <TableCell>
                                {data.order_old_item_detail?.toString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ProductTable>
        )
    }, [isCheck, item])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'UIC-Manage', path: '/pages' },
                        { name: 'UIC-Not-Generated' },
                    ]}
                />
            </div>
            <Box>
                <Button
                    variant="contained"
                    sx={{ mb: 2, m: 1 }}
                    disabled={loading}
                    style={{ backgroundColor: 'primery' }}
                    onClick={(e) => {
                        handelUicGen(e)
                    }}
                >
                    Generate UIC
                </Button>
                <Button
                    variant="contained"
                    sx={{ mb: 2, m: 1 }}
                    onClick={(e) => {
                        exportToCSV('UIC-Printing-Sheet')
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
