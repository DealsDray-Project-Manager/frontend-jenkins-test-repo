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
        code: Yup.string()
            .transform((value) => (value ? value.toUpperCase() : value))
            .required('Required*')
            .nullable(),
        description: Yup.string()
            .matches(
                /^.*((?=.*[aA-zZ\s]){1}).*$/,
                'Please enter valid Description'
            )
            .max(40)
            .required('Required*')
            .nullable(),
        float: Yup.number()
            .required('Required*')

            .nullable(),
        sereis_start: Yup.number()
            .required('Required*')

            .nullable(),
        series_end: Yup.number()
            .required('Series End is required')
            .when('sereis_start', (sereis_start, schema) => {
                return schema.test(
                    'greaterThan',
                    'Series End must be greater than Series Start',
                    (series_end) => series_end > sereis_start
                )
            }),
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
            let response = await axiosSuperAdminPrexo.post(
                '/editctxcategory',
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
        <Dialog open={open}>
            <Box p={3} sm={9}>
                <H4 sx={{ mb: '20px' }}>Add Category</H4>

                <Grid sx={{ mb: '16px' }} container spacing={4}>
                    <Grid item sm={12} xs={1}>
                        <TextFieldCustOm
                            label="Code"
                            type="text"
                            name="code"
                            disabled={Object.keys(editFetchData).length !== 0}
                            {...register('code')}
                            onKeyPress={(event) => {
                                if (!/[A-Za-z+]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                            defaultValue={getValues('code')}
                            error={errors?.code ? true : false}
                            helperText={
                                errors?.code ? errors.code?.message : ''
                            }
                            onBlur={(event) => {
                                event.target.value =
                                    event.target.value.toUpperCase()
                            }}
                        />
                        <TextFieldCustOm
                            label="Float Number"
                            type="text"
                            name="float"
                            onKeyPress={(event) => {
                                if (!/[0-9.]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                            inputProps={{ maxLength: 3 }}
                            defaultValue={getValues('float')}
                            {...register('float')}
                            error={errors?.float ? true : false}
                            helperText={errors?.float?.message}
                        />
                        <TextFieldCustOm
                            label="Series Start"
                            type="number"
                            disabled={Object.keys(editFetchData).length !== 0}
                            name="sereis_start"
                            inputProps={{ maxLength: 5 }}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                            defaultValue={getValues('sereis_start')}
                            {...register('sereis_start')}
                            error={errors?.sereis_start ? true : false}
                            helperText={errors?.sereis_start?.message}
                        />
                        <TextFieldCustOm
                            label="Series End"
                            type="number"
                            name="series_end"
                            disabled={Object.keys(editFetchData).length !== 0}
                            inputProps={{ maxLength: 5 }}
                            defaultValue={getValues('series_end')}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                            {...register('series_end')}
                            error={errors?.series_end ? true : false}
                            helperText={errors?.series_end?.message}
                        />
                        <TextFieldCustOm
                            label="Description"
                            type="text"
                            name="description"
                            {...register('description')}
                            defaultValue={getValues('description')}
                            error={errors?.description ? true : false}
                            helperText={errors?.description?.message}
                        ></TextFieldCustOm>
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
