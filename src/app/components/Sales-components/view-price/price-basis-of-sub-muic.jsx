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
    Select,
    InputLabel,
    FormControl,
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

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

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
    const [isTableSorted, setIsTableSorted] = useState(true)
    const [filteredData, setFilteredData] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [brand, setbrand] = useState([])
    const [model, setModel] = useState([])
    const [state, setState] = useState({
        brand: [],
        model: [],
        grade: [],
    })
    const [grade, setGrade] = useState([])
    const [skuData, setSkuData] = useState([])
    const [brandAvl, setBrandAvl] = useState([])

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
                        setBrandAvl(res.data.arrOfBrand)
                        setItem(res.data.data)
                        setSkuData(res.data.skuData)
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
            let categorys = await axiosSuperAdminPrexo.get(
                '/getCtxTrayCategory'
            )
            if (categorys.status == 200) {
                setGrade(categorys.data)
            }
        }
        FetchBrand()
    }, [])

    /*-----------------FETCH MODEL BASED ON THE BRAND---------------*/
    /* Fetch model */
    const fetchModel = async (newValue) => {
        try {
            let arr = state?.brand
            arr.push(newValue)
            let res = await axiosSalsAgent.post('/getModelBasisOfArray', arr)
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
        setState((prevState) => {
            const updatedState = {
                ...prevState,
                [name]: value,
            }
            return updatedState
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
                    grade: state?.grade,
                }
                const res = await axiosSalsAgent.post('/viewPriceFilter', obj)
                if (res.status == 200) {
                    setIsTableSorted(false) // Add this line
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
                'Sub Muic': selectedItem._id.sub_muic,
                RAM: selectedItem.ram,
                Storage: selectedItem.storage,
                Color: selectedItem.color,
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
            'Sub Muic',
            'RAM',
            'Storage',
            'Color',
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
            item._id.sub_muic,
            item.ram,
            item.storage,
            item.color,
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
                    <Typography sx={{ pl: 3 }}>
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
                <Typography sx={{ width: "500px" }} variant="subtitle1" fontWeight="bold">
                    <>Image</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: false,
                sort: false,
                customHeadRender: () => (
                    <th style={{ width: '95px' }}>Image</th>
                ),
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
            name: '_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Sub Muic</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, dataIndex) => value?.sub_muic || '',
            },
        },
        {
            name: 'ram',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RAM</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'storage',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Storage</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'color',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Color</>
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
                    <FormControl>
                        <InputLabel id="demo-multiple-name-label">
                            Select Brand
                        </InputLabel>
                        <Select
                            select
                            id="demo-multiple-name"
                            multiple
                            sx={{ width: 150 }}
                            name="brand"
                            MenuProps={MenuProps}
                            value={state?.brand}
                            onChange={(e) => {
                                handleChangeSort(e)
                            }}
                        >
                            {brand.map((brandData) =>
                                brandAvl?.includes(brandData?.brand_name) ? (
                                    <MenuItem
                                        onClick={(e) => {
                                            fetchModel(brandData.brand_name)
                                        }}
                                        value={brandData.brand_name}
                                    >
                                        {brandData.brand_name}
                                    </MenuItem>
                                ) : null
                            )}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ ml: 1 }}>
                        <InputLabel id="demo-multiple-name-label">
                            Select Model
                        </InputLabel>
                        <Select
                            select
                            id="demo-multiple-name"
                            name="model"
                            multiple
                            onChange={(e) => {
                                handleChangeSort(e)
                            }}
                            value={state?.model}
                            sx={{ width: 150 }}
                        >
                            {model.map((modelData) =>
                                skuData?.includes(modelData?.muic) ? (
                                    <MenuItem value={modelData.model_name}>
                                        {modelData.model_name}
                                    </MenuItem>
                                ) : null
                            )}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ ml: 1 }}>
                        <InputLabel id="demo-multiple-name-label">
                            Select Grade
                        </InputLabel>
                        <Select
                            select
                            id="demo-multiple-name"
                            sx={{ width: 150 }}
                            name="grade"
                            multiple
                            value={state?.grade}
                            onChange={(e) => {
                                handleChangeSort(e)
                            }}
                        >
                            {grade.map((gradeData) => (
                                <MenuItem value={gradeData.code}>
                                    {gradeData.code}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                                4: 'sub_muic',
                                11: 'grade',
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
        </Container>
    )
}

export default SimpleMuiTable
