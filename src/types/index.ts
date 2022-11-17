export interface IComics {
  resourceURI: string
  name: string
}

export interface ICharacter {
  comics: IComics[]
  description: string
  homepage: string
  id: number
  name: string
  thumbnail: string
  wiki: string
}

export type TypeComicsList = {
  description: string,
  id: number,
  image: string
  language: string
  name: string,
  pageCount: string,
  price: string,
}

