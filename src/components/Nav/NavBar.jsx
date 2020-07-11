import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync, setSignInStatus } from "../../actions/authActions";
import { Link } from "react-router-dom";
import NavDrawer from "./NavDrawer";

const useStyles = makeStyles((theme) => {
    return createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        menuButton: {
            display: "none",
            [theme.breakpoints.down("xs")]: {
                display: "inline",
            },
        },
        button: {
            marginLeft: theme.spacing(1),
            [theme.breakpoints.down("xs")]: {
                display: "none",
            },
        },
        link: {
            textDecoration: "none",
            color: theme.palette.common.white,
        },
    });
});

const links = {
    guest: {
        Browse: "/browse",
        About: "/about",
        "Sign in": "/signin",
        "Sign up": "/signup",
    },
    customer: {
        "My Reservations": "/reservations",
        Browse: "/browse",
        About: "/about",
    },
    owner: {
        "My Stores": "/stores",
        Browse: "/browse",
        About: "/about",
    },
};

export default function MenuAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerIsOpen, setDrawer] = useState(false);
    const authState = useSelector((state) => state.authState);
    const dispatch = useDispatch();

    useEffect(() => {
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");

        if (username && role) {
            dispatch(setSignInStatus(username, role));
        }
        // eslint-disable-next-line
    }, []);

    let displayedLinks;
    switch (authState.role) {
        case "CUSTOMER":
            displayedLinks = links.customer;
            break;
        case "OWNER":
            displayedLinks = links.owner;
            break;
        default:
            displayedLinks = links.guest;
            break;
    }
    return (
        <div className={classes.root}>
            <NavDrawer
                links={displayedLinks}
                open={Boolean(drawerIsOpen)}
                setDrawer={setDrawer}
            />
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.link}>
                            Dibs
                        </Link>
                    </Typography>
                    {Object.keys(displayedLinks).map((text, idx) => {
                        if (text === "Sign up") {
                            return (
                                <Link
                                    to="/signup"
                                    className={classes.link}
                                    key={idx}
                                >
                                    <Button
                                        color="inherit"
                                        className={classes.button}
                                        variant="outlined"
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            );
                        }
                        return (
                            <Link
                                to={`${displayedLinks[text]}`}
                                className={classes.link}
                                key={idx}
                            >
                                <Button color="inherit" className={classes.button}>
                                    {text}
                                </Button>
                            </Link>
                        );
                    })}

                    {authState.isLoggedIn && (
                        <>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={(event) =>
                                    setAnchorEl(event.currentTarget)
                                }
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
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={() => setAnchorEl(null)}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(signOutAsync())}>
                                    Sign out
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
