import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Typography, TextField, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            setIsLoading(true)
            const { location } = jwt_decode(admin)
            const fetchData = async () => {
                try {
                    let res = await axiosSalsAgent.post(
                        '/viewPrice/' + location
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

    const handelViewItem = (brand, model, grade, date) => {
        navigate(
            '/sales/ready-for-sales/view-units/' +
                brand +
                '/' +
                model +
                '/' +
                grade +
                '/' +
                date
        )
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    marginLeft="7px"
                >
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'muic',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>MUIC</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.[0] || '',
            },
        },
        {
            name: '_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Brand</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.brand || '',
            },
        },
        {
            name: '_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Model</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.model || '',
            },
        },
        {
            name: 'itemCount',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Units</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: '_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Grade</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.grade || '',
            },
        },
        {
            name: 'mrp',
            label: <Typography sx={{ fontWeight: 'bold' }}>MRP</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sp',
            label: <Typography sx={{ fontWeight: 'bold' }}>SP</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'price_creation_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Creation Date</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }),
            },
        },
        {
            name: 'price_updation_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Updation Date</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }),
            },
        },
        {
            name: 'code',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    marginLeft="8px"
                >
                    <>Action</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={() =>
                                handelViewItem(
                                    tableMeta.rowData[2]?.brand,
                                    tableMeta.rowData[3]?.model,
                                    tableMeta.rowData[5]?.grade,
                                    tableMeta.rowData[8]
                                )
                            }
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            View
                        </Button>
                    )
                },
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
                        const columnProperties = {
                            1: 'muic',
                            2: 'brand',
                            3: 'model',
                            5: 'grade',
                        }

                        const property = columnProperties[colIndex]

                        if (property) {
                            return data.sort((a, b) => {
                                const aPropertyValue = getValueByProperty(
                                    a.data[colIndex],
                                    property
                                )
                                const bPropertyValue = getValueByProperty(
                                    b.data[colIndex],
                                    property
                                )

                                if (
                                    typeof aPropertyValue === 'string' &&
                                    typeof bPropertyValue === 'string'
                                ) {
                                    return (
                                        (order === 'asc' ? 1 : -1) *
                                        aPropertyValue.localeCompare(
                                            bPropertyValue
                                        )
                                    )
                                }

                                return (
                                    (parseFloat(aPropertyValue) -
                                        parseFloat(bPropertyValue)) *
                                    (order === 'desc' ? -1 : 1)
                                )
                            })
                        }

                        return data.sort((a, b) => {
                            const aValue = a.data[colIndex]
                            const bValue = b.data[colIndex]

                            if (aValue === bValue) {
                                return 0
                            }

                            if (aValue === null || aValue === undefined) {
                                return 1
                            }

                            if (bValue === null || bValue === undefined) {
                                return -1
                            }

                            if (
                                typeof aValue === 'string' &&
                                typeof bValue === 'string'
                            ) {
                                return (
                                    (order === 'asc' ? 1 : -1) *
                                    aValue.localeCompare(bValue)
                                )
                            }

                            return (
                                (parseFloat(aValue) - parseFloat(bValue)) *
                                (order === 'desc' ? -1 : 1)
                            )
                        })

                        function getValueByProperty(data, property) {
                            const properties = property.split('.')
                            let value = properties.reduce(
                                (obj, key) => obj?.[key],
                                data
                            )

                            return value !== undefined ? value : ''
                        }
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        </Container>
    )
}

export default SimpleMuiTable
