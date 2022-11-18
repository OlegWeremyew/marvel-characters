import { ComponentType, ReactElement } from 'react';

export interface IComics {
  resourceURI: string;
  name: string;
}

export interface ICharacter {
  comics: IComics[];
  description: string;
  homepage: string;
  id: number;
  name: string;
  thumbnail: any;
  wiki: string;
}

export type ComicsType = {
  available: number;
  collectionURI: string;
  items: IComics[];
  returned: number;
};

export interface ICharacterFull {
  comics: ComicsType;
  description: string | null;
  events: ComicsType;
  id: number;
  modified: string;
  name: string;
  resourceURI: string;
  series: ComicsType;
  stories: ComicsType;
  thumbnail: TypeThumbnail | any;
  urls: UrlsArray[];
}

export type TypeThumbnail = {
  path: string;
  extension: string;
};

export type TypeComicsList = {
  description: string | null;
  id: number;
  image: string;
  language: string;
  name: string;
  pageCount: string;
  price: string;
};

export type UrlsArray = {
  type: string;
  url: string;
};

export interface IComicsFull {
  characters: ComicsType;
  collectedIssues: any[];
  collections: any[];
  creators: ComicsType;
  dates: DateType[];
  description: null | string;
  diamondCode: string;
  digitalId: number;
  ean: string;
  events: ComicsType;
  format: string;
  id: number;
  images: any[];
  isbn: string;
  issn: string;
  issueNumber: number;
  modified: string;
  pageCount: number;
  prices: TypePrice[];
  resourceURI: string;
  series: IComics;
  stories: ComicsType;
  textObjects: any[] | any;
  thumbnail: TypeThumbnail;
  title: string;
  upc: string;
  urls: UrlsArray[];
  variantDescription: string;
  variants: any[];
}

export type DateType = {
  type: string;
  date: string;
};

export type TypePrice = {
  type: string;
  price: number;
};

export type TypeComponent = string | ComponentType<any>;

export type Nullable<T> = T | null;

export type Undetectable<T> = T | undefined;

export type ReturnComponentType = Nullable<ReactElement>;
