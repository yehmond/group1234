import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
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
    }
}));

export default function InfoCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant={"outlined"}>
            <CardHeader title={props.title} className={classes.title}/>
            <CardContent>
                {Object.keys(props.info).map(key => {
                  return (<Typography key ={key} className={classes.pos}  color="textSecondary">
                        {props.info[key]}
                </Typography>)
                })}
            </CardContent>
        </Card>
    );
}
