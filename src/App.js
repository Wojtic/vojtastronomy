import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Page from "./components/Page";

const filenames = [
  { path: "Home", filename: "Home (web)" },
  { path: "Mlok", filename: "Mlok (web)" },
];

function App() {
  const [ENGLISH, setENGLISH] = useState(false);
  const [pages, setPages] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<p>test</p>}></Route>
        {filenames.map((page) => {
          return (
            <Route
              key={page.path}
              path={"/" + page.path}
              element={<Page name={page.filename} english={ENGLISH} />}
            ></Route>
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
