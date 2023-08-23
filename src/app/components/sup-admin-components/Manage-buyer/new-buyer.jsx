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
    const [panProof, SetpanProof] = useState({
        preview1: '',
        store: {},
    })
    const [aadharProof, SetAadharProof] = useState({
        preview2: '',
        store: {},
    })
    const [businessAddressProof, SetBusinessAddressProof] = useState({
        preview3: '',
        store: {},
    })

    const [loading, setLoading] = useState(false)
    const [cpc, setCpc] = useState([])
    const [getSalesUsers, setGetSalesUsers] = useState([])
    const [cpcType, setCpcType] = useState([])
    const [selectedCpc, setSelectedCpc] = useState('')
    const [location, setLocation] = useState('')
    const [warehouse, setWarehouse] = useState([])

    useEffect(() => {
        const fetchCpc = async () => {
            try {
                let response = await axiosSuperAdminPrexo.get('/getCpcSalesLocation/')
                if (response.status == 200) setCpc(response.data.data.data)
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
      
        if (Object.keys(editFetchData).length !== 0) {
            editFetchData.cpassword = editFetchData.password
            Setprofile({
                ...profile,
                preview: editFetchData.profile,   
            })
            SetpanProof({
                ...panProof,
                preview1: editFetchData.pan_card_proof,
            });
            SetAadharProof({
                ...aadharProof,
                preview2: editFetchData.aadhar_proof,
                store: {}, 
            });
            SetBusinessAddressProof({
                ...businessAddressProof,
                preview3: editFetchData.business_address_proof,
                store: {},
            });

            reset({ ...editFetchData 
            });
            open()
        }
        fetchCpc()
    },[])

    const schema = Yup.object().shape({
        name: Yup.string()
            .max(40, 'Please Enter Below 40')
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .nullable(),
        businessName: Yup.string().required('Required*').nullable(),
        contact: Yup.string().required('Required*').nullable(),
        cpc: Yup.string().required('Required*').nullable(),
        user_name: Yup.string().max(40, 'Please Enter Below 40').required('Required*')
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
    country: Yup.string()
        .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid country')
        .max(40)
        .required('Required*')
        .nullable(),
    pincode: Yup.string()
        .min(6, 'Please Enter valid Pincode')
        .required('Required*')
        .nullable(),
        gstin: Yup.string()
        .matches(/^[A-Z0-9]{12}$/i, 'Please enter a valid GSTIN')
        .max(12)
        .required('Required*')
        .nullable(),
        pan_card_number: Yup.string()
        .matches(/^[A-Za-z0-9]{10}$/, 'Please enter a valid PAN number')
        .max(10)
        .required('Required*')
        .nullable(),
        // cpc_type: Yup.string().required('Required*').nullable(),
        // warehouse: Yup.string().required('Required*').nullable(),
        // sales_users: Yup.string().required('Required*').nullable(),
        mobile_verification_status: Yup.string().required('Required*').nullable(),
        email_verification_status: Yup.string().required('Required*').nullable(),
        // pan_card_proof: Yup.mixed().required('Pan card photo is required'),
        // pan_card_proof: Yup.mixed().required('Aadhar card Photo is required'),
        // business_address_proof: Yup.mixed().required('Business address photo is required'),
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
            values.user_type = 'Buyer';
            let formdata = new FormData()
            formdata.append('profile', profile.store)
            formdata.append('pan_card_proof', panProof.store)
            formdata.append('aadhar_proof', aadharProof.store)
            formdata.append('business_address_proof', businessAddressProof.store)
            for (let [key, value] of Object.entries(values)) {
                formdata.append(key, value)
            }
            setLoading(true)
            let res = await axiosSuperAdminPrexo.post('/createBuyer', formdata)
           
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
            let res = await axiosSuperAdminPrexo.post('/getsalesUsers',
                obj)
               
            if (res.status == 200) {
                setGetSalesUsers(res.data.data)
            }
            console.log('Sales Users Data:', res.data);
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
            let formdata = new FormData()
            formdata.append('profile', profile.store)
            formdata.append('pan_card_proof', panProof.store)
            formdata.append('aadhar_proof', aadharProof.store)
            formdata.append('business_address_proof', businessAddressProof.store)
            for (let [key, value] of Object.entries(values)) {
                formdata.append(key, value)
            }
            let response = await axiosSuperAdminPrexo.post(
                '/editBuyerDetails',
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

    const handelAadharProof = (event) => {
        SetAadharProof({
            preview2: URL.createObjectURL(event.target.files[0]),
            store: event.target.files[0],
        });
    };

    const handelPanCardProof = (event) => {
        SetpanProof({
            preview1: URL.createObjectURL(event.target.files[0]),
            store: event.target.files[0],
        });
    };

    const handelBusinessAddressProof = (event) => {
        SetBusinessAddressProof({
            preview3: URL.createObjectURL(event.target.files[0]),
            store: event.target.files[0],
        });
    };
    return (
        <Dialog open={open}>
            <Box p={3}>
                {Object.keys(editFetchData).length !== 0 ? (
                    <H4 sx={{ mb: '20px' }}>Update Buyer</H4>
                ) : (
                    <H4 sx={{ mb: '20px' }}>ADD Buyer</H4>
                )}
                <Box style={{display:"flex"}}>
                <Avatar
                 variant="rounded"
                    src={profile?.preview}
                    style={{
                        margin: 'auto',
                        marginBottom: '15px',
                        height: '57px',
                        width: '57px',
                    }}
                />
                 <Avatar
                 variant="rounded"
                    src={panProof?.preview1}
                    style={{
                        margin: 'auto',
                        marginBottom: '15px',
                        height: '57px',
                        width: '57px',
                    }}
                />
                 <Avatar
                  variant="rounded"
                    src={aadharProof?.preview2}
                    style={{
                        margin: 'auto',
                        marginBottom: '15px',
                        height: '57px',
                        width: '57px',
                    }}
                />
                 <Avatar
                  variant="rounded"
                    src={businessAddressProof?.preview3}
                    style={{
                        margin: 'auto',
                        marginBottom: '15px',
                        height: '57px',
                        width: '57px',
                    }}
                />
                </Box>
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
                            label="Buisness Name"
                            type="text"
                            name="businessName"
                            {...register('businessName')}
                            error={errors.businessName ? true : false}
                            helperText={errors.businessName ? errors.businessName.message : ''}
                            inputProps={{ maxLength: 40 }}
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
                            label="Mobile No"
                            name="contact"
                            {...register('contact')}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
                            inputProps={{ maxLength: 10 }}
                            error={errors.contact ? true : false}
                            helperText={
                                errors.contact ? errors.contact.message : ''
                            }
                        />
                          <TextFieldCustOm
                            label="City"
                            type="text"
                            name="city"
                            {...register('city')}
                            error={errors.city ? true : false}
                            helperText={errors.city ? errors.city?.message : ''}
                        />
                              <TextFieldCustOm
                            label="Country"
                            type="text"
                            name="country"
                            {...register('country')}
                            error={errors.country ? true : false}
                            helperText={
                                errors.country ? errors.country?.message : ''
                            }
                        />
                         <TextFieldCustOm
                            label="GSTIN"
                            type="text"
                            name="gstin"
                            inputProps={{ maxLength: 12 }}
                            {...register('gstin')}
                            error={errors.gstin ? true : false}
                            helperText={errors.gstin?.message}
                        />
                            <TextFieldCustOm
                            label="PAN Card Number"
                            type="text"
                            name="pan_card_number"
                            inputProps={{ maxLength: 10 }}
                            {...register('pan_card_number')}
                            error={errors.pan_card_number ? true : false}
                            helperText={errors.pan_card_number?.message}
                        />
                        <TextFieldCustOm
                            label="CPC"
                            select
                            name="cpc"
                            {...register('cpc')}
                            // value={getValues('cpc')}
                            // onChange={(e) => {
                            //     getLocationType(e.target.value)
                            // }}
                             defaultValue={getValues('cpc')}
                            error={errors.cpc ? true : false}
                            helperText={errors.cpc?.message}
                        >
                            {cpc?.map((cpcData) => (
                                <MenuItem
                                    // key={cpcData.code}
                                    value={cpcData.code}
                                    onClick={() =>
                                        getLocationType(
                                            cpcData.code,
                                        )
                                    }
                                >
                                    {cpcData.code}
                                </MenuItem>
                            ))}
                        </TextFieldCustOm>
                        <TextFieldCustOm
                            label="CPC Type"
                            select
                            name="location_type"
                            {...register('cpc_type')}
                            value={getValues('cpc_type')}
                            disabled={Object.keys(editFetchData).length !== 0}
                            defaultValue={getValues('location_type')}
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
                            name="code"
                            {...register('code')}
                            value={getValues('warehouse')}
                            disabled={Object.keys(editFetchData).length !== 0}
                            defaultValue={getValues('code')}
                          
                            onChange={(e) => {
                                handelSlaesUsers(e.target.value)
                            }}
                            error={errors.warehouse ? true : false}
                            helperText={errors.warehouse?.message}
                        >
                            {warehouse?.map((cpcData) => (
                                <MenuItem
                                    key={cpcData.code}
                                    value={cpcData.code}
                                >
                                    {cpcData.code}
                                </MenuItem>
                            ))}
                        </TextFieldCustOm>
                        <TextFieldCustOm
                            label="Sales Users"
                            select
                            name="sales_users"
                            {...register('sales_users')}
                            // value={getValues('sales_users')}
                            defaultValue={getValues('sales_users')}
                            disabled={Object.keys(editFetchData).length !== 0}
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
                            label="Buyer Name"
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
                            label="Billing Address"
                            type="text"
                            name="billing_address"
                            {...register('billing_address')}
                            error={errors.billing_address ? true : false}
                            helperText={
                                errors.billing_address ? errors.billing_address?.message : ''
                            }/>
                             <TextFieldCustOm
                            label="State"
                            type="text"
                            name="state"
                            {...register('state')}
                            error={errors.state ? true : false}
                            helperText={
                                errors.state ? errors.state?.message : ''
                            }
                        />
                          <TextFieldCustOm
                            label="Pincode"
                            type="number"
                            name="pincode"
                            inputProps={{ maxLength: 6 }}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                            {...register('pincode')}
                            error={errors.pincode ? true : false}
                            helperText={
                                errors.pincode ? errors.pincode?.message : ''
                            }
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
                         <TextFieldCustOm
                                label="Mobile Verification Status"
                                select
                                name="mobile_verification_status"
                                {...register('mobile_verification_status')}
                                defaultValue={editFetchData.mobile_verification_status || ''}
                                error={errors.mobile_verification_status ? true : false}
                                helperText={errors.mobile_verification_status?.message}
                            >
                                <MenuItem value="Verified">Verified</MenuItem>
                                <MenuItem value="Unverified">Unverified</MenuItem>
                            </TextFieldCustOm>
                            <TextFieldCustOm
                                label="Email Verification Status"
                                select
                                name="email_verification_status"
                                defaultValue={editFetchData.email_verification_status || ''}
                                {...register('email_verification_status')}
                                error={errors.email_verification_status ? true : false}
                                helperText={errors.email_verification_status?.message}
                            >
                                <MenuItem value="Verified">Verified</MenuItem>
                                <MenuItem value="Unverified">Unverified</MenuItem>
                            </TextFieldCustOm>
                            <TextFieldCustOm
                            label="PAN Card Photo"
                            type="file"
                            InputLabelProps={{ shrink: true }}
                            {...register('pan_card_proof')}
                            name="pan_card_proof"
                            error={errors.pan_card_proof ? true : false}
                            helperText={errors.pan_card_proof?.message}
                            onChange={(e) => {
                                handelPanCardProof(e);
                            }}
                       
                        />
                           <TextFieldCustOm
                            label="Aadhar Photo"
                            type="file"
                            InputLabelProps={{ shrink: true }}
                            name="aadhar_proof"
                            {...register('aadhar_proof')}
                            error={errors.aadhar_proof ? true : false}
                                helperText={errors.aadhar_proof?.message}
                            onChange={(e) => {
                                handelAadharProof(e);
                            }}
                        />
                           <TextFieldCustOm
                            label="Business Address Proof"
                            type="file"
                            InputLabelProps={{ shrink: true }}
                            name="business_address_proof"
                            {...register('business_address_proof')}
                            error={errors.business_address_proof ? true : false}
                                helperText={errors.business_address_proof?.message}
                            onChange={(e) => {
                                handelBusinessAddressProof(e);
                            }}
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