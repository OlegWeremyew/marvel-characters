import { FC } from 'react';

import { Link } from 'react-router-dom';

import { ErrorMessage } from '../../errorMessage';
import './404.scss';

export const Page404: FC = () => (
  <div>
    <ErrorMessage />
    <p className="title">This page does not exist</p>
    <Link className="link" to="/">
      Back to the main page
    </Link>
  </div>
);
