import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    TextField,
    Icon,
    IconButton,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Box, styled } from '@mui/system'
import { SimpleCard, Breadcrumb } from 'app/components'
import { useNavigate } from 'react-router-dom'
import { axiosSuperAdminPrexo } from '../../../../axios'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import CircularProgress from '@mui/material/CircularProgress'
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx'

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
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

const PaginationTable = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)

    const [validateState, setValidateState] = useState(false)
    const [err, setErr] = useState({})
    const [loading, setLoading] = useState(false)
    const [brandCount, setBrandCount] = useState({})
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        item: [],
        totalPage: 0,
    })
    const navigate = useNavigate()
    const [item, setItem] = useState([])
    const [exFile, setExfile] = useState(null)

    const importExcel = () => {
        setLoading(true)
        readExcel(exFile)
    }

    useEffect(() => {
        setItem((_) =>
            pagination.item
                .slice(
                    (pagination.page - 1) * pagination.size,
                    pagination.page * pagination.size
                )
                .map((d, index) => {
                    d.id = (pagination.page - 1) * pagination.size + index + 1
                    return d
                })
        )
    }, [pagination.page, pagination.item])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post(
                    '/getMasterHighest/' + 'bag-master'
                )
                if (res.status == 200) {
                    setBrandCount(res.data.data)
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

    const readExcel = async (file) => {
        const promise = new Promise((resolve, reject) => {
            const filReader = new FileReader()
            filReader.readAsArrayBuffer(file)
            filReader.onload = (e) => {
                const bufferArray = e.target.result
                const wb = XLSX.read(bufferArray, { cellDates: true })
                const wsname = wb.SheetNames[0]
                const ws = wb.Sheets[wsname]
                const data = XLSX.utils.sheet_to_json(ws)
                resolve(data)
            }
            filReader.onerror = (error) => {
                reject(error)
            }
        })
        const data = await promise
        setPagination((p) => ({
            ...p,
            page: 1,
            item: data.map((d, index) => toLowerKeys(d, brandCount, index)),
            totalPage: Math.ceil(data.length / p.size),
        }))
        setLoading(false)
    }

    function toLowerKeys(obj) {
        return Object.keys(obj).reduce((accumulator, key) => {
            accumulator.created_at = Date.now()
            accumulator.prefix = 'bag-master'
            accumulator.sort_id = 'No Status'
            accumulator[key.toLowerCase().split('-').join('_')] = obj[key]
            return accumulator
        }, {})
    }
    const validateData = async (e) => {
        try {
            let count1 = 0
            let count2 = 0
            setLoading(true)
            for (let x of pagination.item) {
                x.bag_id = ''
                if (x.cpc == 'Gurgaon_122016' || x.cpc == "Gurgaon_122003") {
                    x.bag_id = 'DDB-GGN-' + (brandCount.bagGurgaon + count1)
                    count1++
                } else {
                    x.bag_id = 'DDB-BLR-' + (brandCount.bagBanglore + count2)
                    count2++
                }
            }
            let res = await axiosSuperAdminPrexo.post(
                '/bulkValidationBag',
                pagination.item
            )
            if (res.status == 200) {
                setValidateState(true)
               
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setLoading(false)
                        setErr({})
                    }
                })
            } else {
                setErr(res.data.data)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Check Errors',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setLoading(false)
                    }
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
    const handelSubmit = async (e) => {
        try {
            setLoading(true)
            let res = await axiosSuperAdminPrexo.post(
                '/createBulkBag',
                pagination.item
            )
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setLoading(false)
                        navigate('/sup-admin/bag')
                    }
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
            setLoading(false)
        }
    }
    // ----------------------------------------------------------------------------------------------------------------------------
    const updateFieldChanged = (bag_id) => (e) => {
        setValidateState(false)
        setPagination((p) => ({
            ...p,
            item: pagination.item.map((data, i) => {
                if (data.id === bag_id) {
                    return { ...data, [e.target.name]: e.target.value }
                } else {
                    return data
                }
            }),
        }))
    }
    // DATA DELETE FROM ARRAY
    const handelDelete = (bag_id) => {
        setValidateState(false)
        setPagination((p) => ({
            ...p,
            item: pagination.item.filter((item) => item.bag_id != bag_id),
        }))
    }

    const StyledLoading = styled('div')(() => ({
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            width: 'auto',
            height: '25px',
        },
        '& .circleProgress': {
            position: 'absolute',
            left: -7,
            right: 0,
            top: 'calc(50% - 25px)',
        },
    }))

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Bags', path: '/' },
                        { name: 'Bulk-Bag' },
                    ]}
                />
            </div>
            <SimpleCard title="Bulk Bag">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <h4>Upload file</h4>

                    <Box>
                        <Button
                            sx={{ mb: 2 }}
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate('/sup-admin/bag')}
                        >
                            Back to list
                        </Button>
                        <Button
                            sx={{ mb: 2, ml: 2 }}
                            variant="contained"
                            color="primary"
                            href={
                                process.env.PUBLIC_URL +
                                '/bulk-bag-sheet-sample.xlsx'
                            }
                            download
                        >
                            Download Sample Sheet
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        mb: 5,
                    }}
                >
                    <TextField
                        size="small"
                        inputProps={{ accept: '.csv,.xlsx,.xls' }}
                        onChange={(e) => {
                            setExfile(e.target.files[0])
                        }}
                        variant="outlined"
                        type="file"
                    />
                    {item.length == 0 ? (
                        <Button
                            variant="contained"
                            disabled={loading || exFile == null}
                            sx={{ mt: 3, mb: 1 }}
                            onClick={(e) => {
                                importExcel(e)
                            }}
                        >
                            Import
                        </Button>
                    ) : validateState ? (
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                            disabled={loading}
                            style={{ backgroundColor: '#206CE2' }}
                            onClick={(e) => {
                                handelSubmit(e)
                            }}
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            disabled={Object.keys(brandCount).length == 0 || loading}
                            sx={{ mt: 3, mb: 1 }}
                            onClick={(e) => {
                                validateData(e)
                            }}
                        >
                            Validate Data
                        </Button>
                    )}
                </Box>
                <StyledTable>
                    {item.length != 0 && loading !== true ? (
                        <>
                            <StyledTable>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>S.NO</TableCell>
                                        <TableCell>CPC</TableCell>
                                        <TableCell>Warehouse</TableCell>
                                        <TableCell>Bag Category</TableCell>
                                        <TableCell>Display Name</TableCell>
                                        <TableCell>Bag Limit</TableCell>
                                        <TableCell>Bag Display</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.map((data, index) => (
                                        <TableRow tabIndex={-1}>
                                            <TableCell>{data.id}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.id
                                                    )}
                                                    id="outlined-password-input"
                                                    type="text"
                                                    name="cpc"
                                                    value={data.cpc}
                                                />
                                                {err?.cpc?.includes(data.cpc) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.cpc == undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.cpc == '') ? (
                                                    <ClearIcon
                                                        style={{ color: 'red' }}
                                                    />
                                                ) : Object.keys(err).length !=
                                                  0 ? (
                                                    <DoneIcon
                                                        style={{
                                                            color: 'green',
                                                        }}
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                                {err?.cpc?.includes(
                                                    data.cpc
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Cpc Does Not Exist
                                                    </p>
                                                ) : (Object.keys(err).length !=
                                                      0 &&
                                                      data.cpc == undefined) ||
                                                  (Object.keys(err).length !=
                                                      0 &&
                                                      data.cpc == '') ? (
                                                    <p style={{ color: 'red' }}>
                                                        Cpc Does Not Exist
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.id
                                                    )}
                                                    id="outlined-password-input"
                                                    type="text"
                                                    name="warehouse"
                                                    value={data.warehouse}
                                                />
                                                {err?.warehouse_does_not_exist?.includes(
                                                    data.bag_id
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.warehouse ==
                                                        undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.warehouse == '') ? (
                                                    <ClearIcon
                                                        style={{ color: 'red' }}
                                                    />
                                                ) : Object.keys(err).length !=
                                                  0 ? (
                                                    <DoneIcon
                                                        style={{
                                                            color: 'green',
                                                        }}
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                                {err?.warehouse_does_not_exist?.includes(
                                                    data.bag_id
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Warehouse Does Not Exist
                                                    </p>
                                                ) : (Object.keys(err).length !=
                                                      0 &&
                                                      data.warehouse ==
                                                          undefined) ||
                                                  (Object.keys(err).length !=
                                                      0 &&
                                                      data.warehouse == '') ? (
                                                    <p style={{ color: 'red' }}>
                                                        Warehouse Does Not Exist
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.id
                                                    )}
                                                    id="outlined-password-input"
                                                    type="text"
                                                    name="bag_category"
                                                    value={data.bag_category?.toString()}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.id
                                                    )}
                                                    id="outlined-password-input"
                                                    type="text"
                                                    name="bag_display_name"
                                                    value={data.bag_display_name?.toString()}
                                                />
                                                {err?.bag_display_name_is_duplicate?.includes(
                                                    data.bag_display_name
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.bag_display_name ==
                                                        undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.bag_display_name ==
                                                        '') ? (
                                                    <ClearIcon
                                                        style={{ color: 'red' }}
                                                    />
                                                ) : Object.keys(err).length !=
                                                  0 ? (
                                                    <DoneIcon
                                                        style={{
                                                            color: 'green',
                                                        }}
                                                    />
                                                ) : (
                                                    ''
                                                )}

                                                {err?.bag_display_name_is_duplicate?.includes(
                                                    data.bag_display_name
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        {' '}
                                                        Duplicate Bag Display
                                                        Name{' '}
                                                    </p>
                                                ) : (Object.keys(err).length !=
                                                      0 &&
                                                      data.bag_display_name ==
                                                          undefined) ||
                                                  (Object.keys(err).length !=
                                                      0 &&
                                                      data.bag_display_name ==
                                                          '') ? (
                                                    <p style={{ color: 'red' }}>
                                                        Required*
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.id
                                                    )}
                                                    id="outlined-password-input"
                                                    type="text"
                                                    name="bag_limit"
                                                    value={data.bag_limit}
                                                />
                                                {err?.limit?.includes(
                                                    data.bag_id
                                                ) ? (
                                                    <ClearIcon
                                                        style={{ color: 'red' }}
                                                    />
                                                ) : Object.keys(err).length !=
                                                  0 ? (
                                                    <DoneIcon
                                                        style={{
                                                            color: 'green',
                                                        }}
                                                    />
                                                ) : null}
                                                {err?.limit?.includes(
                                                    data.bag_id
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Not Acceptable
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.id
                                                    )}
                                                    id="outlined-password-input"
                                                    type="text"
                                                    name="bag_display"
                                                    value={data.bag_display}
                                                />
                                                {err?.bag_display_is_duplicate?.includes(
                                                    data.bag_display
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.bag_display ==
                                                        undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.bag_display == '') ? (
                                                    <ClearIcon
                                                        style={{ color: 'red' }}
                                                    />
                                                ) : Object.keys(err).length !=
                                                  0 ? (
                                                    <DoneIcon
                                                        style={{
                                                            color: 'green',
                                                        }}
                                                    />
                                                ) : (
                                                    ''
                                                )}

                                                {err?.bag_display_is_duplicate?.includes(
                                                    data.bag_display
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        {' '}
                                                        Duplicate Bag Display
                                                    </p>
                                                ) : (Object.keys(err).length !=
                                                      0 &&
                                                      data.bag_display ==
                                                          undefined) ||
                                                  (Object.keys(err).length !=
                                                      0 &&
                                                      data.bag_display ==
                                                          '') ? (
                                                    <p style={{ color: 'red' }}>
                                                        Required*
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {(Object.keys(err).length !=
                                                    0 &&
                                                    data.cpc == undefined) ||
                                                err?.limit?.includes(
                                                    data.bag_id
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.cpc == '') ||
                                                err?.cpc?.includes(data.cpc) ==
                                                    true ||
                                                (Object.keys(err).length != 0 &&
                                                    data.warehouse ==
                                                        undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.warehouse == '') ||
                                                (Object.keys(err).length != 0 &&
                                                    data.bag_display_name ==
                                                        undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.bag_display_name ==
                                                        '') ||
                                                (Object.keys(err).length != 0 &&
                                                    data.bag_display ==
                                                        undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.bag_display == '') ||
                                                err?.warehouse_does_not_exist?.includes(
                                                    data.bag_id
                                                ) == true ||
                                                err?.bag_id_is_duplicate?.includes(
                                                    data.bag_id
                                                ) == true ||
                                                err?.bag_display_name_is_duplicate?.includes(
                                                    data.bag_display_name
                                                ) == true ||
                                                err?.bag_display_is_duplicate?.includes(
                                                    data.bag_display
                                                ) == true ? (
                                                    <IconButton>
                                                        <Icon
                                                            sx={{
                                                                ml: 2,
                                                            }}
                                                            color="error"
                                                            onClick={() => {
                                                                if (
                                                                    window.confirm(
                                                                        'You Want to Remove?'
                                                                    )
                                                                ) {
                                                                    handelDelete(
                                                                        data.bag_id
                                                                    )
                                                                }
                                                            }}
                                                        >
                                                            delete
                                                        </Icon>
                                                    </IconButton>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </StyledTable>
                        </>
                    ) : item.length != 0 ? (
                        <StyledLoading>
                            <Box position="relative">
                                <img
                                    src="/assets/images/logo-circle.svg"
                                    alt=""
                                />
                                <CircularProgress className="circleProgress">
                                    <p>Please Wait...</p>
                                </CircularProgress>
                            </Box>
                        </StyledLoading>
                    ) : null}
                    {pagination.item.length && loading != true ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                mt: 1,
                                mr: 3,
                                ml: 3,
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{ m: 1 }}
                                disabled={pagination.page === 1}
                                style={{ backgroundColor: '#206CE2' }}
                                onClick={(e) =>
                                    setPagination((p) => ({
                                        ...p,
                                        page: --p.page,
                                    }))
                                }
                            >
                                Previous
                            </Button>

                            <h6 style={{ marginTop: '19px' }}>
                                {pagination.page}/{pagination.totalPage}
                            </h6>
                            <Button
                                variant="contained"
                                sx={{ m: 1 }}
                                disabled={
                                    pagination.page === pagination.totalPage
                                }
                                style={{ backgroundColor: '#206CE2' }}
                                onClick={(e) =>
                                    setPagination((p) => ({
                                        ...p,
                                        page: ++p.page,
                                    }))
                                }
                            >
                                Next
                            </Button>
                        </Box>
                    ) : null}
                </StyledTable>
            </SimpleCard>
        </Container>
    )
}

export default PaginationTable
