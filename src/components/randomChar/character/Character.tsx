import { FC } from 'react';

import { IView } from './types';

export const Character: FC<IView> = ({ character }) => {
  const { name, description, thumbnail, homepage, wiki } = character;
  const notAvailableImg = thumbnail.includes('image_not_available');

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        style={{ objectFit: notAvailableImg ? 'contain' : 'cover' }}
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Character;
