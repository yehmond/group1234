import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InstagramIcon from "@material-ui/icons/Instagram";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import TimerIcon from "@material-ui/icons/Timer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlertBox from "../../../Dialog/Alert";
import { deleteBarbers } from "../../../../api/owner";
import { checkMyStore, isMobile, refreshPage } from "../../../../utils/utils";

const useStyles = makeStyles(() => ({
    root: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        margin: "1rem 0",
        ["@media (max-width:1000px)"]: { // eslint-disable-line no-useless-computed-key
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1f 1fr",
        },
    },
    media: {
        height: 300,
        width: 150,
        margin: 5,
        position: "relative",
        display: "grid",
        alignSelf: "center",
        justifySelf: "center",

        ["@media (max-width:1000px)"]: { // eslint-disable-line no-useless-computed-key
            height: 250,
            width: 300,
        },
    },
    content: {
        display: "grid",
        gridRowGap: "5px",
    },
    time: {
        display: "grid",
        gridTemplateColumns: "auto auto 8fr auto",
        gridColumnGap: "5px",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        display: "block",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        display: "block",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
    },
    icon: {
        "&:hover": {
            cursor: "pointer",
        },
    },
}));

export default function BarberCard(props) {
    const classes = useStyles();
    const authState = useSelector((state) => state.authState);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const role = authState.role;

    const handleDelete = () => {
        return deleteBarbers({ barber_id: props.barber.barber_id });
    };

    return (
        <>
            <Card className={classes.root}>
                <CardMedia image={props.barber.picture} className={classes.media} />
                <CardContent className={classes.content}>
                    <Typography align={isMobile() ? "center" : "left"} variant="h4">
                        {props.barber.name}
                    </Typography>
                    <p>{props.barber.description}</p>
                    <div>
                        {props.barber.services.map((service) => {
                            return (
                                <Chip
                                    label={service.service}
                                    color="primary"
                                    key={service.service}
                                />
                            );
                        })}
                    </div>
                    <div className={classes.time}>
                        <TimerIcon />
                        <span>{props.barber.services[0].duration}</span>
                        <div></div>
                        <InstagramIcon
                            className={classes.icon}
                            onClick={() => {
                                window.open(props.barber.instagram);
                            }}
                        />
                    </div>
                    <div className={classes.buttonContainer}>
                        {role === "CUSTOMER" && (
                            <Button
                                className={classes.button}
                                color="primary"
                                variant="contained"
                                component={Link}
                                to={`/reserve/${props.shopID}`}
                            >
                                RESERVE
                            </Button>
                        )}
                        {role === "OWNER" && checkMyStore(props.shopOwnerID) && (
                            <Button
                                className={classes.button}
                                color="secondary"
                                variant="contained"
                                onClick={() => {
                                    setDeleteDialog(true);
                                }}
                            >
                                DELETE BARBER
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
            {deleteDialog && (
                <AlertBox
                    title={"Delete Barber"}
                    confirm={handleDelete}
                    text={
                        "This will delete the barber, and all reviews and reservations associated."
                    }
                    close={() => {
                        setDeleteDialog(false);
                        refreshPage();
                    }}
                />
            )}
        </>
    );
}
