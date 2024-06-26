import { styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SidePanelButton from './SidePanelButton';
import DarkModeToggle from '../DarkModeToggle';
import CategoryHeader from '@/components/CategoryHeader';
import ProjectsSubList from './ProjectsSubList';
import AddProjectForm from '../forms/AddProjectForm';
import { trpc } from '@/utils/trpc';

const Box = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '300px',
  minWidth: '300px',
  padding: '0.5rem',
  gap: '0.5rem',
  position: 'sticky',
  top: '0',
  left: '0',
  borderRight: `${theme.palette.text.disabled} solid 2px`,
}));

export default function SidePanel() {
  const { data: projects, refetch } = trpc.project.find.useQuery();

  return (
    <Box>
      <SidePanelButton title="Home" path="/" icon={<HomeIcon />} />
      <SidePanelButton title="Tasks" path="/tasks" icon={<TaskAltIcon />} />
      <CategoryHeader
        title="Projects"
        dialogTitle="Add project"
        form={<AddProjectForm onSubmit={() => {}} onSuccess={() => refetch()} />}
      />
      <ProjectsSubList projects={projects || []} />
      <DarkModeToggle />
    </Box>
  );
}
