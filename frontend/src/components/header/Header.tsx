import React from 'react';
import {AppBar, Button, Toolbar} from '@mui/material'
import foodspotterslogo from '../../images/FS_green_rounded_final_logo.png';
import {NavLink, useNavigate} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate()

    function onClickRegisterHandler() {
        navigate("/register");
    }

    function onClickLoginHandler() {
        navigate("/login");
    }

    function onClickLogoutHandler() {
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
                            style={{height: '50%', backgroundColor: 'aquamarine', color: 'black'}}
                            variant="contained">
                        Sign In
                    </Button>
                </div>
                <div>
                    <Button onClick={onClickRegisterHandler}
                            style={{height: '50%', backgroundColor: 'floralwhite ', color: 'black'}}
                            variant="contained">
                        Sign Up
                    </Button>
                </div>
                <div>
                    <Button onClick={onClickLogoutHandler}
                            style={{height: '50%', backgroundColor: '#d22e2e', color: 'black'}}
                            variant="contained">
                        Sign Out
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}