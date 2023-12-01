import React, { useState, useEffect } from 'react'
import { Dialog, Button, TextField, MenuItem } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosMisUser, axiosSuperAdminPrexo } from '../../../../../axios'
import useAuth from 'app/hooks/useAuth'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { yupResolver } from '@hookform/resolvers/yup'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const FormHandlerBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const MemberEditorDialog = ({ handleClose, open, setIsAlive, isCheck }) => {
    const [deliveryType, setDeliveryType] = useState('')
    const [warehouse, setWarehouse] = useState([])
    const { user } = useAuth()
    const [cpc, setCpc] = useState([])
    const [loading, setLoading] = useState(false)

    console.log(user);

    useEffect(() => {
        const fetchCpc = async () => {
            try {
                let response = await axiosSuperAdminPrexo.get(
                    `/getCpcBagTransfer/${user.cpc_type}`
                )
                if (response.status == 200) {
                    setCpc(response.data.data.data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchCpc()
    }, [user])

    const schema = Yup.object().shape({
        delivery_type: Yup.string().required('Required*').nullable(),
        cpc: Yup.string().required('Required*').nullable(),
        name_of_courier: Yup.string()
            .when('delivery_type', (delivery_type, schema) => {
                if (delivery_type == 'Courier') {
                    return schema.required('Required')
                }
            })
            .nullable(),
        date_of_courier: Yup.string()
            .when('delivery_type', (delivery_type, schema) => {
                if (delivery_type == 'Courier') {
                    return schema.required('Required')
                }
            })
            .nullable(),
        tracking_url: Yup.string()
            .when('delivery_type', (delivery_type, schema) => {
                if (delivery_type == 'Courier') {
                    return schema.required('Required')
                }
            })
            .nullable(),
        hand_name_of_the_person: Yup.string()
            .when('delivery_type', (delivery_type, schema) => {
                if (delivery_type == 'Hand Delivery') {
                    return schema.required('Required')
                }
            })
            .nullable(),
        received_by: Yup.string()
            .when('delivery_type', (delivery_type, schema) => {
                if (delivery_type == 'Hand Delivery') {
                    return schema.required('Required')
                }
            })
            .nullable(),
        awbn: Yup.string()
            .when('delivery_type', (delivery_type, schema) => {
                if (delivery_type == 'Courier') {
                    return schema.required('Required')
                }
            })
            .nullable(),

        date_of_delivery: Yup.string()
            .when('delivery_type', (delivery_type, schema) => {
                if (delivery_type == 'Hand Delivery') {
                    return schema.required('Required')
                }
            })
            .nullable(),
        description: Yup.string().required('Required*').nullable(),
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

    const onSubmit = async (value) => {
        try {
            setLoading(true)
            value.bag_details = isCheck
            value.username = user.username
            value.warehouseType = user.warehouse
            let res = await axiosMisUser.post('/bagTransferSend', value)
            if (res.status == 200) {
                setLoading(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setIsAlive((isAlive) => !isAlive)
                handleClose()
            } else {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res?.data?.message,
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

    // GET WAREHOUSE USING CPC
    const fetchWarehouse = async (cpcData) => {
        try {
            let obj = {
                name: cpcData,
            }
            const fetchWh = await axiosSuperAdminPrexo.post(
                '/getWarehouseByLocation',
                obj
            )
            if (fetchWh.status == 200) {
                setWarehouse(fetchWh.data.data.warehouse)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Add Details</H4>
                <TextFieldCustOm
                    label="Select Delivery Type"
                    select
                    name="delivery_type"
                    {...register('delivery_type')}
                    error={errors.delivery_type ? true : false}
                    helperText={errors.delivery_type?.message}
                    defaultValue={getValues('delivery_type')}
                    onChange={(e) => {
                        setDeliveryType(e.target.value)
                    }}
                >
                    <MenuItem value="Courier">Courier</MenuItem>
                    <MenuItem value="Hand Delivery">Hand Delivery</MenuItem>
                </TextFieldCustOm>
                <TextFieldCustOm
                    label="Select Cpc"
                    select
                    name="cpc"
                    {...register('cpc')}
                    error={errors.cpc ? true : false}
                    helperText={errors.cpc?.message}
                    defaultValue={getValues('cpc')}
                >
                    {cpc.map((data) => (
                        <MenuItem value={data.code}>{data.code}</MenuItem>
                    ))}
                </TextFieldCustOm>

                {deliveryType == 'Courier' ? (
                    <>
                        <TextFieldCustOm
                            label="Name of courier"
                            fullWidth
                            name="name_of_courier"
                            {...register('name_of_courier')}
                            error={errors.name_of_courier ? true : false}
                            helperText={errors.name_of_courier?.message}
                        />
                        <TextFieldCustOm
                            label="Date of courier"
                            fullWidth
                            type="date"
                            name="date_of_courier"
                            {...register('date_of_courier')}
                            InputLabelProps={{ shrink: true }}
                            error={errors.date_of_courier ? true : false}
                            helperText={errors.date_of_courier?.message}
                        />
                        <TextFieldCustOm
                            label="Tracking URL"
                            fullWidth
                            name="tracking_url"
                            {...register('tracking_url')}
                            error={errors.tracking_url ? true : false}
                            helperText={errors.tracking_url?.message}
                        />
                        <TextFieldCustOm
                            label="Awbn no"
                            fullWidth
                            name="awbn_no"
                            {...register('awbn')}
                            inputProps={{ maxLength: 40 }}
                            error={errors.awbn ? true : false}
                            helperText={errors.awbn?.message}
                        />
                    </>
                ) : (
                    <>
                        <TextFieldCustOm
                            label="Name of the person"
                            fullWidth
                            name="hand_name_of_the_person"
                            // value={getValues("hand_name_of_the_person")}
                            {...register('hand_name_of_the_person')}
                            error={
                                errors.hand_name_of_the_person ? true : false
                            }
                            helperText={errors.hand_name_of_the_person?.message}
                        />
                        <TextFieldCustOm
                            label="Date of delivery"
                            fullWidth
                            type="date"
                            name="date_of_delivery"
                            InputLabelProps={{ shrink: true }}
                            {...register('date_of_delivery')}
                            error={errors.date_of_delivery ? true : false}
                            helperText={errors.date_of_delivery?.message}
                        />
                        <TextFieldCustOm
                            label="Received by"
                            fullWidth
                            name="received_by"
                            {...register('received_by')}
                            error={errors.received_by ? true : false}
                            helperText={errors.received_by?.message}
                        />
                    </>
                )}
                <TextFieldCustOm
                    label="Description"
                    fullWidth
                    name="description"
                    {...register('description')}
                    error={errors.description ? true : false}
                    helperText={errors.description?.message}
                />

                <FormHandlerBox>
                    <Button
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        color="primary"
                        type="submit"
                        disabled={loading}
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
