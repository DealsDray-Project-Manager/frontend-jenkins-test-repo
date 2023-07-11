import React, { useEffect, useState, useMemo } from 'react'
import {
    Box,
    Button,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    Grid,
    Typography,
    MenuItem,
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useParams, useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from 'axios'
import Swal from 'sweetalert2'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

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
    const navigate = useNavigate()
    const [trayData, setTrayData] = useState([])
    const { trayId, sortId } = useParams()
    const [textDisable, setTextDisable] = useState(false)
    /**************************************************************************** */
    const [uic, setUic] = useState('')
    const [refresh, setRefresh] = useState(false)

    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const columns = [
        {
            name: 'index',
            label: <Typography sx={{fontWeight:'bold'}} noWrap>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'id',
            label: <Typography sx={{fontWeight:'bold'}} noWrap>Vendor ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: <Typography sx={{fontWeight:'bold'}}>Name</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'category',
            label: <Typography sx={{fontWeight:'bold'}}>Category</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'address',
            label: <Typography sx={{fontWeight:'bold'}}>Address</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'pincode',
            label: <Typography sx={{fontWeight:'bold'}}>Pincode</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'mob',
            label: <Typography sx={{fontWeight:'bold'}}>Mobile 1</Typography>,
            options: {
                filter: true,
            },
        }
    ]

    const columns1 = [
        {
            index:1,
            id:'VN000010',
            name:'abc',
            category:'bnm',
            address:'zxc',
            pincode:897342,
            mob:9837589374
        },
        {
            index:2,
            id:'VN000011',
            name:'abc',
            category:'bnm',
            address:'zxc',
            pincode:832542,
            mob:5474589374
        },
    ]
    const columns2 = [
        {
            name: 'index',
            label: <Typography sx={{fontWeight:'bold', ml:2}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'poid',
            label: <Typography sx={{fontWeight:'bold'}}>POID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'date',
            label: <Typography sx={{fontWeight:'bold'}}>Date</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'id',
            label: <Typography sx={{fontWeight:'bold'}}>Vendor ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'qty',
            label: <Typography sx={{fontWeight:'bold'}}>Quantity</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'price',
            label: <Typography sx={{fontWeight:'bold'}}>Price (Per)</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'total',
            label: <Typography sx={{fontWeight:'bold'}}>Total Amount</Typography>,
            options: {
                filter: true,
            },
        }
    ]

    const columns3 = [
        {
            index:1,
            poid:'POID001',
            date:'14-04-2023',
            id:'VN000010',
            qty:10,
            price:500,
            total:5000
        },
        {
            index:2,
            poid:'POID002',
            date:'14-04-2023',
            id:'VN000011',
            qty:4,
            price:200,
            total:800
        },
        {
            index:3,
            poid:'POID003',
            date:'14-04-2023',
            id:'VN000012',
            qty:20,
            price:200,
            total:4000
        },
        {
            index:4,
            poid:'POID004',
            date:'14-04-2023',
            id:'VN000013',
            qty:14,
            price:100,
            total:1400
        },
    ]

    /*********************************************************** */
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             let response = await axiosWarehouseIn.post(
    //                 '/get-tray-sorting/' + trayId
    //             )
    //             if (response.status === 200) {
    //                 setTrayData(response.data.data)
    //             } else {
    //                 Swal.fire({
    //                     position: 'top-center',
    //                     icon: 'error',
    //                     title: response?.data?.message,
    //                     confirmButtonText: 'Ok',
    //                 })
    //                 navigate(-1)
    //             }
    //         } catch (error) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Oops...',
    //                 confirmButtonText: 'Ok',
    //                 text: error,
    //             })
    //         }
    //     }
    //     fetchData()
    // }, [refresh])

    // const handelUic = async (e) => {
    //     if (e.target.value.length === 11) {
    //         try {
    //             let obj = {
    //                 uic: e.target.value,
    //                 trayId: trayId,
    //             }
    //             setTextDisable(true)
    //             let res = await axiosWarehouseIn.post('/check-uic', obj)
    //             if (res?.status === 200) {
    //                 addActualitem(res.data.data)
    //             } else {
    //                 setTextDisable(false)
    //                 setUic('')

    //                 Swal.fire({
    //                     position: 'top-center',
    //                     icon: 'error',
    //                     title: res?.data?.message,
    //                     confirmButtonText: 'Ok',
    //                 })
    //             }
    //         } catch (error) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Oops...',
    //                 confirmButtonText: 'Ok',
    //                 text: error,
    //             })
    //         }
    //     }
    // }
    /************************************************************************** */
    // const addActualitem = async (obj) => {
    //     if (trayData.limit <= trayData?.actual_items?.length) {
    //         Swal.fire({
    //             position: 'top-center',
    //             icon: 'success',
    //             title: 'All Items Scanned',
    //             confirmButtonText: 'Ok',
    //         })
    //     } else {
    //         setTextDisable(true)
    //         try {
    //             let objData = {
    //                 trayId: trayId,
    //                 item: obj,
    //             }
    //             let res = await axiosWarehouseIn.post(
    //                 '/wht-add-actual-item',
    //                 objData
    //             )
    //             if (res.status === 200) {
    //                 setUic('')
    //                 setTextDisable(false)
    //                 setRefresh((refresh) => !refresh)
    //             } else {
    //                 setTextDisable(false)

    //                 Swal.fire({
    //                     position: 'top-center',
    //                     icon: 'error',
    //                     title: res?.data?.message,
    //                     confirmButtonText: 'Ok',
    //                 })
    //             }
    //         } catch (error) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Oops...',
    //                 confirmButtonText: 'Ok',
    //                 text: error,
    //             })
    //         }
    //     }
    // }
    /************************************************************************** */
    const handleclose = () => {
        Swal.fire({
            title: 'Closed Successfully',
            icon: 'success'
        })
    }
    /************************************************************************** */
    // const tableExpected = useMemo(() => {
        return (
            <>
            <Container>
             <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Requests', path: '/' },
                        { name: 'Order' },
                    ]}
                />
            </div>
            <Box>
                    <Typography sx={{fontSize:'large', fontWeight:'bold'}}>Place order on request</Typography>
            </Box>   
            <br />
            <Box sx={{display:'inline-flex', justifyContent:'space-between'}}>
            <Card sx={{ width: '45%', height:'50%' }}>                
                    <Box
                        sx={{
                            // float: 'left',
                            ml: 2,
                        }}
                    >
                        <h4>Desired spare part & Quantity</h4>
                    </Box>
                    
              <Box sx={{display:'flex', justifyContent:'space-between', mb:2}}>
                <Box sx={{ml:2}}>
                    <Typography>Sare Part Number : SPN000736</Typography>
                    <Typography sx={{mt:1}}>Request ID : 1223, 1224</Typography>
                </Box>
                <Box sx={{mr:2}}>
                    <Typography>Quantity : 2</Typography>
                    <Typography sx={{mt:1}}>Request date : 13/06/2023</Typography>
                </Box>
              </Box>
                
            </Card>

            <Card sx={{ width: '53%'}}>
            <MUIDataTable
                title={'Tray'}
                data={columns1}
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
            </Card>
            </Box>

            <Card sx={{mt:3}}>
            <MUIDataTable
                title={'Purchase History'}
                data={columns3}
                columns={columns2}
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
            </Card>

            <Card sx={{p:2, mt:3}}>
                <Typography sx={{fontSize:'large', fontWeight:'bold', mb:2}}>Place Order</Typography>
                <Box>
                    <TextFieldCustOm
                    label='Select Vendor'
                    select
                    type='text' 
                    style={{ width: '200px', marginRight:'20px' }}
                    />
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" 
                          style={{ width: '200px', marginRight:'20px' }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                        
                    <TextFieldCustOm
                    label='Quantity'
                    type='number'
                    style={{ width: '200px',marginRight:'20px' }}
                    />

                    <TextFieldCustOm
                    label='Unit Price'
                    type='number'
                    style={{ width: '200px', marginRight:'20px' }}
                    />

                    <TextFieldCustOm
                    label='Total'
                    type='number'
                    style={{ width: '200px', marginRight:'20px' }}
                    />

                    <TextFieldCustOm
                    label='Payment Terms'
                    select
                    type='text'
                    style={{ width: '200px', marginRight:'20px' }}
                    />

                    <TextFieldCustOm
                    label='Technical QC'
                    select
                    type='text'
                    style={{ width: '200px', marginRight:'20px' }}
                    >
                        <MenuItem>Yes</MenuItem>
                        <MenuItem>No</MenuItem>
                    </TextFieldCustOm>
                    
                    <TextFieldCustOm
                    label='Waranty Terms'
                    select
                    type='text'
                    style={{ width: '200px', marginRight:'20px' }}
                    />
                </Box>

            </Card>
            </Container>
            </>
            
        )
    // })
    // const tableActul = useMemo(() => {
    //     return (
    //         <>
    //         <br />
    //         <br />
    //         <Paper sx={{ width: '98%', overflow: 'hidden', m: 1 }}>
    //             <Box sx={{}}>
    //                 <Box
    //                     sx={{
    //                         float: 'left',
    //                         ml: 2,
    //                     }}
    //                 >
    //                     <h4>Vendors</h4>
                        
    //                 </Box>
    //                 <Box
    //                     sx={{
    //                         float: 'right',
    //                         mr: 5,
    //                     }}
    //                 >
    //                     <Box sx={{}}>
    //                         <h5 style={{ marginLeft: '14px' }}>Total</h5>

    //                         <p style={{ marginLeft: '5px', fontSize: '24px' }}>
    //                             0/40
    //                         </p>
    //                     </Box>
    //                 </Box>
    //             </Box>
    //             <TableContainer>
    //                 <Table
    //                     style={{ width: '100%' }}
    //                     id="example"
    //                     stickyHeader
    //                     aria-label="sticky table"
    //                 >
    //                     <TableHead>
    //                         <TableRow>
    //                             <TableCell sx={{pl:2}}>S.NO</TableCell>
    //                             <TableCell>UIC</TableCell>
    //                            <TableCell>MUIC</TableCell>
    //                            <TableCell>Part Item</TableCell>
    //                         </TableRow>
    //                     </TableHead>

    //                     <TableBody>
    //                         {trayData?.actual_items?.map((data, index) => (
    //                             <TableRow hover role="checkbox" tabIndex={-1}>
    //                                 <TableCell sx={{pl:3}}>{index + 1}</TableCell>
    //                                 <TableCell>{data?.uic}</TableCell>
    //                                 {trayData?.type_taxanomy === 'MMT' &&
    //                                 trayData?.prefix == 'tray-master' ? (
    //                                     <TableCell>
    //                                         {data?.awbn_number}
    //                                     </TableCell>
    //                                 ) : (
    //                                     <TableCell>{data?.muic}</TableCell>
    //                                 )}
    //                                 {trayData?.type_taxanomy === 'MMT' &&
    //                                 trayData?.prefix == 'tray-master' ? (
    //                                     <TableCell>{data?.bag_id}</TableCell>
    //                                 ) : (
    //                                     <TableCell>{data?.tray_id}</TableCell>
    //                                 )}
    //                             </TableRow>
    //                         ))}
    //                     </TableBody>
    //                 </Table>
    //             </TableContainer>
    //         </Paper>
    //         </>
    //     )
    // }, [trayData?.actual_items, textDisable, uic])
    // return (
    //     <Container>
           

           
    //     </Container>
    // )
}

export default SimpleMuiTable
