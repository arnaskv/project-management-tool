import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { trpc } from '@/utils/trpc';
import { setCredentials } from '@/features/auth';
import { UserSchema } from '@server/shared/entities';

interface DecodedToken {
  user: { id: number };
  iat: number;
  exp: number;
}

export const handleUserLogin = async (
  user: UserSchema,
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  try {
    const loginMutation = trpc.user.login.useMutation();
    loginMutation.mutate(user, {
      onSuccess: (data) => {
        const { accessToken } = data;
        const { user }: DecodedToken = jwtDecode(accessToken);

        localStorage.setItem('accessToken', accessToken);

        dispatch(setCredentials({ user, accessToken }));

        navigate('/');
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
