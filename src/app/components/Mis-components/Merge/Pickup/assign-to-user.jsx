import React, { useState } from 'react'
import { Dialog, Button, TextField, MenuItem } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosMisUser } from '../../../../../axios'

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
}) => {
    const [sortingUserName, setSortingUsername] = useState('')
    const [whtTrayCode, setWhtTrayCode] = useState('')
    const [loading, setLoading] = useState(false)

    const handelSendRequestConfirm = async () => {
        try {
            setLoading(true)
            let obj = {
                isCheck: isCheck,
                user_name: sortingUserName,
                sort_id: 'Send for Pickup',
                toTray: whtTrayCode,
            }
            let res = await axiosMisUser.post('/pickup/requestSendToWh', obj)
            if (res.status == 200) {
                handleClose()
                setLoading(false)
                alert(res.data.message)
                setRefresh((refresh) => !refresh)
            } else {
                setLoading(false)
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
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
                            {data.code}
                        </MenuItem>
                    ))}
                </TextFieldCustOm>
                <FormHandlerBox>
                    <Button
                        variant="contained"
                        disabled={
                            loading ||
                            sortingUserName == '' ||
                            whtTrayCode == ''
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
