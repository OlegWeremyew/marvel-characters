import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import * as React from "react";
import {ComponentType} from "react";


const setContent = (process: string, Component: string | ComponentType<any>, data: any) => {
  switch (process) {
    case 'waiting':
      return <Skeleton/>;
    case 'loading':
      return <Spinner/>;
    case 'confirmed':
      return <Component data={data}/>;
    case 'error':
      return <ErrorMessage/>;
    default:
      throw new Error('Unexpected process state');
  }
}

export default setContent;
