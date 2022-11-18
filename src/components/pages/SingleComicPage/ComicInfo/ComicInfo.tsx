import { FC } from 'react';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { RoutesEnum } from '../../../../enum';

import { IView } from './types';

const ComicInfo: FC<IView> = ({ comic }) => {
  const { name, description, pageCount, image, price, language } = comic;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${name} comics book`} />
        <title>{name}</title>
      </Helmet>
      <img src={image} alt={name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to={RoutesEnum.COMICS} className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default ComicInfo;
