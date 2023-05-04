import React, { useState, useEffect } from 'react'
import { Dialog, Button, Grid, TextField, MenuItem } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo } from '../../../../axios'

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
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)
    const [productImage, setProductImage] = useState({
        imagePreview: '',
        imageStore: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosSuperAdminPrexo.post(
                    '/getBrandsAlpha'
                )
                if (response.status === 200) {
                    setBrands(response.data.data)
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
        if (Object.keys(editFetchData).length !== 0) {
            reset({ ...editFetchData })
            open()
        }
    }, [])

    const schema = Yup.object().shape({
        vendor_sku_id: Yup.string()
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .nullable(),
        vendor_name: Yup.string()
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .nullable(),
        model_name: Yup.string()
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .nullable(),
        brand_name: Yup.string().required('Required'),
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

    const onSubmit = async (data) => {
        setLoading(true)
        let muis_code = ''
        let alphebet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let numbers = '123456789'
        for (var i = 0; i < 2; i++) {
            muis_code += alphebet.charAt(
                Math.floor(Math.random() * alphebet.length)
            )
        }
        for (var i = 0; i < 3; i++) {
            muis_code += numbers.charAt(
                Math.floor(Math.random() * numbers.length)
            )
        }
        try {
            data.muic = muis_code
            data.created_at = Date.now()
            let formdata = new FormData()
            formdata.append('image', productImage.store)
            for (let [key, value] of Object.entries(data)) {
                formdata.append(key, value)
            }
            let response = await axiosSuperAdminPrexo.post(
                '/createproducts',
                formdata
            )
            if (response.status == 200) {
                setLoading(false)
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: response.data.message,
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
                    title: response.data.message,
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
            let response = await axiosSuperAdminPrexo.post('/editProduct', data)
            if (response.status == 200) {
                setEditFetchData({})
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Update Successfully',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            } else {
                setEditFetchData({})
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'failed',
                    title: response.data.message,
                    showConfirmButton: false,
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

    const handelProfile = (event) => {
        setProductImage({
            preview: URL.createObjectURL(event.target.files[0]),
            store: event.target.files[0],
        })
    }
    return (
        <Dialog open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Add</H4>
                <img
                    src={productImage.preview}
                    height="60px"
                    width="60px"
                    style={{ borderRadius: '50%', margin: 'auto' }}
                />
                <Grid sx={{ mb: '16px' }} container spacing={4}>
                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Image"
                            type="file"
                            onChange={(e) => {
                                handelProfile(e)
                            }}
                            InputLabelProps={{ shrink: true }}
                            accept=".jpg,.jpeg,.png,"
                            name="image"
                        />
                        <TextFieldCustOm
                            label="Vendor SKU ID"
                            type="text"
                            name="vendor_sku_id"
                            {...register('vendor_sku_id')}
                            error={errors.vendor_sku_id ? true : false}
                            helperText={
                                errors.vendor_sku_id
                                    ? errors.vendor_sku_id.message
                                    : ''
                            }
                        />
                        <TextFieldCustOm
                            label="Model Name"
                            type="text"
                            name="model_name"
                            {...register('model_name')}
                            error={errors.model_name ? true : false}
                            helperText={
                                errors.model_name
                                    ? errors.model_name.message
                                    : ''
                            }
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Vendor Name"
                            type="text"
                            name="vendor_name"
                            {...register('vendor_name')}
                            error={errors.vendor_name ? true : false}
                            helperText={
                                errors.vendor_name
                                    ? errors.vendor_name.message
                                    : ''
                            }
                        />
                        <TextFieldCustOm
                            label="Brand Name"
                            select
                            name="brand_name"
                            defaultValue={getValues('brand_name')}
                            {...register('brand_name')}
                            error={errors.brand_name ? true : false}
                            helperText={
                                errors.brand_name
                                    ? errors.brand_name.message
                                    : ''
                            }
                        >
                            {brands.map((data) => (
                                <MenuItem
                                    key={data.brand_name}
                                    value={data.brand_name}
                                >
                                    {data.brand_name}
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
