import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SourceIcon from '@mui/icons-material/Source';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Collection } from '../../../definitions/types';
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
  handleClose: (values: FormValues) => void;
}

const CreateCollectionDialog = ({ handleClose, ...props }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: ''
    },
    resolver: yupResolver(schema)
  });

  return (
    <Dialog {...props} fullWidth={true} scroll="body">
      <DialogTitle color="primary.main">Create new collection</DialogTitle>
      <form onSubmit={handleSubmit(data => handleClose(data))} autoComplete="off">
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
};

export default CreateCollectionDialog;
