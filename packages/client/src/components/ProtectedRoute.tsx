import { useAppSelector } from '@/features/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { UserMainBox, HeaderText } from '@/styled';

interface User {
  id?: number;
}

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user: User = useAppSelector((state) => state.auth.user);

  if (!user.id) {
    return (
      <>
        <UserMainBox>
          <HeaderText>Unauthorized:</HeaderText>
          <Button
            variant="outlined"
            type="button"
            color="inherit"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </UserMainBox>
      </>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
