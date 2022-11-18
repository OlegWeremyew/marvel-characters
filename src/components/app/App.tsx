import React, { FC, Suspense } from 'react';

import { HashRouter, Route, Routes } from 'react-router-dom';

import { RoutesEnum } from '../../enum';
import AppHeader from '../appHeader/AppHeader';
import { MainPage } from '../pages';
import Spinner from '../spinner/Spinner';

import { ComicsPage, SingleComicPage, Page404 } from './lazyComponents';

const App: FC = () => (
  <Suspense fallback={<Spinner />}>
    <HashRouter>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path={RoutesEnum.MAIN_PAGE} element={<MainPage />} />
            <Route path={RoutesEnum.COMICS} element={<ComicsPage />} />
            <Route path={RoutesEnum.COMICS_INFO} element={<SingleComicPage />} />
            <Route path={RoutesEnum.PAGE_NOT_FOUND} element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  </Suspense>
);

export default App;
