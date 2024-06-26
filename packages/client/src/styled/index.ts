import { styled } from '@mui/material';

export const HeaderText = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '2rem',
  fontWeight: 'bold',
}));

export const UserMainBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
});

export const UserFormBox = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '25vw',
  minWidth: '300px',
});

export const FormInput = styled('input')(({ theme }) => ({
  width: '100%',
  border: '1px solid transparent',
  background: theme.palette.action.disabledBackground,
  color: theme.palette.text.primary,
  borderRadius: '4px',
  outline: 'none',
  padding: '0.5rem',
  '&:hover': {
    border: `${theme.palette.divider} 1px solid`,
  },
  '&:focus': {
    border: `${theme.palette.action.disabled} 1px solid`,
  },
}));

export const FormErrorMessage = styled('div')(({ theme }) => ({
  fontSize: '0.8rem',
  paddingTop: '0.1rem',
  color: theme.palette.error.main,
  whiteSpace: 'pre-line',
}));

export const InfoText = styled('p')(({ theme }) => ({
  color: theme.palette.info.main,
  cursor: 'pointer',
}));
