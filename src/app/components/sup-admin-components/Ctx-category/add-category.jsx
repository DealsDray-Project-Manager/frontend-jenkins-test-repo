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
        const fetchData = async () => {
            if (Object.keys(editFetchData).length !== 0) {
                reset({ ...editFetchData })
                open()
            }
        }
        fetchData()
    }, [])

   


    const schema = Yup.object().shape({
        Code: Yup.string()
        .transform(value => value ? value.toUpperCase() : value)
            .matches(/^[A-Z]{3}.*/,'Please enter valid code')
            .max(40)
            .required('Required*')
            .nullable(),
        Description: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid Description')
            .max(40)
            .required('Required*')
            .nullable(),
         Float: Yup.number('Must be  number')
            .required('Required*')
            .positive()
            .moreThan(0, 'Must be Float')
            .min(1, 'Minimum is 1')
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
        try {
            let response = await axiosSuperAdminPrexo.post('/addcategory', data)
            if (response.status == 200) {
                setLoading(false)
                handleClose()
                setEditFetchData({})
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully Added',
                    confirmButtonText: 'Ok',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            } else {
                setLoading(false)
                handleClose()
                setEditFetchData({})
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: response?.data?.message,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }

    const handelEdit = async (data) => {
        try {
            let response = await axiosSuperAdminPrexo.post('/editctxcategory', data)
            if (response.status == 200) {
                setEditFetchData({})
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Update Successfully',
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            }
             else {
                setEditFetchData({})
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'fail',
                    title: 'Category Already Exist',
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }
    return (
        <Dialog  open={open}>
            <Box p={3} sm={9}>
                <H4 sx={{ mb: '20px' }}>Add Category</H4>

                <Grid sx={{ mb: '16px' }} container spacing={4}>
                    <Grid item sm={12} xs={1}>
                        <TextFieldCustOm
                            label="Code"
                            type="text"
                            name="Code"
                            {...register('Code')}
                            defaultValue={getValues('Code')}
                            error={errors?.Code ? true : false}
                            helperText={errors?.Code ? errors.Code?.message : ''}
                        />
                         <TextFieldCustOm
                            label="Float Number"
                            type="text"
                            name="Float"
                            defaultValue={getValues('Float')}
                            {...register('Float')}
                            error={errors?.Float ? true : false}
                            helperText={ errors?.Float?.message }
                        />
                        <TextFieldCustOm
                            label="Description"
                            type="text"
                            name="Description"
                            {...register('Description')}
                            defaultValue={getValues('Description')}
                            error={errors?.Description ? true : false}
                            helperText={errors?.Description?.message}
                        >
                        </TextFieldCustOm>
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
