import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";
import {FC} from "react";

const Page404: FC = () => (
  <div>
    <ErrorMessage/>
    <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>
      This page doesn't exist
    </p>
    <Link
      style={{
        'display': 'block',
        'textAlign': 'center',
        'fontWeight': 'bold',
        'fontSize': '24px',
        'marginTop': '30px'
      }}
      to="/"
    >
      Back to the main page
    </Link>
  </div>
)


export default Page404;
