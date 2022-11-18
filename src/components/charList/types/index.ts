import { Nullable } from '../../../types';

export interface ICharList {
  charId: Nullable<number>;
  onCharSelected: (id: number) => void;
}
