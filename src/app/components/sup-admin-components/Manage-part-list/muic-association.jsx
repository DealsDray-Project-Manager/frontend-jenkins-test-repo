import React, { useEffect, useState, useMemo } from 'react'
import MUIDataTable from 'mui-datatables'

import { Breadcrumb } from 'app/components'
import {
    Box,
    Card,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Icon,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosSuperAdminPrexo } from '../../../../axios'

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

const Association = () => {
    const [partData, setPartData] = useState({})
    const { partId } = useParams()
    const [submitLoad, setSubmitLoad] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [muicData, setMuicData] = useState('')
    const [validationCount, setValidationCount] = useState({})
    const [validateButLoad, setValidateButLoad] = useState('')
    const [data, setData] = useState([])
    const [isAlive, setIsAlive] = useState(false)
    const navigate = useNavigate()
    const [pagination, setPagination] = useState({
        page: 1,
        size: 10,
        item: [],
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let res = await axiosSuperAdminPrexo.post(
                    '/partList/oneData/' + partId + '/' + 'part-list'
                )
                if (res.status == 200) {
                    setIsLoading(false)
                    setPartData(res.data.data)
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchData()
    }, [isAlive])

    useEffect(() => {
        setData((_) =>
            pagination.item
                .slice(
                    (pagination.page - 1) * pagination.size,
                    pagination.page * pagination.size
                )
                .map((d, index) => {
                    d.id = (pagination.page - 1) * pagination.size + index + 1
                    return d
                })
        )
    }, [pagination.page, pagination.item])

    const handelDelete = (partId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to Remove!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedString = muicData.replace(partId + ',', '')
                setMuicData(updatedString)
                setPagination((p) => ({
                    ...p,
                    item: pagination.item.filter(
                        (item) => item.partId != partId
                    ),
                }))
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Your Muic has been Removed',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                })
            }
        })
    }

    // validate muic
    const validateMuic = async () => {
        try {
            setValidateButLoad(true)
            let obj = {
                muic: muicData,
                part_code: partData?.part_code,
            }
            let res = await axiosSuperAdminPrexo.post(
                '/muicAssociation/bulkValidation',
                obj
            )
            if (res.status == 200) {
                setValidateButLoad(false)
                setPagination((p) => ({
                    ...p,
                    totalPage: Math.ceil(res.data.data.length / p.size),
                    item: res.data.data,
                }))
                setValidationCount(res.data.validateObj)
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                })
            } else {
                setValidateButLoad(false)
                setPagination((p) => ({
                    ...p,
                    totalPage: Math.ceil(res.data.data.length / p.size),
                    item: res.data.data,
                }))
                setValidationCount(res.data.validateObj)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res.data.message,
                })
            }
        } catch (error) {
            alert(error)
        }
    }

    // HANDEL SUBMIT
    const handelSubmit = async () => {
        try {
            setSubmitLoad(true)
            let obj = {
                part_code: partData?.part_code,
                muic: pagination.item,
            }
            let res = await axiosSuperAdminPrexo.post(
                '/muicAssociation/add',
                obj
            )
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setSubmitLoad(false)
                        navigate(
                            '/sup-admin/view-part-list/muic-association/success',
                            {
                                state: {
                                    validatedSuccess: validationCount,
                                },
                            }
                        )
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    // HANDEL REMOVE FROM DB
    const handelRemoveFromDb = (muic) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You want to Remove!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Remove it!',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let obj = {
                        muic: muic,
                        part_code: partData?.part_code,
                    }
                    let res = await axiosSuperAdminPrexo.post(
                        '/muicAssociation/remove',
                        obj
                    )
                    if (res.status == 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Your Muic has been Removed',
                            confirmButtonText: 'Ok',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setIsAlive((isAlive) => !isAlive)
                            }
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            confirmButtonText: 'Ok',
                            text: res.data.message,
                        })
                    }
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }

    const columns = [
        {
            name: 'index',
            label: <Typography fontWeight='bold' fontSize='16px' sx={{ ml: 3 }}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>,
            },
        },
        {
            name: 'muic', // field name in the row object
            label: <Typography fontWeight='bold' fontSize='16px' sx={{ ml: 3 }}>MUIC</Typography>, // column title that will be shown in table
            options: {
                filter: true,
                customBodyRender: (value) => (
                    <Typography sx={{ ml:3 }}>
                      {value} {/* Apply the desired alignment, 'center' in this case */}
                    </Typography>
                  ),
            },
        },
        {
            name: 'brand', // field name in the row object
            label: <Typography fontWeight='bold' fontSize='16px' sx={{ ml: 3 }}>Brand</Typography>, // column title that will be shown in table
            options: {
                filter: true,
                customBodyRender: (value) => (
                    <Typography sx={{ ml:3 }}>
                      {value} {/* Apply the desired alignment, 'center' in this case */}
                    </Typography>
                  ),
            },
        },
        {
            name: 'model', // field name in the row object
            label: <Typography fontWeight='bold' fontSize='16px' sx={{ ml: 3 }}>Model</Typography>, // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: <Typography fontWeight='bold' fontSize='16px' sx={{ ml: 3 }}>Actions</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems:'cenetr'
                            }}
                        >
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        handelRemoveFromDb(value)
                                    }}
                                    color="error"
                                >
                                    delete
                                </Icon>
                            </IconButton>
                        </Box>
                    )
                },
            },
        },
    ]

    return (
        // <Card sx={{width:'920px',marginTop:"40px",marginBottom:"40px", marginLeft:"50px",border:'1px solid black'}}>

        <>
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Part-List', path: '/' },
                            { name: 'MUIC Association' },
                        ]}
                        style={{ marginLeft: '20px' }}
                    />
                </div>

                <Box sx={{ p: 1, display: 'flex' }}>
                    <Box>
                        <Card sx={{ mb: 5 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{
                                        p: 3,
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}
                                >
                                    PART NUMBER: {partData?.part_code}
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    // disabled={validateButLoad  muicData == ''}
                                    onClick={() => {
                                        navigate('/sup-admin/view-part-list')
                                    }}
                                    sx={{ margin: 'auto', mt: 4, mr: 4 }}
                                >
                                    Back to Spare Part List
                                </Button>
                            </Box>

                            <Box
                                sx={{
                                    p: 3,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box sx={{ display: 'flex' }}>
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                marginBottom: '14px',
                                            }}
                                        >
                                            Part Name : {partData?.name}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    marginBottom: '10px',
                                                    marginRight: '10px',
                                                }}
                                            >
                                                Technical QC :{' '}
                                            </Typography>
                                            <FormControl
                                                component="fieldset"
                                                // sx={{ ml: 2 }}
                                            >
                                                <RadioGroup
                                                    sx={{
                                                        flexDirection: 'row',
                                                        mb: 1,
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        value="option1"
                                                        control={<Radio />}
                                                        label="Y"
                                                        checked={
                                                            partData?.technical_qc ==
                                                            'Y'
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        value="option2"
                                                        control={<Radio />}
                                                        label="N"
                                                        checked={
                                                            partData?.technical_qc ==
                                                            'N'
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Box>
                                    </Box>

                                    <Box sx={{ ml: 40 }}>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                marginBottom: '21px',
                                            }}
                                        >
                                            Part Color : {partData?.color}
                                        </Typography>

                                        <Typography sx={{ fontSize: '16px' }}>
                                            Description :{' '}
                                            {partData?.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    marginLeft: 'auto',
                                    display: 'flex',
                                    mr: 4,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // disabled={validateButLoad  muicData == ''}
                                    onClick={() => {
                                        navigate(
                                            '/sup-admin/view-part-list/addmuic/' +
                                                partId
                                        )
                                    }}
                                    sx={{
                                        margin: 'auto',
                                        display: 'flex',
                                        mr: 0,
                                    }}
                                >
                                    Associate MUIC
                                </Button>
                            </Box>
                            <br />
                       
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        ml: 3,
                                        fontSize: '20px',
                                    }}
                                >
                                    MUIC Associated
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold', mr: 4 }}>
                                    Total - {partData?.muic_association?.length}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    border: '',
                                    width: '100%',
                                    marginLeft: '',
                                    marginRight: '',
                                    borderRadius: '8px',
                                    background: 'white',
                                }}
                                overflow="auto"
                            >
                                <StyledTable
                                    sx={{
                                        borderRadius: '20px',
                                        margin: 'auto',
                                    }}
                                >
                                    <MUIDataTable
                                        // title={'MUIC Associated'}
                                        data={partData?.muic_association}
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
                                            rowsPerPageOptions: [
                                                10, 20, 40, 80, 100,
                                            ],
                                        }}
                                    />
                                </StyledTable>
                                <br />
                            </Box>
                        </Card>
                        <br />
                        <br />
                        {pagination?.item?.length !== 0 ? (
                            <Card
                                sx={{
                                    border: '',
                                    marginRight: '',
                                    marginLeft: '',
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            p: 2,
                                            fontWeight: 'bold',
                                            fontSize: '20px',
                                        }}
                                    >
                                        MUIC Validation
                                    </Typography>
                                    <Typography
                                        sx={{ fontWeight: 'bold', ml: 80 }}
                                    >
                                        Total Added - {validationCount?.total} |
                                        Valid - {validationCount?.success} |
                                        Duplicates -{validationCount?.duplicate}{' '}
                                        | Invalid - {validationCount?.inValid} |
                                        Already Added -{' '}
                                        {validationCount?.AlreadyAdded}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        border: '',
                                        width: '100%',
                                        marginLeft: '',
                                        marginRight: '',
                                        borderRadius: '8px',
                                        background: 'white',
                                    }}
                                    overflow="auto"
                                >
                                    <StyledTable
                                        sx={{
                                            borderRadius: '20px',
                                            margin: 'auto',
                                        }}
                                    >
                                        <TableHead sx={{ background: 'white' }}>
                                            <TableRow sx={{}}>
                                                <TableCell align="center">
                                                    Sl No
                                                </TableCell>
                                                <TableCell align="center">
                                                    MUIC
                                                </TableCell>
                                                <TableCell align="center">
                                                    Brand
                                                </TableCell>
                                                <TableCell align="center">
                                                    Model
                                                </TableCell>
                                                <TableCell align="center">
                                                    Validation
                                                </TableCell>
                                                <TableCell align="center">
                                                    Action
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data?.map((phones, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="center">
                                                        {phones.id}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {phones.muic}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {phones.brand}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {phones.model}
                                                    </TableCell>
                                                    <TableCell
                                                        style={
                                                            phones?.validationStatus ==
                                                            'Success'
                                                                ? {
                                                                      color: 'green',
                                                                  }
                                                                : {
                                                                      color: 'red',
                                                                  }
                                                        }
                                                        align="center"
                                                    >
                                                        {
                                                            phones.validationStatus
                                                        }
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            onClick={(e) => {
                                                                handelDelete(
                                                                    phones?.partId
                                                                )
                                                            }}
                                                        >
                                                            <Icon color="error">
                                                                delete
                                                            </Icon>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </StyledTable>
                                    <Box
                                        sx={{
                                            float: 'right',
                                        }}
                                    >
                                        {pagination.item.length &&
                                        validateButLoad != true ? (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'end',
                                                    mt: 1,
                                                    mr: 3,
                                                    ml: 3,
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    sx={{ m: 1 }}
                                                    disabled={
                                                        pagination.page === 1
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            '#206CE2',
                                                    }}
                                                    onClick={(e) =>
                                                        setPagination((p) => ({
                                                            ...p,
                                                            page: --p.page,
                                                        }))
                                                    }
                                                >
                                                    Previous
                                                </Button>

                                                <h6
                                                    style={{
                                                        marginTop: '19px',
                                                    }}
                                                >
                                                    {pagination.page}/
                                                    {pagination.totalPage}
                                                </h6>
                                                <Button
                                                    variant="contained"
                                                    sx={{ m: 1 }}
                                                    disabled={
                                                        pagination.page ===
                                                        pagination.totalPage
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            '#206CE2',
                                                    }}
                                                    onClick={(e) =>
                                                        setPagination((p) => ({
                                                            ...p,
                                                            page: ++p.page,
                                                        }))
                                                    }
                                                >
                                                    Next
                                                </Button>
                                            </Box>
                                        ) : null}
                                    </Box>
                                </Box>
                                <br />
                                <Box
                                    sx={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => {
                                            handelSubmit(e)
                                        }}
                                        disabled={submitLoad}
                                        sx={{ margin: 'auto', mt: 1, mb: 2 }}
                                    >
                                        {submitLoad == true
                                            ? 'Please Wait...'
                                            : 'Associate MUIC'}
                                    </Button>
                                </Box>
                            </Card>
                        ) : null}
                    </Box>
                </Box>
            </Container>
        </>
        // </Card>
    )
}

export default Association
