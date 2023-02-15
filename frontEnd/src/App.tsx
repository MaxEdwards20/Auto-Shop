import { BrowserRouter } from "react-router-dom";
import Router from "./Components/Router";
import NavBar from "./Components/Navbar";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <NavBar props={isAuthenticated} />
      <Router></Router>
    </BrowserRouter>
  );
}

export default App;
