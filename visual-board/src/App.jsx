import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home.jsx";
import Stock from "./components/Stock.jsx";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock" element={<Stock />} />
      </Routes>
    </Fragment>
  );
}

export default App;
