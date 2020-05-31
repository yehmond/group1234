import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    makeStyles,
    ListItemIcon,
    Theme,
    SwipeableDrawer,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import StoreIcon from "@material-ui/icons/Store";
import InfoIcon from "@material-ui/icons/Info";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import clsx from "clsx";

type NavDrawerProps = {
    open: boolean;
    links: Record<string, string>;
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};
const useStyles = makeStyles((theme: Theme) => ({
    toolbarColor: {
        backgroundColor: theme.palette.primary.main,
    },
    toolbar: theme.mixins.toolbar,
    list: {
        width: 250,
    },
}));

const drawerIcons: { [key: string]: JSX.Element } = {
    "Browse": <FindInPageIcon />,
    "My Reservations": <EventAvailableIcon />,
    "My Stores": <StoreIcon />,
    "About": <InfoIcon />,
    "Sign in": <CheckCircleIcon />,
    "Sign up": <AddCircleIcon />,
};

export default function NavDrawer(props: NavDrawerProps): JSX.Element {
    const classes = useStyles();
    const history = useHistory();

    function handleClick(path: string) {
        history.push(path);
    }

    return (
        <SwipeableDrawer
            anchor="left"
            open={props.open}
            onOpen={() => props.setDrawer(true)}
            onClose={() => props.setDrawer(false)}
        >
            <div className={clsx(classes.toolbar, classes.toolbarColor)}></div>
            <List className={classes.list}>
                {Object.keys(props.links).map((text, index) => (
                    <ListItem
                        button
                        key={index}
                        onClick={() => handleClick(props.links[text])}
                    >
                        <ListItemIcon>{drawerIcons[text]}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </SwipeableDrawer>
    );
}
