import React, { useEffect, useState, Controller } from 'react'
import {
    Dialog,
    Button,
    Grid,
    TextField,
} from '@mui/material'
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
    categoriesId,
    setCategoriesId, 
}) => {
    const [loading, setLoading] = useState(false)
    // const theme = useTheme()
    // const [locationDrop, setLocationDrop] = useState([])
    // const [personName, setPersonName] = React.useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (Object.keys(editFetchData).length !== 0) {
                reset({ ...editFetchData })
                // setPersonName(editFetchData.location)
                setCategoriesId(editFetchData.categoriesId)
                open()
            }
        }
        fetchData()
    }, [])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             let res = await axiosSuperAdminPrexo.post('/getLocation')
    //             if (res.status == 200) {
    //                 setLocationDrop(res.data.data)
    //             }
    //         } catch (error) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Oops...',
    //                 text: error,
    //             })
    //         }
    //     }
    //     fetchData()
    // }, [])

    // useEffect(() => {
    //     setValue('location', personName)
    // }, [personName])

    const schema = Yup.object().shape({
        spcategory_id: Yup.string().required('Required*').nullable(),
        category_name: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .required('Required*')
            .nullable(),
        description: Yup.string()
            .matches(
                /^.*((?=.*[aA-zZ\s]){1}).*$/,'Please enter valid Description')
            .max(40)
            .required('Required*')
            .nullable(),
    })

    // console.log(errors)

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
        // defaultValues: {
        //     location: [], // Set initial values here
        // },
    })

    const onSubmit = async (data) => {
        data.created_at = Date.now()
        try {
            setLoading(true)
            let response = await axiosSuperAdminPrexo.post(
                '/spcategories/create',
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
    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        }
    }
    const handelEdit = async (data) => {
        try {
            let response = await axiosSuperAdminPrexo.post(
                '/spcategories/edit',
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
                    // allowOutsideClick: false,
                    // allowEscapeKey: false,
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
    // const handleChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event
    //     setPersonName(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value
    //     )
    // }

    return (
        <Dialog open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Create Category</H4>

                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Category ID"
                            type="text"
                            name="spcategory_id"
                            value={categoriesId}
                            {...register('spcategory_id')}
                            // disabled={Object.keys(editFetchData).length !== 0}
                            error={errors.categoriesId ? true : false}
                            helperText={
                                errors.categoriesId
                                    ? errors.categoriesId?.message
                                    : ''
                            }
                        />
                        <TextFieldCustOm
                            label="Category Name"
                            type="text"
                            name="name"
                            // disabled={Object.keys(editFetchData).length !== 0}
                            {...register('category_name')}
                            error={errors.category_name ? true : false}
                            helperText={errors.category_name ? errors.category_name?.message : ''}
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
