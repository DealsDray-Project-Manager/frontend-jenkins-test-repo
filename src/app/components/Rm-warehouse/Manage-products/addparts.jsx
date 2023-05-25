import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Box, Card, Typography } from '@mui/material'
import { Button, IconButton, Icon } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate, useLocation } from 'react-router-dom'
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

const Addparts = () => {
    const [partData, setPartData] = useState({})
    const [submitLoad, setSubmitLoad] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [muicData, setMuicData] = useState('')
    const [validationCount, setValidationCount] = useState({})
    const [validateButLoad, setValidateButLoad] = useState('')
    const [data, setData] = useState([])
    const { state } = useLocation()
    const [isAlive, setIsAlive] = useState(false)
    const navigate = useNavigate()
    const [pagination, setPagination] = useState({
        page: 1,
        size: 10,
        item: [],
    })

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

    const handelDelete = (part_code) => {
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
                const updatedString = muicData.replace(part_code + ',', '')
                setMuicData(updatedString)
                setPagination((p) => ({
                    ...p,
                    item: pagination.item.filter(
                        (item) => item.part_code != part_code
                    ),
                }))
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Your Part has been Removed',
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
                partId: muicData,
                muic: state.muicData.muic,
            }
            let res = await axiosSuperAdminPrexo.post(
                '/muicPage/addPartAssosiation',
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
    const handelSubmit = async () => {
      try {
          setSubmitLoad(true)
          let obj = {
            muicData: state.muicData,
            part: pagination.item,
          }
          let res = await axiosSuperAdminPrexo.post(
              '/muicPage/partAdd',
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
                          '/rm-user/products/partsassociation/report',
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

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Products', path: '/' },
                        { name: 'Manage Parts', path: '/' },
                        { name: 'MUIC to Part-Association' },
                    ]}
                    style={{ marginLeft: '20px' }}
                />
            </div>

            <Card sx={{ p: 3 }}>
                <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Add Parts in Bulk
                    </Typography>
                </Box>
                <br />
                <Box>
                    <textarea
                        name="text"
                        placeholder="Please add Part Numbers separated by commas"
                        id=""
                        rows="10"
                        onChange={(e) => {
                            setMuicData(e.target.value)
                        }}
                        value={muicData}
                        style={{ width: '100%' }}
                    ></textarea>
                </Box>
                <Box sx={{textAlign: 'center'}}>
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
                            : 'Validate Parts'}
                    </Button>
                </Box>
            </Card>
            <br />
            <br />
            {/* <Card sx={{ border: '', marginRight: '', marginLeft: '' }}>
               
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
                > */}
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
                        <Typography sx={{ p: 2, fontWeight: 'bold' }}>
                            Parts Validation
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold', ml: 80 }}>
                            Total Added - {validationCount?.total} | Valid -{' '}
                            {validationCount?.success} | Duplicates -
                            {validationCount?.duplicate} | Invalid -{' '}
                            {validationCount?.inValid} | Already Added -{' '}
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
                                    <TableCell align="center">Sl No</TableCell>
                                    <TableCell align="center">
                                        Part Id
                                    </TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Color</TableCell>
                                    <TableCell align="center">
                                        Available stock
                                    </TableCell>
                                    <TableCell align="center">
                                        Technical qc
                                    </TableCell>
                                    <TableCell align="center">
                                        Description
                                    </TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">
                                        Creation Date
                                    </TableCell>
                                    <TableCell align="center">
                                        Validation Status
                                    </TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {data?.map((phones, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">
                                            {phones.id}
                                        </TableCell>
                                        <TableCell align="center">
                                            {phones.part_code}
                                        </TableCell>
                                        <TableCell align="center">
                                            {phones.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {phones.color}
                                        </TableCell>
                                        <TableCell align="center">
                                            {phones.avl_stock}
                                        </TableCell>
                                        <TableCell align="center">
                                            {phones.technical_qc}
                                        </TableCell>
                                        <TableCell align="center">
                                            {phones.description}
                                        </TableCell>
                                        <TableCell align="center">
                                            {phones.status}
                                        </TableCell>
                                        <TableCell align="center">
                                            {new Date(
                                                phones.created_at
                                            ).toLocaleString('en-GB', {
                                                hour12: true,
                                            })}
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
                                            {phones.validationStatus}
                                        </TableCell>
                                        <TableCell  align="center" >
                                            <IconButton
                                                onClick={(e) => {
                                                    handelDelete(
                                                        phones?.part_code
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
                                        disabled={pagination.page === 1}
                                        style={{
                                            backgroundColor: '#206CE2',
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
                                        {pagination.page}/{pagination.totalPage}
                                    </h6>
                                    <Button
                                        variant="contained"
                                        sx={{ m: 1 }}
                                        disabled={
                                            pagination.page ===
                                            pagination.totalPage
                                        }
                                        style={{
                                            backgroundColor: '#206CE2',
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
                                : 'Associate Part'}
                        </Button>
                    </Box>
                </Card>
            ) : null}
            {/* </Box>
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
                        sx={{ margin: 'auto', mt: 1, mb: 2 }}
                        onClick={() =>
                            navigate('/sup-admin/products/partsassociation')
                        }
                    >
                        Associate Part
                    </Button>
                </Box>
            </Card> */}
        </Container>
    )
}

export default Addparts
