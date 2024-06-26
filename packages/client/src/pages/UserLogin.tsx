import { trpc } from '../utils/trpc';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, FormLabel } from '@mui/material';
import type { UserSchema } from '@server/shared/entities';
import {
  FormErrorMessage,
  FormInput,
  HeaderText,
  UserFormBox,
  UserMainBox,
  InfoText,
} from '@/styled';
import { useAppDispatch } from '@/features/hooks';
import { jwtDecode } from 'jwt-decode';
import { setCredentials } from '@/features/auth';
import { useState } from 'react';

export default function UserLogin() {
  const loginMutation = trpc.user.login.useMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [err, setErr] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const handleUserLogin = async (user: UserSchema) => {
    try {
      loginMutation.mutate(user, {
        onSuccess: (data) => {
          const { accessToken } = data;
          const { user }: { user: { id: number }; iat: number; exp: number } =
            jwtDecode(accessToken);

          localStorage.setItem('accessToken', accessToken);

          dispatch(setCredentials({ user, accessToken }));

          navigate('/');
        },
        onError: (error) => {
          setErr(`* ${error.message}`);
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <UserMainBox>
      <HeaderText>Log in</HeaderText>
      <UserFormBox
        color="inherit"
        onSubmit={handleSubmit((data) => {
          handleUserLogin({ email: data.email, password: data.password });
        })}
      >
        <div>
          <FormLabel>Email</FormLabel>
          <FormInput
            aria-label="Email"
            {...register('email', { required: '* Email is required.' })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </div>
        <div>
          <FormLabel>Password</FormLabel>
          <FormInput
            aria-label="Password"
            type="password"
            {...register('password', { required: '* Password is required.' })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </div>
        <Button variant="outlined" type="submit" color="inherit">
          Submit
        </Button>
        <FormErrorMessage>{err}</FormErrorMessage>
      </UserFormBox>
      <InfoText onClick={() => navigate('/sign-up')}>Create an account</InfoText>
    </UserMainBox>
  );
}
