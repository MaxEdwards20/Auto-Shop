import { useState } from "react";
import "../App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="card m-2 bg-primary">
      <h1>Welcome to Dan's Shop !</h1>
    </div>
  );
}

export default App;
