import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import {
  useGetTranscriptionQuery,
  useUpdateTranscriptionMutation
} from '../../app/services/split/transcription';
import { Annotation } from '../../app/definitions/types';
import MainLayout from '../../common/components/MainLayout/MainLayout';
import Viewer from '../../common/components/Viewer/Viewer';
import Transcriptions from './components/Transcriptions';
import EditorOverlay from './components/EditorOverlay';

const Transcription = () => {
  const { data, isLoading } = useGetTranscriptionQuery('6555de96-6572-43a5-afaf-93c8cb04f8cb', {
    refetchOnMountOrArgChange: true
  });
  const [updateTranscription] = useUpdateTranscriptionMutation();
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const save = async () => {
    // TODO: catch error
    await updateTranscription({ id: '6555de96-6572-43a5-afaf-93c8cb04f8cb', annotations });
  };

  const download = () => {
    // TODO
  };

  return (
    <MainLayout isLoading={isLoading}>
      {data && (
        <Grid container direction="row" sx={{ flex: 1, overflow: 'auto' }}>
          <Grid item xs={8} sx={{ position: 'relative' }}>
            <EditorOverlay save={save} download={download} />
            <Viewer resource={data} setAnnotations={setAnnotations} />
          </Grid>
          <Grid item xs={4} sx={{ maxHeight: '100%', overflow: 'auto' }}>
            <Transcriptions resource={data} setAnnotations={setAnnotations} />
          </Grid>
        </Grid>
      )}
    </MainLayout>
  );
};

export default Transcription;
