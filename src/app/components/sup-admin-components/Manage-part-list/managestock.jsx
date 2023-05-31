import React, { useEffect, useState } from 'react'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    TextField,
    MenuItem,
    IconButton,
    Icon,
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import * as XLSX from 'xlsx'
import { Box, styled } from '@mui/system'
import { SimpleCard, Breadcrumb } from 'app/components'
import { useNavigate, useLocation } from 'react-router-dom'
import { axiosSuperAdminPrexo } from '../../../../axios'
import CircularProgress from '@mui/material/CircularProgress'
import Swal from 'sweetalert2'
import * as FileSaver from 'file-saver'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

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

const AddBulkPart = () => {
    const navigate = useNavigate()
    const [validateState, setValidateState] = useState(false)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState({})
    const [partCount, setPartId] = useState(0)
    const { state } = useLocation()
    const [item, setItem] = useState([])
    const [exFile, setExfile] = useState(null)
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        item: [],
    })

    useEffect(() => {
        try {
            const fetchData = async () => {
                let res = await axiosSuperAdminPrexo.post('/getBrandIdHighest')
                if (res.status == 200) {
                    console.log(res)
                    setPartId(res.data.partCount)
                }
            }
            fetchData()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }, [])
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
        readExcel(exFile)
    }

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
            item: data.map((d, index) => toLowerKeys(d, partCount, index)),
            totalPage: Math.ceil(data.length / p.size),
        }))
    }
    function toLowerKeys(obj, count, id) {
        return Object.keys(obj).reduce((accumulator, key) => {
            let num = parseInt(count.substring(2)) + id
            let updatedStr =
                count.substring(0, 2) + num.toString().padStart(6, '0')
            obj.PARTID = updatedStr
            accumulator.code = updatedStr
            accumulator[key.toLowerCase().split('-').join('_')] = obj[key]
            accumulator.type = 'part-list'
            return accumulator
        }, {})
    }
    // DOWNLOAD PART LIST
    const download = (e) => {
        let arr = []
        for (let x of state.partList) {
            let obj = {
                part_code: x.part_code,
                name: x.name,
                color: x.color,
                technical_qc: x.technical_qc,
                description: x.description,
                available_stock: x.avl_stock,
                stock_update: '',
            }
            arr.push(obj)
        }
        const fileExtension = '.xlsx'
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const ws = XLSX.utils.json_to_sheet(arr)

        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, 'manage-sotck' + fileExtension)
    }

    const updateFieldChanged = (id) => (e) => {
        setValidateState(false)
        setPagination((p) => ({
            ...p,
            item: pagination.item.map((data, i) => {
                if (data.id === id) {
                    return { ...data, [e.target.name]: e.target.value }
                } else {
                    return data
                }
            }),
        }))
    }

    const handelDelete = (id) => {
        setValidateState(false)
        setPagination((p) => ({
            ...p,
            item: pagination.item.filter((item) => item.id != id),
        }))
    }

    const validateData = async (e) => {
        try {
            setLoading(true)
            let res = await axiosSuperAdminPrexo.post(
                '/partlist/manageStock/bulkValidation',
                pagination.item
            )
            if (res.status == 200) {
                setValidateState(true)
                setErr({})
                setLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                })
            } else {
                setLoading(false)
                setErr(res.data.data)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res.data.message,
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
    const handelSubmit = async (e) => {
        try {
            setLoading(true)
            let res = await axiosSuperAdminPrexo.post(
                '/partlist/manageStock/update',
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
                        navigate(
                            '/sup-admin/view-part-list/managestock/report',
                            {
                                state: {
                                    validatedSuccess: res.data.count,
                                },
                            }
                        )
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
                text: error.response.data.message,
            })
        }
    }

    // console.log(item)

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Parts-list', path: '/' },
                        { name: 'Manage-stock' },
                    ]}
                />
            </div>
            <SimpleCard title="Manage stock">
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
                            onClick={() =>
                                navigate('/sup-admin/view-part-list')
                            }
                        >
                            Back to Spare Part list
                        </Button>
                        <Button
                            sx={{ mb: 2, ml: 2 }}
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                download(e)
                            }}
                            download
                        >
                            Download available stock
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
                        onChange={(e) => {
                            setExfile(e.target.files[0])
                        }}
                        inputProps={{ accept: '.csv,.xlsx,.xls' }}
                        variant="outlined"
                        type="file"
                    />
                    {item.length == 0 ? (
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                            disabled={loading || exFile == null}
                            style={{ backgroundColor: '#206CE2' }}
                            onClick={(e) => {
                                importExcel()
                            }}
                        >
                            Import
                        </Button>
                    ) : validateState ? (
                        <Button
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 1 }}
                            style={{ backgroundColor: '#206CE2' }}
                            onClick={(e) => {
                                handelSubmit()
                            }}
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                            disabled={loading}
                            style={{ backgroundColor: '#206CE2' }}
                            onClick={(e) => {
                                validateData(e)
                            }}
                        >
                            Validate Data
                        </Button>
                    )}
                </Box>
                {item.length != 0 && loading !== true ? (
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sl No</TableCell>
                                <TableCell>Part Number</TableCell>
                                <TableCell>Part Name</TableCell>
                                <TableCell>Part Color</TableCell>
                                <TableCell>Technical Qc</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Available Stock</TableCell>
                                <TableCell>Update Stock</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {item.map((data) => (
                                <TableRow tabIndex={-1}>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>
                                        <TextField
                                            onChange={updateFieldChanged(
                                                data.id
                                            )}
                                            id="outlined-password-input"
                                            type="text"
                                            name="part_code"
                                            value={data.part_code?.toString()}
                                        />
                                        {err?.part_code_not_exists?.includes(
                                            data.part_code
                                        ) ? (
                                            <ClearIcon
                                                style={{ color: 'red' }}
                                            />
                                        ) : Object.keys(err).length != 0 ? (
                                            <DoneIcon
                                                style={{ color: 'green' }}
                                            />
                                        ) : err?.duplicate_part_code?.includes(
                                              data.part_code
                                          ) ? (
                                            <ClearIcon
                                                style={{ color: 'red' }}
                                            />
                                        ) : Object.keys(err).length != 0 ? (
                                            <DoneIcon
                                                style={{ color: 'green' }}
                                            />
                                        ) : (
                                            ''
                                        )}

                                        {err?.part_code_not_exists?.includes(
                                            data.part_code?.toString()
                                        ) ? (
                                            <p style={{ color: 'red' }}>
                                                Invalid Part Number
                                            </p>
                                        ) : err?.duplicate_part_code?.includes(
                                              data.part_code?.toString()
                                          ) ? (
                                            <p style={{ color: 'red' }}>
                                                Duplicate Part Number
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {data.name?.toString()}
                                    </TableCell>
                                    <TableCell>
                                        {data.color?.toString()}
                                    </TableCell>
                                    <TableCell>
                                        {data.technical_qc?.toString()}
                                    </TableCell>
                                    <TableCell>
                                        {data.description?.toString()}
                                    </TableCell>
                                    <TableCell>
                                        {data.available_stock?.toString()}
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            onChange={updateFieldChanged(
                                                data.id
                                            )}
                                            id="outlined-password-input"
                                            type="text"
                                            name="stock_update"
                                            value={data.stock_update?.toString()}
                                        />
                                        {err?.update_stock_check?.includes(
                                            data.stock_update?.toString()
                                        ) ||
                                        (Object.keys(err).length != 0 &&
                                            data.stock_update == undefined) ? (
                                            <ClearIcon
                                                style={{ color: 'red' }}
                                            />
                                        ) : Object.keys(err).length != 0 ? (
                                            <DoneIcon
                                                style={{ color: 'green' }}
                                            />
                                        ) : (
                                            ''
                                        )}

                                        {err?.update_stock_check?.includes(
                                            data.stock_update?.toString()
                                        ) ||
                                        (Object.keys(err).length != 0 &&
                                            data.stock_update == undefined) ? (
                                            <p style={{ color: 'red' }}>
                                                Only Positive Integers are
                                                Acceptable
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {err?.update_stock_check?.includes(
                                            data.stock_update?.toString()
                                        ) == true ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_code == undefined) ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_code == '') ||
                                        err?.part_code_not_exists?.includes(
                                            data.part_code?.toString()
                                        ) ||
                                        (Object.keys(err).length != 0 &&
                                            data.stock_update == undefined) ||
                                        err?.duplicate_part_code?.includes(
                                            data.part_code?.toString()
                                        ) ? (
                                            <Button
                                                sx={{
                                                    ml: 2,
                                                }}
                                                variant="contained"
                                                style={{
                                                    backgroundColor: 'red',
                                                }}
                                                component="span"
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            'Do You Want to Remove?'
                                                        )
                                                    ) {
                                                        handelDelete(data.id)
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
                ) : item.length != 0 ? (
                    <StyledLoading>
                        <Box position="relative">
                            <img src="/assets/images/logo-circle.svg" alt="" />
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
                            disabled={pagination.page === pagination.totalPage}
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
            </SimpleCard>
        </Container>
    )
}

export default AddBulkPart
