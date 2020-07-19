import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import EventIcon from "@material-ui/icons/Event";
import Typography from "@material-ui/core/Typography";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AlertBox from "../Dialog/Alert";
import { deleteStore } from "../../api/owner";
import { convertReservationToEvent, refreshPage } from "../../utils/utils";

const useStyles = (theme) => ({
    root: {
        margin: "1rem 0",
        width: "100%",
    },
    media: {
        height: 0,
        paddingTop: "75%",
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
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
    constructor(props) {
        super(props);
        this.state = { deleteDialog: false };
        this.handleClickTrash = this.handleClickTrash.bind(this);
        this.handleCloseTrash = this.handleCloseTrash.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleClickTrash() {
        this.setState({ deleteDialog: true });
    }

    handleCloseTrash() {
        this.setState({ deleteDialog: false });
        refreshPage();
    }

    handleDelete() {
        return deleteStore({ store_id: this.props.shopID });
    }

    render() {
        const { shopID, name, classes, shop } = this.props;
        return (
            <>
                <div className={classes.root}>
                    <Card>
                        <CardActionArea>
                            <Link
                                to={`/stores/${shopID}`}
                                style={{ textDecoration: "none" }}
                            >
                                <CardMedia
                                    className={classes.media}
                                    image={shop.photos[0]}
                                />
                            </Link>
                            <CardContent>
                                <Link
                                    to={{
                                        pathname: `/stores/${shopID}`,
                                        id: shopID,
                                        shop: shop,
                                    }}
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
                                <Link
                                    to={{
                                        pathname: `/stores/${shopID}/schedule`,
                                        id: shopID,
                                        reservations: shop.reservations.map((reservation) => {
                                            return convertReservationToEvent(shop.barbers, reservation);
                                        }),
                                        barbers: shop.barbers,
                                        hours: shop.hours,
                                    }}
                                >
                                    <EventIcon className={classes.icon} />
                                </Link>
                            </Tooltip>
                            <Tooltip title="Add/Edit Barbers">
                                <Link
                                    to={{
                                        pathname: `/stores/${shopID}/addbarber`,
                                        id: shopID,
                                    }}
                                >
                                    <PersonAddIcon className={classes.icon} />
                                </Link>
                            </Tooltip>
                            <Tooltip title="View Statistics">
                                <Link
                                    to={{
                                        pathname: `/stores/${shopID}/stats`,
                                        id: shopID,
                                        shop: shop,
                                    }}
                                >
                                    <EqualizerIcon className={classes.icon} />
                                </Link>
                            </Tooltip>
                            <Tooltip title="Delete Store">
                                <DeleteForeverIcon
                                    onClick={this.handleClickTrash}
                                    className={classes.icon}
                                />
                            </Tooltip>
                        </CardActions>
                    </Card>
                </div>
                {this.state.deleteDialog && (
                    <AlertBox
                        title={"Delete Store"}
                        confirm={this.handleDelete}
                        text={
                            "This will delete the store, and all barbers, reviews, and reservations associated."
                        }
                        close={this.handleCloseTrash}
                    />
                )}
            </>
        );
    }
}

export default withStyles(useStyles)(StoreCard);
