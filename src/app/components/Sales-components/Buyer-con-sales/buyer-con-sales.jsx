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
                    console.log("res",res)
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

    useEffect(() => {console.log(userList)},[userList])


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
            name: 'user_name',
            label: <Typography marginBottom='15px' variant="subtitle1" fontWeight='bold'><>User Name</></Typography>,
            options: {
                filter: true,
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
          
        </Container>
    )
}

export default SimpleMuiTable
