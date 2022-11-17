import React, {FC, Suspense} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import {MainPage, ComicsPage, Page404, SingleComicPage} from "../pages";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const App: FC = () => (
  <Suspense fallback={<Spinner/>}>
    <HashRouter>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/comics" element={<ComicsPage/>}/>
            <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </main>
      </div>
    </HashRouter>
  </Suspense>
)

export default App;