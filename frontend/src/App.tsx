import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import useAccessToken from "./hooks/useAccessToken";
import useAddFoodSpot from "./hooks/useAddFoodSpot";
import HomePage from "./components/HomePage";
import Header from "./components/header/Header";
import LoginPage from "./components/user/LoginPage";
import RegisterPage from "./components/user/RegisterPage";
import ProtectedRoutes from "./components/user/ProtectedRoutes";
import useUser from "./hooks/useUser";

export default function App() {
    useEffect(() => getUsername,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])
    const {token} = useAccessToken()
    const {addFoodSpot} = useAddFoodSpot()
    const {user, getUsername} = useUser()
    return (
        <div>
            <Routes>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path="/" element={<>
                        <Header/>
                        <HomePage handleSaveSpot={addFoodSpot} token={token}/>
                    </>
                    }
                    />
                </Route>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </div>
    )
}