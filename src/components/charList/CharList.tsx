import { useState, useEffect, useRef, FC } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';

import './charList.scss';
import { ICharacterFull, Nullable } from '../../types';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import { ICharList } from './types';

const CharList: FC<ICharList> = ({ charId, onCharSelected }) => {
  const [charList, setCharList] = useState<ICharacterFull[]>([] as ICharacterFull[]);
  const [newItemsLoading, setNewItemsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(210);
  const [charListEnd, setCharListEnd] = useState<boolean>(false);
  const [selected, setSelected] = useState<Nullable<number>>(null); // для активного стиля

  const { loading, error, getAllCharacters } = useMarvelService();

  const onCharLoaded = (newCharList: ICharacterFull[]) => {
    let end = false;
    const charsSize = 9;

    if (newCharList.length < charsSize) {
      end = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setNewItemsLoading(newItemsLoading => false);

    const howManyCharsToAdd = 9;

    setOffset(offsetValue => offsetValue + howManyCharsToAdd);
    setCharListEnd(charListEnd => end);
  };

  const onRequest = (offsetValue: number, initial: boolean = false) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

    getAllCharacters(offsetValue).then(onCharLoaded);
  };

  const handleClick = () => {
    setSelected(selected => charId);
  };

  const itemRefs = useRef<any[]>([]);

  const focusOnItem = (id: number) => {
    itemRefs.current.forEach((item: any) => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  };

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  function renderCharacters(arr: ICharacterFull[]) {
    const characters = arr.map((character: ICharacterFull, index: number) => (
      <CSSTransition key={character.id} timeout={500} classNames="char__item">
        <li
          className="char__item"
          tabIndex={0}
          ref={el => (itemRefs.current[index] = el)}
          onClick={() => {
            handleClick();
            onCharSelected(character.id);
            focusOnItem(index);
          }}
          onKeyPress={event => {
            if (event.key === ' ' || event.key === 'Enter') {
              onCharSelected(character.id);
              focusOnItem(index);
            }
          }}
        >
          <img
            src={character.thumbnail}
            alt={character.name}
            style={{
              objectFit: character.thumbnail.includes('image_not_available')
                ? 'cover'
                : 'unset',
            }}
          />
          <div className="char__name">{character.name}</div>
        </li>
      </CSSTransition>
    ));

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{characters}</TransitionGroup>
      </ul> // Для центровки спиннера/ошибки
    );
  }

  const items = renderCharacters(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemsLoading ? <Spinner /> : null; // если есть загрузка, но это не загрузка новых персонажей

  return (
    <div className="char__list">
      {items}
      {spinner}
      {errorMessage}
      <button
        type="button"
        className="button button__main button__long"
        disabled={newItemsLoading}
        style={{
          display: charListEnd ? 'none' : 'block',
        }}
        onClick={() => {
          onRequest(offset);
        }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
