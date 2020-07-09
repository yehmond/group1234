import React, { useContext, useState } from "react";
import StoreCard from "./StoreCard";
import { makeStyles } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import UserContext from "../../pages/UserContext";

const useStyles = makeStyles((theme) => ({
    grid: {
        display: "grid",
        marginTop: "1rem",
        marginBottom: "4rem",
        gridTemplateColumns: "repeat(4, 23%)",
        justifyContent: "space-between",
        [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "repeat(3, 31%)",
        },
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "repeat(2, 48.5%)",
        },
        [theme.breakpoints.down("xs")]: {
            gridTemplateColumns: "100%",
        },
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "3rem 1rem",
    },
    icon: {
        fill: "var(--primary-dark)",
        fontSize: "3.5rem",
        placeSelf: "center",
        "&:hover": {
            cursor: "pointer",
        },
    },
    header: {
        display: "inline-flex",
    },
    title: {
        display: "grid",
        placeSelf: "center",
        paddingRight: "20px",
    },
}));

const mockShops = [];
for (let i = 0; i < 4; i++) {
    mockShops.push({
        id: i,
        name: "Billy's Barbershop",
    });
}

export default function ShopsList() {
    const classes = useStyles();
    const user = useContext(UserContext);
    const [shops, setShops] = useState(null);
    // getStoreById().then((response) => {
    //     setShops(response);
    // })
    setTimeout(() => {
        setShops(mockShops);
    }, 2000);
    if (shops) {
        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <h1 className={classes.title}>My Shops</h1>
                    <Tooltip title={"Add Barbershop"}>
                        <Link to={"/createshop"}>
                            <AddCircleIcon className={classes.icon} />
                        </Link>
                    </Tooltip>
                </div>
                <div className={classes.grid}>
                    {shops.map(({ id, name }) => {
                        return <StoreCard key={id} shopID={id} name={name} />;
                    })}
                </div>
            </div>
        );
    } else {
        return <Loading />;
    }
}
