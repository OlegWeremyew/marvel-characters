import { useState, useEffect, FC } from 'react';

import useMarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { ICharacter } from '../../types';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import Character from './character/Character';

const RandomChar: FC = () => {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  const onCharLoaded = (characterInfo: ICharacter) => {
    setCharacter(characterInfo);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); //  * (max - min) + min

    getCharacter(id).then(onCharLoaded);
  };

  const content =
    !loading && !error && character ? <Character character={character} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  useEffect(() => {
    updateChar();
  }, []);

  return (
    <div className="randomchar">
      {content}
      {spinner}
      {errorMessage}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button type="button" onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

export default RandomChar;
