import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import TimerIcon from "@material-ui/icons/Timer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlertBox from "../../../Dialog/Alert";
import { deleteBarber } from "../../../../api/owner";

const useStyles = makeStyles(() => ({
    root: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        margin: "1rem 0",
    },
    media: {
        height: 300,
        width: 150,
        margin: 5,
        position: "relative",
        display: "grid",
        alignSelf: "center",
        justifySelf: "center",
    },
    content: {
        display: "grid",
        gridRowGap: "5px",
    },
    time: {
        display: "grid",
        gridTemplateColumns: "auto auto 8fr",
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
}));

export default function BarberCard(props) {
    const classes = useStyles();
    const authState = useSelector((state) => state.authState);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const role = authState.role;

    const handleDelete = () => {
        return deleteBarber({barber_id: props.barber.barber_id});
    }

    return (
        <>
        <Card className={classes.root}>
            <CardMedia image={props.barber.picture} className={classes.media} />
            <CardContent className={classes.content}>
                <Typography variant="h2">{props.barber.name}</Typography>
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
                </div>
                <div className={classes.buttonContainer}>
                    {role === "CUSTOMER" && (
                        <Button
                            className={classes.button}
                            color="primary"
                            variant="contained"
                            component={Link}
                            to={"/reservation"}
                        >
                            Make Reservation
                        </Button>
                    )}
                    {role === "OWNER" && (
                        <Button
                            className={classes.button}
                            color="secondary"
                            variant="contained"
                            onClick={()=> {
                                setDeleteDialog(true)
                            }}
                        >
                            DELETE BARBER
                        </Button>

                    )}
                </div>
            </CardContent>
        </Card>
            {deleteDialog && (
                <AlertBox title={'Delete Barber'} confirm={handleDelete} text={'This will delete the barber, and all reviews and reservations associated.'} close={() => {
                    setDeleteDialog(false)
                }} />)}
        </>
    );
}
