import React from 'react';
import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import foodspotterslogo from '../../images/FS_green_rounded_final_logo.png';
import {NavLink, useNavigate} from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate()

    function onClickRegisterHandler() {
        navigate('/register');
    }

    function onClickLoginHandler() {
        navigate("/login");
    }

    function onClickLogoutHandler() {
        navigate("/login");
    }

    return (
        <AppBar position="static">
            <Toolbar className="Toolbar" style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <NavLink to="/login">
                        <img src={foodspotterslogo} alt="Food-Spot-App Logo"
                             style={{height: '50px', verticalAlign: 'middle'}}/>
                    </NavLink>
                    <Typography variant="body1" style={{marginLeft: '10px', color: 'white'}}>
                        Logged in as:
                    </Typography>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Button
                        onClick={onClickLoginHandler}
                        style={{height: '50%', backgroundColor: 'aquamarine', color: 'black', marginLeft: '10px'}}
                        variant="contained"
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={onClickRegisterHandler}
                        style={{height: '50%', backgroundColor: 'floralwhite', color: 'black', marginLeft: '10px'}}
                        variant="contained"
                    >
                        Sign Up
                    </Button>
                    <div>
                        <Button onClick={onClickLogoutHandler}
                                style={{height: '50%', backgroundColor: '#d22e2e', color: 'black', marginLeft: '10px'}}
                                variant="contained"
                        >
                            Sign Out
                        </Button>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}