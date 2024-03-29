import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required')
});

type FormValues = {
  name: string;
  description: string;
};

interface Props extends DialogProps {
  description: string;
  defaultValues?: FormValues;
  handleClose: (values: FormValues) => void;
}

const CollectionDialog = ({
  handleClose,
  title,
  description,
  defaultValues = { name: '', description: '' },
  ...props
}: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema)
  });

  return (
    <Dialog {...props} fullWidth={true} scroll="body">
      <DialogTitle color="primary.main">{title}</DialogTitle>
      <form onSubmit={handleSubmit(data => handleClose(data))} autoComplete="off">
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                id="input-collection-name"
                margin="normal"
                label="Name"
                variant="outlined"
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
                id="input-collection-description"
                margin="normal"
                label="Description"
                variant="outlined"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CollectionDialog;
