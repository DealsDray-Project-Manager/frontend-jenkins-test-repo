import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Box, Checkbox , Typography, Table, TableContainer, Card} from '@mui/material'
import { axiosMisUser, axiosWarehouseIn } from '../../../../../axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import AssignDialogBox from './assign-dialog'
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

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}))

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '111%',
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
const ProductTable1 = styled(Table)(() => ({
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

const ScrollableTableContainer = styled(TableContainer)
`overflow-x: auto`;


const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [whtTray, setWhtTray] = useState([])
    const [isCheck, setIsCheck] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [chargingUsers, setChargingUsers] = useState([])
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    
    const handleClick = (e) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }
    
    const handleDialogClose = () => {
        setIsCheck([])
        setChargingUsers([])
        setShouldOpenEditorDialog(false)
    }
    
    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    const handelGetBqcUser = () => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let res = await axiosMisUser.post(
                        '/get-charging-users/' + 'BQC/' + location
                    )
                    if (res.status == 200) {
                        setChargingUsers(res.data.data)
                        handleDialogOpen()
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text:error,
                })
            }
        }
        fetchData()
    }


    const columns = [
        {
            name: 'code', 
            label: <Typography variant="subtitle1" fontWeight='bold' sx={{marginLeft:'7px'}}><>Select</></Typography>,
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, dataIndex) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                handleClick(e)
                            }}
                            id={value}
                            key={value}
                            checked={isCheck.includes(value)}
                        />
                    )
                },
            },
        },
        {
            name: 'index',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Record No</></Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },

        {
            name: 'uic',
            label: <Typography variant="subtitle1" fontWeight='bold'><>UIC</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Tray ID</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'rdl1_done_date',
            label: <Typography variant="subtitle1" fontWeight='bold'><>RDL 1 Done Date</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'rdl1_username',
            label: <Typography variant="subtitle1" fontWeight='bold'><>RDL 1 Username</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'rdl1_user_remarks',
            label: <Typography variant="subtitle1" fontWeight='bold'><>RDL 1 User Remarks</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'repair_item',
            label: <Typography variant="subtitle1" fontWeight='bold' sx={{ml:5}}><>Repair Item</></Typography>,
            options: {
                filter: true,
            },
        },
        
    ]

    const columns1 = [
        {
            index:'1',
            uic:'574',
            code:'WHT04',
            rdl1_done_date:'01-12-2022',
            rdl1_username:'abc',
            rdl1_user_remarks:'2 Parts Required',
            repair_item:' 1. Camera Glass/Black-XIOMI MI A2 SPN000735 ,  2. Camera Glass/Black-XIOMI MI A2 SPN000736'
        },
        {
            index:'2',
            uic:'1116',
            code:'WHT09',
            rdl1_done_date:'22-12-2022',
            rdl1_username:'sfc',
            rdl1_user_remarks:'2 Parts Required',
            repair_item:'  1. Back Panel/Black-XIOMI MI A2 SPN000737,  2. Camera Glass/Black-XIOMI MI A2 SPN000738'
        },
        {
            index:'3',
            uic:'867',
            code:'WHT04',
            rdl1_done_date:'02-1-2022',
            rdl1_username:'dgs',
            rdl1_user_remarks:'2 Parts Required',
            repair_item:' 1. Camera Glass/Black-XIOMI MI A2 SPN000739,  2. Camera Glass/Black-XIOMI MI A2 SPN000740'
        },
        {
            index:'4',
            uic:'538',
            code:'WHT08',
            rdl1_done_date:'02-10-2022',
            rdl1_username:'asff',
            rdl1_user_remarks:'2 Parts Required',
            repair_item:' 1. Camera Glass/Black-XIOMI MI A2 SPN000739,  2. Camera Glass/Black-XIOMI MI A2 SPN000742'
        },

    ]
    
    const columns2 = [
        {
            name: 'index',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Record No</></Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },

        {
            name: 'spare_part_no',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Spare Part Number</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'spare_part_name',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Spare Part Name</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'uic',
            label: <Typography variant="subtitle1" fontWeight='bold'><>UIC's Selected</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'available_qty',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Available Quantity</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'selected_qty',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Selected Quantity</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'balance_qty',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Balance Quantity</></Typography>,
            options: {
                filter: true,
            },
        },
        
    ]

     const columns3 = [
        {
            index:'1',
            spare_part_no:'SPN000739',
            spare_part_name:'Camera Glass/Black-XIOMI MI A2',
            uic:'867',
            available_qty:'10',
            selected_qty:'1',
            balance_qty:'9'
        },
        {
            index:'2',
            spare_part_no:'SPN000739',
            spare_part_name:'Camera Glass/Black-XIOMI MI A2',
            uic:'867, 538',
            available_qty:'2',
            selected_qty:'2',
            balance_qty:'0'
        },
        {
            index:'3',
            spare_part_no:'SPN000739',
            spare_part_name:'Camera Glass/Black-XIOMI MI A2',
            uic:'538',
            available_qty:'5',
            selected_qty:'1',
            balance_qty:'4'
        },
        
     ]

    return ( 
        <Container>
        <div className="breadcrumb">
            <Breadcrumb
                routeSegments={[
                    { name: 'Sorting', path: '/' },
                    { name: 'Wht-To-Rp', path: '/' },
                    { name: 'Process' },
                ]}
            />
        </div>
        
            <Card sx={{}}>

            <Box>
            <Box sx={{pt:2, pl:2}}>
                <Typography sx={{fontSize:'large', fontWeight:'bold'}}>Assign for Repairs</Typography>
                <Typography sx={{mt:2}}>Brand : Oppo</Typography>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Typography sx={{ml:2}}>Model : K5</Typography>
                <Typography sx={{mr:4}}>Total : 4</Typography>
            </Box>

            <Box sx={{
                        border: '',
                        width: '100%',
                        marginLeft: '',
                        marginRight: '',
                        borderRadius: '8px',
                        background: 'white',
                    }}
                                overflow="auto">
            <StyledTable
                sx={{
                    borderRadius: '20px',
                    margin: 'auto',
                    
                }}
            >
            <MUIDataTable
            // title={'Assign for Repairs'}
            sx={{borderTop:'0px'}}
            data={columns1}
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
                //  pagination: false, //set pagination option
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
                // elevation: 0,
                // rowsPerPageOptions: [10, 20, 40, 80, 100],
            }}
        />
            </StyledTable>
            </Box>
            
        </Box>
        </Card>
          <br />
          <br />
          <Card>
           <Box sx={{p:2}}>
                <Typography sx={{fontSize:'large', fontWeight:'bold'}}>Spare Part Availability & Selection</Typography> 
           </Box> 

            <ScrollableTableContainer>
                <ProductTable1>
                <MUIDataTable
            // title={'Assign for Repairs'}
                data={columns3}
                columns={columns2}
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
                // rowsPerPageOptions: [10, 20, 40, 80, 100],
            }}
        />
        <Box sx={{textAlign:'right', mr:4}}>
        <Button
            sx={{
                m: 1,
            }}
            variant="contained"
            // disabled={isCheck.length == 0}
            onClick={() => handelGetBqcUser(true)}
            style={{ backgroundColor: 'green' }}
            component="span"
        >
            Send to Repair
        </Button>
        </Box>
                </ProductTable1>
            </ScrollableTableContainer>
      
        </Card>
        {shouldOpenEditorDialog && (
            <AssignDialogBox
                handleClose={handleDialogClose}
                open={handleDialogOpen}
                setIsAlive={setIsAlive}
                chargingUsers={chargingUsers}
                isCheck={isCheck}
            />
        )}
    </Container>
     );
}
 
export default SimpleMuiTable;