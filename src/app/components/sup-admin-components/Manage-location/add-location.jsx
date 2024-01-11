import React, { useEffect, useState } from 'react'
import { Dialog, Button, Grid, TextField, MenuItem } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
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
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (Object.keys(editFetchData).length !== 0) {
            reset({ ...editFetchData })
            open()
        }
    }, [])

    const schema = Yup.object().shape({
        name: Yup.string()
            .max(40, 'Please Enter Below 40')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .required('Required*')
            .nullable(),
        code: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid code')
            .max(40)
            .required('Required*')
            .nullable(),
        address: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid address')
            .max(40)
            .required('Required*')
            .nullable(),
        city: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid city')
            .max(40)
            .required('Required*')
            .nullable(),
        state: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid state')
            .max(40)
            .required('Required*')
            .nullable(),

        location_type: Yup.string().required('Required*').nullable(),
        pincode: Yup.string()
            .min(6, 'Please Enter valid Pincode')
            .required('Required*')
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

    const onSubmit = async (data) => {
        data.type_taxanomy = 'CPC'
        try {
            setLoading(true)
            let response = await axiosSuperAdminPrexo.post('/addLocation', data)
            if (response.status == 200) {
                setLoading(true)
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully Added',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            } else {
                setLoading(true)
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: response.data.message,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            setLoading(true)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    const handelEdit = async (data) => {
        try {
            let response = await axiosSuperAdminPrexo.post('/editInfra', data)
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
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message,
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
        <Dialog open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Add Location</H4>

                <Grid sx={{ mb: '16px' }} container spacing={4}>
                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Name"
                            type="text"
                            name="name"
                            disabled={Object.keys(editFetchData).length !== 0}
                            {...register('name')}
                            error={errors.name ? true : false}
                            helperText={errors.name ? errors.name?.message : ''}
                        />
                        <TextFieldCustOm
                            label="Address"
                            type="text"
                            name="address"
                            {...register('address')}
                            error={errors.address ? true : false}
                            helperText={
                                errors.address ? errors.address?.message : ''
                            }
                        />
                        <TextFieldCustOm
                            label="Location Type"
                            select
                            name="location_type"
                            {...register('location_type')}
                            disabled={Object.keys(editFetchData).length !== 0}
                            error={errors.location_type ? true : false}
                            helperText={errors.location_type?.message}
                            defaultValue={getValues('location_type')}
                        >
                            <MenuItem value="Dock">Dock</MenuItem>
                            <MenuItem value="Processing">Processing</MenuItem>
                            <MenuItem value="Sales">Sales</MenuItem>
                        </TextFieldCustOm>

                        <TextFieldCustOm
                            label="State"
                            type="text"
                            name="state"
                            {...register('state')}
                            error={errors.state ? true : false}
                            helperText={
                                errors.state ? errors.state?.message : ''
                            }
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Code"
                            type="text"
                            name="code"
                            disabled={Object.keys(editFetchData).length !== 0}
                            {...register('code')}
                            error={errors.code ? true : false}
                            helperText={errors.code ? errors.code?.message : ''}
                        />

                        <TextFieldCustOm
                            label="City"
                            type="text"
                            name="city"
                            {...register('city')}
                            error={errors.city ? true : false}
                            helperText={errors.city ? errors.city?.message : ''}
                        />
                        <TextFieldCustOm
                            label="Pincode"
                            name="pincode"
                            inputProps={{ maxLength: 6 }}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                            {...register('pincode')}
                            error={errors.pincode ? true : false}
                            helperText={
                                errors.pincode ? errors.pincode?.message : ''
                            }
                        />
                    </Grid>
                </Grid>

                <FormHandlerBox>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={
                            Object.keys(editFetchData).length !== 0
                                ? handleSubmit(handelEdit)
                                : handleSubmit(onSubmit)
                        }
                        type="submit"
                    >
                        Submit
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
