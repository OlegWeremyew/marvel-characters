import { useState, useEffect, FC } from 'react';

import { useParams } from 'react-router-dom';

import { useMarvelService } from '../../../services';
import { ErrorMessage } from '../../errorMessage';
import { Spinner } from '../../spinner';

import './singleComicPage.scss';
import { TypeComicsList } from '../../../types';

import { ComicInfo } from './ComicInfo';

const SingleComicPage: FC = () => {
  const { comicId } = useParams(); // приходит из url
  const [comic, setComic] = useState<TypeComicsList>({} as TypeComicsList); // comic - объект со всеми данными о комиксЕ
  const { loading, error, getComic, clearError } = useMarvelService();

  const onComicLoaded = (comic: TypeComicsList) => {
    setComic(comic);
  };

  const updateComic = () => {
    clearError(); // если появилась ошибка, она очистится перед новым запросом
    getComic(comicId).then(onComicLoaded);
  };

  const content = !loading && !error && comic ? <ComicInfo comic={comic} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  useEffect(() => {
    updateComic();
  }, [comicId]);

  return (
    <>
      {content}
      {spinner}
      {errorMessage}
    </>
  );
};

export default SingleComicPage;
