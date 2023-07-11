import React, { useEffect, useState, Controller } from 'react'
import {
    Dialog,
    Button,
    Grid,
    TextField, 
    MenuItem,
    Checkbox,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
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
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const MemberEditorDialog = ({
    open,
    handleClose,
    setIsAlive,
    editFetchData,
    setEditFetchData,
    vendorId,
    setVendorId,
}) => {
    const [loading, setLoading] = useState(false)
    const theme = useTheme()
    const [locationDrop, setLocationDrop] = useState([])
    const [personName, setPersonName] = React.useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (Object.keys(editFetchData).length !== 0) {
                reset({ ...editFetchData })
                setPersonName(editFetchData.location)
                setVendorId(editFetchData.vendor_id)
                open()
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post('/getLocation')
                if (res.status == 200) {
                    setLocationDrop(res.data.data)
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        setValue('location', personName)
    }, [personName])

    const schema = Yup.object().shape({
        vendor_id: Yup.string().required('Required*').nullable(),
        name: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .required('Required*')
            .nullable(),
        address: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid address')
            .max(500)
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

        mobile_one: Yup.string().required('Required*').nullable(),
        deals: Yup.string().required('Required*').nullable(),
        mobile_two: Yup.string().required('Required*').nullable(),
        pincode: Yup.string().required('Required*').nullable(),
        reference: Yup.string().required('Required*').nullable(),
        location: Yup.array().min(1, 'Select at least one location').nullable(),
    })

    console.log(errors)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            location: [], // Set initial values here
        },
    })

    const onSubmit = async (data) => {
        data.created_at = Date.now()
        try {
            setLoading(true)
            let response = await axiosSuperAdminPrexo.post(
                '/vendorMaster/create',
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
                '/vendorMaster/edit',
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
                text: error,
            })
        }
    }
    const handleChange = (event) => {
        const {
            target: { value },
        } = event
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        )
    }

    return (
        <Dialog open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Add Vendor</H4>

                <Grid sx={{ mb: '16px' }} container spacing={4}>
                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Vendor ID"
                            type="text"
                            name="vendor_id"
                            value={vendorId}
                            {...register('vendor_id')}
                            disabled={Object.keys(editFetchData).length !== 0}
                            error={errors.vendor_id ? true : false}
                            helperText={
                                errors.vendor_id
                                    ? errors.vendor_id?.message
                                    : ''
                            }
                        />
                        <TextFieldCustOm
                            label="Name"
                            type="text"
                            name="name"
                            disabled={Object.keys(editFetchData).length !== 0}
                            {...register('name')}
                            error={errors.name ? true : false}
                            helperText={errors.name ? errors.name?.message : ''}
                        />
                        <TextFieldCustOm
                            label="Address"
                            type="text"
                            name="address"
                            {...register('address')}
                            error={errors.address ? true : false}
                            helperText={
                                errors.address ? errors.address?.message : ''
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
                            type="text"
                            name="pincode"
                            {...register('pincode')}
                            inputProps={{ maxLength: 6 }}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                            error={errors.pincode ? true : false}
                            helperText={
                                errors.pincode ? errors.pinocode?.message : ''
                            }
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextFieldCustOm
                            label="Mobile 1"
                            type="text"
                            name="mobile_one"
                            {...register('mobile_one')}
                            inputProps={{ maxLength: 10 }}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                            error={errors.mobile_one ? true : false}
                            helperText={
                                errors.mobile_one
                                    ? errors.mobile_one?.message
                                    : ''
                            }
                        />
                        <TextFieldCustOm
                            label="Mobile 2"
                            type="text"
                            name="mobile_two"
                            {...register('mobile_two')}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                            inputProps={{ maxLength: 10 }}
                            error={errors.mobile_two ? true : false}
                            helperText={
                                errors.mobile_two
                                    ? errors.mobile_two?.message
                                    : ''
                            }
                        />

                        <TextFieldCustOm
                            label="Reference"
                            type="text"
                            name="reference"
                            {...register('reference')}
                            error={errors.reference ? true : false}
                            helperText={
                                errors.reference
                                    ? errors.reference?.message
                                    : ''
                            }
                        />
                        <FormControl sx={{ mb: 2, width: 260 }}>
                            <InputLabel id="demo-multiple-name-label">
                                Location
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={personName}
                                input={<OutlinedInput label="location" />}
                                MenuProps={MenuProps}
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                                error={errors.location ? true : false}
                                helperText={
                                    errors.location
                                        ? errors.location?.message
                                        : ''
                                }
                            >
                                {locationDrop.map((data) => (
                                    <MenuItem
                                        style={getStyles(
                                            data.code,
                                            personName,
                                            theme
                                        )}
                                        value={data.code}
                                    >
                                        {data.code}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* <TextFieldCustOm
                            label="Deals"
                            type="text"
                            name="deals"
                            {...register('deals')}
                            error={errors.deals ? true : false}
                            helperText={
                                errors.deals ? errors.deals?.message : ''
                            }
                        /> */}

                            <TextFieldCustOm
                            label='Spare Part Category'
                            select
                            type='text'
                            style={{ width: '100%', marginRight:'20px' }}
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
