import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

type NavDrawerProps = {
    open: boolean;
    links: Record<string, string>;
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};
const useStyles = makeStyles({
    list: {
        width: 250,
    },
});

export default function NavDrawer(props: NavDrawerProps): JSX.Element {
    const classes = useStyles();
    const history = useHistory();

    const handleClick = (path: string) => {
        history.push(path);
    };

    return (
        <Drawer open={props.open} onClose={() => props.setDrawer(false)}>
            <Divider />
            <List className={classes.list}>
                {Object.keys(props.links).map((text, index) => (
                    <ListItem
                        button
                        key={index}
                        onClick={() => handleClick(props.links[text])}
                    >
                        {/* {text} */}
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
