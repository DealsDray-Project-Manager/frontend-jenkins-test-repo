import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { H1, H3, H4 } from 'app/components/Typography'
import { axiosWarehouseIn } from '../../../../axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import { Box, Typography, Table } from '@mui/material'

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
    width: '100%',
    height:'100%',
    whiteSpace: 'pre',
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
    const [whtTray, setWhtTray] = useState([])
    const [data, setData] = useState({})
    const { trayId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/getWhtTrayItem/' +
                            trayId +
                            '/' +
                            'all-wht-tray/' +
                            location
                    )
                    if (response.status === 200) {
                        setData(response.data.data)
                        if (response.data.data?.items?.length == 0) {
                            setWhtTray(response.data.data.actual_items)
                        } else {
                            setWhtTray(response.data.data.items)
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
        fetchData()
    }, [])

    const columns = [
        {
            name: 'index',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold', ml:2}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>,
            },
        },
        {
            name: 'uic',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>UIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand_name',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model_name',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Model</Typography>,
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
                        { name: 'WHT', path: '/' },
                        { name: 'WHT-Tray-Item' },
                    ]}
                />
            </div>
            <Box>
                <H3>Tray Status : {data?.sort_id}</H3>
                <H3>Tray Display Name :{data?.display}</H3>
            </Box>
            <br />
            <>
                <ProductTable>
                <MUIDataTable
                title={'Tray'}
                data={whtTray}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                    download: false,
                    print: false,
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
            </>
           
        </Container>
    )
}

export default SimpleMuiTable
