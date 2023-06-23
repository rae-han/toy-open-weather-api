import './App.css'
import Home from "./pages/home.tsx";
import Login from "./pages/login.tsx";
import {useState} from "react";

function App() {
  const [userSection, setUserSection] = useState(() => localStorage.getItem('user-section'));

  return (
    <>
      {userSection || userSection !== '' ? <Home setUserSection={setUserSection} /> : <Login setUserSection={setUserSection} />}
    </>
  )
}

export default App
