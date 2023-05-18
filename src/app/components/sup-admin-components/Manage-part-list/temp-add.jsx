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
        console.log(editFetchData)
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

    // const getColorList = async (muic) => {
    //     try {
    //         const res = await axiosSuperAdminPrexo.post(
    //             '/muic/listColor/' + muic
    //         )
    //         if (res.status == 200) {
    //             setColorData(res.data.data)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            data.type = 'part-list'
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
                {/* <TextFieldCustOm
                    label="MUIC"
                    type="text"
                    select
                    name="muic"
                    defaultValue={getValues('muic')}
                    {...register('muic')}
                    error={errors.muic ? true : false}
                    helperText={errors.muic ? errors.muic?.message : ''}
                >
                    {muicData?.map((data) => (
                        <MenuItem
                            onClick={(e) => {
                                getColorList(data?.muic)
                            }}
                            key={data?.muic}
                            value={data?.muic}
                        >
                            {data?.muic}
                        </MenuItem>
                    ))}
                </TextFieldCustOm> */}
                {/* <TextFieldCustOm
                    label="Color"
                    type="text"
                    select
                    name="color"
                    defaultValue={getValues('color')}
                    {...register('color')}
                    error={errors.color ? true : false}
                    helperText={errors.color ? errors.color?.message : ''}
                >
                    {colorData?.map((data) => (
                        <MenuItem key={data?.name} value={data?.name}>
                            {data?.name}
                        </MenuItem>
                    ))}
                </TextFieldCustOm> */}

                <TextFieldCustOm
                    label="Name"
                    type="text"
                    name="name"
                    {...register('name')}
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name?.message : ''}
                />
                <TextFieldCustOm
                    sx={{width:"100%"}}
                    label="Color"
                    select
                    type="text"
                    name="color"
                    {...register('name')}
                    error={errors.color ? true : false}
                    helperText={errors.color?.message}                           
                >
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="yellow">Yellow</MenuItem>                      
                </TextFieldCustOm>  
                <TextFieldCustOm
                    label="Technical QC"
                    select
                    type="text"
                    name="technicalqc"
                    {...register('technicalqc')}
                    error={errors.technicalqc ? true : false}
                    helperText={
                        errors.technicalqc ? errors.technicalqc?.message : ''
                    }
                >
                    <MenuItem value="red">Yes</MenuItem>
                    <MenuItem value="blue">No</MenuItem>
                </TextFieldCustOm>
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
