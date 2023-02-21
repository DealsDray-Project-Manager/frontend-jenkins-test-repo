import React, { useState, useEffect, useMemo } from 'react'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosMisUser, axiosSuperAdminPrexo } from '../../../../../axios'
import Tab from '@mui/material/Tab'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import Swal from 'sweetalert2'

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

const SimpleMuiTable = () => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(100)
    const [displayText, setDisplayText] = useState('')
    const [data, setData] = useState([])
    const [value, setValue] = React.useState('Charge Done')
    const [item, setItem] = useState([])
    const [count, setCount] = useState(0)
    const [brand, setbrand] = useState([])
    const [model, setModel] = useState([])

    const navigate = useNavigate()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
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
    }, [value, page, rowsPerPage])

    useEffect(() => {
        const FetchModel = async () => {
            let res = await axiosSuperAdminPrexo.post('/getBrands')
            if (res.status == 200) {
                setbrand(res.data.data)
            }
        }
        FetchModel()
    }, [])

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

    useEffect(() => {
        setData((_) =>
            item.map((d, index) => {
                d.id = page * rowsPerPage + index + 1
                return d
            })
        )
    }, [page, item, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setRowsPerPage(100)
        setPage(0)
        setPage(newPage)
    }

    const tableForAllTab = useMemo(() => {
        return (
            <ProductTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Record.NO</TableCell>

                        <TableCell>Order ID</TableCell>

                        <TableCell>UIC</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>Item ID</TableCell>

                        <TableCell>Bag ID</TableCell>

                        <TableCell>BOT Agent Name</TableCell>

                        <TableCell>Sorting Agent Name</TableCell>

                        <TableCell>WHT Tray</TableCell>

                        <TableCell>BQC Agent Name</TableCell>

                        <TableCell>Audit Agnet Name</TableCell>
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

                            <TableCell>{data.order_id}</TableCell>

                            <TableCell>{data.uic_code?.code}</TableCell>
                            <TableCell>{data.imei}</TableCell>

                            <TableCell>{data.item_id}</TableCell>

                            <TableCell>{data.agent_name}</TableCell>

                            <TableCell>{data.tray_id}</TableCell>

                            <TableCell>{data.sorting_agent_name}</TableCell>

                            <TableCell>{data.wht_tray}</TableCell>

                            <TableCell>{data.agent_name_charging}</TableCell>

                            <TableCell>{data.agent_name_bqc}</TableCell>

                            <TableCell>{data?.audit_user_name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ProductTable>
        )
    }, [data, displayText])

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
                            />
                            <TextField
                                select
                                
                                label="Select Brand"
                                variant="outlined"
                                sx={{ ml: 2,width:150 }}
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
                                sx={{ ml: 2 ,width:150}}
                            >
                                <MenuItem></MenuItem>
                            </TextField>
                        </Box>
                        <Box>
                            <Button
                                sx={{
                                    mr: 3,
                                }}
                                variant="contained"
                                // onClick={() => handelViewItem(value)}
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
        </Container>
    )
}

export default SimpleMuiTable
