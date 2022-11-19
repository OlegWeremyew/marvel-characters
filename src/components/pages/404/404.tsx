import { FC } from 'react';

import { Link } from 'react-router-dom';

import { ErrorMessage } from 'components/errorMessage';
import './404.scss';
import { RoutesEnum } from 'enum/index';

export const Page404: FC = () => (
  <div>
    <ErrorMessage />
    <p className="title">This page does not exist</p>
    <Link className="link" to={RoutesEnum.MAIN_PAGE}>
      Back to the main page
    </Link>
  </div>
);
