import { FC, useEffect, useState } from 'react';
import { styled } from '@mui/material';
import AddIssueForm from '../forms/AddIssueForm';
import CategoryHeader from '@/components/CategoryHeader';
import BoardItem from './BoardItem';
import { Issue } from '@server/entities';
import { trpc } from '@/utils/trpc';

const Box = styled('div')(({ theme }) => ({
  width: '100%',
  minWidth: '250px',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  padding: '0.5rem',
  boxSizing: 'content-box',
  gap: '1rem',
  background: theme.palette.background.default,
}));

const ItemList = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '0.5rem',
});

interface Props {
  workflowStatusId: number;
  projectId: number;
  title: string;
  dialogEnable?: true;
}

const BoardColumn: FC<Props> = ({ workflowStatusId, projectId, title }) => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const { data: issueData, refetch } = trpc.issue.find.useQuery({ workflowStatusId, projectId });

  useEffect(() => {
    refetch();
    setIssues(issueData || []);
  }, [issueData, projectId, refetch]);

  return (
    <Box>
      <CategoryHeader
        title={title}
        dialogTitle="Add issue"
        form={
          <AddIssueForm
            workflowStatusId={workflowStatusId}
            onSubmit={() => {}}
            onSuccess={() => refetch()}
          />
        }
      />
      <ItemList>
        {issues?.map((issue) => {
          return <BoardItem key={issue.id} title={issue.title} description={issue.description} />;
        })}
      </ItemList>
    </Box>
  );
};

export default BoardColumn;
