import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Typography, TextField, Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosSalsAgent, axiospricingAgent } from '../../../../axios'
import jwt_decode from 'jwt-decode'
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

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [item, setItem] = useState([])
    const { brand, model, grade, date } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            setIsLoading(true)
            const { location } = jwt_decode(admin)
            const fetchData = async () => {
                try {
                    let obj={
                        location:location,
                        brand:brand,
                        model:model,
                        grade:grade,
                        date:date
                    }
                    let res = await axiosSalsAgent.post(
                        '/viewItemsForReadyForSales',obj
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
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const columns = [
        {
            name: 'index', // Use a unique name for the column
            label: "Record No",
            options: {
                filter: false,
                sort: false,
                display: 'true', // Set this column to always be visible
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return (
                        <Typography sx={{ pl: 4 }}>
                            {rowIndex + 1}
                        </Typography>
                    );
                },
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Record No
                    </Typography>
                ),
            },
        },
        {
            name: 'uic',
            label: "UIC",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      UIC
                    </Typography>
                ),
               
            },
        },
        {
            name: 'muic',
            label: "MUIC",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      MUIC
                    </Typography>
                ),
                

            },
        },
        {
            name: 'brand_name',
            label:"Brand",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      Brand
                    </Typography>
                ),
               
            },
        },
        {
            name: 'model_name',
            label:"Model",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      Model
                    </Typography>
                ),
                
            },
        },
        {
            name: 'code',
            label:"Tray Id",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      Tray Id
                    </Typography>
                ),
            },
        },
        {
            name: 'tray_grade',
            label: "Grade",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      Grade
                    </Typography>
                ),
            },
        },
        {
            name: 'mrp_price',
            label: "MRP",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      MRP
                    </Typography>
                ),
            },
        },
        {
            name: 'sp_price',
            label: "SP",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                      SP
                    </Typography>
                ),
            },
        },
       
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Ready for sales', path: '/' }]}
                />
            </div>

            <MUIDataTable
                title={'Ready for sales'}
                data={item}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                   
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
        </Container>
    )
}

export default SimpleMuiTable
