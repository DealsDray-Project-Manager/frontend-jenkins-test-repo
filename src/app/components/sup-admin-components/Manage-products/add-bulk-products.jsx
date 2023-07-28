import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button,
    TextField,
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import * as XLSX from 'xlsx'
import React, { useState, useEffect } from 'react'
import { Box, styled } from '@mui/system'
import { SimpleCard, Breadcrumb } from 'app/components'
import { useNavigate } from 'react-router-dom'
import { axiosSuperAdminPrexo } from '../../../../axios'
import CircularProgress from '@mui/material/CircularProgress'
import Swal from 'sweetalert2'

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

const AddBulkProduct = () => {
    const navigate = useNavigate()
    const [validateState, setValidateState] = useState(false)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState({})
    const [item, setItem] = useState([])
    const [exFile, setExfile] = useState(null)
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        item: [],
    })

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

    const importExcel = () => {
        setLoading(true)
        readExcel(exFile)
    }

    // READ EXCEL FILLE
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
            item: data.map((d, index) => toLowerKeys(d)),
            totalPage: Math.ceil(data.length / p.size),
        }))
        setLoading(false)
    }
    // EXCEL FILE HEADER CONVERT TO LOWERCASE AND GENERATE MUIC CODE
    function toLowerKeys(obj) {
        return Object.keys(obj).reduce((accumulator, key, index) => {
            let muis_code = ''
            let alphebet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            let numbers = '123456789'
            for (var i = 0; i < 2; i++) {
                muis_code += alphebet.charAt(
                    Math.floor(Math.random() * alphebet.length)
                )
            }
            for (var i = 0; i < 3; i++) {
                muis_code += numbers.charAt(
                    Math.floor(Math.random() * numbers.length)
                )
            }
            accumulator.muic = muis_code
            accumulator.created_at = Date.now()
            accumulator.created_by = 'super-admin'
            accumulator[key.toLowerCase().split('-').join('_')] = obj[key]
            return accumulator
        }, {})
    }
    // API FOR VALIDATE THE DATA
    const validateData = async (e) => {
        try {
            setLoading(true)
            let res = await axiosSuperAdminPrexo.post(
                '/bulkValidationProduct',
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
                        setErr({})
                        setValidateState(true)
                        setLoading(false)
                    }
                })
            } else {
                setErr(res.data.data)
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Check Errors',
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
    // CREATE PRODUCTS API
    const handelSubmit = async (e) => {
        try {
            setLoading(true)
            let res = await axiosSuperAdminPrexo.post(
                '/createproducts',
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
                        navigate('/sup-admin/products')
                    }
                })
            } else {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                })
            }
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.messag,
            })
        }
    }
    const updateFieldChanged = (index) => (e) => {
        setValidateState(false)
        setPagination((p) => ({
            ...p,
            item: pagination.item.map((data, i) => {
                if (index === data.muic) {
                    return { ...data, [e.target.name]: e.target.value }
                } else {
                    return data
                }
            }),
        }))
    }
    // DATA DELETE FROM ARRAY
    const handelDelete = (muic) => {
        setValidateState(false)
        setPagination((p) => ({
            ...p,
            item: pagination.item.filter((item) => item.muic != muic),
        }))
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Products', path: '/' },
                        { name: 'Bulk-Product' },
                    ]}
                />
            </div>
            <SimpleCard title="Bulk Product">
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
                            color="primary"
                            onClick={() => navigate('/sup-admin/products')}
                        >
                            Back to list
                        </Button>
                        <Button
                            sx={{ mb: 2, ml: 2 }}
                            variant="contained"
                            color="primary"
                            href={
                                process.env.PUBLIC_URL +
                                '/bulk -product-sheet-sample.xlsx'
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
                            disabled={loading}
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
                                        <TableCell>Vendor SKU ID</TableCell>
                                        <TableCell>Brand Name</TableCell>
                                        <TableCell>Model Name</TableCell>
                                        <TableCell>Jack Type</TableCell>
                                        <TableCell>Vendor Name</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.map((data) => (
                                        <TableRow key={data.muic} tabIndex={-1}>
                                            <TableCell>{data.id}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.muic
                                                    )}
                                                    type="text"
                                                    name="vendor_sku_id"
                                                    value={data.vendor_sku_id?.toString()}
                                                />
                                                {err?.duplicate_vendor_iD?.includes(
                                                    data.vendor_sku_id
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
                                                ) : (
                                                    ''
                                                )}

                                                {err?.duplicate_vendor_iD?.includes(
                                                    data.vendor_sku_id
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Duplicate Vendor Sku Id
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.muic
                                                    )}
                                                    type="text"
                                                    name="brand_name"
                                                    value={data.brand_name?.toString()}
                                                />
                                                {err?.brand_name?.includes(
                                                    data.brand_name?.toString()
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
                                                ) : (
                                                    ''
                                                )}

                                                {err?.brand_name?.includes(
                                                    data.brand_name?.toString()
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Brand Name Does Not
                                                        Exist
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.muic?.toString()
                                                    )}
                                                    type="text"
                                                    name="model_name"
                                                    value={data.model_name?.toString()}
                                                />
                                                {err?.model_name?.includes(
                                                    data.model_name?.toString()
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
                                                ) : (
                                                    ''
                                                )}

                                                {err?.model_name?.includes(
                                                    data.model_name?.toString()
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Duplicate Model Name
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.muic?.toString()
                                                    )}
                                                    type="text"
                                                    name="jack_type"
                                                    value={data.jack_type?.toString()}
                                                />
                                                {err?.jack_type?.includes(
                                                    data.jack_type?.toString()
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
                                                ) : (
                                                    ''
                                                )}
                                                {err?.jack_type?.includes(
                                                    data.jack_type?.toString()
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Invalid jack type
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.muic
                                                    )}
                                                    type="text"
                                                    name="vendor_name"
                                                    value={data.vendor_name?.toString()}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {err?.duplicate_vendor_iD?.includes(
                                                    data.vendor_sku_id?.toString()
                                                ) == true ||
                                                err?.brand_name?.includes(
                                                    data.brand_name?.toString()
                                                ) == true ||
                                                err?.model_name?.includes(
                                                    data.model_name?.toString()
                                                ) == true ? (
                                                    <Button
                                                        sx={{
                                                            ml: 2,
                                                        }}
                                                        variant="contained"
                                                        style={{
                                                            backgroundColor:
                                                                'red',
                                                        }}
                                                        component="span"
                                                        onClick={() => {
                                                            if (
                                                                window.confirm(
                                                                    'You Want to Remove?'
                                                                )
                                                            ) {
                                                                handelDelete(
                                                                    data.muic
                                                                )
                                                            }
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
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
                    {pagination.item.length != 0 && loading != true ? (
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

export default AddBulkProduct
