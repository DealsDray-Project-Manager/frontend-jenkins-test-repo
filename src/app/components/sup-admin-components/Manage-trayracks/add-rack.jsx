import React, { useState, useEffect } from 'react'
import { Dialog, Button, Grid, TextField, MenuItem } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosSuperAdminPrexo } from '../../../../axios'
import Swal from 'sweetalert2'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const FormHandlerBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const MemberEditorDialog = ({
    open,
    handleClose,
    setIsAlive,
    editFetchData,
    setEditFetchData,
}) => {
    const [trayCount, setTrayCount] = useState(0)
    const [warehouse, setWarehouse] = useState([])
    const [allBrand, setAllBrand] = useState([])
    const [cpc, setCpc] = useState([])
    const [loading, setLoading] = useState(false)
    const [trayType, setTrayType] = useState('')
    const [allModel, setAllModel] = useState([])
    const [categorys, setCategorys] = useState([])

    useEffect(() => {
        const fetchCpc = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post('/getBrands')
                if (res.status == 200) {
                    setAllBrand(res.data.data)
                }
                let response = await axiosSuperAdminPrexo.get('/getCpc')
                if (response.status == 200) {
                    setCpc(response.data.data.data)
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchCpc()
    }, [])
    useEffect(() => {
        if (Object.keys(editFetchData).length !== 0) {
            reset({ ...editFetchData })
            fetchModel(editFetchData.brand)
            let arr = []
            let obj = {
                name: editFetchData.warehouse,
            }
            let objOne = {
                code: editFetchData.tray_grade,
            }
            let arrOne = []
            arrOne.push(objOne)
            setCategorys(arrOne)
            arr.push(obj)
            setWarehouse(arr)
            open()
        }
    }, [])

    const fetchTypeWiseId = async (e, type, position) => {
        e.preventDefault()
        try {
            let obj = {
                type: type,
            }

            if (type == 'CT' || type == 'ST') {
                setTrayCount('')
                reset({
                    tray_grade: null,
                })

                let categorys = await axiosSuperAdminPrexo.get(
                    '/getCtxTrayCategory'
                )
                if (categorys.status == 200) {
                    setCategorys(categorys.data)
                }
            } else {
                obj.type_taxanomy = getValues('type_taxanomy')
                let res = await axiosSuperAdminPrexo.post('/trayIdGenrate', obj)
                if (res.status == 200) {
                    setTrayCount(type + res.data.data)

                    if (type == 'BOT' && res.data.data > '2251') {
                        handleClose()
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'BOT Tray Maximum ID NO 2251',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleClose()
                            }
                        })
                    } else if (type == 'MMT' && res.data.data > '8051') {
                        handleClose()
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'MMT Tray Maximum ID NO 8051',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleClose()
                            }
                        })
                    } else if (type == 'WHT' && res.data.data > '11000') {
                        handleClose()
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'WHT Tray Maximum ID NO  11000',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleClose()
                            }
                        })
                    } else if (type == 'PMT' && res.data.data > '8151') {
                        handleClose()
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'PMT Tray Maximum ID NO  8151',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleClose()
                            }
                        })
                    } else if (type == 'SPT' && res.data.data > '19999') {
                        handleClose()
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'SPT Tray Maximum ID NO  19999',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleClose()
                            }
                        })
                    } else if (type == 'RPT' && res.data.data > '19999') {
                        handleClose()
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'RPT Tray Maximum ID NO  19999',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleClose()
                            }
                        })
                    }
                    // else if (type == 'CTA' && res.data.data > '1999') {
                    //     handleClose()
                    //     Swal.fire({
                    //         icon: 'error',
                    //         title: 'Oops...',
                    //         text: 'cta Tray Maximum ID NO  1999',
                    //     }).then((result) => {
                    //         if (result.isConfirmed) {
                    //             handleClose()
                    //         }
                    //     })
                    // } else if (type == 'CTB' && res.data.data > '3999') {
                    //     handleClose()
                    //     Swal.fire({
                    //         icon: 'error',
                    //         title: 'Oops...',
                    //         text: 'CTB Tray Maximum ID NO  2999',
                    //     }).then((result) => {
                    //         if (result.isConfirmed) {
                    //             handleClose()
                    //         }
                    //     })
                    // } else if (type == 'CTC' && res.data.data > '3999') {
                    //     handleClose()
                    //     Swal.fire({
                    //         icon: 'error',
                    //         title: 'Oops...',
                    //         text: 'CTC Tray Maximum ID NO  3999',
                    //     }).then((result) => {
                    //         if (result.isConfirmed) {
                    //             handleClose()
                    //         }
                    //     })
                    // } else if (type == 'CTD' && res.data.data > '4999') {
                    //     handleClose()
                    //     Swal.fire({
                    //         icon: 'error',
                    //         title: 'Oops...',
                    //         text: 'CTD Tray Maximum ID NO  4999',
                    //     }).then((result) => {
                    //         if (result.isConfirmed) {
                    //             handleClose()
                    //         }
                    //     })
                    // }
                } else {
                    handleClose()
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            handleClose()
                        }
                    })
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }
    // Get Cpc data from server
    async function getCpcData(name, code) {
        try {
            let obj = {
                name: name,
                code: code,
            }
            let response = await axiosSuperAdminPrexo.post(
                '/getWarehouseByLocation',
                obj
            )
            if (response.status == 200) {
                setWarehouse(response.data.data.warehouse)
            }
        } catch (error) {}
    }
    const schema = Yup.object().shape({
        name: Yup.string()
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(100)
            .nullable(),
        type_taxanomy: Yup.string().required('Required*').nullable(),
        tray_grade: Yup.string()
            .when('type_taxanomy', (type_taxanomy, schema) => {
                if (type_taxanomy == 'CT' || type_taxanomy == 'ST') {
                    return schema.required('Required')
                }
            })
            .nullable(),
        warehouse: Yup.string().required('Required*').nullable(),
        limit: Yup.number('Must be number')
            .required('Required*')
            .positive()
            .integer()
            .min(1, 'Minimum is 1')
            .nullable(),
        brand: Yup.string()
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid brand')
            .max(100)
            .nullable(),
        model: Yup.string().required('Required*').max(100).nullable(),
        display: Yup.string()
            .required('Required*')
            .matches(
                /^.*((?=.*[aA-zZ\s]){1}).*$/,
                'Please enter valid display name'
            )
            .max(100)
            .nullable(),
    })
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    })

    /* Fetch model */
    const fetchModel = async (brandName) => {
        try {
            let res = await axiosSuperAdminPrexo.post(
                '/get-product-model/' + brandName
            )
            if (res.status == 200) {
                setAllModel(res.data.data)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    const onSubmit = async (data) => {
        setLoading(true)
        data.prefix = 'tray-master'
        data.sort_id = 'Open'
        data.created_at = Date.now()
        if (data.type_taxanomy == 'CT' || data.type_taxanomy == 'ST') {
            data.code = data.type_taxanomy + trayCount
        } else {
            data.code = trayCount
        }
        try {
            let response = await axiosSuperAdminPrexo.post(
                '/createMasters',
                data
            )
            if (response.status == 200) {
                setLoading(false)
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully Created',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            } else {
                setLoading(false)
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Tray Already Exists',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                    }
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
    const handelEdit = async (data) => {
        try {
            setLoading(true)
            let response = await axiosSuperAdminPrexo.post('/editMaster', data)
            if (response.status == 200) {
                handleClose()
                setEditFetchData({})
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully Updated',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setLoading(false)
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            } else {
                handleClose()
                setLoading(false)
                setEditFetchData({})
                Swal.fire({
                    position: 'top-center',
                    icon: 'failed',
                    title: response.data.message,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            handleClose()
            setEditFetchData({})
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    return (
        <Dialog open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Rack</H4>

                <Grid sx={{ mb: '16px' }} container spacing={4}>
                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Rack Id"
                            type="text"
                            InputLabelProps={{ shrink: true }}
                            name="email"
                            value={
                                getValues('code') == null
                                    ? trayCount === 0
                                        ? null
                                        : trayCount
                                    : getValues('code')
                            }
                            disabled
                        />

                        <TextFieldCustOm
                            label="Rack Name"
                            type="text"
                            name="name"
                            {...register('name')}
                            disabled={
                                getValues('type_taxanomy') == 'WHT' &&
                                Object.keys(editFetchData).length !== 0
                            }
                            error={errors.name ? true : false}
                            helperText={errors.name ? errors.name.message : ''}
                        />

                        <TextFieldCustOm
                            label="Rack Display"
                            type="text"
                            name="display"
                            {...register('display')}
                            error={errors.display ? true : false}
                            helperText={
                                errors.display ? errors.display.message : ''
                            }
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="CPC"
                            select
                            type="text"
                            name="cpc"
                            {...register('cpc')}
                            defaultValue={getValues('cpc')}
                            disabled={Object.keys(editFetchData).length !== 0}
                            error={errors.cpc ? true : false}
                            helperText={errors.cpc?.message}
                        >
                            {cpc.map((data) => (
                                <MenuItem
                                    value={data.code}
                                    onClick={() =>
                                        getCpcData(
                                            data.code,
                                            data.location_type
                                        )
                                    }
                                >
                                    {data.code}
                                </MenuItem>
                            ))}
                        </TextFieldCustOm>
                        <TextFieldCustOm
                            label="Warehouse"
                            select
                            type="text"
                            name="warehouse"
                            defaultValue={getValues('warehouse')}
                            {...register('warehouse')}
                            disabled={
                                getValues('type_taxanomy') == 'WHT' &&
                                Object.keys(editFetchData).length !== 0
                            }
                            error={errors.warehouse ? true : false}
                            helperText={errors.warehouse?.message}
                        >
                            {warehouse.map((data) => (
                                <MenuItem key={data.name} value={data.name}>
                                    {data.name}
                                </MenuItem>
                            ))}
                        </TextFieldCustOm>
                    </Grid>
                </Grid>

                <FormHandlerBox>
                    <Button
                        variant="contained"
                        disabled={loading}
                        onClick={
                            Object.keys(editFetchData).length !== 0
                                ? handleSubmit(handelEdit)
                                : handleSubmit(onSubmit)
                        }
                        color="primary"
                        type="submit"
                    >
                        Save
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleClose()}
                    >
                        Cancel
                    </Button>
                </FormHandlerBox>
            </Box>
        </Dialog>
    )
}
export default MemberEditorDialog
