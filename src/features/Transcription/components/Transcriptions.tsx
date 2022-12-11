import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Annotation, Resource } from '../../../app/definitions/types';

type Props = {
  resource: Resource;
  setAnnotations: (data: Annotation[]) => void;
};

const Transcriptions = ({ resource, setAnnotations }: Props) => {
  const { control, watch, getValues } = useForm({
    defaultValues: {
      annotations: [...resource.annotations]
    }
  });
  const { fields } = useFieldArray({
    control,
    name: 'annotations'
  });

  useEffect(() => {
    const subscription = watch(() => {
      const annotations = getValues().annotations;
      setAnnotations(annotations);
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues, setAnnotations]);

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
