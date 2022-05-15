import {
    Typography,
    Container,
    FormControlLabel,
    TextField,
    Checkbox,
    Button
} from '@mui/material';
import { useState, useRef, useEffect } from 'react';

export default function SignIn() {
    return (
        <Container
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >

            <Typography component='h1' >
                Sign in
            </Typography>
            <TextField
                label='Email'
            />
            <TextField
                label='Password'
            />
            <FormControlLabel
                control={<Checkbox />}
                label='Remember me'
            />
            <Button>Sign In</Button>
        </Container>
    )
}