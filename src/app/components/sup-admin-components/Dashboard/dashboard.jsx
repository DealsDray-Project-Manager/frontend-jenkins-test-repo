import React, { useEffect, useState } from 'react'
import StatCard3 from './card'
import { H3 } from 'app/components/Typography'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo } from '../../../../axios'
import { Typography } from '@mui/material'

const AnalyticsRoot = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const FlexBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
}))

const Analytics2 = () => {
    const [count, setCount] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post('/lastBlancoStatus')
                if (res.status == 200) {
                    setCount(res.data.data)
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
        fetchData()
    }, [])

    return (
        <AnalyticsRoot>
            <FlexBox>
                <H3 sx={{ m: 0 }}>DASHBOARD</H3>
                {count?.blancoUpdationLatest !== null ? (
                    <Typography sx={{ m: 0 }}>
                        Last Blancoo Update:{' '}
                        {new Date(
                            count?.blancoUpdationLatest?.createdAt
                        ).toLocaleString('en-GB', {
                            hour12: true,
                        })}
                    </Typography>
                ) : (
                    <Typography sx={{ m: 0, color: 'red' }}>
                        Last Blancoo Update:{' '}
                        {new Date(
                            count?.blancoUpdatelast?.createdAt
                        ).toLocaleString('en-GB', {
                            hour12: true,
                        })}
                    </Typography>
                )}
            </FlexBox>
            <StatCard3 />
        </AnalyticsRoot>
    )
}

export default Analytics2
