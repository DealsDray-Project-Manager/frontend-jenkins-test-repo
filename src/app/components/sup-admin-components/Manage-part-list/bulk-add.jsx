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
import { useNavigate } from 'react-router-dom'
import { axiosSuperAdminPrexo } from '../../../../axios'
import CircularProgress from '@mui/material/CircularProgress'
import Swal from 'sweetalert2'

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

    const updateFieldChanged = (id) => (e) => {
        setValidateState(false)
        setPagination((p) => ({
            ...p,
            item: pagination.item.map((data, i) => {
                if (data.code === id) {
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
                '/bulkvalidationForPart',
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
                '/bulkAddPart',
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
                        navigate('/sup-admin/view-list/sparereporting', {
                            state: {
                                validatedSuccess: res.data.addedCount,
                            },
                        })
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

    console.log(err)

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Part-List', path: '/' },
                        { name: 'Bulk-Part' },
                    ]}
                />
            </div>
            <SimpleCard title="Bulk Part">
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
                            href={
                                process.env.PUBLIC_URL +
                                '/Bulk-add-part-sample-sheet.xlsx'
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
                                <TableCell>Part Name</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Technical QC</TableCell>
                                <TableCell>Part Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {item.map((data) => (
                                <TableRow tabIndex={-1}>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>
                                        <TextField
                                            onChange={updateFieldChanged(
                                                data.code
                                            )}
                                            id="outlined-password-input"
                                            type="text"
                                            name="part_name"
                                            value={data.part_name?.toString()}
                                        />
                                        {err?.duplicate_part_name?.includes(
                                            data.part_name?.toString()
                                        ) ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_name == undefined) ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_name == '') ? (
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

                                        {err?.duplicate_part_name?.includes(
                                            data.part_name?.toString()
                                        ) ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_name == undefined) ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_name == '') ? (
                                            <p style={{ color: 'red' }}>
                                                Duplicate Part Name
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            onChange={updateFieldChanged(
                                                data.code
                                            )}
                                            id="outlined-password-input"
                                            type="text"
                                            name="part_color"
                                            value={data.part_color?.toString()}
                                        />
                                        {err?.duplicate_color?.includes(
                                            data.part_color?.toString()
                                        ) ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_color == undefined) ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_color == '') ? (
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

                                        {err?.duplicate_color?.includes(
                                            data.part_color?.toString()
                                        ) ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_color == undefined) ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_color == '') ? (
                                            <p style={{ color: 'red' }}>
                                                Color does not exists
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            onChange={updateFieldChanged(
                                                data.code
                                            )}
                                            id="outlined-password-input"
                                            type="text"
                                            name="technical_qc"
                                            value={data.technical_qc?.toString()}
                                        />
                                        {err?.technical_qc?.includes(
                                            data.technical_qc?.toString()
                                        ) ||
                                        (Object.keys(err).length != 0 &&
                                            data.technical_qc == '') ||
                                        (Object.keys(err).length != 0 &&
                                            data.technical_qc == undefined) ? (
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

                                        {err?.technical_qc?.includes(
                                            data.technical_qc?.toString()
                                        ) ||
                                        (Object.keys(err).length != 0 &&
                                            data.technical_qc == undefined) ||
                                        (Object.keys(err).length != 0 &&
                                            data.technical_qc == '') ? (
                                            <p style={{ color: 'red' }}>
                                                Only Y/N are acceptable
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            onChange={updateFieldChanged(
                                                data.code
                                            )}
                                            id="outlined-password-input"
                                            type="text"
                                            name="description"
                                            value={data.description?.toString()}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        {err?.duplicate_part_name?.includes(
                                            data.part_name?.toString()
                                        ) == true ||
                                        err?.technical_qc?.includes(
                                            data.technical_qc?.toString()
                                        ) ||
                                        (Object.keys(err).length != 0 &&
                                            data.technical_qc == undefined) ||
                                        (Object.keys(err).length != 0 &&
                                            data.technical_qc == '') ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_name == undefined) ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_name == '') ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_color == undefined) ||
                                        (Object.keys(err).length != 0 &&
                                            data.part_color == '') ||
                                        err?.duplicate_color?.includes(
                                            data.part_color?.toString()
                                        ) == true ? (
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
