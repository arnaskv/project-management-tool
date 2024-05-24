import { FC, ReactElement, cloneElement, useState } from 'react';
import { styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ActionDialog from '@/components/dialogs/ActionDialog';

const Box = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

interface Props {
  title: string;
  dialogTitle: string;
  form: ReactElement;
}

const CategoryHeader: FC<Props> = ({ title, dialogTitle, form }) => {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box>
        <Title>{title}</Title>
        <IconButton onClick={toggleDialog}>
          <AddIcon />
        </IconButton>
      </Box>
      <ActionDialog title={dialogTitle} open={open} handleClose={toggleDialog}>
        {cloneElement(form, { onSubmit: toggleDialog })}
      </ActionDialog>
    </>
  );
};

export default CategoryHeader;
