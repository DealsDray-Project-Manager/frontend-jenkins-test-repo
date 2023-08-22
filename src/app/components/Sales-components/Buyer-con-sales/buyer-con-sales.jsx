import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { styled } from '@mui/system'
import { Button, IconButton, Icon,Typography,TableContainer,Radio,Box,Table } from '@mui/material'
import { axiosSuperAdminPrexo } from '../../../../axios'
import Avatar from '@mui/material/Avatar'
import jwt_decode from 'jwt-decode'
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
    minWidth: 950,
    width: '180%',
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
    const [userList, setUserList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if(admin){
                    let { user_name } = jwt_decode(admin)
                    setIsLoading(true)
                    const res = await axiosSuperAdminPrexo.post('/buyerConSalesAgent/' + user_name)
                    if (res.status === 200) {
                        setIsLoading(false)
                        setUserList(res.data.data.buyer)
                    }
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
        fetchUser()
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])


    const columns = [
        {
            name: 'index',
            label: <Typography marginBottom='15px' variant="subtitle1" fontWeight='bold' marginLeft='7px'><>Record No</></Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography noWrap sx={{pl:3}}>{dataIndex.rowIndex + 1}</Typography>,   
            },    
        },
        {
            name: 'creation_date',
            label: <Typography marginBottom='15px' variant="subtitle1" fontWeight='bold'><>Creation Date</></Typography>,
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },    
        },
        {
            name: 'name', 
            label: <Typography marginBottom='15px' variant="subtitle1" fontWeight='bold' sx={{mr:2}}><>Name</></Typography>,
            options: {
                filter: true,
            },    
        },
        {
            name: 'email',
            label: <Typography marginBottom='15px'  variant="subtitle1" fontWeight='bold' sx={{mr:2}}><>Email</></Typography>,
            options: {
                filter: true,
            },
             
        },
        {
            name: 'contact',
            label: <Typography marginBottom='15px'  variant="subtitle1" fontWeight='bold' ><>Mobile No</></Typography>,
            options: {
                filter: true,
            },     
        },
        {
            name: 'buyer_name',
            label: <Typography marginBottom='15px' variant="subtitle1" fontWeight='bold'><>User Name</></Typography>,
            options: {
                filter: true,
            },
             
        },
        {
            name: 'billing_address',
            label: "Address",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      Address
                    </Typography>
                ),
               
            },
        },
        {
            name: 'city',
            label: "City",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                     City
                    </Typography>
                ),
               
            },
        },
        {
            name: 'state',
            label: "State",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      State
                    </Typography>
                ),
               
            },
        },
        {
            name: 'country',
            label: "Country",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      Country
                    </Typography>
                ),
               
            },
        },
        {
            name: 'pincode',
            label: "Pincode",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                     Pincode
                    </Typography>
                ),
               
            },
        },
        {
            name: 'gstin',
            label: "GSTIN",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      GSTIN
                    </Typography>
                ),
               
            },
        },
        {
            name: 'pan_card_number',
            label: "Pan Number",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      Pan Number
                    </Typography>
                ),
               
            },
        },
        {
            name: 'mobile_verification_status',
            label: "Mobile Status",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      Mobile Status
                    </Typography>
                ),
               
            },
        },
        {
            name: 'email_verification_status',
            label: "Email Status",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      Email Status
                    </Typography>
                ),
               
            },
        },
        {
            name: 'status',
            label: <Typography marginBottom='15px' variant="subtitle1" fontWeight='bold'><>Status</></Typography>,
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
                    routeSegments={[{ name: 'Buyer', path: '/' }]}
                />
            </div>
            <ScrollableTableContainer>
            <ProductTable>
                <MUIDataTable
                title={'All Buyers'}
                data={userList}
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
                    selectableRows: 'none', 
                    elevation: 0,
                    rowsPerPageOptions: [10, 15, 40, 80, 100],
                    sort:true,
                }}
            />
           </ProductTable>
            </ScrollableTableContainer>
          
        </Container>
    )
}

export default SimpleMuiTable
