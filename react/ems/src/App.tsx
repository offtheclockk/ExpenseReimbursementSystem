import { useState } from "react";
import "./App.css";
import UserPage from "./components/User";
import LoginPage from "./components/LoginPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
