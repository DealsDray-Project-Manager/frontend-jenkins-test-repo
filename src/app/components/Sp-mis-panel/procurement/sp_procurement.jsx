import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosMisUser } from '../../../../axios'
import jwt_decode from 'jwt-decode'
import { Button, Typography, Box , Table, TableContainer} from '@mui/material'
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

const ProductTable = styled(Table)(() => ({
    minWidth:600,
    width: '100%',
    height: '100%',
    whiteSpace: 'nowrap',
    '& thead': {
        '& th:first-of-type': {
            paddingLeft: 16,
        },
    },
    '& td': {
        borderBottom: '1px solid #ddd',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const SimpleMuiTable = () => {
    const [item, setItem] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            setIsLoading(true)
            const { location } = jwt_decode(admin)
            const fetchData = async () => {
                try {
                    let res = await axiosMisUser.post(
                        '/whToRp/muicList/repair/' + location
                    )
                    if (res.status === 200) {
                        setIsLoading(false)
                        setItem(res.data.data)
                    }
                } catch (error) {
                    setIsLoading(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonText: 'Ok',
                        text: error,
                    })
                }
            }
            fetchData()
        } else {
            navigate('/')
        }
        return () => {
            setIsLoading(false)
        }
    }, [])

    const handelDetailPage = (brand, model) => {
        navigate('/sp-mis/procurement/procurementlist/' + brand + '/' + model)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{fontWeight: 'bold', ml: 2 }}>
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
            name: '_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>MUIC</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => 
                value?.muic || '',
            },
        },
        {
            name: '_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Brand</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.brand || '',
            },
        },
        {
            name: '_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Model</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.model || '',
            },
        },
        {
            name: 'count',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Units to Repair
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: <Typography sx={{ fontWeight: 'bold' }}>Action</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Box>
                        <Button
                            sx={{ p:1, whiteSpace:'nowrap' }}
                            variant="contained"
                            onClick={(e) =>
                                handelDetailPage(
                                    tableMeta.rowData[2]?.brand,
                                    tableMeta.rowData[3]?.model
                                )
                            }
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Create Procurement List
                        </Button>
                        </Box>
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
                        { name: 'Items for Procurement', path: '/' },
                    ]}
                />
            </div>
            <ProductTable>
            <MUIDataTable
                title={'Requests'}
                data={item}
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
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
                            )
                        })
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
            </ProductTable>
        </Container>
    )
}

export default SimpleMuiTable
