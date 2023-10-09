import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import {
    Button,
    Typography,
    Table,
    Box,
    Checkbox,
    TextField,
    MenuItem,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
    axiosSalsAgent,
    axiosSuperAdminPrexo,
    baseURL,
} from '../../../../axios'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
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
    const [isTableSorted, setIsTableSorted] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [state, setState] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [brand, setbrand] = useState([])
    const [model, setModel] = useState([])

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            setIsLoading(true)
            const { location } = jwt_decode(admin)
            const fetchData = async () => {
                try {
                    let res = await axiosSalsAgent.post(
                        '/viewPriceBasisMuic/' + location
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

    useEffect(() => {
        const FetchBrand = async () => {
            let res = await axiosSuperAdminPrexo.post('/getBrands')
            if (res.status == 200) {
                setbrand(res.data.data)
            }
        }
        FetchBrand()
    }, [])

    /*-----------------FETCH MODEL BASED ON THE BRAND---------------*/
    /* Fetch model */
    const fetchModel = async (brandName) => {
        try {
            let res = await axiosSuperAdminPrexo.post(
                '/get-product-model/' + brandName
            )
            if (res.status == 200) {
                setModel(res.data.data)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    /*---------------------STATE CHANGE FOR SORT----------------------*/
    const handleChangeSort = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }
    const handelSort = async () => {
        try {
            const admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                const { location } = jwt_decode(admin)
                setIsLoading(true)
                let obj = {
                    brand: state?.brand,
                    model: state?.model,
                    location: location,
                }
                const res = await axiosSalsAgent.post(
                    '/viewPriceBasisMuicFilter',
                    obj
                )
                if (res.status == 200) {
                    setIsLoading(false)
                    setItem(res.data.data)
                } else {
                    setItem(res.data.data)
                    setIsLoading(false)
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    const isSelected = (index) => selectedItems.indexOf(index) !== -1

    const handleRowSelect = (index) => {
        const selectedIndex = selectedItems.indexOf(index)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedItems, index)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedItems.slice(1))
        } else if (selectedIndex === selectedItems.length - 1) {
            newSelected = newSelected.concat(selectedItems.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedItems.slice(0, selectedIndex),
                selectedItems.slice(selectedIndex + 1)
            )
        }

        setSelectedItems(newSelected)
    }

    const handleSelectAll = () => {
        if (selectedItems.length === item.length) {
            setSelectedItems([])
        } else {
            setSelectedItems([...Array(item.length).keys()])
        }
    }

    const download = (e) => {
        const selectedData = selectedItems.map((index) => item[index])
        let arr = selectedData.map((selectedItem, i) => {
            return {
                'Record N0': i + 1,
                MUIC: selectedItem.muic_one,
                Brand: selectedItem.brand_name,
                Model: selectedItem.model_name,
                Units: selectedItem.itemCount,
                Grade: selectedItem._id.grade,
                // mrp_price: selectedItem.mrp,
                SP: selectedItem.sp,
            }
        })
        const fileExtension = '.xlsx'
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const ws = XLSX.utils.json_to_sheet(arr)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, 'Ready For Sales ' + fileExtension)
    }
    const downloadPDF = () => {
        const selectedData = selectedItems.map((index) => item[index])

        const doc = new jsPDF()
        doc.setFontSize(16)
        doc.text('Ready For Sales ', 15, 10)
        const downloadTime = new Date(Date.now()).toLocaleString('en-GB', {
            hour12: true,
        })

        doc.setFontSize(10)
        doc.text(`Downloaded on: ${downloadTime}`, 15, 20)
        const headers = [
            'Record No',
            'MUIC',
            'Brand',
            'Model',
            'Units',
            'Grade',
            // 'MRP',
            'SP',
        ]
        const data = selectedData.map((item, index) => [
            index + 1,
            item.muic_one,
            item.brand_name,
            item.model_name,
            item.itemCount,
            item._id.grade,
            // item.mrp,
            item.sp,
        ])

        doc.autoTable({
            head: [headers],
            body: data,
            startY: 30,
            theme: 'grid',
            showHead: 'firstPage',
        })
        doc.save('ReadyForSales.pdf')
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
            name: 'index',
            label: (
                <Checkbox
                    color="primary"
                    indeterminate={
                        selectedItems.length > 0 &&
                        selectedItems.length < item.length
                    }
                    checked={selectedItems.length === item.length}
                    onChange={() => handleSelectAll()}
                />
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => (
                    <Checkbox
                        color="primary"
                        checked={isSelected(tableMeta.rowIndex)}
                        onChange={(event) =>
                            handleRowSelect(tableMeta.rowIndex, event)
                        }
                    />
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
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Ready for sales', path: '/' }]}
                />
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Button
                        sx={{ mb: 2 }}
                        variant="contained"
                        color="success"
                        disabled={selectedItems.length == 0 || isTableSorted}
                        onClick={(e) => download(e)}
                    >
                        Download Excel
                    </Button>
                    <Button
                        sx={{ mb: 2, ml: 2 }}
                        variant="contained"
                        color="secondary"
                        disabled={selectedItems.length == 0 || isTableSorted}
                        onClick={downloadPDF}
                    >
                        Download PDF
                    </Button>
                </Box>
                <Box sx={{ mb: 1 }}>
                    <TextField
                        select
                        label="Select Brand"
                        variant="outlined"
                        sx={{ ml: 3, width: 150 }}
                        name="brand"
                        onChange={(e) => {
                            handleChangeSort(e)
                        }}
                    >
                        {brand.map((brandData) => (
                            <MenuItem
                                value={brandData.brand_name}
                                onClick={(e) => {
                                    fetchModel(brandData.brand_name)
                                }}
                            >
                                {brandData.brand_name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Select Model"
                        variant="outlined"
                        name="model"
                        onChange={(e) => {
                            handleChangeSort(e)
                        }}
                        sx={{ ml: 2, width: 150 }}
                    >
                        {model.map((modelData) => (
                            <MenuItem value={modelData.model_name}>
                                {modelData.model_name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        sx={{
                            ml: 2,
                            mt: 1,
                        }}
                        variant="contained"
                        disabled={
                            state.brand == undefined || state.model == undefined
                        }
                        onClick={() => handelSort()}
                        style={{ backgroundColor: 'green' }}
                        component="span"
                    >
                        Filter
                    </Button>
                </Box>
            </Box>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Ready for sales'}
                    data={item}
                    columns={columns}
                    options={{
                        filterType: 'textField',
                        responsive: 'simple',
                        download: false,
                        print: false,
                        selectableRows: 'multiple',
                        selectableRowsOnClick: true,
                        selectableRowsHeader: false,
                        selectedRows: selectedItems,
                        isRowSelectable: (dataIndex) => {
                            return (
                                filteredData.findIndex(
                                    (item) => item === dataIndex
                                ) !== -1
                            )
                        },
                        onRowsSelect: (
                            currentRowsSelected,
                            allRowsSelected
                        ) => {
                            setSelectedItems(
                                allRowsSelected.map((row) => row.index)
                            )
                        },
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
                                7: 'grade',
                            }

                            const property = columnProperties[colIndex]

                            if (property) {
                                setIsTableSorted(true) // Add this line
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
        </Container>
    )
}

export default SimpleMuiTable
