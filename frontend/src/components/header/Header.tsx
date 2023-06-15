import React from 'react'
import "./../../CSS/header.css"
import {AppBar, Toolbar, Button} from '@mui/material';

export default function Header() {

    const handleLogin = () => {
    };

    const handleRegister = () => {
    };
    return (
        <AppBar position="static">
            <Toolbar className={"Toolbar"}>
                <div style={{ flexGrow: 10 }}>
                    <span>Food-Spot-App - Logo</span>
                </div>
                <div>
                    <Button style={{height: "50%", backgroundColor: "blue", color: "white"}} variant="contained" onClick={handleLogin}>
                        Login
                    </Button>
                    <Button style={{height: "50%", backgroundColor: "green", color: "white"}} variant="contained" onClick={handleRegister}>
                        Register
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}