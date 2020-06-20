import React from "react";
import { makeStyles } from "@material-ui/core";
import HomeCard from "./HomeCard";

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
for (let i = 0; i < 12; i++) {
    mockShops.push({
        id: i,
        name: "Citrus Hair Salon",
        services: ["Hair Salon", "Day Spa", "Waxing"],
        cost: 3,
        rating: 5,
    });
}

export default function Recommendations() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <h1>Available Now</h1>
            <div className={classes.grid}>
                {mockShops.map(({ id, name, services, cost, rating }, idx) => {
                    return (
                        <HomeCard
                            key={idx}
                            shopId={id}
                            name={name}
                            services={services}
                            cost={cost}
                            rating={rating}
                        />
                    );
                })}
            </div>
            <h1>Recommended</h1>
            <div className={classes.grid}>
                {mockShops.map(({ id, name, services, cost, rating }) => {
                    return (
                        <HomeCard
                            key={id}
                            shopId={id}
                            name={name}
                            services={services}
                            cost={cost}
                            rating={rating}
                        />
                    );
                })}
            </div>
        </div>
    );
}
