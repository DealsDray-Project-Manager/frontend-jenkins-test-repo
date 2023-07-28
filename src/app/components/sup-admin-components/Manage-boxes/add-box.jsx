import React, { useEffect, useState, Controller } from 'react'
import { Dialog, Button, Grid, TextField } from '@mui/material'
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
    boxId,
    setboxId,
}) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (Object.keys(editFetchData).length !== 0) {
                reset({ ...editFetchData })
                setboxId(editFetchData.boxId)
                open()
            }
        }
        fetchData()
    }, [])

    const schema = Yup.object().shape({
        box_id: Yup.string().required('Required*').nullable(),
        name: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .required('Required*')
            .nullable(),
        display: Yup.string()
            .required('Required*')
            .matches(
                /^.*((?=.*[aA-zZ\s]){1}).*$/,
                'Please enter valid display name'
            )
            .max(100)
            .nullable(),
        description: Yup.string()
            .matches(
                /^.*((?=.*[aA-zZ\s]){1}).*$/,
                'Please enter valid Description'
            )
            .max(40)
            .required('Required*')
            .nullable(),
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
        // getValues,
        // setValue,
    } = useForm({
        resolver: yupResolver(schema),
      
    })

    const onSubmit = async (data) => {
        data.created_at = Date.now()
        try {
            setLoading(true)
            let response = await axiosSuperAdminPrexo.post(
                '/boxes/create',
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
                setLoading(false)
                handleClose()
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
            let response = await axiosSuperAdminPrexo.post(
                '/boxes/edit',
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
                setEditFetchData({})
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Please check',
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
        <Dialog open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Create Box</H4>

                <TextFieldCustOm
                    label="Box ID"
                    type="text"
                    name="box_id"
                    value={boxId}
                    {...register('box_id')}
                    // disabled={Object.keys(editFetchData).length !== 0}
                    error={errors.boxId ? true : false}
                    helperText={
                        errors.boxId ? errors.boxId?.message : ''
                    }
                />
                <TextFieldCustOm
                    label="Box Name"
                    type="text"
                    name="name"
                    // disabled={Object.keys(editFetchData).length !== 0}
                    {...register('name')}
                    error={errors.name ? true : false}
                    helperText={
                        errors.name
                            ? errors.name?.message
                            : ''
                    }
                />
                <TextFieldCustOm
                    label="Box Display"
                    type="text"
                    name="display"
                    {...register('display')}
                    error={errors.display ? true : false}
                    helperText={
                        errors.display ? errors.display.message : ''
                    }
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
