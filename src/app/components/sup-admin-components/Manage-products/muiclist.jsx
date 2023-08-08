import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { Box, Card, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import Image from 'mui-image'
import { axiosSuperAdminPrexo } from '../../../../axios'

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

const MUIClist = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [productData, setProductData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { muic } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCtxTray = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post(
                    '/muic/getParts/' + muic
                )
                if (res.status === 200) {
                    setIsLoading(false)
                    setProductData(res?.data.data)
                }
            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchCtxTray()
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'part_code', // field name in the row object
            label: 'Part No', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'avl_stock', // field name in the row object
            label: 'Available stock', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'color', // field name in the row object
            label: 'Color', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'name', // field name in the row object
            label: 'Part Name', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'technical_qc', // field name in the row object
            label: 'Technical qc', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'description',
            label: 'Description',
            options: {
                filter: true,
            },
        },
        {
            name: 'created_at',
            label: 'Creation Date',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    if (value == 'Active') {
                        return (
                            <div style={{ color: 'green', fontWeight: 'bold' }}>
                                {value}
                            </div>
                        )
                    } else {
                        return (
                            <div style={{ color: 'red', fontWeight: 'bold' }}>
                                {value}
                            </div>
                        )
                    }
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Products', path: '/' },
                        { name: 'Manage Parts' },
                    ]}
                    style={{ marginLeft: '20px' }}
                />
            </div>
            <Card sx={{ p: 3 }}>
                <Box sx={{display: 'flex', alignItems:'center' }}>
                    <Box sx={{mt:2}}>
                        <Image
                            src={
                                productData?.[0]?.image == undefined
                                    ? 'https://prexo-v8-5-dev-api.dealsdray.com/product/image/' +
                                      productData?.[0]?.vendor_sku_id +
                                      '.jpg'
                                    : productData?.[0]?.image
                            }
                            height='200px'
                            width="100%"
                        />
                    </Box>
                    <Box sx={{ml:5}}>
                            <Typography>
                                MUIC:{productData?.[0]?.muic}
                            </Typography>
                            <br />
                            <Typography>
                                SKU ID:{productData?.[0]?.vendor_sku_id}
                            </Typography>
                            <Typography>
                                Brand:{productData?.[0]?.brand_name}
                            </Typography>
                            <Typography>
                                Model:{productData?.[0]?.model_name}
                            </Typography>
                            <Typography>Vendor:{productData?.[0]?.vendor_name}</Typography>
                        </Box>
                        <Box sx={{margin: 'auto',textAlign:'end', mb:23, mr:2}}>
                        <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/sup-admin/products')}
                                //   sx={{ margin: "auto", mt: 1, mb: 2 }}
                            >
                                Back to MUIC list
                            </Button>
                        </Box>
                </Box>
                <Box sx={{  margin: 'auto', mt:4, mr:2 ,mb:3, textAlign:'end'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            navigate('/sup-admin/products/addparts', {
                                state: {
                                    muicData: productData?.[0],
                                },
                            })
                        }
                        //   sx={{ margin: "auto", mt: 1, mb: 2 }}
                    >
                        Associate Parts
                    </Button>
                </Box>
                <MUIDataTable
                    title={'Associated Parts'}
                    data={productData?.[0]?.parts}
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
            </Card>
            <br /> 
        </Container>
    )
}

export default MUIClist
