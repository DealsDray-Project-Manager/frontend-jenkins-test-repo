import React, { useEffect, useState } from 'react'
import { Dialog, Button, MenuItem, TextField } from '@mui/material'
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

const AddPartOrColorAndEditDialog = ({
    open,
    handleClose,
    setIsAlive,
    editFetchData,
    setEditFetchData,
    muicData,
    partId,
    setPartId,
}) => {
    const [loading, setLoading] = useState(false)
    const [colorData, setColorData] = useState([])

    useEffect(() => {
        const fetchColorData = async () => {
            try {
                const res = await axiosSuperAdminPrexo.post(
                    '/partAndColor/view/' + 'color-list'
                )
                if (res.status === 200) {
                    setColorData(res.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchColorData()
        if (Object.keys(editFetchData).length !== 0) {
            setPartId(editFetchData.part_code)
            reset({ ...editFetchData })
            open()
        }
    }, [])

    const schema = Yup.object().shape({
        part_code: Yup.string().required('Required*').nullable(),

        name: Yup.string()
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .nullable(),
        description: Yup.string()
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .nullable(),
        color: Yup.string()
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .nullable(),
        technical_qc: Yup.string()
            .required('Required*')
            .matches(/^[YN]$/, 'Please enter either Y or N')
            .nullable(),
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            data.type = 'part-list'
            data.created_by = 'super-admin'
            let response = await axiosSuperAdminPrexo.post(
                '/partAndColor/create',
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
                    title: response.data.message,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    const handelEdit = async (data) => {
        try {
            let response = await axiosSuperAdminPrexo.post(
                '/partAndColor/edit',
                data
            )
            if (response.status == 200) {
                setEditFetchData({})
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully Updated',
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
                Swal.fire({
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

    return (
        <Dialog open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Add Part</H4>

                <TextFieldCustOm
                    label="Part Id"
                    type="text"
                    name="part_code"
                    value={partId}
                    {...register('part_code')}
                    error={errors.part_code ? true : false}
                    helperText={
                        errors.part_code ? errors.part_code?.message : ''
                    }
                />

                <TextFieldCustOm
                    label="Name"
                    type="text"
                    name="name"
                    {...register('name')}
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name?.message : ''}
                />

                <TextFieldCustOm
                    label="Color"
                    type="text"
                    select
                    name="color"
                    defaultValue={getValues('color')}
                    {...register('color')}
                >
                    {colorData?.map((data) => (
                        <MenuItem key={data?.name} value={data?.name}>
                            {data?.name}
                        </MenuItem>
                    ))}
                </TextFieldCustOm>
                <TextFieldCustOm
                    label="Technical qc (Y/N)"
                    type="text"
                    name="technical_qc"
                    {...register('technical_qc')}
                    error={errors.technical_qc ? true : false}
                    helperText={
                        errors.technical_qc ? errors.technical_qc?.message : ''
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

export default AddPartOrColorAndEditDialog
