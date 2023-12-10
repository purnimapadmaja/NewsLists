import React from "react";
import NewsItems from "./Components/NewsItems";
import NewsList from "./Components/NewsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/news/:title" element={<NewsItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
