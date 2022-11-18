import {FC} from "react";
import {IComics} from "../../../types";
import {ICharInfoView} from "./types";

export const charInfoView: FC<ICharInfoView> = ({data}) => {
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
        {comics.map((comic: IComics, index: number) => {
          if (index > 9) {
            return;
          }

          return (
            <li key={`${index}. ${comic.name}`} className="char__comics-item">
              {comic.name}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default charInfoView