import * as React from 'react';

import { ProcessEnum } from 'enum';
import { ICharacter, TypeComponent } from 'types';

import { ErrorMessage, Skeleton, Spinner } from 'components';

export const setContent = (
  process: string,
  Component: TypeComponent,
  data: ICharacter,
) => {
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
