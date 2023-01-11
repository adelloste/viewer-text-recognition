import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import {
  useGetTranscriptionQuery,
  useUpdateTranscriptionMutation
} from '../api/split/transcription';
import { useAppDispatch, useAppSelector } from '../../common/hooks/useApp';
import { updateSegmentations, updateAnnotations, deleteAnnotation } from './transcriptionSlice';
import MainLayout from '../../common/components/MainLayout/MainLayout';
import Viewer from '../../common/components/Viewer/Viewer';
import Transcriptions from './components/Transcriptions';
import EditorOverlay from './components/EditorOverlay';
import { Resource, Annotation } from '../../definitions/types';
import { drawerWidth, delay } from '../../common/constants';
import { enqueueSnackbar } from '../../appSlice';

type Props = {
  id: string | undefined;
  data: Resource;
};

const Page = ({ id, data }: Props) => {
  const dispatch = useAppDispatch();
  const annotations = useAppSelector(store => store.transcription.annotations);
  const deletedAnnotation = useAppSelector(store => store.transcription.deletedAnnotation);
  const [updateTranscription] = useUpdateTranscriptionMutation();

  const debounceUpdateSegmentations = useDebouncedCallback((id: string, coords: number[]) => {
    dispatch(updateSegmentations({ id, coords }));
  }, delay);

  const debounceUpdateAnnotations = useDebouncedCallback((items: Annotation[]) => {
    dispatch(updateAnnotations(items));
  }, delay);

  const save = async () => {
    void updateTranscription({ id, annotations })
      .unwrap()
      .then(() =>
        dispatch(
          enqueueSnackbar({
            title: 'Success',
            message: 'Saving page was successful',
            options: { severity: 'success' }
          })
        )
      );
  };

  const download = () => {
    // TODO
  };

  const handleDeleteAnnotation = (id: string) => {
    dispatch(deleteAnnotation({ id }));
  };

  const handleUpdateSegmentations = useCallback(
    (id: string, coords: number[]) => {
      debounceUpdateSegmentations(id, coords);
    },
    [debounceUpdateSegmentations]
  );

  const handleUpdateAnnotations = useCallback(
    (items: Annotation[]) => {
      debounceUpdateAnnotations(items);
    },
    [debounceUpdateAnnotations]
  );

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <EditorOverlay save={save} download={download} />
        <Viewer
          resource={data}
          handleDeleteAnnotation={handleDeleteAnnotation}
          handleUpdateSegmentations={handleUpdateSegmentations}
        />
      </Box>
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        <Toolbar variant="dense" />
        <Transcriptions
          resource={data}
          deletedAnnotation={deletedAnnotation}
          handleUpdateAnnotations={handleUpdateAnnotations}
        />
      </Drawer>
    </Box>
  );
};

const Transcription = () => {
  const { id } = useParams();
  const { currentData, isLoading } = useGetTranscriptionQuery(id);

  return (
    <MainLayout isLoading={isLoading}>
      {currentData && <Page id={id} data={currentData} />}
    </MainLayout>
  );
};

export default Transcription;
