import React from "react";
import { Theme, makeStyles } from "@material-ui/core";
import cover from "../../images/home-cover.jpg";

type StoreName = {
    name: string;
    photos: File[];
};

interface StyleProps {
    image: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
    background: props => ({
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${props.image})`,
    }),
    filter: {
        backgroundColor: "rgba(255,255,255,.45)",
    },
    container: {
        padding: "1rem",
        minHeight: "25rem",
        display: "block",
    },
    titleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem",
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.80rem",
        },
    },
    name: {
        width: "50%",
        textAlign: "center",
        margin: "8rem",
        fontSize: "4rem"
    }
}));

export default function StoreName({ name, photos }: StoreName): JSX.Element {
    // TODO add backend for image fetching
    const styleProps: StyleProps = { image: cover };
    const classes = useStyles(styleProps);

    return (
        <div className={classes.background}>
            <div className={classes.filter}>
                <div className={classes.container}>
                    <div className={classes.titleContainer}>
                        <h1 className={classes.name}>{name}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
