import img from './error.gif'
import {FC} from "react";

const ErrorMessage: FC = () => (
  <img
    className="image"
    src={img}
    alt="Error"
  />
)

export default ErrorMessage;
