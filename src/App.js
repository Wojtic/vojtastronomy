import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Page from "./components/Page";
import filenames from "./files/names.json";

function App() {
  const [ENGLISH, setENGLISH] = useState(false);

  return (
    <Router>
      <Routes>
        {filenames.map((page) => {
          return (
            <Route
              path={"/" + page.path}
              element={<Page name={page.filename} english={ENGLISH} />}
            />
          );
        })}
        <Route
          path="/"
          element={<Page name={"Home (web)"} english={ENGLISH} />}
        ></Route>
        <Route path="*" element={<p>404</p>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
