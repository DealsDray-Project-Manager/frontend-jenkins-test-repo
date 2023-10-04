import React, { useState, useEffect } from 'react'
import {
    Dialog,
    Button,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import {
    axiosMisUser,
    axiosSuperAdminPrexo,
    axiosWarehouseIn,
} from '../../../../../axios'
import SearchIcon from '@mui/icons-material/Search'
import jwt_decode from 'jwt-decode'
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
    setValidatedCtx,
    brand,
    model,
    ctxGrade,
    setCtxGrade,
   
}) => {
    const [validationState, setValidationState] = useState(false)
    const [otherTrayAssign, setOtherTrayAssign] = useState([])

   
    // HANDEL ADD TO STATE
    const handelAddTrayId = (e, grade, value) => {
        e.preventDefault()
        let updateInput = otherTrayAssign.find((item) =>
            Object.keys(item).includes(grade)
        )

        if (updateInput) {
            updateInput[grade] = value
            setOtherTrayAssign((prevData) => {
                return prevData.map((itemDet) =>
                    itemDet.grade === grade ? updateInput : itemDet
                )
            })
        } else {
            setOtherTrayAssign((prevAddedTray) => [
                ...prevAddedTray,
                { [grade]: value },
            ])
        }
    }

    const handelTrayId = async (trayId, trayType) => {
        try {
            const user = localStorage.getItem('prexo-authentication')
            if (user) {
                const { location } = jwt_decode(user)
                let obj = {
                    trayId: otherTrayAssign,
                    trayType: trayType,
                    location: location,
                    brand: brand,
                    model: model,
                }
                let res = await axiosWarehouseIn.post(
                    '/trayIdCheckAuditApprovePage',
                    obj
                )
                if (res.status == 200) {
                    setValidationState(true)
                    setValidatedCtx(otherTrayAssign)
                    alert(res.data.message)
                } else {
                    alert(res.data.message)
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }

    return (
        <Dialog fullWidth maxWidth="xs" open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Assign Tray</H4>
                {ctxGrade?.map((data) => (
                    <TextFieldCustOm
                        onChange={(e) => {
                            handelAddTrayId(e, data?.code, e.target.value)
                        }}
                        label={`CT${data?.code}`}
                        fullWidth
                        name="cta"
                    />
                ))}
                <FormHandlerBox>
                    {validationState == true ? (
                        <Button
                            variant="contained"
                            onClick={(e) => {
                                handleClose()
                            }}
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={(e) => {
                                handelTrayId()
                            }}
                            disabled={
                                otherTrayAssign?.length !== ctxGrade?.length
                            }
                            color="primary"
                            type="submit"
                        >
                            Validate The Trays
                        </Button>
                    )}
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
