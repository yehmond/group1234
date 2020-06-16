import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MapContainer from "./MapContainer";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
    },
    pos: {
        margin: '1vh 1vw',
        fontFamily: '"Roboto Mono", monospace',
        fontWeight: '400',
        fontStyle: 'italic',
        color: 'black'
    },
    title: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    },
    content: {
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: 0
    }
}));

export default function MapCard(props) {
    const classes = useStyles();
    const {lat, lon} = props.loc;

    return (
        <Card className={classes.root} variant={"outlined"}>
            <CardHeader title={props.title} className={classes.title}/>
            <CardContent className={classes.content}>
               <MapContainer lat={lat} lon={lon}/>
            </CardContent>
        </Card>
    );
}

