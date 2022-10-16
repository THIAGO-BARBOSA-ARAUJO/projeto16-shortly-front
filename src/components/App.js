import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react';
import Homepage from "./home/Homepage";
import Login from "./login/Login";
import Register from "./register/Register";
import Ranking from "./ranking/Ranking";

export default function App() {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/ranking" element={<Ranking />} />
            </Routes>
        </BrowserRouter>
    )
}