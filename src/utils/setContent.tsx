import * as React from 'react';

import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';
import Spinner from '../components/spinner/Spinner';
import { ProcessEnum } from '../enum';
import { ICharacter, TypeComponent } from '../types';

const setContent = (process: string, Component: TypeComponent, data: ICharacter) => {
  switch (process) {
    case ProcessEnum.WAITING:
      return <Skeleton />;
    case ProcessEnum.LOADING:
      return <Spinner />;
    case ProcessEnum.CONFIRMED:
      return <Component data={data} />;
    case ProcessEnum.ERROR:
      return <ErrorMessage />;
    default:
      throw new Error('Unexpected process state');
  }
};

export default setContent;
