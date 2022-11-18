import { lazy } from 'react';

export const ComicsPage = lazy(() =>
  import('../pages').then(tm => ({
    default: tm.ComicsPage,
  })),
);

export const SingleComicPage = lazy(() =>
  import('../pages').then(tm => ({
    default: tm.SingleComicPage,
  })),
);

export const Page404 = lazy(() =>
  import('../pages').then(tm => ({
    default: tm.Page404,
  })),
);
