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
    const [locationDrop, setLocationDrop] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post('/getLocation')
                if (res.status == 200) {
                    setLocationDrop(res.data.data)
                }
            } catch (error) {
                alert(error)
            }
            if (Object.keys(editFetchData).length !== 0) {
                reset({ ...editFetchData })
                open()
            }
        }
        fetchData()
    }, [])

    const schema = Yup.object().shape({
        // RecordId: Yup.string()
        //     .max(40, 'Please Enter Below 40')
        //     .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
        //     .max(40)
        //     .required('Required*')
        //     .nullable(),
        Code: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid code')
            .max(40)
            .required('Required*')
            .nullable(),
        Description: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid address')
            .max(40)
            .required('Required*')
            .nullable(),
        Float: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid city')
            .max(40)
            .required('Required*')
            .nullable(),
        
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        data.type_taxanomy = 'Warehouse'
        try {
            setLoading(true)
            let response = await axiosSuperAdminPrexo.post('/addLocation', data)
            if (response.status == 200) {
                setLoading(false)
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully Added',
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
                    title: response.data.message,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            setLoading(false)
            alert(error)
        }
    }

    const handelEdit = async (data) => {
        try {
            // let response = await axiosSuperAdminPrexo.post('/editInfra', data)
            // if (response.status == 200) {
            //     setEditFetchData({})
            //     handleClose()
            //     Swal.fire({
            //         position: 'top-center',
            //         icon: 'success',
            //         title: 'Update Successfully',
            //         confirmButtonText: 'Ok',
            //     }).then((result) => {
            //         if (result.isConfirmed) {
            //             setIsAlive((isAlive) => !isAlive)
            //         }
            //     })
            // } else {
            //     setEditFetchData({})
            //     handleClose()
            //     alert(response.data.message)
            // }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <Dialog  open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Add Warehouse</H4>

                <Grid sx={{ mb: '16px' }} container spacing={4}>
                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Code"
                            type="text"
                            name="Code"
                            // {...register('name')}
                            error={errors.name ? true : false}
                            helperText={errors.name ? errors.name?.message : ''}
                        />
                        <TextFieldCustOm
                            label="Description"
                            select
                            name="Description"
                            // {...register('parent_id')}
                            error={errors.parent_id ? true : false}
                            helperText={errors.parent_id?.message}
                        >
                            {/* {locationDrop.map((data) => (
                                <MenuItem value={data.name}>
                                    {data.name}
                                </MenuItem>
                            ))} */}
                        </TextFieldCustOm>
                        <TextFieldCustOm
                            label="Code"
                            type="text"
                            name="code"
                            disabled={Object.keys(editFetchData).length !== 0}
                            {...register('code')}
                            error={errors.code ? true : false}
                            helperText={errors.code ? errors.code?.message : ''}
                        />

                       

                       
                        
                    </Grid>

                    
                </Grid>

                <FormHandlerBox>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        // onClick={
                        //     Object.keys(editFetchData).length !== 0
                        //         ? handleSubmit(handelEdit)
                        //         : handleSubmit(onSubmit)
                        // }
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        // onClick={() => handleClose()}
                    >
                        Cancel
                    </Button>
                </FormHandlerBox>
            </Box>
        </Dialog>
    )
}

export default MemberEditorDialog
