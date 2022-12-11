import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useGetResourceByIdQuery } from '../../app/services/api';
import Viewer from '../../common/components/Viewer/Viewer';
import Transcriptions from './components/Transcriptions';
import { Annotation } from '../../app/definitions/types';

const Transcription = () => {
  const { data } = useGetResourceByIdQuery('6555de96-6572-43a5-afaf-93c8cb04f8cb');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const save = () => {
    // TODO
  };

  return (
    <Grid container direction="row" sx={{ flex: 1, overflow: 'auto' }}>
      <Grid item xs={8}>
        {data && <Viewer resource={data} setAnnotations={setAnnotations} />}
      </Grid>
      <Grid item xs={4} sx={{ maxHeight: '100%', overflow: 'auto' }}>
        {data && <Transcriptions resource={data} setAnnotations={setAnnotations} />}
      </Grid>
    </Grid>
  );
};

export default Transcription;
