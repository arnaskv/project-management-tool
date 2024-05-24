import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { trpc } from '@/utils/trpc';
import { ProjectInsert } from '@server/shared/entities';
import { DialogContent, DialogActions, FormLabel } from '@mui/material';
import { FormInput, ErrorMessage } from './styles';

interface Props {
  onSubmit: () => void;
  onSuccess: () => void;
}

const AddProjectForm: FC<Props> = ({ onSubmit, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: '' } });

  const projectMutation = trpc.project.create.useMutation({
    onSuccess: () => onSuccess(),
  });

  const handleProjectCreate = (data: ProjectInsert) => {
    projectMutation.mutate(data);
    console.log(data);
  };

  return (
    <form
      color="inherit"
      onSubmit={handleSubmit((data) => {
        handleProjectCreate(data);
        onSubmit();
      })}
    >
      <DialogContent>
        <FormLabel>Name</FormLabel>
        <FormInput aria-label="Name" {...register('name', { required: '* Name is required.' })} />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
      </DialogContent>
      <DialogActions>
        <Button disableRipple type="submit" color="inherit">
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};

export default AddProjectForm;
