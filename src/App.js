import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home, Navbar, SearchNews, Footer, NewsDetail } from "./components";

const App = () => {
  return (
    <>
      <div className="bg-main-blue px-[70px] md-[100px] lg:px-[165px]">
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/:id" element={<NewsDetail/>}/>
          <Route path="/search/:searchQuery" element={<SearchNews/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
