import { useState, useEffect, FC } from 'react';

import { useMarvelService } from 'services';
import { ICharacter } from 'types';
import { setContent } from 'utils';

import './charInfo.scss';

import { charInfoView } from './charInfoView';
import { ICharInfo } from './types';

export const CharInfo: FC<ICharInfo> = ({ charId }) => {
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
