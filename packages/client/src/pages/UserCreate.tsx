import { trpc } from '../utils/trpc';
import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import type { UserSchema } from '@server/shared/entities';

const Box = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
});

export default function UserCreate() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = trpc.user.signup.useMutation();

  const handleUserCreation = async () => {
    const newUser: UserSchema = { email, password };

    try {
      await mutation.mutate(newUser, {
        onSuccess: () => {
          setEmail('');
          setPassword('');
        },
        onError: (error) => {
          const { message } = error;
          const messageObj = JSON.parse(message);
          const errorMessages = messageObj.map((error: any) => error.message);
          console.log(errorMessages);
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h3" style={{ color: 'black' }}>
        Sign up
      </Typography>
      <TextField
        id="email"
        label="Email address"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        size="large"
        variant="outlined"
        onClick={handleUserCreation}
        disabled={Boolean(!email || !password)}
      >
        Create
      </Button>
    </Box>
  );
}
