import React from 'react';
import useAccessToken from "./hooks/useAccessToken";
import HomePage from "./components/HomePage";

export default function App() {
    const {token} = useAccessToken()
    return (
        <h4>
            <HomePage token={token}/>
        </h4>
    )
}