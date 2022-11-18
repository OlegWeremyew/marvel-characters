import { useState, useCallback } from 'react';

import { ProcessEnum } from '../enum';
import { Nullable } from '../types';

import { ProcessType } from './types';

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Nullable<string>>(null);
  const [process, setProcess] = useState<ProcessType>(ProcessEnum.WAITING); // процесс, который будет внутри компонента в опрю момент

  const request = useCallback(
    async (
      url: string,
      method = 'GET',
      body = null,
      headers = { 'Content-Type': 'application/json' },
    ) => {
      setLoading(true); // перед отправкой запроса загрузка ставится в true
      setProcess(ProcessEnum.LOADING); // процесс переходит в состояние загрузки

      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Can not fetch ${url}, status : ${response.status}`);
        }

        const data = await response.json(); // в проекте работа только с json

        setLoading(false);

        return data; // загрузка завершается и, если всё ок, возвращаются "чистые" данные (не из MarvelService) от API
      } catch (err: any) {
        setLoading(false);
        setError(err.message);
        setProcess(ProcessEnum.ERROR); // состояние ошибки
        throw err;
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setError(null);
    setProcess(ProcessEnum.LOADING);
  }, []); // уберет ошибку, которая может появиться из-за отсутствия id персонажа на сервере, чтобы компонент загружал новых

  return { loading, request, error, clearError, process, setProcess };
};
