export enum ProcessEnum {
  LOADING = 'loading',
  WAITING = 'waiting',
  ERROR = 'error',
  CONFIRMED = 'confirmed',
}

export enum RoutesEnum {
  MAIN_PAGE = '/',
  COMICS = '/comics',
  COMICS_INFO = '/comics/:comicId',
  PAGE_NOT_FOUND = '*',
}
