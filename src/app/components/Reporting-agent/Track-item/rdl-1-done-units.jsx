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
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'120px'}}>Record No</TableCell>
                        <TableCell
                            sx={{
                                width:'120px',
                                fontSize:'16px', fontWeight:'bold',
                                position: 'sticky',
                                left: 0,
                                zIndex: 1,
                                backgroundColor: '#ffff', // add background color here
                            }}
                        >
                            UIC
                        </TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'120px'}}>Tracking ID</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'120px'}}>Order ID</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'120px'}}>IMEI</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'120px'}}>Item ID</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'180px'}}>Tray Status</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'150px'}}>Tray Location</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'150px'}}>Partner Shop</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'120px'}}>WHT Tray</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'200px'}}>BOT Added Body Damage</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>Charging Username</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>Battery Status</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>Charge Percentage</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>Body Condition</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>Display Condition</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>Lock Status</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>Charging Jack</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>Body Part Missing</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>Body Part Name</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>Charge Done Date</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>BQC Agent Name</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'180px'}}>BQC S/W Report Date</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'280px'}}>BQC S/W Report Device Color IOS</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'250px'}}>BQC S/W Report Device Color</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'280px'}}>BQC S/W Report Erasure Technician</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'250px'}}>BQC S/W Report Final Grade</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'260px'}}>BQC S/W Report Mandatory Test</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'250px'}}>BQC S/W Report Market Name</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'270px'}}>BQC S/W Report Microphone Test</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'300px'}}>
                            BQC S/W Report Mobile Internal Model
                        </TableCell>

                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'200px'}}>BQC Added Status</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'180px'}}>Blancoo QC Status</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'180px'}}>Factory Reset Status</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'180px'}}>BQC Incomplete Reason</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'120px'}}>Technical Issue</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>BQC User Remark</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'120px'}}>BQC Done Date</TableCell>

                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>Audit Agnet Name</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'200px'}}>Audit Recomendad Grade</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'180px'}}>Audit Added Stage</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'180px'}}>Audit Added Reason</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'200px'}}>Audit Added Description</TableCell>

                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>Audit Done Date</TableCell>

                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'180px'}}>RDL One Agent name</TableCell>

                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>RDL 1 Status</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>RDL 1 Added Model</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'160px'}}>RDL 1 Added Color</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'250px'}}>RDL 1 Added Part List Count</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'190px'}}>RDL 1 Added Part One</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'190px'}}>RDL 1 Added Part Two</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'190px'}}>RDL 1 Added Part Three</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'190px'}}>RDL 1 Added Part Four</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'190px'}}>RDL 1 Added Part Five</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'190px'}}>RDL 1 Added Description</TableCell>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold',  width:'250px'}}>Tray Closed By RDL One Date</TableCell>
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
