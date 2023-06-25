import React from 'react';
import useAccessToken from "./hooks/useAccessToken";
import HomePage from "./components/HomePage";
import {Route, Routes} from 'react-router-dom';
import Header from "./components/header/Header";
import LoginPage from "./components/user/LoginPage";
import RegisterPage from "./components/user/RegisterPage";
import UserSpotPage from "./components/user/UserSpotsPage";

export default function App() {
    const {token} = useAccessToken()
    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<>
                        <Header/>
                        <HomePage token={token}/>
                    </>
                    }
                    />
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/userspots" element={<UserSpotPage/>}/>
                </Routes>
            </div>
        </div>
    )
}