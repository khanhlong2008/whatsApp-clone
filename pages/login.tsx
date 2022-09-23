import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import Image from 'next/image'
import WhatsAppLogo from '../assets/WhatsAppLogo.png'
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from '../config/firebase'
const StyleContainer = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: whitesmoke;
`
const StyleLoginContainer = styled.div`
   display :flex ;
   flex-direction:  column;
   align-items: center;
   padding: 100px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 / 0.1);
`
const StyleImageWrapper = styled.div`
    margin-bottom: 50px;
`
const login = () => {
    const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);
    const signIn = () => {
        signInWithGoogle()
    }
    return (
        <StyleContainer>
            <Head >
                <title >login</title>
            </Head>
            <StyleLoginContainer>
                <StyleImageWrapper>
                    <Image
                        src={WhatsAppLogo}
                        alt='whatsAppLogo'
                        height="200px"
                        width='200px'
                    />
                </StyleImageWrapper>
                <Button variant='outlined' onClick={signIn}>SignIn with Google</Button>
            </StyleLoginContainer>
        </StyleContainer>
    )
}

export default login