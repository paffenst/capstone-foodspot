import {Box, Button, TextField, Typography} from "@mui/material";
import useUser from "../../hooks/useUser";
import backgroundImage from '../../images/logformpage.jpg';
import {FormEvent} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function LoginPage() {
    const {LoginUser, handleUsernameChange, handlePasswordChange, inputFields} = useUser();
    const navigator = useNavigate()
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        LoginUser(event)
            .then(() => navigator("/")
            );
    };

    return (
        <div style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
        }}>
            <Box
                sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "rgba(161, 192, 140, 0.8)",
                }}
            >
                <Typography style={{color: "aquamarine", fontWeight: "bold"}} variant="h5" gutterBottom>
                    SIGN IN
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        "& .MuiTextField-root": {
                            m: 1,
                            width: "25ch",
                            display: "flex",
                            flexDirection: "column",
                            flexWrap: "wrap",
                            rowGap: "5px",
                            justifyContent: "center",
                        },
                        "& .Register": {
                            alignSelf: "flex-end",
                            m: 1,
                            color: "white",
                            textDecoration: "underline",
                            fontSize: "14px",
                        },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        size="medium"
                        label="username"
                        id="usernameTextfield"
                        value={inputFields.username}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        size="medium"
                        label="password"
                        type="password"
                        id="passwordTextfield"
                        value={inputFields.password}
                        onChange={handlePasswordChange}
                    />
                    <Button
                        style={{backgroundColor: 'aquamarine', color: 'black'}}
                        type="submit"
                        variant="outlined"
                        color="inherit"
                        size="medium"
                    >
                        Sign in
                    </Button>
                    <Link className="Register" to={`/register`}>
                        Sign up
                    </Link>
                </Box>
            </Box>
        </div>
    );
}
