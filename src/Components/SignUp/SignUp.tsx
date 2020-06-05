import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Tab, Tabs } from "@material-ui/core";
import { USER_TYPES } from "../../types/authActionTypes";
import './signup.scss';
import _ from "lodash";
import { validateEmail } from "../../utils/utils";

interface SignUpState {
    fName: string;
    lName: string;
    email: string;
    emailError: boolean;
    emailHelper: string;
    password: string;
    passwordError: boolean;
    passwordHelper: string;
    userType: USER_TYPES;
}

// code taken from https://material-ui.com/getting-started/templates/
const useStyles = (theme: any) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignUp extends Component<{}, SignUpState> {

    constructor(props:any) {
        super(props);
        this.state = { email: "", lName: "", password: "", userType: USER_TYPES.CUSTOMER, fName: " " , passwordError: false,
        passwordHelper: '', emailError: false, emailHelper:''}
        this.handleChange = this.handleChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.areFieldsFilled = this.areFieldsFilled.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);
    }

    public handleChange(event: React.BaseSyntheticEvent) {
        const {
            target: { name, value },
        } = event;
        this.setState({ [name]: value } as Pick<SignUpState, keyof SignUpState>);
    }

    public handleTabChange(event:React.BaseSyntheticEvent, value: USER_TYPES) {
        this.setState({userType: value}, () => {
            console.log(this.state);
        })
    }

    public areFieldsFilled(): boolean {
        return _.some(_.omit(this.state, 'passwordHelper', 'passwordError', 'emailError','emailHelper'), _.isEmpty);
    }

    public areFieldsValid(): boolean  {
        let invalid = false;
        // validate email
        if(!validateEmail(this.state.email)){
            this.setState({emailError: true, emailHelper: 'Pleas enter a valid email'});
            invalid = true;
        }
        // validate password
        if(!this.isValidPassword()) {
            invalid = true;
        }
        // if any fields are invalid return
        return invalid
    }

    public submitSignUp(): void {
        if(this.areFieldsValid()){
            // do something
        }
    }

    public isValidPassword(): boolean {
        const currPassword = this.state.password;
        if (currPassword.length < 8) {
            this.setState({passwordHelper: "Your password must be at least 8 characters", passwordError: true});
            return false;
        }
        if (currPassword.search(/[a-z]/i) < 0) {
            this.setState({passwordHelper: "Your password must contain at least one letter.", passwordError: true});
            return false;
        }
        if (currPassword.search(/[0-9]/) < 0) {
            this.setState({passwordHelper: "Your password must contain at least one digit.", passwordError: true});
            return false;
        }
        return true;
    }


    render() {
        // @ts-ignore
        const {classes} = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={this.handleChange}
                                    autoComplete="fname"
                                    name="fName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Last Name"
                                    name="lName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    helperText= {this.state.emailHelper}
                                    error = {this.state.emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    helperText={this.state.passwordHelper}
                                    error = {this.state.passwordError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Tabs value={this.state.userType} onChange={this.handleTabChange}
                                            centered>
                                    <Tab label="Customer" value={USER_TYPES.CUSTOMER}/>
                                    <Tab label="Owner" value={USER_TYPES.OWNER}/>
                                </Tabs>
                            </Grid>
                        </Grid>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={this.areFieldsFilled()}
                            onClick = {this.submitSignUp}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

// @ts-ignore
export default withStyles(useStyles)(SignUp)