import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Button, Typography, Card, Box, Table, TextField } from '@mui/material'
import Swal from 'sweetalert2'
import { axiosSpMisAgent } from '../../../../../axios'
import '../../../../../app.css'

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
    const [isLoading, setIsLoading] = useState(false)
    const [location, setLocation] = useState('')

    const [spList, setSpList] = useState([])
    const navigate = useNavigate()
    const [butLoading, setBugLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSpMisAgent.post(
                    '/toolsAndConsumablesProcurment'
                )
                if (res.status == 200) {
                    setIsLoading(false)
                    setSpList(res.data.data)
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    const handlesend = async () => {
        try {
            setBugLoading(true)
            let flag = false
            for (let x of spList) {
                if (Number(x.required_qty) < 0 || isNaN(x.required_qty)) {
                    flag = true
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${x.part_id} -Please check the quantity`,
                    })
                    setBugLoading(false)
                    break
                }
            }
            if (flag == false) {
                let obj = {
                    spList: spList,
                }
                const res = await axiosSpMisAgent.post(
                    '/procurmentToolsAndConsumables/request',
                    obj
                )
                if (res.status == 200) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                    navigate('/sp-mis/procurement-tools-and-consumables')
                } else {
                    setBugLoading(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res?.data?.message,
                    })
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleQtyChange = (newValue, partId) => {
        const updatedData = spList.map((item) => {
            if (item.part_code === partId) {
                return {
                    ...item,
                    required_qty: newValue,
                }
            }
            return item
        })
        setSpList(updatedData)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
                </Typography>
            ),
            options: {
                filter: false,
                sort: true,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'part_code',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Part Number</Typography>
            ),
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Part Name</Typography>
            ),
            options: {
                filter: true,
                sort: true,
            },
        },

        {
            name: 'color',
            label: <Typography sx={{ fontWeight: 'bold' }}>Color</Typography>,
            options: {
                filter: true,
                sort: true,
            },
        },

        {
            name: 'sp_category',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Category</Typography>
            ),
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'avl_stock',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Available Quantity
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'required_qty',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Short Quantity
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, rowIndex) => {
                    return (
                        <TextField
                            value={value}
                            variant="outlined"
                            size="small"
                            onChange={(e) =>
                                handleQtyChange(
                                    e.target.value,
                                    tableMeta.rowData[1]
                                )
                            }
                        />
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        {
                            name: 'Procurement',
                            path: '/',
                        },
                        { name: 'Tools and Consuambles' },
                    ]}
                />
            </div>
            <Card>
                <Table className="custom-table">
                    <MUIDataTable
                        title={'Procurement list'}
                        data={spList}
                        columns={columns}
                        options={{
                            filterType: 'textField',
                            responsive: 'simple',
                            download: false,
                            print: false,
                            textLabels: {
                                body: {
                                    noMatch: isLoading
                                        ? 'Loading...'
                                        : 'Sorry, there is no matching data to display',
                                },
                            },
                            selectableRows: 'none', // set checkbox for each row
                            // search: false, // set search option
                            // filter: false, // set data filter option
                            // download: false, // set download option
                            // print: false, // set print option
                            // pagination: true, //set pagination option
                            // viewColumns: false, // set column option

                            elevation: 0,
                            rowsPerPageOptions: [10, 20, 40, 80, 100],
                        }}
                    />
                </Table>
                <br />
                <Box>
                    <Button
                        sx={{
                            float: 'right',
                            mr: 2,
                            mb: 2,
                        }}
                        variant="contained"
                        disabled={spList.length == 0}
                        onClick={(e) => handlesend(e)}
                        style={{ backgroundColor: 'green' }}
                        component="span"
                    >
                        Send Request
                    </Button>
                </Box>
            </Card>
        </Container>
    )
}

export default SimpleMuiTable
