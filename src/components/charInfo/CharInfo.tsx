import { useState, useEffect, FC } from 'react';

import useMarvelService from '../../services/MarvelService';
import { ICharacter } from '../../types';
import setContent from '../../utils/setContent';

import './charInfo.scss';

import charInfoView from './charInfoView/charInfoView';
import { ICharInfo } from './types';

const CharInfo: FC<ICharInfo> = ({ charId }) => {
  const [character, setCharacter] = useState<ICharacter>({} as ICharacter);

  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  const onCharLoaded = (characterInfo: ICharacter) => {
    setCharacter(characterInfo);
  };

  const updateChar = () => {
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  useEffect(() => {
    updateChar();
  }, [charId]);

  return <div className="char__info">{setContent(process, charInfoView, character)}</div>;
};

export default CharInfo;
