import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { trpc } from '@/utils/trpc';
import { ProjectInsert } from '@server/shared/entities';
import { DialogContent, DialogActions, FormLabel } from '@mui/material';
import { FormInput, FormErrorMessage } from '@/styled';

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
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
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
