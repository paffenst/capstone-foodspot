import React from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import {styled} from '@mui/system';
import foodspotterslogo from '../../images/FS_green_rounded_final_logo.png';
import {NavLink, useNavigate} from 'react-router-dom';

const Logo = styled('img')(({theme}) => ({
    height: '50px',
    [theme.breakpoints.down('sm')]: {
        height: '40px',
    },
}));

const ResponsiveButton = styled(Button)(({theme}) => ({
    marginLeft: '5px',
    fontSize: '1rem',
    padding: '6px 8px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem',
        padding: '4px 6px',
        minWidth: 'fit-content',
    },
}));

const ResponsiveTypography = styled(Typography)(({theme}) => ({
    marginLeft: '10px',
    color: 'white',
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
    },
}));

const ToolbarContainer = styled(Toolbar)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
        flexWrap: 'nowrap',
    },
}));

const ButtonContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        flexWrap: 'nowrap',
    },
}));

export default function Header() {
    const navigate = useNavigate();

    function onClickRegisterHandler() {
        navigate('/register');
    }

    function onClickLoginHandler() {
        navigate('/login');
    }

    function onClickLogoutHandler() {
        navigate('/login');
    }

    return (
        <AppBar position="static">
            <ToolbarContainer>
                <Box display="flex" alignItems="center">
                    <NavLink to="/login">
                        <Logo src={foodspotterslogo} alt="Food-Spot-App Logo"/>
                    </NavLink>
                    <ResponsiveTypography>
                        Logged in as:
                    </ResponsiveTypography>
                </Box>
                <ButtonContainer>
                    <ResponsiveButton
                        onClick={onClickLoginHandler}
                        sx={{backgroundColor: 'aquamarine', color: 'black'}}
                        variant="contained"
                    >
                        Sign In
                    </ResponsiveButton>
                    <ResponsiveButton
                        onClick={onClickRegisterHandler}
                        sx={{backgroundColor: 'floralwhite', color: 'black'}}
                        variant="contained"
                    >
                        Sign Up
                    </ResponsiveButton>
                    <ResponsiveButton
                        onClick={onClickLogoutHandler}
                        sx={{backgroundColor: '#d22e2e', color: 'black'}}
                        variant="contained"
                    >
                        Sign Out
                    </ResponsiveButton>
                </ButtonContainer>
            </ToolbarContainer>
        </AppBar>
    );
}