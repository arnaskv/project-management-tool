import { trpc } from '../utils/trpc';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, FormLabel } from '@mui/material';
import type { UserSchema } from '@server/shared/entities';
import { FormErrorMessage, FormInput, HeaderText, UserFormBox, UserMainBox } from '@/styled';

export default function UserLogin() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const mutation = trpc.user.login.useMutation();

  const handleUserLogin = async (user: UserSchema) => {
    try {
      mutation.mutate(user, {
        onSuccess: () => {
          navigate('/');
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
      </UserFormBox>
    </UserMainBox>
  );
}
