import React from 'react';
import {AppBar, Button, Toolbar} from '@mui/material'
import foodspotterslogo from '../../images/logofoodspotters.png';
import {NavLink, useNavigate} from "react-router-dom";

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
                <NavLink style={{flexGrow: 10}} to="/login">
                    <img src={foodspotterslogo} alt="Food-Spot-App Logo"
                         style={{height: '50px', verticalAlign: 'middle'}}/>
                </NavLink>
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