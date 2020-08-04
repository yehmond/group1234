import React, { useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { signOutAsync } from "../../actions/authActions";
import { Link } from "react-router-dom";
import NavDrawer from "./NavDrawer";
import logo from "../../images/scissors.png";

const useStyles = makeStyles((theme) => {
    return createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        image: {
            height: "25px",
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
        logo: {
            display: "grid",
            gridTemplateColumns: "35px 40px",
            alignItems: "center",
        },
    });
});

const links = {
    guest: {
        Browse: "/browse",
        "Sign in": "/signin",
        "Sign up": "/signup",
    },
    customer: {
        "My Reservations": "/reservations",
        Browse: "/browse",
    },
    owner: {
        "My Stores": "/stores",
        Browse: "/browse",
    },
};

export default function MenuAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerIsOpen, setDrawer] = useState(false);
    const authState = useSelector((state) => state.authState);
    const dispatch = useDispatch();

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
                    <div className={classes.title}>
                        <Link to="/" className={classes.link}>
                            <div className={classes.logo}>
                                <img
                                    className={classes.image}
                                    src={logo}
                                    alt={"Logo"}
                                />
                                <Typography variant="h6">Dibs</Typography>
                            </div>
                        </Link>
                    </div>
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
