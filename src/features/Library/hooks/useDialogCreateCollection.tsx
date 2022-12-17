import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Dialog from '@mui/material/Dialog';
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

type Props = {
  onSubmit: (values: FormValues) => void;
};

export const useDialogCreateCollection = ({ onSubmit }: Props) => {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: ''
    },
    resolver: yupResolver(schema)
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const dialog = (
    <Dialog fullWidth={true} scroll="body" open={open} onClose={handleClose}>
      <DialogTitle color="primary.main">Create new collection</DialogTitle>
      <form onSubmit={handleSubmit(data => onSubmit(data))} autoComplete="off">
        <DialogContent>
          <DialogContentText>
            The collection will be initialized without any contents. You can add Pages to this
            collection after completing its creation.
          </DialogContentText>
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

  return {
    dialog,
    handleOpen,
    handleClose
  };
};
