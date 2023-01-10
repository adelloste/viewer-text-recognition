import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Annotation, Resource } from '../../../definitions/types';

type Props = {
  resource: Resource;
  deletedAnnotation?: Annotation;
  handleUpdateAnnotations: (data: Annotation[]) => void;
};

const Transcriptions = ({ resource, deletedAnnotation, handleUpdateAnnotations }: Props) => {
  const { control, getValues, watch } = useForm({
    defaultValues: {
      annotations: [...resource.annotations]
    }
  });
  const { fields, remove } = useFieldArray({
    control,
    name: 'annotations'
  });

  useEffect(() => {
    const subscription = watch(() => {
      const formValues = getValues().annotations;
      handleUpdateAnnotations(formValues);
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues, handleUpdateAnnotations]);

  useEffect(() => {
    if (deletedAnnotation) {
      const index = getValues().annotations.findIndex(a => a.id === deletedAnnotation.id);
      remove(index);
    }
  }, [deletedAnnotation, getValues, remove]);

  return (
    <Box component="form" noValidate autoComplete="off">
      <List sx={{ width: '100%' }} subheader={<ListSubheader>Transcriptions</ListSubheader>}>
        {fields.map((item, index) => (
          <ListItem key={item.id}>
            <Controller
              name={`annotations.${index}.transcription`}
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`segmentation-${resource.annotations[index].id}`}
                  label=""
                  variant="outlined"
                  {...field}
                />
              )}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Transcriptions;
