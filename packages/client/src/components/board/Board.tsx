import MainLayout from '@/layouts/MainLayout';
import BoardColumn from './BoardColumn';
import { Typography, styled } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { trpc } from '@/utils/trpc';
import Loader from '../Loader';
import { useEffect } from 'react';

const BoardBox = styled('div')({
  width: '100%',
  display: 'flex',
  columnGap: '0.5rem',
  overflowX: 'auto',
});

const Header = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: '3rem',
});

const Board = () => {
  const location = useLocation();
  const { projectId } = location.state;

  const { data: project, isLoading, refetch } = trpc.project.get.useQuery(projectId);

  useEffect(() => {
    if (projectId) {
      refetch();
    }
  }, [projectId, refetch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <Header>
        <Typography variant="h4">{project?.name}</Typography>
      </Header>
      <BoardBox>
        {project?.workflow.statuses.map((workflowStatus) => {
          return (
            <BoardColumn
              key={workflowStatus.id}
              workflowStatusId={workflowStatus.id}
              projectId={projectId}
              title={workflowStatus.status.name}
            />
          );
        })}
      </BoardBox>
    </MainLayout>
  );
};

export default Board;
