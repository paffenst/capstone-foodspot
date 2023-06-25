import React from 'react';
import {AppBar, Button, Toolbar} from '@mui/material'
import {useNavigate} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate()

    function onClickRegisterHandler() {
        navigate("/register");
    }

    function onClickLoginHandler() {
        navigate("/login");
    }

    return (
        <AppBar position="static">
            <Toolbar className="Toolbar">
                <div style={{flexGrow: 10}}>
                    <span>Food-Spot-App - Logo</span>
                </div>
                <div>
                    <Button onClick={onClickLoginHandler}
                            style={{height: '50%', backgroundColor: 'blue', color: 'white'}}
                            variant="contained">
                        Login
                    </Button>
                </div>
                <div>
                    <Button onClick={onClickRegisterHandler}
                            style={{height: '50%', backgroundColor: 'green', color: 'white'}}
                            variant="contained">
                        Register
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}