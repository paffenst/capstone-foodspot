import {Box, Button, TextField, Typography} from "@mui/material";
import {ChangeEvent} from "react";
import backgroundImage from '../../images/regformpage.jpg';
import useRegister from "../../hooks/useRegister";

export default function RegisterPage() {
    const {
        inputTextFields, handleInputChange, registerInputHandler,
        passError, emailError
    } = useRegister();

    const inputProps = {
        style: {
            color: "white",
        },
    };

    const textFieldProps = {
        InputProps: inputProps,
        InputLabelProps: {
            style: {
                color: "white",
            },
        },
        size: "small" as const,
    };

    return (
        <div style={{
            position: "relative",
            minHeight: "100vh",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundColor: 'whitesmoke',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: 'whitesmoke',
                textAlign: "center",
                backdropFilter: "blur(8px)",
                padding: "20px",
                maxWidth: "400px",
                width: "100%"
            }}>
                <Typography style={{color: "aquamarine", fontWeight: "bold"}} variant="h5" gutterBottom>
                    SIGN UP TO SAVE AND SHARE
                </Typography>
                <Typography style={{color: "aquamarine", fontWeight: "bold"}} variant="h5" gutterBottom>
                    YOUR FAVORTE FOODSPOTS
                </Typography>
                <Box
                    component="form"
                    onSubmit={registerInputHandler}
                    sx={{
                        "& .MuiTextField-root": {
                            m: 2,
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        },
                    }}
                    noValidate
                >
                    <TextField
                        label="username"
                        id="usernameTextfield"
                        value={inputTextFields.username}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(event, "username")
                        }
                        {...textFieldProps}
                    />
                    <TextField
                        label="password"
                        id="passwordTextfield"
                        type="password"
                        helperText={passError}
                        value={inputTextFields.password}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(event, "password")
                        }
                        {...textFieldProps}
                    />
                    <TextField
                        label="email"
                        id="emailTextfield"
                        value={inputTextFields.email}
                        helperText={emailError}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(event, "email")
                        }
                        {...textFieldProps}
                    />
                    <TextField
                        label="firstname"
                        id="firstnameTextfield"
                        type="text"
                        value={inputTextFields.firstname}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(event, "firstname")
                        }
                        {...textFieldProps}
                    />
                    <TextField
                        label="lastname"
                        id="lastnameTextfield"
                        type="text"
                        value={inputTextFields.lastname}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(event, "lastname")
                        }
                        {...textFieldProps}
                    />
                    <Button type="submit" variant="contained"
                            style={{height: '50%', backgroundColor: 'green', color: 'white'}}
                            size="large">
                        Sign up
                    </Button>
                </Box>
            </Box>
        </div>
    )
}
