import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { ProjectBare } from '@server/shared/entities';

interface Props {
  projects: ProjectBare[];
}

const ProjectsSubList: FC<Props> = ({ projects }) => {
  const navigate = useNavigate();

  return (
    <List disablePadding>
      {projects?.map((project) => {
        return (
          <ListItem key={project.id} sx={{ padding: '0 0 0.5rem 0' }}>
            <ListItemButton
              disableRipple
              onClick={() => {
                navigate(`/projects/${project.id}`, { state: { projectId: project.id } });
              }}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={project.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ProjectsSubList;
