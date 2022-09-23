import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import WhatsAppLogo from '../assets/WhatsAppLogo.png'
import { CircularProgress } from '@mui/material'

const StyleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: white;
`
const StyleImageWrapper = styled.div`
    margin-bottom: 50px;
`
const Loading = () => {
    return (
        <StyleContainer>
            <StyleImageWrapper>
                <Image
                    src={WhatsAppLogo}
                    alt='whatsAppLogo'
                    height="200px"
                    width='200px'
                />
            </StyleImageWrapper>
            <CircularProgress />
        </StyleContainer>
    )
}

export default Loading