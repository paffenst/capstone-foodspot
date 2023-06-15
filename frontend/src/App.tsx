import React from 'react';
import useAccessToken from "./hooks/useAccessToken";
import HomePage from "./components/HomePage";
import Header from "./components/header/Header";

export default function App() {
    const {token} = useAccessToken()
    return (
       <div>
            <Header/>
            <HomePage token={token}/>
       </div>
    )
}