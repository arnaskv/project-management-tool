import { styled } from '@mui/material';

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

export const ErrorMessage = styled('div')(({ theme }) => ({
  fontSize: '0.8rem',
  paddingTop: '0.1rem',
  color: theme.palette.error.main,
}));
