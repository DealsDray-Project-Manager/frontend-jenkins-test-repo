import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Button, Typography, Card, Box } from '@mui/material'
import Swal from 'sweetalert2'
import { axiosSpMisAgent } from '../../../../../../axios'

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
    const [isLoading, setIsLoading] = useState(false)
    const [location, setLocation] = useState('')
    const { brand, model } = useParams()
    const [spList, setSpList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    const { location } = jwt_decode(admin)
                    setLocation(location)
                    setIsLoading(true)
                    let obj = {
                        brand: brand,
                        model: model,
                        location: location,
                    }
                    const res = await axiosSpMisAgent.post(
                        '/procurment/creation',
                        obj
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setSpList(res.data.data)
                    }
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
                </Typography>
            ),
            options: {
                filter: false,
                sort: true,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'part_id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Part Number</Typography>
            ),
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'part_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Part Name</Typography>
            ),
            options: {
                filter: true,
                sort: true,
            },
        },

        {
            name: 'brand',
            label: <Typography sx={{ fontWeight: 'bold' }}>Brand</Typography>,
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'model',
            label: <Typography sx={{ fontWeight: 'bold' }}>Model</Typography>,
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'aval_qty',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Available Quantity
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'required_qty',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Required Quantity
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'WHT to RP', path: '/' },
                        { name: 'Pats Not Available' },
                    ]}
                />
            </div>
            <Card>
                <MUIDataTable
                    title={'View sp'}
                    data={spList}
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
                <br />
            </Card>
        </Container>
    )
}

export default SimpleMuiTable
