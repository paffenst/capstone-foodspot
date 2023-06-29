import React from 'react';
import useAccessToken from "./hooks/useAccessToken";
import useAddFoodSpot from "./hooks/useAddFoodSpot";
import HomePage from "./components/HomePage";
import {Route, Routes} from 'react-router-dom';
import Header from "./components/header/Header";
import LoginPage from "./components/user/LoginPage";
import RegisterPage from "./components/user/RegisterPage";

export default function App() {
    const {token} = useAccessToken()
    const {addFoodSpot} = useAddFoodSpot()
    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<>
                        <Header/>
                        <HomePage handleSaveSpot={addFoodSpot} token={token}/>
                    </>
                    }
                    />
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </div>
        </div>
    )
}