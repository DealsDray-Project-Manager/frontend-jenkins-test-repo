import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Typography, TextField, Box,Table } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosMisUser, axiospricingAgent, baseURL } from '../../../../axios'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import '../../../../app.css'


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
    const [location, setLoaction] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [addPricing, setAddPricing] = useState([])

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            setIsLoading(true)
            const { location } = jwt_decode(admin)
            const fetchData = async () => {
                try {
                    setLoaction(location)
                    let res = await axiospricingAgent.post(
                        '/readyForPricingMuicBasis/' + location
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
            setItem([])
        }
    }, [isAlive])

    const handleQtyChange = (muic, field, value, grade) => {
        // Find the item in the state based on the 'muic'
        const updatedItem = item.find(
            (item) => item.muic_one === muic && item?._id?.grade === grade
        )
        if (
            field === 'sp' &&
            value !== '' &&
            parseFloat(value) > parseFloat(updatedItem.mrp)
        ) {
            // Show a validation message (you can implement this using Swal or any other method)
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'MRP must be greater than SP.',
                confirmButtonText: 'Ok',
            })
        } else {
            // Check if the item is found
            if (updatedItem) {
                // Update the 'mrp' or 'sp' field in the item
                updatedItem[field] = value

                // Update the 'item' state with the modified item
                setItem((prevItems) =>
                    prevItems.map((item) =>
                        item.muic_one === muic && item?._id?.grade == grade
                            ? updatedItem
                            : item
                    )
                )

                // Check if the 'muic' is already in 'addPricing' list
                const existingItemIndex = addPricing.findIndex(
                    (item) => item.muic === muic && item.grade == grade
                )

                // If both 'mrp' and 'sp' fields are empty, remove the item from 'addPricing'
                if (field === 'mrp' && value === '' && updatedItem.sp === '') {
                    if (existingItemIndex !== -1) {
                        setAddPricing((prevPricing) =>
                            prevPricing.filter(
                                (item, index) => index !== existingItemIndex
                            )
                        )
                    }
                } else {
                    // If the 'muic' is not already in the 'addPricing' list, add it
                    if (existingItemIndex === -1) {
                        setAddPricing((prevPricing) => [
                            ...prevPricing,
                            { grade, muic, [field]: value },
                        ])
                    } else {
                        // If the 'muic' already exists in 'addPricing', update the 'mrp' or 'sp' field
                        const updatedPricing = addPricing.map((item, index) =>
                            index === existingItemIndex
                                ? { ...item, grade: grade, [field]: value }
                                : item
                        )
                        setAddPricing(updatedPricing)
                    }
                }
            }
        }
    }
    /*--------------------------------SUBMIT THE DATA ----------------*/
    const handelSubmit = async () => {
        // FLAG
        setLoading(true)
        let flag = false
        for (let x of addPricing) {
            if (
                isNaN(Number(x.mrp)) ||
                Number(x.mrp) < 0 ||
                isNaN(Number(x.sp)) ||
                Number(x.sp) < 0 ||
                x.sp == undefined ||
                x.mrp == undefined ||
                x.sp == '' ||
                x.mrp == ''
            ) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: `Please check this product ${x.muic} MRP OR SP is not acceptable"`,
                    confirmButtonText: 'Ok',
                })
                flag = true
                setLoading(false)
                break
            } else if (Number(x.mrp) < Number(x.sp)) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'MRP must be greater than SP.',
                    confirmButtonText: 'Ok',
                })
                flag = true
                setLoading(false)
                break
            }
        }
        let obj = {
            muicDetails: addPricing,
            location: location,
            screen: 'Price creation',
        }
        if (flag == false) {
            const res = await axiospricingAgent.post('/addPriceMuicBasis', obj)
            if (res.status == 200) {
                setAddPricing([])
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setItem([])
                        setLoading(false)
                        window.location.reload(true)
                    }
                })
            } else {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res?.data?.message,
                })
            }
        }
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
            name: 'muicDetails', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Image</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <img
                            height="80px"
                            width="80px"
                            src={
                                value?.[0]?.image == undefined
                                    ? `${baseURL}/product/image/` +
                                      value?.[0]?.vendor_sku_id +
                                      '.jpg'
                                    : value?.[0]?.image
                            }
                        />
                    )
                },
            },
        },
        {
            name: 'muic_one',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>MUIC</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'brand_name',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Brand</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'model_name',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Model</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'documentCount',
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
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, rowIndex) => {
                    const muic = tableMeta.rowData[2]
                    const grade = tableMeta.rowData[6]?.grade
                    const updatedItem = item.find(
                        (item) =>
                            item.muic_one === muic && item?._id?.grade === grade
                    )

                    return (
                        <TextField
                            value={updatedItem?.mrp || ''}
                            variant="outlined"
                            size="small"
                            onChange={(e) =>
                                handleQtyChange(
                                    muic,
                                    'mrp',
                                    e.target.value,
                                    grade
                                )
                            }
                        />
                    )
                },
            },
        },
        {
            name: 'sp',
            label: <Typography sx={{ fontWeight: 'bold' }}>SP</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, rowIndex) => {
                    const muic = tableMeta.rowData[2]
                    const grade = tableMeta.rowData[6]?.grade
                    const updatedItem = item.find(
                        (item) =>
                            item.muic_one === muic && item?._id?.grade === grade
                    )

                    return (
                        <TextField
                            value={updatedItem?.sp || ''}
                            variant="outlined"
                            size="small"
                            onChange={(e) =>
                                handleQtyChange(
                                    muic,
                                    'sp',
                                    e.target.value,
                                    grade
                                )
                            }
                        />
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Ready for pricing', path: '/' }]}
                />
            </div>
        <Table className="custom-table" >

            <MUIDataTable
                title={'Ready for pricing'}
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
                            6: 'grade',
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
        </Table>
            <Box sx={{ textAlign: 'right' }}>
                <Button
                    sx={{
                        mt: 1,
                    }}
                    variant="contained"
                    disabled={addPricing?.length == 0 || loading}
                    onClick={(e) => handelSubmit(e)}
                    style={{ backgroundColor: 'green' }}
                    component="span"
                >
                    Submit
                </Button>
            </Box>
        </Container>
    )
}

export default SimpleMuiTable
