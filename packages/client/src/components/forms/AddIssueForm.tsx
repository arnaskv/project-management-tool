import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { trpc } from '@/utils/trpc';
import { IssueInsert } from '@server/shared/entities';
import { DialogContent, DialogActions, FormLabel } from '@mui/material';
import { FormInput, FormErrorMessage } from '@/styled';
import { useParams } from 'react-router-dom';

interface Props {
  workflowStatusId: number;
  onSubmit: () => void;
  onSuccess: () => void;
}

const AddIssueForm: FC<Props> = ({ workflowStatusId, onSubmit, onSuccess }) => {
  const params = useParams();
  const projectId = Number(params.projectId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { title: '', description: '' } });

  const issueMutation = trpc.issue.create.useMutation({
    onSuccess: () => onSuccess(),
  });

  const handleIssueCreate = (data: IssueInsert) => {
    issueMutation.mutate({ issueData: data, projectId, workflowStatusId });
    console.log(data);
  };

  return (
    <form
      color="inherit"
      onSubmit={handleSubmit((data) => {
        handleIssueCreate(data);
        onSubmit();
      })}
    >
      <DialogContent>
        <FormLabel>Title</FormLabel>
        <FormInput
          aria-label="Title"
          {...register('title', { required: '* Title is required.' })}
        />
        <FormErrorMessage sx={{ paddingBottom: '1rem' }}>{errors.title?.message}</FormErrorMessage>
        <FormLabel>Description</FormLabel>
        <FormInput
          aria-label="Description"
          {...register('description', { required: '* Description is required.' })}
        />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
      </DialogContent>
      <DialogActions>
        <Button disableRipple type="submit" color="inherit">
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};

export default AddIssueForm;
