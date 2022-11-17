import {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const ComicsList: FC = () => {
  const [comicsList, setComicsList] = useState<any[]>([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnd, setComicsEnd] = useState(false);


  const {loading, error, getComics} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, [])

  const onRequest = (offset: number, initial: boolean = false) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true); //если initial = true, то загрузка первичная и setNewItemsLoading(false) должно остатьс в false

    getComics(offset)
      .then(onComicsListLoaded)
  }

  const onComicsListLoaded = (newList: any) => {
    let end = false;
    if (newList.length < 8) {
      end = true;
    }
    setComicsList([...comicsList, ...newList]);
    setNewItemsLoading(false);
    setOffset(offset + 8);
    setComicsEnd(end);
  }

  const renderComics = (arr: any) => {
    const comics = arr.map((obj: any, i: number) => {

      return (
        <li key={obj.id} className="comics__item">
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
        className="button button__main button__long"
        disabled={newItemsLoading}
        style={{'display': comicsEnd ? 'none' : 'block'}}
        onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList;

