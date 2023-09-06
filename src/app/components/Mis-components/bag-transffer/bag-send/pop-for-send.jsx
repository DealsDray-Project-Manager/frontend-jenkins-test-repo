import React, { useState } from 'react'
import { Dialog, Button, TextField, MenuItem } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosMisUser } from '../../../../../axios'
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
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)

    const schema = Yup.object().shape({
        name_of_courier: Yup.string()
            .max(40, 'Please Enter Below 40')
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .nullable(),
        date_of_courier: Yup.string().required('Required*').nullable(),
        tracking_url: Yup.string().required('Required*').nullable(),
        hand_name_of_the_person: Yup.string().required('Required*').nullable(),
        received_by: Yup.string().required('Required*').nullable(),
        awbn:Yup.string().required('Required*').nullable(),
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

    const onSubmit = async () => {
        try {
            setLoading(true)

            // let res = await axiosMisUser.post('/bagTransferSend')
            // if (res.status == 200) {
            //     setLoading(false)
            //     Swal.fire({
            //         position: 'top-center',
            //         icon: 'success',
            //         title: res?.data?.message,
            //         confirmButtonText: 'Ok',
            //     })
            //     setIsAlive((isAlive) => !isAlive)
            //     handleClose()
            // } else {
            //     setLoading(false)
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Oops...',
            //         text: res?.data?.message,
            //     })
            // }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    return (
        <Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Add Courier Details</H4>
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
                    error={errors.awbn ? true : false}
                    helperText={errors.awbn?.message}
                />
                <TextFieldCustOm
                    label="Name of the person"
                    fullWidth
                    name="hand_name_of_the_person"
                    {...register('hand_name_of_the_person')}
                    error={errors.hand_name_of_the_person ? true : false}
                    helperText={errors.hand_name_of_the_person?.message}
                />
                <TextFieldCustOm
                    label="Date of delivery"
                    fullWidth
                    type="date"
                    name="date_of_delivery"
                    {...register('hand_name_of_the_person')}
                    error={errors.hand_name_of_the_person ? true : false}
                    helperText={errors.hand_name_of_the_person?.message}
                />
                <TextFieldCustOm
                    label="Received by"
                    fullWidth
                    name="received_by"
                    {...register('received_by')}
                    error={errors.received_by ? true : false}
                    helperText={errors.received_by?.message}
                />
                <FormHandlerBox>
                    <Button
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        color="primary"
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
