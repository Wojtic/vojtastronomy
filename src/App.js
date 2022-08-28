import { useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Page from "./components/Page";
import filenames from "./files/names.json";

function App() {
  const [ENGLISH, setENGLISH] = useState(false);

  return (
    <>
      <input type="checkbox" onClick={() => setENGLISH(!ENGLISH)} />
      English?
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
          <Route
            path="*"
            element={
              <>
                <br />
                <Link to="/Home">Home</Link>
                <p>404</p>
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
