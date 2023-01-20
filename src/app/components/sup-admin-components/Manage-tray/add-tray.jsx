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
    const [allModel, setAllModel] = useState([])

    useEffect(() => {
        try {
            const fetchCpc = async () => {
                let res = await axiosSuperAdminPrexo.post('/getBrands')
                if (res.status == 200) {
                    setAllBrand(res.data.data)
                }
                let response = await axiosSuperAdminPrexo.get('/getCpc')
                if (response.status == 200) {
                    setCpc(response.data.data.data)
                }
            }
            fetchCpc()
            if (Object.keys(editFetchData).length !== 0) {
                reset({ ...editFetchData })
              
                fetchModel(editFetchData.brand)
                open()
            }
        } catch (error) {
            alert(error)
        }
    }, [])

    const fetchTypeWiseId = async (e, type) => {
        e.preventDefault()
        try {
            let res = await axiosSuperAdminPrexo.post('/trayIdGenrate/' + type)
            if (res.status == 200) {
                setTrayCount(type + res.data.data)
                if (type == 'BOT' && res.data.data > '2251') {
                    alert('BOT Tray Maximum ID NO 2251')
                    handleClose()
                } else if (type == 'MMT' && res.data.data > '8051') {
                    alert('MMT Tray Maximum ID NO 8051')
                    handleClose()
                } else if (type == 'WHT' && res.data.data > '1501') {
                    alert('WHT Tray Maximum ID NO  1501')
                    handleClose()
                } else if (type == 'PMT' && res.data.data > '8151') {
                    alert('PMT Tray Maximum ID NO  8151')
                    handleClose()
                }
            }
        } catch (error) {
            alert(error)
        }
    }
    // Get Cpc data from server
    async function getCpcData(data) {
        try {
            let obj = {
                name: data,
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
            alert(error)
        }
    }

    const onSubmit = async (data) => {
        setLoading(true)
        data.prefix = 'tray-master'
        data.sort_id = 'Open'
        data.created_at = Date.now()
        data.code = trayCount
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
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            }
        } catch (error) {
            alert(error)
        }
    }
    const handelEdit = async (data) => {
        try {
            let response = await axiosSuperAdminPrexo.post('/editMaster', data)
            if (response.status == 200) {
                handleClose()
                setEditFetchData({})
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully Updated',
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            } else {
                handleClose()
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
            alert(error)
        }
    }

    return (
        <Dialog open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Tray</H4>

                <Grid sx={{ mb: '16px' }} container spacing={4}>
                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Tray Id"
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
                        />

                        <TextFieldCustOm
                            label="Tray Display Name"
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
                            label="Tray Limit"
                            type="number"
                            name="phone"
                            inputProps={{ maxLength: 2 }}
                            onPaste={(e) => {
                                e.preventDefault()
                                return false
                            }}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                            {...register('limit')}
                            error={errors.limit ? true : false}
                            helperText={
                                errors.limit ? errors.limit.message : ''
                            }
                        />

                        <TextFieldCustOm
                            label="Tray Display"
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
                            disabled={
                                getValues('type_taxanomy') == 'WHT' &&
                                Object.keys(editFetchData).length !== 0
                            }
                            value={getValues('cpc')}
                            error={errors.cpc ? true : false}
                            helperText={errors.cpc?.message}
                        >
                            {cpc.map((data) => (
                                <MenuItem
                                    value={data.code}
                                    onClick={() =>
                                        getCpcData(data.name, data.code)
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
                            {...register('warehouse')}
                            disabled={
                                getValues('type_taxanomy') == 'WHT' &&
                                Object.keys(editFetchData).length !== 0
                            }
                            value={getValues('warehouse')}
                            error={errors.warehouse ? true : false}
                            helperText={errors.warehouse?.message}
                        >
                            {warehouse.map((data) => (
                                <MenuItem key={data.name} value={data.name}>
                                    {data.name}
                                </MenuItem>
                            ))}
                        </TextFieldCustOm>
                        <TextFieldCustOm
                            label="Tray Category"
                            select
                            type="text"
                            name="cpc"
                            {...register('type_taxanomy')}
                            disabled={
                                getValues('type_taxanomy') == 'WHT' &&
                                Object.keys(editFetchData).length !== 0
                            }
                            value={getValues('type_taxanomy')}
                            error={errors.type_taxanomy ? true : false}
                            helperText={errors.type_taxanomy?.message}
                        >
                            <MenuItem
                                value="BOT"
                                onClick={(e) => {
                                    fetchTypeWiseId(e, 'BOT')
                                }}
                            >
                                BOT
                            </MenuItem>
                            <MenuItem
                                value="PMT"
                                onClick={(e) => {
                                    fetchTypeWiseId(e, 'PMT')
                                }}
                            >
                                PMT
                            </MenuItem>
                            <MenuItem
                                value="MMT"
                                onClick={(e) => {
                                    fetchTypeWiseId(e, 'MMT')
                                }}
                            >
                                MMT
                            </MenuItem>
                            <MenuItem
                                value="WHT"
                                onClick={(e) => {
                                    fetchTypeWiseId(e, 'WHT')
                                }}
                            >
                                WHT
                            </MenuItem>
                        </TextFieldCustOm>
                        {getValues('type_taxanomy') == 'WHT' ? (
                            <>
                                <TextFieldCustOm
                                    label="Brand"
                                    select
                                    type="text"
                                    value={getValues('brand')}
                                    {...register('brand')}
                                    error={errors.brand ? true : false}
                                    helperText={
                                        errors.brand ? errors.brand.message : ''
                                    }
                                >
                                    {allBrand.map((brandData) => (
                                        <MenuItem
                                            value={brandData.brand_name}
                                            onClick={(e) => {
                                                fetchModel(brandData.brand_name)
                                            }}
                                        >
                                            {brandData.brand_name}
                                        </MenuItem>
                                    ))}
                                </TextFieldCustOm>
                                <TextFieldCustOm
                                    label="Model"
                                    select
                                    type="text"
                                    name="model"
                                    value={getValues('model')}
                                    {...register('model')}
                                    error={errors.model ? true : false}
                                >
                                    {allModel.map((modelData) => (
                                        <MenuItem value={modelData.model_name}>
                                            {modelData.model_name}
                                        </MenuItem>
                                    ))}
                                </TextFieldCustOm>
                            </>
                        ) : (
                            <>
                                <TextFieldCustOm
                                    label="Brand"
                                    type="text"
                                    name="brand"
                                    {...register('brand')}
                                    error={errors.brand ? true : false}
                                    helperText={
                                        errors.brand ? errors.brand.message : ''
                                    }
                                />
                                <TextFieldCustOm
                                    label="Model"
                                    type="text"
                                    name="model"
                                    {...register('model')}
                                    error={errors.model ? true : false}
                                    helperText={
                                        errors.model ? errors.model.message : ''
                                    }
                                />
                            </>
                        )}
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
