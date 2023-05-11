import React, { useState, useEffect } from 'react'
import { Dialog, Button, Grid, TextField, MenuItem } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosSuperAdminPrexo } from '../../../../axios'
import Swal from 'sweetalert2'

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
    const [bagCount, setBagCount] = useState(0)
    const [warehouse, setWarehouse] = useState([])
    const [cpc, setCpc] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        try {
            const fetchCpc = async () => {
                let response = await axiosSuperAdminPrexo.get('/getCpc')
                if (response.status == 200) {
                    setCpc(response.data.data.data)
                }
            }
            fetchCpc()
            if (Object.keys(editFetchData).length !== 0) {
                reset({ ...editFetchData })
                open()
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }, [])

    async function getCpcData(data, cpc) {
        try {
            if (cpc == 'Gurgaon_122016' || cpc == 'Gurgaon_122003') {
                let res = await axiosSuperAdminPrexo.post(
                    '/getMasterHighest/' + cpc
                )
                if (res.status == 200) {
                    setBagCount('DDB-GGN-' + res.data.data)
                }
            } else if (cpc == 'Bangalore_560067') {
                let res = await axiosSuperAdminPrexo.post(
                    '/getMasterHighest/' + cpc
                )
                if (res.status == 200) {
                    setBagCount('DDB-BLR-' + res.data.data)
                }
            }
            let obj = {
                name: data,
            }
            let response = await axiosSuperAdminPrexo.post(
                '/getWarehouseByLocation',
                obj
            )
            if (response.status == 200) {
                setWarehouse(response.data.data.warehouse)
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
    const schema = Yup.object().shape({
        cpc: Yup.string().required('Required*').nullable(),
        name: Yup.string()
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(100)
            .nullable(),
        type_taxanomy: Yup.string()
            .required('Required*')
            .matches(
                /^.*((?=.*[aA-zZ\s]){1}).*$/,
                'Please enter valid category'
            )
            .max(100)
            .nullable(),
        limit: Yup.number('Must be number')
            .required('Required*')
            .positive()
            .integer()
            .min(1, 'Minimum is 1')
            .nullable(),
        warehouse: Yup.string().required('Required*').nullable(),
        display: Yup.string()
            .required('Required*')
            .matches(
                /^.*((?=.*[aA-zZ\s]){1}).*$/,
                'Please enter valid display name'
            )
            .max(100)
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
        setLoading(true)
        data.prefix = 'bag-master'
        data.sort_id = 'No Status'
        data.created_at = Date.now()
        data.code = bagCount
        try {
            let response = await axiosSuperAdminPrexo.post(
                '/createMasters',
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
                    title: 'Bag Already Exists',
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
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }

    const handelEdit = async (data) => {
        try {
            let response = await axiosSuperAdminPrexo.post('/editMaster', data)
            if (response.status == 200) {
                handleClose()
                setEditFetchData({})
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
                setEditFetchData({})
                Swal.fire({
                    position: 'top-center',
                    icon: 'failed',
                    title: response.data.message,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            handleClose()
            setEditFetchData({})
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Bag</H4>

                <Grid sx={{ mb: '16px' }} container spacing={4}>
                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Bag Id"
                            type="text"
                            InputLabelProps={{ shrink: true }}
                            name="email"
                            value={
                                getValues('code') == null
                                    ? bagCount === 0
                                        ? null
                                        : bagCount
                                    : getValues('code')
                            }
                        />

                        <TextFieldCustOm
                            label="Bag Display Name"
                            type="text"
                            name="name"
                            {...register('name')}
                            error={errors.name ? true : false}
                            helperText={errors.name ? errors.name.message : ''}
                        />

                        <TextFieldCustOm
                            label="Bag Limit"
                            name="phone"
                            inputProps={{ maxLength: 2 }}
                            onPaste={(e) => {
                                e.preventDefault()
                                return false
                            }}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                            {...register('limit')}
                            error={errors.limit ? true : false}
                            helperText={
                                errors.limit ? errors.limit.message : ''
                            }
                        />

                        <TextFieldCustOm
                            label="Bag Display"
                            type="text"
                            name="display"
                            {...register('display')}
                            error={errors.display ? true : false}
                            helperText={
                                errors.display ? errors.display.message : ''
                            }
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="CPC"
                            select
                            type="text"
                            name="cpc"
                            defaultValue={getValues('cpc')}
                            {...register('cpc')}
                            error={errors.cpc ? true : false}
                            helperText={errors.cpc?.message}
                        >
                            {cpc.map((data) => (
                                <MenuItem
                                    value={data.code}
                                    onClick={() =>
                                        getCpcData(data.name, data.code)
                                    }
                                >
                                    {data.code}
                                </MenuItem>
                            ))}
                        </TextFieldCustOm>
                        <TextFieldCustOm
                            label="Warehouse"
                            select
                            type="text"
                            name="warehouse"
                            defaultValue={getValues('warehouse')}
                            {...register('warehouse')}
                            error={errors.warehouse ? true : false}
                            helperText={errors.warehouse?.message}
                        >
                            {warehouse.map((data) => (
                                <MenuItem value={data.name}>
                                    {data.name}
                                </MenuItem>
                            ))}
                        </TextFieldCustOm>
                        <TextFieldCustOm
                            label="Bag Category"
                            select
                            type="text"
                            name="type_taxanomy"
                            defaultValue={getValues('type_taxanomy')}
                            {...register('type_taxanomy')}
                            error={errors.type_taxanomy ? true : false}
                            helperText={errors.type_taxanomy?.message}
                        >
                            <MenuItem value="BOT">BOT</MenuItem>
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
                        onClick={
                            () => handleClose()
                            //  dataa()
                        }
                    >
                        Cancel
                    </Button>
                </FormHandlerBox>
            </Box>
        </Dialog>
    )
}

export default MemberEditorDialog
