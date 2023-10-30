import React, { useState } from 'react'
import { Dialog, Button, TextField, MenuItem } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosMisUser } from '../../../../../axios'
import useAuth from 'app/hooks/useAuth'
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
    handleClose,
    open,
    setRefresh,
    sortingUsers,
    whtTray,
    isCheck,
    value,
}) => {
    const [sortingUserName, setSortingUsername] = useState('')
    const [whtTrayCode, setWhtTrayCode] = useState('')
    const [nextStage, setNextStage] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    const handelSendRequestConfirm = async () => {
        try {
            setLoading(true)
            let obj = {
                isCheck: isCheck,
                user_name: sortingUserName,
                sort_id: 'Send for Pickup',
                toTray: whtTrayCode,
                value: value,
                nextStage: nextStage,
                actUser: user.username,
            }
            let res = await axiosMisUser.post('/pickup/requestSendToWh', obj)
            if (res.status == 200) {
                handleClose()
                setLoading(false)
                setRefresh((refresh) => !refresh)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
            } else {
                setLoading(false)
                alert(res.data.message)
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
                <H4 sx={{ mb: '20px' }}>Assign To Sorting</H4>
                <TextFieldCustOm
                    label="Username"
                    fullWidth
                    select
                    name="username"
                >
                    {sortingUsers.map((data) => (
                        <MenuItem
                            key={data.user_name}
                            value={data.user_name}
                            onClick={(e) => {
                                setSortingUsername(data.user_name)
                            }}
                        >
                            {data.user_name}
                        </MenuItem>
                    ))}
                </TextFieldCustOm>
                <TextFieldCustOm
                    label="Wht Tray"
                    fullWidth
                    select
                    name="wht_tray"
                >
                    {whtTray.map((data) => (
                        <MenuItem
                            key={data.code}
                            value={data.code}
                            onClick={(e) => {
                                setWhtTrayCode(data.code)
                            }}
                        >
                            {data.code} - ({data?.items?.length}) - Status:
                            {data?.sort_id}
                        </MenuItem>
                    ))}
                </TextFieldCustOm>
                {value == 'RDL-2 done closed by warehouse' ? (
                    <TextFieldCustOm
                        label="Select Next Stage"
                        fullWidth
                        select
                        name="stage"
                        onChange={(e) => {
                            setNextStage(e.target.value)
                        }}
                    >
                        <MenuItem value="Inuse">In Use</MenuItem>
                        <MenuItem value="Recharge">Recharge</MenuItem>
                        <MenuItem value="Charge Done">Re-BQC</MenuItem>
                        <MenuItem value="BQC Done">Re-Audit</MenuItem>
                        <MenuItem value="Ready to RDL-1">Re-RDL-1</MenuItem>
                        <MenuItem value="Ready to RDL-2">Re-RDL-2</MenuItem>
                    </TextFieldCustOm>
                ) : value == 'Ready to RDL-2' ? (
                    <TextFieldCustOm
                        label="Select Next Stage"
                        fullWidth
                        select
                        name="stage"
                        onChange={(e) => {
                            setNextStage(e.target.value)
                        }}
                    >
                        <MenuItem value="Inuse">In Use</MenuItem>
                        <MenuItem value="Recharge">Recharge</MenuItem>
                        <MenuItem value="Charge Done">Re-BQC</MenuItem>
                        <MenuItem value="BQC Done">Re-Audit</MenuItem>
                        <MenuItem value="Ready to RDL-1">Re-RDL-1</MenuItem>
                    </TextFieldCustOm>
                ) : value == 'Audit Done' ? (
                    <TextFieldCustOm
                        label="Select Next Stage"
                        fullWidth
                        select
                        name="stage"
                        onChange={(e) => {
                            setNextStage(e.target.value)
                        }}
                    >
                        <MenuItem value="Inuse">In Use</MenuItem>
                        <MenuItem value="Recharge">Recharge</MenuItem>
                        <MenuItem value="Charge Done">Re-BQC</MenuItem>
                        <MenuItem value="BQC Done">Re-Audit</MenuItem>
                    </TextFieldCustOm>
                ) : value == 'BQC Done' ? (
                    <TextFieldCustOm
                        label="Select Next Stage"
                        fullWidth
                        select
                        name="stage"
                        onChange={(e) => {
                            setNextStage(e.target.value)
                        }}
                    >
                        <MenuItem value="Inuse">In Use</MenuItem>
                        <MenuItem value="Recharge">Recharge</MenuItem>
                        <MenuItem value="Charge Done">Re-BQC</MenuItem>
                    </TextFieldCustOm>
                ) : value == 'Charge Done' ? (
                    <TextFieldCustOm
                        label="Select Next Stage"
                        fullWidth
                        select
                        name="stage"
                        onChange={(e) => {
                            setNextStage(e.target.value)
                        }}
                    >
                        <MenuItem value="Inuse">In Use</MenuItem>
                        <MenuItem value="Recharge">Recharge</MenuItem>
                    </TextFieldCustOm>
                ) : (
                    ''
                )}

                <FormHandlerBox>
                    <Button
                        variant="contained"
                        disabled={
                            loading ||
                            sortingUserName == '' ||
                            whtTrayCode == '' ||
                            nextStage == ''
                        }
                        onClick={(e) => {
                            handelSendRequestConfirm()
                        }}
                        color="primary"
                        type="submit"
                    >
                        Assign
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
