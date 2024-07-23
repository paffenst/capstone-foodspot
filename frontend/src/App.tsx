import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import useAccessToken from "./hooks/useAccessToken";
import useAddFoodSpot from "./hooks/useAddFoodSpot";
import HomePage from "./components/HomePage";
import Header from "./components/header/Header";
import LoginPage from "./components/user/LoginPage";
import RegisterPage from "./components/user/RegisterPage";
import useUser from "./hooks/useUser";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function App() {
    const {token} = useAccessToken();
    const {addFoodSpot} = useAddFoodSpot();
    const {user, loggedInUser, loginUser} = useUser();

    return (
        <div>
            <Routes>
                <Route path="/login" element={<LoginPage loggedInUser={loggedInUser} handleLoginRequest={loginUser}/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route
                    path="/"
                    element={
                        user ? (
                            <>
                                <Header/>
                                <HomePage handleSaveSpot={addFoodSpot} token={token}/>
                            </>
                        ) : (
                            <Navigate to="/login" replace={true}/>
                        )
                    }
                />
            </Routes>
        </div>
    );
}
