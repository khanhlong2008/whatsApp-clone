import Avatar from '@mui/material/Avatar'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip'
import React, { useState } from 'react'
import styled from 'styled-components'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVerticalIcon from '@mui/icons-material/MoreVert'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as EmailValidator from 'email-validator'
import { addDoc, collection } from 'firebase/firestore';
import { async } from '@firebase/util';
const StyledContainer = styled.div`
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    /* overflow-y: scroll; */
    border-right: 1px solid whitesmoke;
`
const StyledHearder = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
`
const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    padding:15px ;
    border-radius: 2px;
`
const StyleSearchInput = styled.input`
    outline: none;
    border: none;
    flex: 1;
    background-color: white;
    color: black;
`
const StyledSidebarButton = styled(Button)`
    width: 100%;
    border-top:  1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
`
const StyleUserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`
const Sidebar = () => {
    const [loggedInUser, _loading, _error] = useAuthState(auth)

    const [isOpenNewConversationDialog, setIsOpenNewconversationDialog] = useState(false)

    const [recipientEmail, setRecipientEmail] = useState("")

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log('ERROR LOGOUT')
        }
    }

    const toggleNewConversationDialog = (isOpen: boolean) => {
        setIsOpenNewconversationDialog(isOpen)

        if (!isOpen) setRecipientEmail('')
    }

    const closeNewConversationDialog = () => {
        toggleNewConversationDialog(false)
    }

    const isInvitingSelf = recipientEmail === loggedInUser?.email

    const CreateConversation = async () => {
        if (!recipientEmail) return

        if (EmailValidator.validate(recipientEmail) && !isInvitingSelf) {

            await addDoc(collection(db, 'conversation'), {
                users: [loggedInUser?.email, recipientEmail]
            }
            )
        }
        closeNewConversationDialog()
    }
    return (
        <StyledContainer>
            <StyledHearder>
                <Tooltip title={loggedInUser?.email as string} placement='right'>
                    <StyleUserAvatar src={loggedInUser?.photoURL || ''} />
                </Tooltip>
                <div style={{ color: 'black' }}>
                    <IconButton>
                        <ChatIcon ></ChatIcon>
                    </IconButton>
                    <IconButton>
                        <MoreVerticalIcon />
                    </IconButton>
                    <IconButton onClick={logOut}>
                        <LogoutIcon />
                    </IconButton>
                </div>
            </StyledHearder>

            <StyledSearch>
                <SearchIcon style={{ color: 'black' }} />
                <StyleSearchInput placeholder='Search in conversation' />
            </StyledSearch>
            <StyledSidebarButton onClick={() => {
                toggleNewConversationDialog(true)
            }}>
                Start a new conversation
            </StyledSidebarButton>

            {/* Dialog */}
            <Dialog open={isOpenNewConversationDialog} onClose={closeNewConversationDialog}>
                <DialogTitle>New Conversation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a Google email address for the user wish to chat with
                    </DialogContentText>
                    <TextField
                        autoFocus
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={recipientEmail}
                        onChange={event => {
                            setRecipientEmail(event.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeNewConversationDialog}>Cancel</Button>
                    <Button disabled={!recipientEmail} onClick={CreateConversation}>Create</Button>
                </DialogActions>
            </Dialog>

        </StyledContainer >
    )
}

export default Sidebar