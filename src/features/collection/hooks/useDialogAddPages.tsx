import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Dropzone from 'react-dropzone';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PhotoIcon from '@mui/icons-material/Photo';
import * as yup from 'yup';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'rgba(0, 0, 0, 0.23)',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  mt: '16px',
  mb: '8px'
} as const;

const focusedStyle = {
  borderColor: 'primary.main'
} as const;

const acceptStyle = {
  borderColor: 'success.main'
} as const;

const rejectStyle = {
  borderColor: 'error.main'
} as const;

const schema = yup.object().shape({
  files: yup.mixed().required('File is required')
});

type FormValues = {
  name: string;
  description: string;
  files: FileList;
};

type Props = {
  onSubmit: (values: FormValues) => void;
};

export const useDialogAddPages = ({ onSubmit }: Props) => {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
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
      <DialogTitle color="primary.main">Add pages to Collection</DialogTitle>
      <form onSubmit={handleSubmit(data => onSubmit(data))} autoComplete="off">
        <DialogContent>
          <DialogContentText>
            You can always add more pages to this Collection later.
          </DialogContentText>
          <Controller
            control={control}
            name="files"
            render={({ field: { onChange, onBlur } }) => (
              <Dropzone
                multiple
                accept={{
                  'image/jpeg': [],
                  'image/png': []
                }}
                onDrop={acceptedFiles => {
                  setValue('files', acceptedFiles as unknown as FileList);
                }}
              >
                {({
                  getRootProps,
                  getInputProps,
                  acceptedFiles,
                  isFocused,
                  isDragAccept,
                  isDragReject
                }) => (
                  <Box>
                    <Box
                      sx={{
                        ...baseStyle,
                        ...(isFocused ? focusedStyle : {}),
                        ...(isDragAccept ? acceptStyle : {}),
                        ...(isDragReject || !!errors.files ? rejectStyle : {})
                      }}
                      {...getRootProps()}
                    >
                      <input
                        {...getInputProps({
                          id: 'input-collection-dropzone-files',
                          onChange,
                          onBlur
                        })}
                      />
                      <Box component="p">
                        Drag and drop some files here, or click to select files
                      </Box>
                      <Box component="em">(Only *.jpeg and *.png images will be accepted)</Box>
                    </Box>
                    <List dense>
                      {acceptedFiles.map((file, i) => (
                        <ListItem key={i}>
                          <ListItemAvatar>
                            <Avatar>
                              <PhotoIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={file.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Dropzone>
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
