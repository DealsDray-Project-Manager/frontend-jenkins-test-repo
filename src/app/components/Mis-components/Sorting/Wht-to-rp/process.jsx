import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Box, Checkbox , Typography, Table, TableContainer} from '@mui/material'
import { axiosMisUser, axiosWarehouseIn } from '../../../../../axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
// import AssignDialogBox from './user-dailog'
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
    width: '130%',
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
            name: 'code',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Tray ID</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Status</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'type_taxanomy',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Tray Category</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Brand</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Model</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Tray Name</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Limit</></Typography>,
            options: {
                filter: false,
                sort: false,
                display: false,
            },
        },
        {
            name: 'items',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Quantity</></Typography>,
            options: {
                filter: true,

                customBodyRender: (value, tableMeta) =>
                    value.length + '/' + tableMeta.rowData[8],
            },
        },
        {
            name: 'display',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Tray Display</></Typography>,
            options: {
                filter: true,
            },
        },

        {
            name: 'created_at',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Creation Date</></Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
    ]
    
    return ( 
        <Container>
        <div className="breadcrumb">
            <Breadcrumb
                routeSegments={[
                    { name: 'Assign-to-agent', path: '/' },
                    { name: 'Charging' },
                ]}
            />
        </div>
        <Box>
            <Typography>Assign for Repairs</Typography>
            </Box>
        
        <>
            <StyledTable
             sx={{
                borderRadius: '20px',
                margin: 'auto',
            }}
            >
            
            <MUIDataTable
            // title={'Assign for Repairs'}
            data={whtTray}
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
            </StyledTable>
        </>
       

        {/* {shouldOpenEditorDialog && (
            <AssignDialogBox
                handleClose={handleDialogClose}
                open={handleDialogOpen}
                setIsAlive={setIsAlive}
                chargingUsers={chargingUsers}
                isCheck={isCheck}
            />
        )} */}
    </Container>
     );
}
 
export default SimpleMuiTable;