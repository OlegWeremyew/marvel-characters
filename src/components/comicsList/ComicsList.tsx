import {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {TypeComicsList} from "../../types";

const ComicsList: FC = () => {
  const [comicsList, setComicsList] = useState<TypeComicsList[]>([] as TypeComicsList[]);
  const [newItemsLoading, setNewItemsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [comicsEnd, setComicsEnd] = useState<boolean>(false);

  const {loading, error, getComics} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, [])

  const onRequest = (offset: number, initial: boolean = false) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true); //если initial = true, то загрузка первичная и setNewItemsLoading(false) должно остатьс в false

    getComics(offset)
      .then(onComicsListLoaded)
  }

  const onComicsListLoaded = (newList: TypeComicsList[]) => {
    let end = false;
    if (newList.length < 8) {
      end = true;
    }

    setComicsList([...comicsList, ...newList]);
    setNewItemsLoading(false);

    const howMuchWillBeAddedComics = 8
    setOffset(offset + howMuchWillBeAddedComics);
    setComicsEnd(end);
  }

  const renderComics = (arr: TypeComicsList[]) => {
    const comics = arr.map((obj: TypeComicsList, index: number) => {

      return (
        <li key={`${obj.id}${index}`} className="comics__item">
          <Link to={`/comics/${obj.id}`}>
            <img src={obj.image} alt="ultimate war" className="comics__item-img"/>
            <div className="comics__item-name">{obj.name.toUpperCase()}</div>
            <div className="comics__item-price">{obj.price}</div>
          </Link>
        </li>
      )
    })

    return (
      <ul className="comics__grid">
        {comics}
      </ul>
    )

  }

  const items = renderComics(comicsList);
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemsLoading ? <Spinner/> : null;

  return (
    <div className="comics__list">
      {items}
      {spinner}
      {errorMessage}
      <button
        type='button'
        className="button button__main button__long"
        disabled={newItemsLoading}
        style={{display: comicsEnd ? 'none' : 'block'}}
        onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList;

