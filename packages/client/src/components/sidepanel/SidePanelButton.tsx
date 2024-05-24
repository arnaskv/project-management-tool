import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

interface Props {
  title: string;
  path: string;
  icon: ReactNode;
}

const SidePanelButton: FC<Props> = ({ icon, path, title }) => {
  const navigate = useNavigate();

  return (
    <Button size="large" color="inherit" startIcon={icon} onClick={() => navigate(path)}>
      {title}
    </Button>
  );
};

export default SidePanelButton;
