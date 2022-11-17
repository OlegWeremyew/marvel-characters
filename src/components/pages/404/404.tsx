import ErrorMessage from "../../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";
import {FC} from "react";
import './404.scss'

const Page404: FC = () => (
  <div>
    <ErrorMessage/>
    <p className="title">
      This page doesn't exist
    </p>
    <Link className="link" to="/">
      Back to the main page
    </Link>
  </div>
)

export default Page404;
