import { FC } from 'react';

import { Helmet } from 'react-helmet';

import { AppBanner } from '../appBanner';
import { ComicsList } from '../comicsList';

export const ComicsPage: FC = () => (
  <>
    <Helmet>
      <meta name="description" content="Page with the list of comics" />
      <title>Comics page</title>
    </Helmet>
    <AppBanner />
    <ComicsList />
  </>
);
