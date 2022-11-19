import { FC } from 'react';

import { Helmet } from 'react-helmet';

import { AppBanner, ComicsList } from 'components';

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
