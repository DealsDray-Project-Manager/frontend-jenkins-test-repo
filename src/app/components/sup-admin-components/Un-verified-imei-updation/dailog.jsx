import React, { useState } from 'react'
import { Dialog, Button, TextField, MenuItem } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosMisUser, axiosSuperAdminPrexo } from '../../../../axios'
import Swal from 'sweetalert2'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const FormHandlerBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const MemberEditorDialog = ({ handleClose, open, uicData, setIsAlive }) => {
    const [auditUserName, setAuditUsername] = useState('')
    const [loading, setLoading] = useState(false)

    const schema = Yup.object().shape({
        uic: Yup.string().required('Required*'),
        delivery_imei: Yup.string().required('Required*').nullable(),
        bqc_ro_ril_imei: Yup.string().min(15).nullable(),
        bqc_ro_mob_one_imei: Yup.string().min(15).nullable(),
        bqc_ro_mob_two_imei: Yup.string().min(15).nullable(),
      
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

    // HANDEL SUBMIT
    const onSubmit = async (value) => {
        try {
            const res = await axiosSuperAdminPrexo.post(
                '/updateUnverifiedImei',
                value
            )
            if (res.status == 200) {
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res.data.message,
                    confirmButtonText: 'Ok',
                })
                setIsAlive((isAlive) => !isAlive)
            } else {
                handleClose()
                setIsAlive((isAlive) => !isAlive)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                })
            }
        } catch (error) {
            handleClose()
            setIsAlive((isAlive) => !isAlive)
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
                <TextFieldCustOm
                    label="Uic"
                    type="text"
                    name="uic"
                    value={uicData?.uic}
                    {...register('uic')}
                    error={errors.uic ? true : false}
                    helperText={errors.uic ? errors.uic.message : ''}
                    inputProps={{ maxLength: 40 }}
                />
                <TextFieldCustOm
                    label="Delivery Imei"
                    type="text"
                    name="delivery_imei"
                    value={uicData?.delivery_imei}
                    {...register('delivery_imei')}
                    error={errors.delivery_imei ? true : false}
                    helperText={
                        errors.delivery_imei ? errors.delivery_imei.message : ''
                    }
                    inputProps={{ maxLength: 40 }}
                />
                <TextFieldCustOm
                    label="Bqc software report RO Ril Miui IMEI 0"
                    type="text"
                    name="bqc_ro_ril_imei"
                    defaultValue={uicData?.bqc_ro_ril_imei}
                    {...register('bqc_ro_ril_imei')}
                    error={errors.bqc_ro_ril_imei ? true : false}
                    helperText={
                        errors.bqc_ro_ril_imei
                            ? errors.bqc_ro_ril_imei.message
                            : ''
                    }
                    inputProps={{ maxLength: 40 }}
                />
                <TextFieldCustOm
                    label="Bqc software report Mobile IMEI"
                    type="text"
                    name="bqc_ro_mob_one_imei"
                    defaultValue={uicData?.bqc_ro_mob_one_imei}
                    {...register('bqc_ro_mob_one_imei')}
                    error={errors.bqc_ro_mob_one_imei ? true : false}
                    helperText={
                        errors.bqc_ro_mob_one_imei
                            ? errors.bqc_ro_mob_one_imei.message
                            : ''
                    }
                    inputProps={{ maxLength: 40 }}
                />
                <TextFieldCustOm
                    label="Bqc software report Mobile IMEI 2"
                    type="text"
                    name="bqc_ro_mob_two_imei"
                    defaultValue={uicData?.bqc_ro_mob_two_imei}
                    {...register('bqc_ro_mob_two_imei')}
                    error={errors.bqc_ro_mob_two_imei ? true : false}
                    helperText={
                        errors.bqc_ro_mob_two_imei
                            ? errors.bqc_ro_mob_two_imei.message
                            : ''
                    }
                    inputProps={{ maxLength: 40 }}
                />
                <FormHandlerBox>
                    <Button
                        variant="contained"
                        disabled={loading}
                        color="primary"
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Update
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
