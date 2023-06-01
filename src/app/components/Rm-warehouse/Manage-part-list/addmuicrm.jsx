import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Box, Card, Typography } from '@mui/material'
import { Button, IconButton, Icon } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { axiosSuperAdminPrexo } from '../../../../axios'
import Swal from 'sweetalert2'

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}))

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
const Addmuicrm = () => {
    const [validationCount, setValidationCount] = useState({})
    const [validateButLoad, setValidateButLoad] = useState('')
    const { partId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [submitLoad, setSubmitLoad] = useState(false)
    const [data, setData] = useState([])
    const [muicData, setMuicData] = useState('')
    const [partData, setPartData] = useState({})
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
                    totalPage: Math.ceil(res.data.data.length  / p.size),
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
                    totalPage: Math.ceil(res.data.data.length  / p.size),
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
                            '/sp-user/view-part-list/muic-association/success',
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
            label: <Typography sx={{ml:3}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'muic', // field name in the row object
            label: <Typography sx={{ml:3}}>MUIC</Typography>, // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'brand', // field name in the row object
            label: <Typography sx={{ml:3}}>Brand</Typography>, // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'model', // field name in the row object
            label: <Typography sx={{ml:3}}>Model</Typography>, // column title that will be shown in table
            options: {
                filter: true,
            },
        },

        {
            name: 'muic',
            label: <Typography sx={{ml:3}}>Actions</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
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
        <Container>
        <div className="breadcrumb">
            <Breadcrumb
                routeSegments={[
                    { name: 'Part-List', path: '/' },
                    { name: 'MUIC Association', path: '/' },
                    { name: 'MUIC Validation' },
                ]}
                style={{ marginLeft: '20px' }}
            />
        </div>

         <Card>
                    <Box>
                    <Box sx={{ p: 3 }}>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        marginBottom: '15px',
                                    }}
                                >
                                    Add MUIC in Bulk
                                </Typography>

                                <textarea
                                    style={{
                                        marginLeft: '5px',
                                        width: '100%',
                                        height: '100px',
                                    }}
                                    onChange={(e) => {
                                        setMuicData(e.target.value)
                                    }}
                                    value={muicData}
                                    placeholder="Please add MUIC separated by Commas"
                                ></textarea>
                            </Box>
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
                                    disabled={validateButLoad || muicData == ''}
                                    onClick={(e) => {
                                        validateMuic()
                                    }}
                                    sx={{ margin: 'auto', mt: 1, mb: 2 }}
                                >
                                    {validateButLoad == true
                                        ? 'Validating...'
                                        : 'Validate MUIC'}
                                       
                                </Button>
                            </Box>
                            </Box>

                            


                            </Card>
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
                                            fontSize: '18px',
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
                  
         
        </Container>
     );
}
 
export default Addmuicrm;