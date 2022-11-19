import { baseOffset } from '../constants';
import { useHttp } from 'hooks';
import { ICharacterFull, IComicsFull, Undetectable } from 'types';

const apiBase = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const useMarvelService = () => {
  const { loading, request, error, clearError, process, setProcess } = useHttp();

  const transformCharacter = (character: ICharacterFull) => ({
    id: character.id,
    name: character.name,
    description: character.description
      ? `${character.description.slice(0, 210)}...`
      : 'There`s no description for this character',
    thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    homepage: character.urls[0].url,
    wiki: character.urls[1].url,
    comics: character.comics.items,
  });

  const getAllCharacters = async (offset: number = baseOffset) => {
    const res = await request(`${apiBase}characters?limit=9&offset=${offset}&${apiKey}`);
    return res.data.results.map(transformCharacter);
  };

  const getCharacter = async (id: number) => {
    const res = await request(`${apiBase}characters/${id}?${apiKey}`);

    return transformCharacter(res.data.results[0]);
  };

  const transformComics = (comics: IComicsFull) => ({
    id: comics.id,
    name: comics.title,
    description: comics.description || 'There is no description',
    pageCount: comics.pageCount
      ? `${comics.pageCount} pages`
      : 'No information about the number of pages',
    price: comics.prices[0].price === 0 ? 'Not available' : `${comics.prices[0].price}$`,
    image: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
    language: comics.textObjects.language || 'en-us',
  });

  const getComics = async (offset: number = 0) => {
    const res = await request(
      `${apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${apiKey}`,
    );
    return res.data.results.map(transformComics);
  };

  const getComic = async (id: Undetectable<string>) => {
    const res = await request(`${apiBase}comics/${id}?${apiKey}`);
    return transformComics(res.data.results[0]);
  };

  return {
    loading,
    error,
    clearError,
    process,
    setProcess,
    getAllCharacters,
    getCharacter,
    getComics,
    getComic,
  };
};
