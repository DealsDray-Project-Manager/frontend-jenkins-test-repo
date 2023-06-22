import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Button, Typography, Card, Box } from '@mui/material'
import Swal from 'sweetalert2'
import { axiosSpMisAgent } from '../../../../axios'

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
    const { brand, model } = useParams()
    const [spList, setSpList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    const { location } = jwt_decode(admin)
                    setLocation(location)
                    setIsLoading(true)
                    let obj = {
                        brand: brand,
                        model: model,
                        location: location,
                    }
                    const res = await axiosSpMisAgent.post(
                        '/procurment/creation',
                        obj
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setSpList(res.data.data)
                    }
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    const handelDetailPage = (e) => {
        e.preventDefault()
        navigate('/sp-mis/procurement/procurementlist/request/' + brand + "/" + model)
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
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'part_id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Spare Part Number
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'part_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Spare Part Name
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: <Typography sx={{ fontWeight: 'bold' }}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography sx={{ fontWeight: 'bold' }}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'aval_qty',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Available Quantity
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'required_qty',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Required Quantity
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Items for Procurement', path: '/' },
                        { name: 'Procurement List' },
                    ]}
                />
            </div>
            <Card>
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
                        customSort: (data, colIndex, order) => {
                            return data.sort((a, b) => {
                                if (colIndex === 1) {
                                    return (
                                        (a.data[colIndex].price <
                                        b.data[colIndex].price
                                            ? -1
                                            : 1) * (order === 'desc' ? 1 : -1)
                                    )
                                }
                                return (
                                    (a.data[colIndex] < b.data[colIndex]
                                        ? -1
                                        : 1) * (order === 'desc' ? 1 : -1)
                                )
                            })
                        },
                        elevation: 0,
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                    }}
                />
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
                        onClick={(e) => handelDetailPage(e)}
                        style={{ backgroundColor: 'green' }}
                        component="span"
                    >
                        Create Request
                    </Button>
                </Box>
            </Card>
        </Container>
    )
}

export default SimpleMuiTable
