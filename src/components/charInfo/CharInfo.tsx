import {useState, useEffect, FC} from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';
import {ICharacter} from "../../types";
import {ICharInfo} from "./types";
import charInfoView from "./charInfoView/charInfoView";

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
      {setContent(process, charInfoView, character)}
    </div>
  )
}

export default CharInfo;
