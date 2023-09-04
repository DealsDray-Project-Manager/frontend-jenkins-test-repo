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
    const [chargingUserName, setCharging] = useState('')
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

    const handelSendRequestConfirm = async () => {
        try {
            setLoading(true)
            let obj = {
                tray: isCheck,
                actionUser: user.username,
                sort_id: 'Send for charging',
            }
            let res = await axiosMisUser.post('/bagTransferSend', obj)
            if (res.status == 200) {
                setLoading(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setCharging('')
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
    return (
        <Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Add Courier Details</H4>
                <TextFieldCustOm
                    label="Name of courier"
                    fullWidth
                    name="name_of_courier"
                />
                <TextFieldCustOm
                    label="Date of courier"
                    fullWidth
                    name="date_of_courier"
                />
                <TextFieldCustOm
                    label="Tracking URL"
                    fullWidth
                    name="tracking_url"
                />
                <TextFieldCustOm label="Awbn no" fullWidth name="awbn_no" />
                <TextFieldCustOm
                    label="Name of the person"
                    fullWidth
                    name="hand_name_of_the_person"
                />
                <TextFieldCustOm
                    label="Date of delivery"
                    fullWidth
                    name="date_of_delivery"
                />
                <TextFieldCustOm
                    label="Received by"
                    fullWidth
                    name="received_by"
                />
                <FormHandlerBox>
                    <Button variant="contained" color="primary" type="submit">
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
