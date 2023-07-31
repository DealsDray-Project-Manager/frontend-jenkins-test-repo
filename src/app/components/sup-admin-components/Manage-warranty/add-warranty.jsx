import React, { useEffect, useState, Controller } from 'react'
import { Dialog, Button, Grid, TextField, MenuItem } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
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
        // const fetchData = async () => {
        if (Object.keys(editFetchData).length !== 0) {
            reset({ ...editFetchData })
            open()
        }
        // }
        // fetchData()
    }, [])

    const schema = Yup.object().shape({
        name: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .required('Required*')
            .nullable(),
        description: Yup.string()
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .nullable(),
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        // data.created_at = Date.now()
        try {
            setLoading(true)
            data.type = 'warranty-list'
            let response = await axiosSuperAdminPrexo.post(
                '/warranty/create',
                data
            )
            if (response.status == 200) {
                setLoading(false)
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
                handleClose()
                setLoading(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: response.data.message,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            setLoading(false)
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
            data._id = editFetchData._id
            let response = await axiosSuperAdminPrexo.post(
                '/warranty/edit',
                data
            )
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
                Swal.fire({
                    icon: 'error',
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

    return (
        <Dialog open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Warranty</H4>

                <TextFieldCustOm
                    label="Name"
                    type="text"
                    name="name"
                    {...register('name')}
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name?.message : ''}
                />
                <TextFieldCustOm
                    label="Description"
                    type="text"
                    name="description"
                    {...register('description')}
                    error={errors.description ? true : false}
                    helperText={
                        errors.description ? errors.description?.message : ''
                    }
                />

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
