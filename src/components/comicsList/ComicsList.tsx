import { FC, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useMarvelService } from 'services';

import './comicsList.scss';
import { ErrorMessage, Spinner } from 'components';
import { TypeComicsList } from 'types';

export const ComicsList: FC = () => {
  const [comicsList, setComicsList] = useState<TypeComicsList[]>([] as TypeComicsList[]);
  const [newItemsLoading, setNewItemsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [comicsEnd, setComicsEnd] = useState<boolean>(false);

  const { loading, error, getComics } = useMarvelService();

  const onComicsListLoaded = (newList: TypeComicsList[]) => {
    let end = false;
    const comicsSize = 8;

    if (newList.length < comicsSize) {
      end = true;
    }

    setComicsList([...comicsList, ...newList]);
    setNewItemsLoading(false);

    const howMuchWillBeAddedComics = 8;
    setOffset(offset + howMuchWillBeAddedComics);
    setComicsEnd(end);
  };

  const renderComics = (arr: TypeComicsList[]) => {
    const comics = arr.map((comic: TypeComicsList, index: number) => (
      <li key={`${comic.id}${index}`} className="comics__item">
        <Link to={`/comics/${comic.id}`}>
          <img src={comic.image} alt="ultimate war" className="comics__item-img" />
          <div className="comics__item-name">{comic.name.toUpperCase()}</div>
          <div className="comics__item-price">{comic.price}</div>
        </Link>
      </li>
    ));

    return <ul className="comics__grid">{comics}</ul>;
  };

  const items = renderComics(comicsList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemsLoading ? <Spinner /> : null;

  const onRequest = (offsetValue: number, initial: boolean = false) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

    getComics(offsetValue).then(onComicsListLoaded);
  };

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  return (
    <div className="comics__list">
      {items}
      {spinner}
      {errorMessage}
      <button
        type="button"
        className="button button__main button__long"
        disabled={newItemsLoading}
        style={{ display: comicsEnd ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};
