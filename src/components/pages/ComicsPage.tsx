import {Helmet} from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import {FC} from "react";

const ComicsPage: FC = () => (
  <>
    <Helmet>
      <meta
        name="description"
        content="Page with the list of comics"
      />
      <title>Comics page</title>
    </Helmet>
    <AppBanner/>
    <ComicsList/>
  </>
)

export default ComicsPage;
