import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import ItemCRUD from "./Components/ItemCRUD";
import UserData from "./Components/UserData";

function App() {
  return (
    <div>
      <ItemCRUD />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
