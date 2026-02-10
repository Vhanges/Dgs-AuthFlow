import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { RouteComponents } from "./routes/routes";
function App() {
  return (
    <>
      <Router>
        <Routes>{RouteComponents}</Routes>
      </Router>
    </>
  );
}

export default App;
