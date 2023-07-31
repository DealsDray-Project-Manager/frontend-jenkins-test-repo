import React, { useState, useEffect } from 'react'
import { Dialog, Button, TextField, MenuItem } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import {
    axiosMisUser,
    axiosRmUserAgent,
    axiosSuperAdminPrexo,
} from '../../../../../axios'
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
    trayId,
    partDetails,
    objId,
    uniqueid,
}) => {
    const [boxList, setBoxList] = useState([])
    const [loading, setLoading] = useState(false)
    const [boxName, setBoxName] = useState('')

    useEffect(() => {
        const fetchBoxes = async () => {
            try {
                const res = await axiosRmUserAgent.post(
                    '/boxesView/' + partDetails
                )
                if (res.status === 200) {
                    setBoxList(res.data.data)
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchBoxes()
    }, [])

    const handelSendRequestConfirm = async () => {
        try {
            setLoading(true)
            let obj = {
                partDetails: partDetails,
                spTrayId: trayId,
                boxName: boxName,
                objId: objId,
                uniqueid: uniqueid,
            }
            let res = await axiosRmUserAgent.post('/addIntoBox', obj)
            if (res.status == 200) {
                setLoading(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setBoxName('')
                setRefresh((refresh) => !refresh)
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
                <H4 sx={{ mb: '20px' }}>Select Box name</H4>
                <TextFieldCustOm
                    label="Box Name"
                    fullWidth
                    select
                    name="box-name"
                >
                    {boxList.map((data) => (
                        <MenuItem
                            key={data.box_id}
                            value={data.box_id}
                            onClick={(e) => {
                                setBoxName(data.box_id)
                            }}
                        >
                            {data.box_id}
                        </MenuItem>
                    ))}
                </TextFieldCustOm>
                <FormHandlerBox>
                    <Button
                        variant="contained"
                        disabled={loading || boxName == ''}
                        onClick={(e) => {
                            handelSendRequestConfirm()
                        }}
                        color="primary"
                        type="submit"
                    >
                        Add
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
