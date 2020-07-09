import React, { useContext, useEffect, useState } from "react";
import StoreCard from "./StoreCard";
import { makeStyles } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import UserContext from "../../pages/UserContext";
import { getStore } from "../../api/owner";
import Typography from "@material-ui/core/Typography";

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
    noShops: {
        paddingTop: "50px",
    },
}));

export default function ShopsList() {
    const classes = useStyles();
    const user = useContext(UserContext);
    const [shops, setShops] = useState(null);
    useEffect(() => {
        getStore({ owner_id: user })
            .then((response) => {
                const fetchedShops = [];
                for (let obj of response) {
                    const store = obj.store;
                    const barbers = obj.barbers;
                    const reservations = obj.reservations;
                    const reviews = obj.reviews;
                    const fetchedShop = {
                        id: obj.store_id,
                        name: store.name,
                        address: store.address,
                        lat: parseInt(store.lat),
                        lon: parseInt(store.lon),
                        city: store.city,
                        province: store.province,
                        website: store.website,
                        phoneNumber: store.phone_number,
                        description: store.description,
                        servicesOffered: store.services,
                        price: store.price,
                        photos: store.pictures,
                        hours: store.hours,
                        reviews: reviews,
                        barbers: barbers,
                        reservations: reservations,
                    };
                    fetchedShops.push(fetchedShop);
                }
                setShops(fetchedShops);
            })
            .catch((reject) => {
                console.log(reject);
            });
    }, [user]);

    if (shops === null) {
        return <Loading />;
    }
    if (shops.length === 0) {
        return (
            <>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <h1 className={classes.title}>My Shops</h1>
                        <Tooltip title={"Add Barbershop"}>
                            <Link to={"/createshop"}>
                                <AddCircleIcon className={classes.icon} />
                            </Link>
                        </Tooltip>
                    </div>
                    <Typography
                        className={classes.noShops}
                        align="center"
                        variant={"h2"}
                    >
                        There are no shops yet! Please create a shop!
                    </Typography>
                </div>
            </>
        );
    }

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
                    {shops.map((shop) => {
                        return (
                            <StoreCard
                                key={shop.id}
                                shopID={shop.id}
                                shop={shop}
                                name={shop.name}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
