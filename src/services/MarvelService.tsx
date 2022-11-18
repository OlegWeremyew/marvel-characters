import {useHttp} from "../hooks/http.hook";
import {ICharacterFull, IComicsFull, Undetectable} from "../types";
import {_baseOffset} from "../constants";

const _apiBase = process.env.REACT_APP_BASE_URL
const _apiKey = process.env.REACT_APP_API_KEY


const useMarvelService = () => {
  const {loading, request, error, clearError, process, setProcess} = useHttp();

  const getAllCharacters = async (offset: number = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter)
  }

  const getCharacter = async (id: number) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  }

  const _transformCharacter = (character: ICharacterFull) => {
    return {
      id: character.id,
      name: character.name,
      description: character.description ? `${character.description.slice(0, 210)}...` : 'There`s no description for this character',
      thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items,
    }
  }

  const getComics = async (offset: number = 0) => {
    const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`)
    return res.data.results.map(_transformComics)
  }

  const getComic = async (id: Undetectable<string>) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  }

  const _transformComics = (comics: IComicsFull) => {
    return {
      id: comics.id,
      name: comics.title,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the number of pages',
      price: comics.prices[0].price === 0 ? 'Not available' : comics.prices[0].price + '$',
      image: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects.language || 'en-us',
    }
  }

  return {
    loading,
    error,
    clearError,
    process,
    setProcess,
    getAllCharacters,
    getCharacter,
    getComics,
    getComic
  };
}

export default useMarvelService;
