import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo, axiosWarehouseIn } from '../../../../axios'
import { Button, Typography,Table, TableContainer } from '@mui/material'
import { useParams } from 'react-router-dom'

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
        paddingLeft: '36px !important',
    },
}))

const ScrollableTableContainer = styled(TableContainer)
`overflow-x: auto`;

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [bagItemList, setBagItemList] = useState([])
    const [handelSumitDis, setSubmitButDis] = useState(false)
    const { bagId } = useParams()

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const res = await axiosSuperAdminPrexo.post(
                    '/getBagItemInvalid/' + bagId
                )
                if (res.status === 200) {
                    setBagItemList(res.data.data.items)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res?.data?.message,
                    })
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchBrand()
        return () => setIsAlive(false)
    }, [isAlive])

    const handelDelete = async (id, awbn, state) => {
        try {
            setSubmitButDis(true)
            let obj = {
                id: id,
                bagId: bagId,
                awbn: awbn,
                state: state,
            }
            let data = await axiosWarehouseIn.post('/stockin', obj)
            if (data.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: data?.data?.message,
                })
                setSubmitButDis(false)
                setIsAlive((isAlive) => !isAlive)
            } else {
                setSubmitButDis(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data?.data?.message,
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    const columns = [
        {
            name: 'index',
            label: <Typography variant="subtitle1" fontWeight='bold' sx={{marginLeft:'7px'}}><>Record No</></Typography>,
            options: {
                filter: true,
                sort: true,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'awbn_number', // field name in the row object
            label: <Typography variant="subtitle1" fontWeight='bold'><>Tracking ID</></Typography>, // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: '_id', // field name in the row object
            label: 'obj id', // column title that will be shown in table
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'order_id',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Order ID</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'order_date',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Order Date</></Typography>,
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }),
            },
        },
        {
            name: 'status',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Status</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'status',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Action</></Typography>,
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return value == 'Invalid' ? (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            disabled={handelSumitDis}
                            variant="contained"
                            onClick={() => {
                                if (window.confirm('You want to Remove?')) {
                                    handelDelete(
                                        tableMeta.rowData[2],
                                        tableMeta.rowData[1],
                                        value
                                    )
                                }
                            }}
                            style={{ backgroundColor: 'red' }}
                            component="span"
                        >
                            Remove
                        </Button>
                    ) : null
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Remove Invalid Units', path: '/' },
                        { name: 'View-Item' },
                    ]}
                />
            </div>

            <ScrollableTableContainer>
                <ProductTable>
                <MUIDataTable
                title={'Bag Item'}
                data={bagItemList}
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
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
                </ProductTable>
            </ScrollableTableContainer>
            
        </Container>
    )
}

export default SimpleMuiTable
