import React, { useState, useEffect } from 'react'
import { Dialog, Button, Grid, MenuItem, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import Avatar from '@mui/material/Avatar'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo } from '../.././../../axios'

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
    const [profile, Setprofile] = useState({
        preview: '',
        store: {},
    })
    const [loading, setLoading] = useState(false)
    const [cpc, setCpc] = useState([])
    const [cpcType, setCpcType] = useState([])
    const [selectedCpc, setSelectedCpc] = useState('')
    const [location, setLocation] = useState('')
    const [warehouse, setWarehouse] = useState([])
    const [warehouseType, setWarehouseType] = useState('')

    useEffect(() => {
        const fetchCpc = async () => {
            try {
                let response = await axiosSuperAdminPrexo.get('/getCpc')
                if (response.status == 200) setCpc(response.data.data.data)
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchCpc()
        if (Object.keys(editFetchData).length !== 0) {
            editFetchData.cpassword = editFetchData.password
            Setprofile({
                ...profile,
                preview: editFetchData.profile,
            })
            reset({ ...editFetchData })
            open()
        }
    }, [])
    
    const schema = Yup.object().shape({
        name: Yup.string()
            .max(40, 'Please Enter Below 40')
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .nullable(),
        contact: Yup.string().required('Required*').nullable(),
        cpc: Yup.string().required('Required*').nullable(),
        cpc_type: Yup.string().required('Required*').nullable(),
        user_type: Yup.string().required('Required*').nullable(),
        device_id: Yup.string()
            .required('Required*')
            .matches(
                /^.*((?=.*[aA-zZ\s]){1}).*$/,
                'Please enter valid Device Id'
            )
            .max(40)
            .nullable(),
        device_name: Yup.string()
            .max(40, 'Please Enter Below 40')
            .required('Required*')
            .matches(
                /^.*((?=.*[aA-zZ\s]){1}).*$/,
                'Please enter valid  Device Name'
            )
            .max(40)
            .nullable(),
        user_name: Yup.string()
            .max(40, 'Please Enter Below 40')
            .required('Required*')
            .matches(
                /^.*((?=.*[aA-zZ\s]){1}).*$/,
                'Please enter valid username'
            )
            .max(40)
            .nullable(),
        password: Yup.string().required('Required*').nullable(),
        cpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .nullable(),
        email: Yup.string().email().required('Required*').nullable(),
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

    const onSubmit = async (values) => {
        try {
            let formdata = new FormData()
            formdata.append('profile', profile.store)
            for (let [key, value] of Object.entries(values)) {
                formdata.append(key, value)
            }
            setLoading(true)
            let res = await axiosSuperAdminPrexo.post('/create', formdata)
            if (res.status == 200) {
                setLoading(false)
                handleClose()
                if (res.data.status == 1) {
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
                        title: 'User exist,Please check username',
                        confirmButtonText: 'Ok',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setIsAlive((isAlive) => !isAlive)
                        }
                    })
                }
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

    const getLocationType = async (value) => {
        try {
            setLocation(value)
            let res = await axiosSuperAdminPrexo.post('/location/type/' + value)
            if (res.status == 200) {
                setCpcType(res.data.data)
            }
        } catch (error) {
            alert(error)
        }
    }

    const getlWarehouse = async (type) => {
        try {
            let obj = {
                name: location,
                type: type,
            }
            let res = await axiosSuperAdminPrexo.post(
                'getWarehouseByLocation',
                obj
            )
            if (res.status == 200) {
                setWarehouse(res.data.data.warehouse)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handelEdit = async (values) => {
        try {
            let formdata = new FormData()
            formdata.append('profile', profile.store)
            for (let [key, value] of Object.entries(values)) {
                formdata.append(key, value)
            }
            let response = await axiosSuperAdminPrexo.post(
                '/edituserDetails',
                formdata
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
            }
        } catch (error) {
            setEditFetchData({})
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    const handelProfile = (event) => {
        Setprofile({
            preview: URL.createObjectURL(event.target.files[0]),
            store: event.target.files[0],
        })
    }

    return (
        <Dialog open={open}>
            <Box p={3}>
                {Object.keys(editFetchData).length !== 0 ? (
                    <H4 sx={{ mb: '20px' }}>Update Member</H4>
                ) : (
                    <H4 sx={{ mb: '20px' }}>ADD Member</H4>
                )}
                <Avatar
                    src={profile?.preview}
                    style={{
                        borderRadius: '50%',
                        margin: 'auto',
                        marginBottom: '15px',
                        height: '57px',
                        width: '57px',
                    }}
                />

                <Grid sx={{ mb: '16px' }} container spacing={4}>
                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Profile"
                            type="file"
                            InputLabelProps={{ shrink: true }}
                            name="profile"
                            onChange={(e) => {
                                handelProfile(e)
                            }}
                        />
                        <TextFieldCustOm
                            label="Name"
                            type="text"
                            name="name"
                            {...register('name')}
                            error={errors.name ? true : false}
                            helperText={errors.name ? errors.name.message : ''}
                            inputProps={{ maxLength: 40 }}
                        />
                        <TextFieldCustOm
                            label="User Name"
                            type="text"
                            name="user_name"
                            {...register('user_name')}
                            disabled={Object.keys(editFetchData).length !== 0}
                            error={errors.user_name ? true : false}
                            helperText={
                                errors.user_name ? errors.user_name.message : ''
                            }
                            inputProps={{ maxLength: 40 }}
                        />

                        <TextFieldCustOm
                            label="CPC"
                            select
                            name="cpc"
                            disabled={Object.keys(editFetchData).length !== 0}
                            {...register('cpc')}
                            value={getValues('cpc')}
                            onChange={(e) => {
                                getLocationType(e.target.value)
                            }}
                            error={errors.cpc ? true : false}
                            helperText={errors.cpc?.message}
                        >
                            {cpc?.map((cpcData) => (
                                <MenuItem
                                    key={cpcData.code}
                                    value={cpcData.code}
                                >
                                    {cpcData.code}
                                </MenuItem>
                            ))}
                        </TextFieldCustOm>
                        <TextFieldCustOm
                            label="CPC Type"
                            select
                            name="cpc_type"
                            disabled={Object.keys(editFetchData).length !== 0}
                            {...register('cpc_type')}
                            value={getValues('cpc_type')}
                            onChange={(e) => {
                                getlWarehouse(e.target.value)
                            }}
                            error={errors.cpc_type ? true : false}
                            helperText={errors.cpc_type?.message}
                        >
                            {cpcType?.map((cpcData) => (
                                <MenuItem
                                    onClick={(e) => {
                                        setSelectedCpc(cpcData.location_type)
                                    }}
                                    key={cpcData.location_type}
                                    value={cpcData.location_type}
                                >
                                    {cpcData.location_type}
                                </MenuItem>
                            ))}
                        </TextFieldCustOm>
                        <TextFieldCustOm
                            label="Warehouse"
                            select
                            name="warehouse"
                            disabled={Object.keys(editFetchData).length !== 0}
                            {...register('warehouse')}
                            value={getValues('warehouse')}
                            error={errors.warehouse ? true : false}
                            helperText={errors.warehouse?.message}
                        >
                            {warehouse?.map((cpcData) => (
                                <MenuItem
                                    onClick={(e) => {
                                        setWarehouseType(cpcData.warehouse_type)
                                    }}
                                    key={cpcData.code}
                                    value={cpcData.code}
                                >
                                    {cpcData.code}
                                </MenuItem>
                            ))}
                        </TextFieldCustOm>
                        {warehouseType == 'PRC RMW' ? (
                            <TextFieldCustOm
                                label="User Type"
                                select
                                name="user_type"
                                disabled={
                                    Object.keys(editFetchData).length !== 0
                                }
                                defaultValue={getValues('user_type')}
                                {...register('user_type')}
                                error={errors.user_type ? true : false}
                                helperText={errors.user_type?.message}
                            >
                                <MenuItem value="RM User">RM User</MenuItem>
                            </TextFieldCustOm>
                        ) : null}

                        {selectedCpc == 'Dock' ? (
                            <TextFieldCustOm
                                label="User Type"
                                select
                                name="user_type"
                                disabled={
                                    Object.keys(editFetchData).length !== 0
                                }
                                defaultValue={getValues('user_type')}
                                {...register('user_type')}
                                error={errors.user_type ? true : false}
                                helperText={errors.user_type?.message}
                            >
                                <MenuItem value="MIS">MIS</MenuItem>
                                <MenuItem value="Reporting">Reporting</MenuItem>
                                <MenuItem value="Warehouse">Warehouse</MenuItem>
                            </TextFieldCustOm>
                        ) : selectedCpc == 'Processing' && warehouseType != 'PRC RMW'  ? (
                            <TextFieldCustOm
                                label="User Type"
                                select
                                name="user_type"
                                disabled={
                                    Object.keys(editFetchData).length !== 0
                                }
                                defaultValue={getValues('user_type')}
                                {...register('user_type')}
                                error={errors.user_type ? true : false}
                                helperText={errors.user_type?.message}
                            >
                                <MenuItem value="Audit">Audit</MenuItem>
                                <MenuItem value="Bag Opening">
                                    Bag Opening
                                </MenuItem>
                                <MenuItem value="BQC">BQC</MenuItem>
                                <MenuItem value="Charging">Charging</MenuItem>
                                <MenuItem value="MIS">MIS</MenuItem>
                                <MenuItem value="RDL-FLS">RDL-FLS</MenuItem>
                                <MenuItem value="RDL-2">RDL-2</MenuItem>

                                <MenuItem value="Reporting">Reporting</MenuItem>
                                <MenuItem value="Sorting Agent">
                                    Sorting Agent
                                </MenuItem>
                                <MenuItem value="Warehouse">Warehouse</MenuItem>
                            </TextFieldCustOm>
                        ) : selectedCpc == 'Sales' ? (
                            <TextFieldCustOm
                                label="User Type"
                                select
                                name="user_type"
                                disabled={
                                    Object.keys(editFetchData).length !== 0
                                }
                                defaultValue={getValues('user_type')}
                                {...register('user_type')}
                                error={errors.user_type ? true : false}
                                helperText={errors.user_type?.message}
                            >
                                <MenuItem value="MIS">MIS</MenuItem>
                                <MenuItem value="Pricing Agent">
                                    Pricing Agent
                                </MenuItem>
                                <MenuItem value="Reporting">Reporting</MenuItem>
                                <MenuItem value="Sales Agent">
                                    Sales Agent
                                </MenuItem>
                                <MenuItem value="Sorting Agent">
                                    Sorting Agent
                                </MenuItem>
                                <MenuItem value="Warehouse">Warehouse</MenuItem>
                            </TextFieldCustOm>
                        ) : (
                            <TextFieldCustOm
                                label="User Type"
                                select
                                name="user_type"
                                disabled={
                                    Object.keys(editFetchData).length !== 0
                                }
                                defaultValue={getValues('user_type')}
                                {...register('user_type')}
                                error={errors.user_type ? true : false}
                                helperText={errors.user_type?.message}
                            />
                        )}
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Email"
                            type="email"
                            name="email"
                            {...register('email')}
                            error={errors.email ? true : false}
                            helperText={
                                errors.email ? errors.email.message : ''
                            }
                        />
                        <TextFieldCustOm
                            label="Mobile No"
                            name="contact"
                            {...register('contact')}
                            inputProps={{ maxLength: 10 }}
                            error={errors.contact ? true : false}
                            helperText={
                                errors.contact ? errors.contact.message : ''
                            }
                        />
                        <TextFieldCustOm
                            label="Device Name"
                            type="text"
                            name="device_name"
                            disabled={Object.keys(editFetchData).length !== 0}
                            {...register('device_name')}
                            error={errors.device_name ? true : false}
                            helperText={errors.device_name?.message}
                        />

                        <TextFieldCustOm
                            label="Device Id"
                            type="text"
                            name="device_id"
                            disabled={Object.keys(editFetchData).length !== 0}
                            {...register('device_id')}
                            error={errors.device_id ? true : false}
                            helperText={errors.device_id?.message}
                            inputProps={{ maxLength: 40 }}
                        />
                        <TextFieldCustOm
                            label="Password"
                            type="password"
                            name="password"
                            disabled={Object.keys(editFetchData).length !== 0}
                            {...register('password')}
                            error={errors.password ? true : false}
                            helperText={errors.password?.message}
                        />
                        <TextFieldCustOm
                            label="Confirm Password"
                            type="password"
                            name="cpassword"
                            disabled={Object.keys(editFetchData).length !== 0}
                            {...register('cpassword')}
                            error={errors.cpassword ? true : false}
                            helperText={errors.cpassword?.message}
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
