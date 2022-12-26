import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams();
  const { data, isLoading } = useGetTranscriptionQuery(id, {
    refetchOnMountOrArgChange: true
  });
  const [updateTranscription] = useUpdateTranscriptionMutation();
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const save = async () => {
    // TODO: useImperativeHandle: https://stackoverflow.com/a/37950970/3751473
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
