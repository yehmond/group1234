import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import EventIcon from "@material-ui/icons/Event";
import Typography from "@material-ui/core/Typography";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import barbershopPic from "../../images/barbershop.png";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = (theme) => ({
    root: {
        margin: "1rem 0",
        width: "100%",
    },
    media: {
        height: 150,
    },
    darken: {
        color: theme.palette.primary.dark,
        fontWeight: "bolder",
        "&:hover": {
            transform: "scale(1.1)",
            cursor: "pointer",
        },
    },
    iconWrapper: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        alignContent: "center",
        justifyItems: "center",
        backgroundColor: theme.palette.primary.dark,
    },
    icon: {
        color: theme.palette.primary.contrastText,
        fontSize: "2.5rem",
        padding: "2px 0",
        "&:hover": {
            transform: "scale(1.2)",
            cursor: "pointer",
        },
    },
});

class StoreCard extends Component {
    render() {
        const { shopID, name, classes } = this.props;
        return (
            <div className={classes.root}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={barbershopPic}
                        />
                        <CardContent>
                            <Link
                                to={`/stores/${shopID}`}
                                style={{ textDecoration: "none" }}
                            >
                                <Tooltip title="View shop information">
                                    <Typography
                                        variant="h5"
                                        align="center"
                                        className={classes.darken}
                                    >
                                        {name}
                                    </Typography>
                                </Tooltip>
                            </Link>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.iconWrapper}>
                        <Tooltip title="View Schedule">
                            <Link to={`/stores/${shopID}/schedule`}>
                                <EventIcon className={classes.icon} />
                            </Link>
                        </Tooltip>
                        <Tooltip title="Add/Edit Barbers">
                            <Link to={`/stores/${shopID}/addbarber`}>
                                <PersonAddIcon className={classes.icon} />
                            </Link>
                        </Tooltip>
                        <Tooltip title="View Statistics">
                            <Link to={`/stores/${shopID}/stats`}>
                                <EqualizerIcon className={classes.icon} />
                            </Link>
                        </Tooltip>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(useStyles)(StoreCard);
