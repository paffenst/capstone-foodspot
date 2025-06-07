import React, {ChangeEvent, FormEvent, useState} from 'react';
import {AppBar, Box, Button, TextField, Toolbar} from '@mui/material';
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
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        try {
            const response = await fetch(`/api/places/search?query=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            console.log('Search results:', data);
            navigate(`/search-results?query=${searchTerm}`)
        } catch (error) {
            console.error('Search error:', error);
        }
    };


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
                </Box>
                <Box component="form" onSubmit={handleSearchSubmit} sx={{display: 'flex', alignItems: 'center', mx: 2}}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search places..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 1,
                            minWidth: {xs: '120px', sm: '200px'},
                            input: {padding: '6px 8px'}
                        }}
                    />
                    <Button type="submit" variant="contained" sx={{ml: 1, backgroundColor: '#4caf50', color: 'white'}}>
                        Search
                    </Button>
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