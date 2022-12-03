import React from 'react';
import { useGetResourceByIdQuery } from '../../app/services/api';
import Viewer from '../../common/components/Viewer/Viewer';

const Editor = () => {
  const { data } = useGetResourceByIdQuery('6555de96-6572-43a5-afaf-93c8cb04f8cb');

  return <React.Fragment>{data && <Viewer resource={data} />}</React.Fragment>;
};

export default Editor;
