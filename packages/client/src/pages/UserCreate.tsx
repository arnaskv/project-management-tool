import { trpc } from '../utils/trpc';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, FormLabel } from '@mui/material';
import type { UserSchema } from '@server/shared/entities';
import { HeaderText, UserMainBox, UserFormBox, FormErrorMessage, FormInput } from '@/styled';

export default function UserCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '', passwordRepeat: '' } });

  const mutation = trpc.user.signup.useMutation();

  const handleUserCreate = async (newUser: UserSchema) => {
    try {
      mutation.mutate(newUser, {
        onSuccess: () => {
          navigate('/login');
        },
        onError: (error) => {
          const fieldErrors = error.data?.zodError?.fieldErrors;
          if (fieldErrors) {
            for (const [key, value] of Object.entries(fieldErrors)) {
              const message = value?.map((element) => `* ${element}.`).join('\n');
              setError(key as keyof UserSchema, { type: 'manual', message });
            }
          }
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <UserMainBox>
      <HeaderText>Sign up</HeaderText>
      <UserFormBox
        color="inherit"
        onSubmit={handleSubmit((data) => {
          data.password === data.passwordRepeat
            ? handleUserCreate({ email: data.email, password: data.password })
            : setError('passwordRepeat', {
                type: 'manual',
                message: '* Passwords do not match.',
              });
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
        <div>
          <FormLabel>Repeat password</FormLabel>
          <FormInput
            aria-label="Repeat password"
            type="password"
            {...register('passwordRepeat', {
              required: '* Confirm password.',
            })}
          />
          <FormErrorMessage>{errors.passwordRepeat?.message}</FormErrorMessage>
        </div>
        <Button variant="outlined" type="submit" color="inherit">
          Submit
        </Button>
      </UserFormBox>
    </UserMainBox>
  );
}
