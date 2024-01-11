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
import * as XLSX from 'xlsx'
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

const PaginationTable = () => {
    const [validateState, setValidateState] = useState(false)
    const [err, setErr] = useState({})
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [countOfTray, setCountOfTray] = useState({})
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        item: [],
        totalPage: 0,
    })
    const [item, setItem] = useState([])
    const [exFile, setExfile] = useState(null)
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
        try {
            let obj = {
                type: 'tray-master',
            }
            const fetchData = async () => {
                let res = await axiosSuperAdminPrexo.post('/trayIdGenrate', obj)
                if (res.status == 200) {
                    setCountOfTray(res.data.data)
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
    const importExcel = () => {
        setLoading(true)
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
            item: data.map((d, index) => toLowerKeys(d, index)),
            totalPage: Math.ceil(data.length / p.size),
        }))
        setLoading(false)
    }
    function toLowerKeys(obj, id) {
        return Object.keys(obj).reduce((accumulator, key) => {
            accumulator.created_at = Date.now()
            accumulator.prefix = 'tray-master'
            accumulator.sort_id = 'Open'
            accumulator[key.toLowerCase().split('-').join('_')] = obj[key]
            return accumulator
        }, {})
    }
    const validateData = async (e) => {
        let count1 = 0
        let count2 = 0
        let count3 = 0
        let count4 = 0
        let count5 = 0
        let count6 = 0
        let count7 = 0
        let count8 = 0
        let count9 = 0
        let obj = {
            ...countOfTray,
        }
        try {
            for (let x of pagination.item) {
                x.tray_id = ''
                if (x.tray_category == 'BOT') {
                    x.tray_id = 'BOT' + (countOfTray.BOT + count1)
                    count1++
                } else if (x.tray_category == 'MMT') {
                    x.tray_id = 'MMT' + (countOfTray.MMT + count2)
                    count2++
                } else if (x.tray_category == 'PMT') {
                    x.tray_id = 'PMT' + (countOfTray.PMT + count3)
                    count3++
                } else if (x.tray_category == 'WHT') {
                    x.tray_id = 'WHT' + (countOfTray.WHT + count4)
                    count4++
                } else if (x.tray_category == 'SPT') {
                    x.tray_id = 'SPT' + (countOfTray.SPT + count5)
                    count5++
                } else if (x.tray_category == 'RPT') {
                    x.tray_id = 'RPT' + (countOfTray.RPT + count6)
                    count6++
                } else if (x.tray_category == 'RPB') {
                    x.tray_id = 'RPB' + (countOfTray.RPB + count7)
                    count7++
                } else if (x.tray_category == 'RPA') {
                    x.tray_id = 'RPA' + (countOfTray.RPA + count8)
                    count8++
                } else if (x.tray_category == 'CBT') {
                    x.tray_id = 'CBT' + (countOfTray.CBT + count9)
                    count9++
                } else {
                    x.tray_id =
                        x.tray_category +
                        x.tray_grade +
                        obj[x.tray_category + x.tray_grade]
                    obj[x.tray_category + x.tray_grade] = Number(
                        obj[x.tray_category + x.tray_grade] + 1
                    )
                }
                // else if (x.tray_category == 'CTA') {
                //     x.tray_id = 'CTA' + (countOfTray.CTA + count5)
                //     count5++
                // } else if (x.tray_category == 'CTB') {
                //     x.tray_id = 'CTB' + (countOfTray.CTB + count6)
                //     count6++
                // } else if (x.tray_category == 'CTC') {
                //     x.tray_id = 'CTC' + (countOfTray.CTC + count7)
                //     count7++
                // } else if (x.tray_category == 'CTD') {
                //     x.tray_id = 'CTD' + (countOfTray.CTD + count8)
                //     count8++
                // }
            }

            setLoading(true)
            let res = await axiosSuperAdminPrexo.post(
                '/bulkValidationTray',
                pagination.item
            )
            if (res.status == 200) {
                if (res.data.dupId) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error please upload again...',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(true)
                        }
                    })
                } else {
                    setLoading(false)
                    setErr({})
                    setCountOfTray((p) => ({
                        ...obj,
                        BOT: p.BOT + count1,
                        MMT: p.MMT + count2,
                        PMT: p.PMT + count3,
                        WHT: p.WHT + count4,
                        SPT: p.SPT + count5,
                        RPT: p.RPT + count6,
                    }))
                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setValidateState(true)
                        }
                    })
                }
            } else {
                if (res.data.dupId) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error please upload again...',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(true)
                        }
                    })
                } else {
                    setLoading(false)
                    setErr(res.data.data)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message,
                    })
                }
            }
            // }
        } catch (error) {
            if (error.response.status == 400) {
                setLoading(false)
                setErr(error.response.data.data)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                })
            }
        }
    }

    const handelSubmit = async (e) => {
        try {
            setLoading(true)
            let obj = {
                allCount: countOfTray,
                item: pagination.item,
            }
            let res = await axiosSuperAdminPrexo.post('/createBulkTray', obj)
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: true,
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setLoading(false)
                        navigate('/sup-admin/tray')
                    }
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
    // ----------------------------------------------------------------------------------------------------------------------------
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
    // DATA DELETE FROM ARRAY
    const handelDelete = (tray_id, trayType) => {
        setValidateState(false)
        setPagination((p) => ({
            ...p,
            item: pagination.item.filter((item) => item.tray_id != tray_id),
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
                        { name: 'Tray', path: '/' },
                        { name: 'Bulk-Tray' },
                    ]}
                />
            </div>
            <SimpleCard title="Bulk Tray">
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
                            onClick={() => navigate('/sup-admin/tray')}
                        >
                            Back to list
                        </Button>
                        <Button
                            sx={{ mb: 2, ml: 2 }}
                            variant="contained"
                            color="primary"
                            href={
                                process.env.PUBLIC_URL +
                                '/bulk-tray-sheet-sample.xlsx'
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
                            disabled={
                                Object.keys(countOfTray).length == 0 || loading
                            }
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
                                        {err?.tray_id?.length !== 0 &&
                                        Object.keys(err).length !== 0 ? (
                                            <TableCell>Tray ID</TableCell>
                                        ) : (
                                            ''
                                        )}
                                        <TableCell>CPC</TableCell>
                                        <TableCell>Warehouse</TableCell>
                                        <TableCell>Tray Category</TableCell>
                                        <TableCell>Tray Grade</TableCell>
                                        <TableCell>Tray Brand</TableCell>
                                        <TableCell>Tray Model</TableCell>
                                        <TableCell>Tray Name</TableCell>
                                        <TableCell>Tray Limit</TableCell>
                                        <TableCell>Tray Display</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.map((data, index) => (
                                        <TableRow tabIndex={-1}>
                                            <TableCell>{data.id}</TableCell>
                                            {err?.tray_id?.length != 0 &&
                                            Object.keys(err).length !== 0 ? (
                                                <TableCell>
                                                    {' '}
                                                    <TextField
                                                        id="outlined-password-input"
                                                        type="text"
                                                        value={
                                                            data.tray_id ==
                                                            'NaN'
                                                                ? ''
                                                                : data.tray_id
                                                        }
                                                    />
                                                    {err?.tray_id?.includes(
                                                        data.tray_id
                                                    ) ? (
                                                        <ClearIcon
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        />
                                                    ) : Object.keys(err)
                                                          .length != 0 ? (
                                                        <DoneIcon
                                                            style={{
                                                                color: 'green',
                                                            }}
                                                        />
                                                    ) : (
                                                        ''
                                                    )}
                                                    {err?.tray_id?.includes(
                                                        data.tray_id
                                                    ) ? (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            {data.tray_category +
                                                                ' '}{' '}
                                                            maximum count
                                                            exceeded
                                                        </p>
                                                    ) : null}
                                                </TableCell>
                                            ) : (
                                                ''
                                            )}
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
                                                    value={data.warehouse?.toString()}
                                                />
                                                {err?.warehouse_does_not_exist?.includes(
                                                    data.tray_id
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
                                                    data.tray_id
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
                                                    name="tray_category"
                                                    value={data?.tray_category?.toString()}
                                                />
                                                {err?.category?.includes(
                                                    data.tray_category?.toString()
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
                                                {err?.category?.includes(
                                                    data?.tray_category?.toString()
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Tray Category not Exists
                                                    </p>
                                                ) : null}
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.id
                                                    )}
                                                    id="outlined-password-input"
                                                    type="text"
                                                    name="tray_grade"
                                                    value={data?.tray_grade?.toString()}
                                                />
                                                {err?.grade?.includes(
                                                    data.tray_grade?.toString()
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
                                                {err?.grade?.includes(
                                                    data?.tray_grade?.toString()
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Tray Grade not Exists In
                                                        Category
                                                    </p>
                                                ) : null}
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.id
                                                    )}
                                                    id="outlined-password-input"
                                                    type="text"
                                                    name="tray_brand"
                                                    value={data.tray_brand?.toString()}
                                                />
                                                {err?.brand?.includes(
                                                    data.tray_brand
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_brand ==
                                                        undefined) ? (
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
                                                {err?.brand?.includes(
                                                    data.tray_brand
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_brand ==
                                                        undefined) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Brand name not exists
                                                    </p>
                                                ) : null}
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.id
                                                    )}
                                                    id="outlined-password-input"
                                                    type="text"
                                                    name="tray_model"
                                                    value={data.tray_model?.toString()}
                                                />
                                                {err?.model?.includes(
                                                    data.tray_model
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_model ==
                                                        undefined) ? (
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
                                                {err?.model?.includes(
                                                    data.tray_model
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_model ==
                                                        undefined) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Model name not exists
                                                    </p>
                                                ) : null}
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    onChange={updateFieldChanged(
                                                        data.id
                                                    )}
                                                    id="outlined-password-input"
                                                    type="text"
                                                    name="tray_name"
                                                    value={data.tray_name?.toString()}
                                                />
                                                {err?.tray_display_name_duplicate?.includes(
                                                    data.tray_name
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_name ==
                                                        undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_name == '') ? (
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

                                                {err?.tray_display_name_duplicate?.includes(
                                                    data.tray_name
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Duplicate Tray Name
                                                    </p>
                                                ) : (Object.keys(err).length !=
                                                      0 &&
                                                      data.tray_name ==
                                                          undefined) ||
                                                  (Object.keys(err).length !=
                                                      0 &&
                                                      data.tray_name == '') ? (
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
                                                    name="tray_limit"
                                                    value={data.tray_limit?.toString()}
                                                />
                                                {err?.trayLimit?.includes(
                                                    data.tray_id
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
                                                {err?.trayLimit?.includes(
                                                    data.tray_id
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
                                                    name="tray_display"
                                                    value={data.tray_display?.toString()}
                                                />
                                                {err?.tray_display_is_duplicate?.includes(
                                                    data.tray_display
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_display ==
                                                        undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_display == '') ? (
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

                                                {err?.tray_display_is_duplicate?.includes(
                                                    data.tray_display
                                                ) ? (
                                                    <p style={{ color: 'red' }}>
                                                        Duplicate Tray Display
                                                        Name
                                                    </p>
                                                ) : (Object.keys(err).length !=
                                                      0 &&
                                                      data.tray_display ==
                                                          undefined) ||
                                                  (Object.keys(err).length !=
                                                      0 &&
                                                      data.tray_display ==
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
                                                err?.trayLimit?.includes(
                                                    data.tray_id
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.cpc == '') ||
                                                err?.cpc?.includes(data.cpc) ==
                                                    true ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_id ==
                                                        undefined) ||
                                                err?.category?.includes(
                                                    data?.tray_category?.toString()
                                                ) ||
                                                err?.model?.includes(
                                                    data.tray_model
                                                ) ||
                                                err?.model?.includes(
                                                    data.tray_brand
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_brand ==
                                                        undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_model ==
                                                        undefined) ||
                                                err?.tray_id?.includes(
                                                    data.tray_id
                                                ) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_id == '') ||
                                                (Object.keys(err).length != 0 &&
                                                    data.warehouse ==
                                                        undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.warehouse == '') ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_name ==
                                                        undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_name == '') ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_display ==
                                                        undefined) ||
                                                (Object.keys(err).length != 0 &&
                                                    data.tray_display == '') ||
                                                err?.grade?.includes(
                                                    data?.tray_grade?.toString()
                                                ) ||
                                                err?.warehouse_does_not_exist?.includes(
                                                    data.tray_id
                                                ) ||
                                                err?.trya_id_is_duplicate?.includes(
                                                    data.tray_display
                                                ) == true ||
                                                err?.tray_display_name_duplicate?.includes(
                                                    data.tray_name
                                                ) == true ||
                                                err?.tray_display_is_duplicate?.includes(
                                                    data.tray_display
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
                                                                        data.tray_id,
                                                                        data.tray_category
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
                </StyledTable>
                {pagination.item.length != 0 && loading !== true ? (
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

export default PaginationTable
