import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    TextField,
    TableCell,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Card,
    TablePagination,
    TableFooter,
    Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosReportingAgent, axiosSuperAdminPrexo } from '../../../../axios'
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

const TrackItem = () => {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(100)
    const [item, setItem] = useState([])
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [displayText, setDisplayText] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            if (inputSearch !== '') {
                let { location } = jwt_decode(admin)
                const search = async () => {
                    let obj = {
                        searchData: inputSearch,
                        page: page,
                        rowsPerPage: rowsPerPage,
                        location: location,
                    }
                    let res = await axiosReportingAgent.post(
                        '/search/rdlOneDoneUnits',
                        obj
                    )
                    if (res.status == 200) {
                        setItem(res.data.data)
                        setCount(res.data.count)
                        setDisplayText('')
                    } else {
                        setItem(res.data.data)
                        setCount(res.data.count)
                        setDisplayText('Sorry no data found')
                    }
                }
                search()
            } else {
                setDisplayText('Loading...')
                const fetchData = async () => {
                    try {
                        let { location } = jwt_decode(admin)
                        let obj = {
                            page: page,
                            location: location,
                            rowsPerPage: rowsPerPage,
                        }
                        let res = await axiosReportingAgent.post(
                            '/rdlOneDone/units',
                            obj
                        )
                        if (res.status == 200) {
                            setDisplayText('')
                            setCount(res.data.count)
                            setItem(res.data.data)
                        }
                    } catch (error) {
                        alert(error)
                    }
                }
                fetchData()
            }
        } else {
            navigate('/')
        }
    }, [refresh, page, rowsPerPage])

    useEffect(() => {
        setData((_) =>
            item.map((d, index) => {
                d.id = page * rowsPerPage + index + 1
                return d
            })
        )
    }, [page, item, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const ProductTable = styled(Table)(() => ({
        minWidth: 750,
        width: 10000,
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

    const searchTrackItem = async (e) => {
        setInputSearch(e.target.value)
        e.preventDefault()
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                setDisplayText('Searching...')
                let { location } = jwt_decode(admin)
                if (e.target.value == '') {
                    setRefresh((refresh) => !refresh)
                } else {
                    let obj = {
                        location: location,
                        searchData: e.target.value,
                        page: page,
                        rowsPerPage: rowsPerPage,
                    }
                    let res = await axiosReportingAgent.post(
                        '/search/rdlOneDoneUnits',
                        obj
                    )
                    if (res.status == 200) {
                        setItem(res.data.data)
                        setDisplayText('')
                        setCount(res.data.count)
                        setRowsPerPage(100)
                        setPage(0)
                    } else {
                        setItem(res.data.data)
                        setCount(res.data.count)
                        setDisplayText('Sorry no data found')
                    }
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

    const tableData = useMemo(() => {
        return (
            <ProductTable>
                <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
                    {' '}
                    <TableRow>
                        <TableCell>Record.NO</TableCell>
                        <TableCell
                            sx={{
                                position: 'sticky',
                                left: 0,
                                zIndex: 1,
                                backgroundColor: '#ffff', // add background color here
                            }}
                        >
                            UIC
                        </TableCell>
                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>Tray Status</TableCell>
                        <TableCell>Tray Location</TableCell>
                        <TableCell>Partner Shop</TableCell>
                        <TableCell>WHT Tray</TableCell>
                        <TableCell>BOT Added Body Damage</TableCell>
                        <TableCell>Charging Username</TableCell>
                        <TableCell>Battery Status</TableCell>
                        <TableCell>Charge Percentage</TableCell>
                        <TableCell>Body Condition</TableCell>
                        <TableCell>Display Condition</TableCell>
                        <TableCell>Lock Status</TableCell>
                        <TableCell>Charging Jack</TableCell>
                        <TableCell>Body Part Missing</TableCell>
                        <TableCell>Body Part Name</TableCell>
                        <TableCell>Charge Done Date</TableCell>
                        <TableCell>BQC Agent Name</TableCell>
                        <TableCell>BQC S/W Report Date</TableCell>
                        <TableCell>BQC S/W Report Device Color IOS</TableCell>
                        <TableCell>BQC S/W Report Device Color</TableCell>
                        <TableCell>BQC S/W Report Erasure Technician</TableCell>
                        <TableCell>BQC S/W Report Final Grade</TableCell>
                        <TableCell>BQC S/W Report Mandotory Test</TableCell>
                        <TableCell>BQC S/W Report Market Name</TableCell>
                        <TableCell>BQC S/W Report Microphone Test</TableCell>
                        <TableCell>
                            BQC S/W Report Mobile Internal Model
                        </TableCell>

                        <TableCell>BQC Added Status</TableCell>
                        <TableCell>Blancoo QC Status</TableCell>
                        <TableCell>Factory Reset Status</TableCell>
                        <TableCell>BQC Incomplete Reason</TableCell>
                        <TableCell>Technical Issue</TableCell>
                        <TableCell>BQC User Remark</TableCell>
                        <TableCell>BQC Done Date</TableCell>

                        <TableCell>Audit Agnet Name</TableCell>
                        <TableCell>Audit Recomendad Grade</TableCell>
                        <TableCell>Audit Added Stage</TableCell>
                        <TableCell>Audit Added Reason</TableCell>
                        <TableCell>Audit Added Description</TableCell>

                        <TableCell>Audit Done Date</TableCell>

                        <TableCell>RDL FLS Agent name</TableCell>

                        <TableCell>RDL 1 Status</TableCell>
                        <TableCell>RDL 1 Added Model</TableCell>
                        <TableCell>RDL 1 Added Color</TableCell>
                        <TableCell>RDL 1 Added Part List Count</TableCell>
                        <TableCell>RDL 1 Added Part One</TableCell>
                        <TableCell>RDL 1 Added Part Two</TableCell>
                        <TableCell>RDL 1 Added Part Three</TableCell>
                        <TableCell>RDL 1 Added Part Four</TableCell>
                        <TableCell>RDL 1 Added Part Five</TableCell>
                        <TableCell>RDL 1 Added Description</TableCell>
                        <TableCell>Tray Closed By RDL FLS Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayText !== '' ? (
                        <TableCell
                            colSpan={8}
                            align="center"
                            sx={{ verticalAlign: 'top' }}
                        >
                            <Typography variant="p" gutterBottom>
                                {displayText}
                            </Typography>
                        </TableCell>
                    ) : null}
                    {data.map((data, index) => (
                        <TableRow tabIndex={-1}>
                            <TableCell>{data.id}</TableCell>
                            <TableCell
                                sx={{
                                    position: 'sticky',
                                    left: 0,
                                    zIndex: 1,
                                    backgroundColor: '#ffff', // add background color here
                                }}
                            >
                                {data.uic_code?.code}
                            </TableCell>
                            <TableCell>{data.tracking_id}</TableCell>
                            <TableCell>{data.order_id}</TableCell>

                            <TableCell>{data.imei}</TableCell>

                            <TableCell>{data.item_id}</TableCell>
                            <TableCell>{data.tray_status}</TableCell>
                            <TableCell>{data.tray_location}</TableCell>
                            <TableCell>{data?.partner_shop}</TableCell>

                            <TableCell>{data?.wht_tray}</TableCell>
                            <TableCell>
                                {data?.bot_report?.body_damage}
                            </TableCell>

                            <TableCell>{data?.agent_name_charging}</TableCell>

                            <TableCell>
                                {data?.charging?.battery_status}
                            </TableCell>
                            <TableCell>
                                {data?.charging?.charge_percentage}
                            </TableCell>
                            <TableCell>
                                {data?.charging?.body_condition}
                            </TableCell>
                            <TableCell>
                                {data?.charging?.display_condition}
                            </TableCell>
                            <TableCell>{data?.charging?.lock_status}</TableCell>
                            <TableCell>
                                {data?.charging?.charging_jack_type}
                            </TableCell>
                            <TableCell>
                                {data?.charging?.boady_part_missing}
                            </TableCell>
                            <TableCell>{data?.charging?.part_name}</TableCell>
                            <TableCell>
                                {data?.charging_done_date != undefined
                                    ? new Date(
                                          data?.charging_done_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>{data?.agent_name_bqc}</TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.date != undefined
                                    ? new Date(
                                          data?.bqc_software_report?.date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.device_color}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.device_color_one}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.erasure_technician}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.final_grade}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.mandatory_test}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.market_name}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.microphone_test}
                            </TableCell>
                            <TableCell>
                                {
                                    data?.bqc_software_report
                                        ?.mobile_internal_model
                                }
                            </TableCell>
                            <TableCell>
                                {data?.bqc_report?.blancoo_qc_status}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_report?.bqc_status}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_report?.factory_reset_status}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_report?.bqc_incomplete_reason}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_report?.technical_issue}
                            </TableCell>
                            <TableCell>{data?.bqc_report?.other}</TableCell>
                            <TableCell>
                                {data?.bqc_out_date != undefined
                                    ? new Date(
                                          data?.bqc_out_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>{data?.audit_user_name}</TableCell>
                            <TableCell>{data?.audit_report?.grade}</TableCell>
                            <TableCell>{data?.audit_report?.stage}</TableCell>
                            <TableCell>{data?.audit_report?.reason}</TableCell>
                            <TableCell>
                                {data?.audit_report?.description}
                            </TableCell>

                            <TableCell>
                                {data?.audit_done_date != undefined
                                    ? new Date(
                                          data?.audit_done_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>

                            <TableCell>{data?.rdl_fls_one_user_name}</TableCell>

                            <TableCell>
                                {data?.rdl_fls_one_report?.selected_status}
                            </TableCell>
                            <TableCell>
                                {data?.rdl_fls_one_report?.model_reg}
                            </TableCell>
                            <TableCell>
                                {data?.rdl_fls_one_report?.color}
                            </TableCell>
                            <TableCell>
                                {data?.rdl_fls_one_report?.part_list_count}
                            </TableCell>
                            <TableCell>
                                {data?.rdl_fls_one_report?.part_list_1}
                            </TableCell>
                            <TableCell>
                                {data?.rdl_fls_one_report?.part_list_2}
                            </TableCell>
                            <TableCell>
                                {data?.rdl_fls_one_report?.part_list_3}
                            </TableCell>
                            <TableCell>
                                {data?.rdl_fls_one_report?.part_list_4}
                            </TableCell>
                            <TableCell>
                                {data?.rdl_fls_one_report?.part_list_5}
                            </TableCell>
                            <TableCell>
                                {data?.rdl_fls_one_report?.description}
                            </TableCell>
                            <TableCell>
                                {data?.rdl_fls_closed_date != undefined
                                    ? new Date(
                                          data?.rdl_fls_closed_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ProductTable>
        )
    }, [item, data, displayText])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'RDL - 1 Done Units', path: '/' }]}
                />
            </div>
            <TextField
                onChange={(e) => {
                    searchTrackItem(e)
                }}
                label="Search"
                variant="outlined"
                sx={{ mb: 2 }}
            />

            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                {tableData}
            </Card>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        sx={{ px: 2 }}
                        rowsPerPageOptions={[100, 150, 200]}
                        component="div"
                        count={count}
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
                </TableRow>
            </TableFooter>
        </Container>
    )
}

export default TrackItem
