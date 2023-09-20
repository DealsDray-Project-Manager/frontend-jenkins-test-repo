import React, { useState, useEffect } from 'react'
import { Select, Button, Grid, MenuItem, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import Image from 'mui-image'
import Swal from 'sweetalert2'
import { useNavigate, useLocation } from 'react-router-dom'
import { axiosSuperAdminPrexo } from '../.././../../axios'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const MemberEditorDialog = () => {
    const [profile, Setprofile] = useState({
        preview: '',
        store: {},
    })
    const [panProof, SetpanProof] = useState({
        preview: '',
        store: {},
    })
    const [aadharProof, SetAadharProof] = useState({
        preview: '',
        store: {},
    })
    const [businessAddressProof, SetBusinessAddressProof] = useState({
        preview: '',
        store: {},
    })

    const [loading, setLoading] = useState(false)
    const [cpc, setCpc] = useState([])
    const [getSalesUsers, setGetSalesUsers] = useState([])
    const [cpcType, setCpcType] = useState([])
    const [warehouse, setWarehouse] = useState([])
    const [location, setLocation] = useState('')
    const navigate = useNavigate()
    const { state } = useLocation()
    const { editFetchData } = state

    useEffect(() => {
        if (Object.keys(editFetchData).length !== 0) {
            editFetchData.cpassword = editFetchData.password
            console.log(editFetchData.mobile_verification_status)
            reset({ ...editFetchData })
            let obj = {
                code: editFetchData.warehouse,
            }
            setWarehouse([obj])
        }
    }, [])

    useEffect(() => {
        const fetchCpc = async () => {
            try {
                let response = await axiosSuperAdminPrexo.get(
                    '/getCpcSalesLocation/'
                )
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
    }, [])

    const schema = Yup.object().shape({
        name: Yup.string()
            .max(40, 'Please Enter Below 40')
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .nullable(),
        business_name: Yup.string().required('Required*').nullable(),
        contact: Yup.string().required('Required*').nullable(),
        cpc: Yup.string().required('Required*').nullable(),
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
        billing_address: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid address')
            .max(40)
            .required('Required*')
            .nullable(),
        city: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid city')
            .max(40)
            .required('Required*')
            .nullable(),
        state: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid state')
            .max(40)
            .required('Required*')
            .nullable(),

        pincode: Yup.string()

            .required('Required*')
            .nullable(),
        gstin: Yup.string()
            .matches(/^[A-Z0-9]{15}$/i, 'Please enter a valid GSTIN')

            .required('Required*')
            .nullable(),
        pan_card_number: Yup.string()
            .matches(/^[A-Za-z0-9]{10}$/, 'Please enter a valid PAN number')

            .required('Required*')
            .nullable(),
        cpc_type: Yup.string().required('Required*').nullable(),
        warehouse: Yup.string().required('Required*').nullable(),
        sales_users: Yup.string().required('Required*').nullable(),
        mobile_verification_status: Yup.string()
            .required('Required*')
            .nullable(),
        email_verification_status: Yup.string()
            .required('Required*')
            .nullable(),
        contact_person_name: Yup.string().required('Required*').nullable(),
    })
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (values) => {
        try {
            setLoading(true)
            values.user_type = 'Buyer'
            let formdata = new FormData()
            formdata.append('profile', profile.store)
            formdata.append('pan_card_proof', panProof.store)
            formdata.append('aadhar_proof', aadharProof.store)
            formdata.append(
                'business_address_proof',
                businessAddressProof.store
            )
            for (let [key, value] of Object.entries(values)) {
                formdata.append(key, value)
            }

            let res = await axiosSuperAdminPrexo.post('/createBuyer', formdata)

            if (res.status == 200) {
                setLoading(false)
                if (res.data.status == 1) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Successfully Created',
                        onfirmButtonText: 'Ok',
                    })
                    navigate('/sup-admin/buyer')
                } else {
                    setLoading(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'Buyer exist,Please check Buyername',
                        confirmButtonText: 'Ok',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
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
            reset({ cpc_type: '', warehouse: '', user_type: '' })
            let res = await axiosSuperAdminPrexo.post('/location/type/' + value)
            if (res.status == 200) {
                setCpcType(res.data.data)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handelSlaesUsers = async (warehouse) => {
        try {
            let obj = {
                cpc: location,
                warehouse: warehouse,
            }
            let res = await axiosSuperAdminPrexo.post('/getsalesUsers', obj)
            if (res.status == 200) {
                setGetSalesUsers(res.data.data)
            }
        } catch (error) {
            alert(error)
        }
    }

    const getlWarehouse = async (type) => {
        try {
            reset({ warehouse: '', user_type: '', warehouse: '' })
            let obj = {
                name: location,
                type: type,
            }
            let res = await axiosSuperAdminPrexo.post(
                '/getWarehouseByLocation',
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
            setLoading(true)
            let formdata = new FormData()
            formdata.append('profile', profile.store)
            formdata.append('pan_card_proof', panProof.store)
            formdata.append('aadhar_proof', aadharProof.store)
            formdata.append(
                'business_address_proof',
                businessAddressProof.store
            )
            for (let [key, value] of Object.entries(values)) {
                formdata.append(key, value)
            }
            let response = await axiosSuperAdminPrexo.post(
                '/editBuyerDetails',
                formdata
            )
            if (response.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully Updated',
                    confirmButtonText: 'Ok',
                })
                navigate('/sup-admin/buyer')
            } else {
                setLoading(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Buyer exist,Please check Buyername',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
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

    const handelProfile = (event) => {
        Setprofile({
            preview: URL.createObjectURL(event.target.files[0]),
            store: event.target.files[0],
        })
    }

    const handelAadharProof = (event) => {
        SetAadharProof({
            preview: URL.createObjectURL(event.target.files[0]),
            store: event.target.files[0],
        })
    }

    const handelPanCardProof = (event) => {
        SetpanProof({
            preview: URL.createObjectURL(event.target.files[0]),
            store: event.target.files[0],
        })
    }

    const handelBusinessAddressProof = (event) => {
        SetBusinessAddressProof({
            preview: URL.createObjectURL(event.target.files[0]),
            store: event.target.files[0],
        })
    }

    return (
        <Box p={3}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 1,
                }}
            >
                {Object.keys(editFetchData).length !== 0 ? (
                    <H4 sx={{ mb: '20px' }}>Update Buyer</H4>
                ) : (
                    <H4 sx={{ mb: '20px' }}>ADD Buyer</H4>
                )}
                <Box>
                    <Button
                        sx={{ mb: 2 }}
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/sup-admin/buyer')}
                    >
                        Back to List
                    </Button>
                    {Object.keys(editFetchData).length !== 0 ? (
                        <Button
                            sx={{ mb: 2, ml: 2 }}
                            variant="contained"
                            color="success"
                            download
                            type="submit"
                            disabled={loading}
                            onClick={handleSubmit(handelEdit)}
                        >
                            Update
                        </Button>
                    ) : (
                        <Button
                            sx={{ mb: 2, ml: 2 }}
                            variant="contained"
                            color="success"
                            download
                            type="submit"
                            disabled={loading}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Save
                        </Button>
                    )}
                </Box>
            </Box>

            <Grid sx={{ mt: 1 }} container spacing={4}>
                <Grid item sm={6} xs={12}>
                    <TextFieldCustOm
                        label="Buyer Name"
                        type="text"
                        name="name"
                        {...register('name')}
                        error={errors.name ? true : false}
                        helperText={errors.name ? errors.name.message : ''}
                        inputProps={{ maxLength: 40 }}
                    />
                    <TextFieldCustOm
                        label="Mobile No"
                        name="contact"
                        {...register('contact')}
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ''
                            )
                        }}
                        inputProps={{ maxLength: 10 }}
                        error={errors.contact ? true : false}
                        helperText={
                            errors.contact ? errors.contact.message : ''
                        }
                    />
                    <TextFieldCustOm
                        label="Email"
                        type="email"
                        name="email"
                        {...register('email')}
                        error={errors.email ? true : false}
                        helperText={errors.email ? errors.email.message : ''}
                    />
                    <TextFieldCustOm
                        label="Business Name"
                        type="text"
                        name="business_name"
                        disabled={Object.keys(editFetchData).length !== 0}
                        {...register('business_name')}
                        error={errors.business_name ? true : false}
                        helperText={
                            errors.business_name
                                ? errors.business_name.message
                                : ''
                        }
                        inputProps={{ maxLength: 40 }}
                    />
                    <TextFieldCustOm
                        label="Business Address"
                        type="text"
                        name="billing_address"
                        disabled={Object.keys(editFetchData).length !== 0}
                        {...register('billing_address')}
                        error={errors.billing_address ? true : false}
                        helperText={
                            errors.billing_address
                                ? errors.billing_address.message
                                : ''
                        }
                        inputProps={{ maxLength: 40 }}
                    />

                    <TextFieldCustOm
                        label="GSTIN"
                        type="text"
                        name="gstin"
                        disabled={Object.keys(editFetchData).length !== 0}
                        inputProps={{ maxLength: 15 }}
                        {...register('gstin')}
                        error={errors.gstin ? true : false}
                        helperText={errors.gstin?.message}
                    />

                    <TextFieldCustOm
                        label="State"
                        type="text"
                        disabled={Object.keys(editFetchData).length !== 0}
                        name="state"
                        {...register('state')}
                        error={errors.state ? true : false}
                        helperText={errors.state ? errors.state?.message : ''}
                    />
                    <TextFieldCustOm
                        label="City"
                        type="text"
                        name="city"
                        disabled={Object.keys(editFetchData).length !== 0}
                        {...register('city')}
                        error={errors.city ? true : false}
                        helperText={errors.city ? errors.city?.message : ''}
                    />
                    <TextFieldCustOm
                        label="Pincode"
                        type="text"
                        name="pincode"
                        disabled={Object.keys(editFetchData).length !== 0}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault()
                            }
                        }}
                        inputProps={{ maxLength: 6 }}
                        {...register('pincode')}
                        error={errors.pincode ? true : false}
                        helperText={
                            errors.pincode ? errors.pincode?.message : ''
                        }
                    />
                    <TextFieldCustOm
                        label="CPC"
                        select
                        disabled={Object.keys(editFetchData).length !== 0}
                        name="cpc"
                        {...register('cpc')}
                        defaultValue="Default CPC Value"
                        error={errors.cpc ? true : false}
                        helperText={errors.cpc?.message}
                    >
                        {cpc?.map((cpcData) => (
                            <MenuItem
                                value={cpcData.code}
                                onClick={(e) => getLocationType(cpcData.code)}
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
                        type="text"
                        {...register('cpc_type')}
                        defaultValue={getValues('cpc_type')}
                        error={errors.cpc_type ? true : false}
                        helperText={errors.cpc_type?.message}
                    >
                        {cpcType?.map((cpcData) => (
                            <MenuItem
                                onClick={(e) => {
                                    getlWarehouse(cpcData.location_type)
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
                        type="text"
                        disabled={Object.keys(editFetchData).length !== 0}
                        {...register('warehouse')}
                        defaultValue={getValues('warehouse')}
                        error={errors.warehouse ? true : false}
                        helperText={errors.warehouse?.message}
                    >
                        {warehouse?.map((cpcData) => (
                            <MenuItem
                                key={cpcData.code}
                                value={cpcData.code}
                                onClick={() => handelSlaesUsers(cpcData.code)}
                            >
                                {cpcData.code}
                            </MenuItem>
                        ))}
                    </TextFieldCustOm>
                    <TextFieldCustOm
                        label="Sales User"
                        select
                        name="sales_users"
                        disabled={Object.keys(editFetchData).length !== 0}
                        {...register('sales_users')}
                        defaultValue={getValues('sales_users')}
                        error={errors.warehouse ? true : false}
                        helperText={errors.warehouse?.message}
                    >
                        {getSalesUsers?.map((cpcData) => (
                            <MenuItem
                                key={cpcData.user_name}
                                value={cpcData.user_name}
                            >
                                {cpcData.user_name}
                            </MenuItem>
                        ))}
                    </TextFieldCustOm>
                </Grid>

                <Grid item sm={6} xs={12}>
                    <TextFieldCustOm
                        label="Username"
                        type="text"
                        name="user_name"
                        disabled={Object.keys(editFetchData).length !== 0}
                        {...register('user_name')}
                        error={errors.user_name ? true : false}
                        helperText={
                            errors.user_name ? errors.user_name.message : ''
                        }
                        inputProps={{ maxLength: 40 }}
                    />

                    <TextFieldCustOm
                        label="Mobile Verification Status"
                        select
                        name="mobile_verification_status"
                        {...register('mobile_verification_status')}
                        error={errors.mobile_verification_status ? true : false}
                        helperText={errors.mobile_verification_status?.message}
                    >
                        <MenuItem value="Verified">Verified</MenuItem>
                        <MenuItem value="Unverified">Unverified</MenuItem>
                    </TextFieldCustOm>
                    <TextFieldCustOm
                        select
                        label="Email Verification Status"
                        name="email_verification_status"
                        {...register('email_verification_status')}
                        error={errors.email_verification_status ? true : false}
                        helperText={errors.email_verification_status?.message}
                    >
                        <MenuItem value="Verified">Verified</MenuItem>
                        <MenuItem value="Unverified">Unverified</MenuItem>
                    </TextFieldCustOm>
                    <TextFieldCustOm
                        label="Contact Person Name"
                        type="text"
                        name="contact_person_name"
                        {...register('contact_person_name')}
                        error={errors.contact_person_name ? true : false}
                        helperText={
                            errors.contact_person_name
                                ? errors.contact_person_name.message
                                : ''
                        }
                    />
                    <TextFieldCustOm
                        label="PAN Card Number"
                        type="text"
                        disabled={Object.keys(editFetchData).length !== 0}
                        name="pan_card_number"
                        inputProps={{ maxLength: 10 }}
                        {...register('pan_card_number')}
                        error={errors.pan_card_number ? true : false}
                        helperText={errors.pan_card_number?.message}
                    />
                    <TextFieldCustOm
                        label="Password"
                        type="password"
                        disabled={Object.keys(editFetchData).length !== 0}
                        name="password"
                        {...register('password')}
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
                    />
                    <TextFieldCustOm
                        label="Confirm Password"
                        type="password"
                        disabled={Object.keys(editFetchData).length !== 0}
                        name="cpassword"
                        {...register('cpassword')}
                        error={errors.cpassword ? true : false}
                        helperText={errors.cpassword?.message}
                    />
                    <TextFieldCustOm
                        label="Profile"
                        type="file"
                        InputLabelProps={{ shrink: true }}
                        name="profile"
                        onChange={(e) => {
                            handelProfile(e)
                        }}
                    />
                    {profile?.preview !== '' ? (
                        <Image
                            src={profile?.preview}
                            alt="Profile Preview"
                            width={200}
                            height={100}
                        />
                    ) : null}

                    <TextFieldCustOm
                        label="PAN Card Photo"
                        type="file"
                        InputLabelProps={{ shrink: true }}
                        name="pan_card_proof"
                        onChange={(e) => {
                            handelPanCardProof(e)
                        }}
                        sx={{ mt: 2 }}
                    />
                    {panProof?.preview !== '' ? (
                        <Image
                            src={panProof?.preview}
                            alt="Pancard Preview"
                            width={200}
                            height={100}
                        />
                    ) : null}
                    <TextFieldCustOm
                        label="Aadhar Photo"
                        type="file"
                        InputLabelProps={{ shrink: true }}
                        name="aadhar_proof"
                        onChange={(e) => {
                            handelAadharProof(e)
                        }}
                        sx={{ mt: 2 }}
                    />
                    {aadharProof?.preview !== '' ? (
                        <Image
                            src={aadharProof?.preview}
                            alt="Aadhar Preview"
                            width={200}
                            height={100}
                        />
                    ) : null}
                    <TextFieldCustOm
                        label="Business Address Proof"
                        type="file"
                        InputLabelProps={{ shrink: true }}
                        name="business_address_proof"
                        onChange={(e) => {
                            handelBusinessAddressProof(e)
                        }}
                        sx={{ mt: 2 }}
                    />
                    {businessAddressProof?.preview !== '' ? (
                        <Image
                            src={businessAddressProof?.preview}
                            alt="Aadhat Preview"
                            width={200}
                            height={100}
                        />
                    ) : null}
                </Grid>
            </Grid>
        </Box>
    )
}
export default MemberEditorDialog
