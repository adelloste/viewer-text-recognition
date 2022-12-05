import React from 'react';
import { useGetResourceByIdQuery } from '../../app/services/api';
import Viewer from '../../common/components/Viewer/Viewer';

import Grid from '@mui/material/Grid';

const Transcript = () => {
  const { data } = useGetResourceByIdQuery('6555de96-6572-43a5-afaf-93c8cb04f8cb');

  return (
    <Grid container direction="row" sx={{ height: '100vh' }}>
      <Grid item xs={8}>
        {data && <Viewer resource={data} />}
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );
};

export default Transcript;
