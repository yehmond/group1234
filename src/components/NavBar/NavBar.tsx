import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import { AuthState } from "../../types/authActionTypes";
import { Link } from "react-router-dom";

interface RootState {
    authState: AuthState;
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        button: {
            marginLeft: theme.spacing(1),
        },
        link: {
            textDecoration: "none",
            color: theme.palette.common.white,
            "&:link": {
                textDecoration: "none",
            },
        },
    });
});

export default function MenuAppBar(): JSX.Element {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const authState = useSelector((state: RootState) => state.authState);
    const dispatch = useDispatch();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const signOut = () => {
        dispatch(logout());
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.link}>
                            Dibs
                        </Link>
                    </Typography>
                    {authState.isLoggedIn && authState.role === "CUSTOMER" && (
                        <Link to="/reservations" className={classes.link}>
                            <Button color="inherit" className={classes.button}>
                                My Reservations
                            </Button>
                        </Link>
                    )}
                    {authState.isLoggedIn && authState.role === "OWNER" && (
                        <Link to="/reservations" className={classes.link}>
                            <Button color="inherit" className={classes.button}>
                                My Stores
                            </Button>
                        </Link>
                    )}
                    <Link to="/browse" className={classes.link}>
                        <Button color="inherit" className={classes.button}>
                            Browse
                        </Button>
                    </Link>
                    <Link to="/about" className={classes.link}>
                        <Button color="inherit" className={classes.button}>
                            About
                        </Button>
                    </Link>
                    {!authState.isLoggedIn && (
                        <>
                            <Link to="/signin" className={classes.link}>
                                <Button
                                    color="inherit"
                                    className={classes.button}
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/signup" className={classes.link}>
                                <Button
                                    color="inherit"
                                    className={classes.button}
                                    variant="outlined"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                    {authState.isLoggedIn && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={signOut}>Sign out</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
