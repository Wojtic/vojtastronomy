import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Page from "./components/Page";

const filenames = [
  { path: "Home", filename: "Home (web)" },
  { path: "Mlok", filename: "Mlok (web)" },
];

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
        <Route path="/" element={<p>test</p>}></Route>
        <Route path="*" element={<p>404</p>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
