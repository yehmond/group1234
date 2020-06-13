import React from "react";
import StoreCard from "./StoreCard";
import { makeStyles } from "@material-ui/core";

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
    return (
        <div className={classes.container}>
            <h1>My Shops</h1>
            <div className={classes.grid}>
                {mockShops.map(({ id, name}) => {
                    return (
                        <StoreCard
                            key={id}
                            shopID={id}
                            name={name}
                        />
                    );
                })}
            </div>
        </div>
    );
}
