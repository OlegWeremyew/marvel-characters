import {useState, useEffect, FC} from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';
import {ICharacter, IComics, Nullable} from "../../types";

interface ICharInfo {
  charId: Nullable<number>
}

interface IView {
  data: ICharacter
}

const CharInfo: FC<ICharInfo> = ({charId}) => {
  const [character, setCharacter] = useState<ICharacter>({} as ICharacter);

  const {getCharacter, clearError, process, setProcess} = useMarvelService();
  //в зависимости от process будут рендерится разные кусочки интерфейса: заглушка, загрузка, ошибка или контент

  useEffect(() => {
    updateChar();
  }, [charId])

  const updateChar = () => {
    if (!charId) {
      return;
    }

    clearError(); //если появилась ошибка, она очистится перед новым запросом
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed')); // состояние "подтвержденного" запроса. только когда данные уже установятся в стейт, можем передать, что в компоненте все ок, данные "подтверждены", тк действия асинхронные
  }

  const onCharLoaded = (character: ICharacter) => {
    setCharacter(character);
  }

  return (
    <div className="char__info">
      {setContent(process, View, character)}
    </div>
  )
}


const View: FC<IView> = ({data}) => {
  const {name, description, thumbnail, homepage, wiki, comics} = data;
  const notAvailableImg = thumbnail.includes('image_not_available');

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={{objectFit: notAvailableImg ? 'contain' : 'cover'}}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There`s no comics with this character.'}
        {
          comics.map((item: IComics, index: number) => {
            if (index > 9) {
              return;
            }

            return (
              <li key={index} className="char__comics-item">
                {item.name}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default CharInfo;
