import { FC, useState } from 'react';

import { Helmet } from 'react-helmet';

import { CharInfo, CharList, RandomChar } from 'components';
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';

import decoration from 'resources/img/vision.png';
import { Nullable } from 'types';

export const MainPage: FC = () => {
  const [selectedChar, setChar] = useState<Nullable<number>>(null);

  const onCharSelected = (id: number) => {
    setChar(id);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} charId={selectedChar} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo charId={selectedChar} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};
