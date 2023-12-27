import React from 'react'
import { Card, Divider, Stack, Typography, Box } from '@mui/material'
import Image from 'mui-image'

const BotLevelImages = ({ Images }) => {
    return (
        <Card sx={{ marginTop: '40px', border: '1px solid black' }}>
            <Box sx={{ px: 1, py: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    BOT Level Images
                </Typography>
                <Divider />
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <ImageBox
                        key={Images?.imageOne}
                        src={Images?.imageOne}
                        alt={'Image One'}
                    />
                    <ImageBox
                        key={Images?.imageTwo}
                        src={Images?.imageTwo}
                        alt={'Image TWo'}
                    />
                    <ImageBox
                        key={Images?.imageThree}
                        src={Images?.imageThree}
                        alt={'Image Three'}
                    />
                    <ImageBox
                        key={Images?.imageFour}
                        src={Images?.imageFour}
                        alt={'Image Four'}
                    />
                    <ImageBox
                        key={Images?.imageFive}
                        src={Images?.imageFive}
                        alt={'Image Five'}
                    />
                    <ImageBox
                        key={Images?.imageSix}
                        src={Images?.imageSix}
                        alt={'Image Six'}
                    />
                </Stack>
            </Box>
        </Card>
    )
}

const ImageBox = ({ src, alt }) => (
    <Box sx={{ flex: 1, minWidth: 0 }}>
        <Image
            src={src}
            alt={alt}
            width={190}
            height={190}
            style={{
                margin: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        />
    </Box>
)

export default BotLevelImages
