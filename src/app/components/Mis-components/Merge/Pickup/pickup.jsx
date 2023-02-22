import React, { useState, useEffect, useMemo } from 'react'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosMisUser, axiosSuperAdminPrexo } from '../../../../../axios'
import Tab from '@mui/material/Tab'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import Swal from 'sweetalert2'
import AssignToSorting from './assign-to-user'
import jwt_decode from 'jwt-decode'

import {
    Box,
    TableCell,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Typography,
    TableFooter,
    TablePagination,
    Card,
    TextField,
    Button,
    MenuItem,
    Checkbox,
} from '@mui/material'

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
    width: 1300,
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

const PickupPage = () => {
    /*-----------------------state----------------------------------*/
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(100)
    const [displayText, setDisplayText] = useState('')
    const [data, setData] = useState([])
    const [value, setValue] = React.useState('Charge Done')
    const [item, setItem] = useState([])
    const [count, setCount] = useState(0)
    const [brand, setbrand] = useState([])
    const [model, setModel] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [state, setState] = useState({})
    const [isCheck, setIsCheck] = useState([])
    const [sortingUsers, SetSortingUsers] = useState([])
    const [whtTray, setWhtTray] = useState([])
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    const navigate = useNavigate()
    /*--------------------------------------------------------------*/

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    /*---------------------------USEEFFECT-----------------------------------*/
    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    setDisplayText('Loading...')
                    let response = await axiosMisUser.post(
                        '/pickup/items/' +
                            value +
                            '/' +
                            page +
                            '/' +
                            rowsPerPage
                    )
                    if (response.status === 200) {
                        setDisplayText('')
                        setItem(response.data.data)
                        setCount(response.data.count)
                    } else {
                        setItem(response.data.data)
                        setCount(response.data.count)
                        setDisplayText(response.data.message)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [value, page, rowsPerPage, refresh])

    useEffect(() => {
        setData((_) =>
            item.map((d, index) => {
                d.id = page * rowsPerPage + index + 1
                return d
            })
        )
    }, [page, item, rowsPerPage])

    useEffect(() => {
        const FetchModel = async () => {
            let res = await axiosSuperAdminPrexo.post('/getBrands')
            if (res.status == 200) {
                setbrand(res.data.data)
            }
        }
        FetchModel()
    }, [])
    /*--------------------------------------------------------------*/
    const handleClick = (e) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }
    /*-----------------FETCH MODEL BASED ON THE BRAND---------------*/

    /* Fetch model */
    const fetchModel = async (brandName) => {
        try {
            let res = await axiosSuperAdminPrexo.post(
                '/get-product-model/' + brandName
            )
            if (res.status == 200) {
                setModel(res.data.data)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    /*-----------------------------HANDELPAGE CHANGE------------------*/

    const handleChangePage = (event, newPage) => {
        setRowsPerPage(100)
        setPage(0)
        setPage(newPage)
    }

    /*---------------------STATE CHANGE FOR SORT----------------------*/
    const handleChangeSort = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleDialogClose = () => {
        setIsCheck([])
        SetSortingUsers([])
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    /*---------------------HANDEL SORT-------------------------------*/

    const handelSort = async () => {
        try {
            setIsCheck([])
            setDisplayText('Loading...')
            const res = await axiosMisUser.post(
                '/pickup/sortItem/' +
                    state?.brand +
                    '/' +
                    state?.model +
                    '/' +
                    value +
                    '/' +
                    page +
                    '/' +
                    rowsPerPage
            )
            if (res.status == 200) {
                setDisplayText('')
                setItem(res.data.data)
                setCount(res.data.count)
            } else {
                setItem(res.data.data)
                setCount(res.data.count)
                setDisplayText(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }
    /*---------------------------SEARCH UIC-----------------------------*/

    const handelSearchUid = async (e) => {
        try {
            if (e.target.value == '') {
                setRefresh((refresh) => !refresh)
            } else {
                setItem([])
                setIsCheck([])
                setDisplayText('Searching....')
                const res = await axiosMisUser.post(
                    '/pickup/uicSearch/' + e.target.value + '/' + value
                )
                if (res.status == 200) {
                    setDisplayText('')
                    setPage(0)
                    setRowsPerPage(100)
                    setItem(res.data.data)
                } else {
                
                    setItem([])
                    setDisplayText(res.data.message)
                    setCount(0)
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    const handelSortingAgent = async () => {
        try {
            let token = localStorage.getItem('prexo-authentication')
            if (token) {
                const { location } = jwt_decode(token)

                let sortingUsers = await axiosMisUser.post(
                    '/getSortingAgentMergeMmt/' + location
                )

                if (sortingUsers.status == 200) {
                    SetSortingUsers(sortingUsers.data.data)
                }
                let obj = {
                    isCheck: isCheck,
                    type:value
                }
                let whtTray = await axiosMisUser.post('/pickup/whtTray', obj)
                if (whtTray.status == 200) {
                    setWhtTray(whtTray.data.data)
                    handleDialogOpen()
                } else {
                    alert(whtTray.data.message)
                }
            }
        } catch (error) {
            alert(error)
        }
    }
    /*---------------------------USEMEMO-----------------------------*/

    const tableForAllTab = useMemo(() => {
        return (
            <ProductTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Select</TableCell>

                        <TableCell>Record.NO</TableCell>

                        <TableCell>UIC</TableCell>
                        <TableCell>Order ID</TableCell>

                        <TableCell>IMEI</TableCell>
                        <TableCell>Item ID</TableCell>

                        <TableCell>Brand</TableCell>

                        <TableCell>Model</TableCell>

                        <TableCell>MUIC</TableCell>

                        <TableCell>WHT Tray Id</TableCell>
                        {value == 'Charge Done' ? (
                            <TableCell>
                                Charge Done Warehouse Close Date
                            </TableCell>
                        ) : value == 'BQC Done' ? (
                            <TableCell>Bqc Done Warehouse Close Date</TableCell>
                        ) : value == 'Audit Done' ? (
                            <TableCell>
                                Audit Done Warehouse Close Date
                            </TableCell>
                        ) : null}
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
                            <Checkbox
                                onClick={(e) => {
                                    handleClick(e)
                                }}
                                id={data.uic_code?.code}
                                key={data.uic_code?.code}
                                checked={isCheck.includes(data.uic_code?.code)}
                            />
                            <TableCell>{data.id}</TableCell>

                            <TableCell>{data.uic_code?.code}</TableCell>
                            <TableCell>{data.order_id}</TableCell>

                            <TableCell>{data.imei}</TableCell>

                            <TableCell>{data.item_id}</TableCell>

                            <TableCell>
                                {data?.products?.[0]?.brand_name}
                            </TableCell>

                            <TableCell>
                                {data?.products?.[0]?.model_name}
                            </TableCell>

                            <TableCell>{data?.products?.[0]?.muic}</TableCell>
                            <TableCell>{data?.wht_tray}</TableCell>

                            {value == 'Charge Done' ? (
                                <TableCell>
                                    {data?.charging_done_close != undefined
                                        ? new Date(
                                              data?.charging_done_close
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                            ) : value == 'BQC Done' ? (
                                <TableCell>
                                    {' '}
                                    {data?.bqc_done_close != undefined
                                        ? new Date(
                                              data?.bqc_done_close
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                            ) : value == 'Audit Done' ? (
                                <TableCell>
                                    {data?.audit_done_close != undefined
                                        ? new Date(
                                              data?.audit_done_close
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })
                                        : ''}
                                </TableCell>
                            ) : null}
                        </TableRow>
                    ))}
                </TableBody>
            </ProductTable>
        )
    }, [data, displayText, isCheck])
    /*--------------------------------------------------------------*/

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Pickup', path: '/' },
                        { name: 'Items' },
                    ]}
                />
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab
                                label="Charge Done Item's"
                                value="Charge Done"
                            />
                            <Tab label="BQC Done Item's" value="BQC Done" />
                            <Tab label="Audit Done Item's" value="Audit Done" />
                        </TabList>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                        }}
                    >
                        <Box>
                            <TextField
                                label="Search UIC"
                                variant="outlined"
                                sx={{ ml: 3 }}
                                onChange={(e) => {
                                    handelSearchUid(e)
                                }}
                            />
                            <TextField
                                select
                                label="Select Brand"
                                variant="outlined"
                                sx={{ ml: 2, width: 150 }}
                                name="brand"
                                onChange={(e) => {
                                    handleChangeSort(e)
                                }}
                            >
                                {brand.map((brandData) => (
                                    <MenuItem
                                        value={brandData.brand_name}
                                        onClick={(e) => {
                                            fetchModel(brandData.brand_name)
                                        }}
                                    >
                                        {brandData.brand_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Select Model"
                                variant="outlined"
                                name="model"
                                onChange={(e) => {
                                    handleChangeSort(e)
                                }}
                                sx={{ ml: 2, width: 150 }}
                            >
                                {model.map((modelData) => (
                                    <MenuItem value={modelData.model_name}>
                                        {modelData.model_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button
                                sx={{
                                    ml: 2,
                                    mt: 1,
                                }}
                                variant="contained"
                                disabled={
                                    state.brand == undefined ||
                                    state.model == undefined
                                }
                                onClick={() => handelSort()}
                                style={{ backgroundColor: 'green' }}
                                component="span"
                            >
                                Sort
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                sx={{
                                    mr: 3,
                                }}
                                variant="contained"
                                disabled={isCheck.length == 0}
                                onClick={() => handelSortingAgent(value)}
                                style={{ backgroundColor: 'primery' }}
                                component="span"
                            >
                                Assign to Sorting
                            </Button>
                        </Box>
                    </Box>
                    <TabPanel value="Charge Done">
                        <Card
                            sx={{ maxHeight: '100%', overflow: 'auto' }}
                            elevation={6}
                        >
                            {' '}
                            {tableForAllTab}{' '}
                        </Card>
                    </TabPanel>
                    <TabPanel value="BQC Done">
                        <Card
                            sx={{ maxHeight: '100%', overflow: 'auto' }}
                            elevation={6}
                        >
                            {' '}
                            {tableForAllTab}{' '}
                        </Card>
                    </TabPanel>
                    <TabPanel value="Audit Done">
                        <Card
                            sx={{ maxHeight: '100%', overflow: 'auto' }}
                            elevation={6}
                        >
                            {' '}
                            {tableForAllTab}{' '}
                        </Card>
                    </TabPanel>
                </TabContext>
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
            </Box>
            {shouldOpenEditorDialog && (
                <AssignToSorting
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setRefresh={setRefresh}
                    sortingUsers={sortingUsers}
                    whtTray={whtTray}
                    isCheck={isCheck}
                />
            )}
        </Container>
    )
}

export default PickupPage
