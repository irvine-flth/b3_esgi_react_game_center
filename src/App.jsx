import {useEffect, useState} from 'react'
import {Route, Routes, useLocation, useNavigate, useRoutes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from "./pages/HomePage.jsx";
import TicTacToePage from "./pages/TicTacToePage.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import MemoryGamePage from "./pages/MemoryGamePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/tictactoe" element={<TicTacToePage />} />
      <Route path="/memorygame" element={<MemoryGamePage />} />
    </Routes>
  )
}
