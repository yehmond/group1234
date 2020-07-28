import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import SmallCard from "./SmallCard";
import { searchStores } from "../../api/customer";
import Skeleton from "@material-ui/lab/Skeleton";

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

export default function Recommendations() {
    const classes = useStyles();
    const [availableNowStores, setAvailableNowStores] = useState([]);
    const [recommendedStores, setRecommendedStores] = useState([]);

    useEffect(() => {
        const availableNowQuery = {
            date: new Date(),
            time: new Date(),
            available_count: 3,
        };
        searchStores(12, availableNowQuery).then((response) => {
            if (response) {
                setAvailableNowStores(response.stores);
            }
        });
        const recommendedQuery = {
            rating: 5,
            startIndex: Math.floor(Math.random() * 3),
        };
        searchStores(12, recommendedQuery).then((response) => {
            if (response) {
                setRecommendedStores(response.stores);
            }
        });
    }, []);

    return (
        <div className={classes.container}>
            <h1>Available Now</h1>
            <div className={classes.grid}>
                {availableNowStores.length > 0
                    ? availableNowStores.map(
                          (
                              {
                                  store_id,
                                  name,
                                  services,
                                  price,
                                  rating,
                                  address,
                                  city,
                                  province,
                                  picture,
                                  neighbourhood,
                              },
                              idx
                          ) => {
                              return (
                                  <SmallCard
                                      key={idx}
                                      shopId={store_id}
                                      name={name}
                                      services={services}
                                      price={price}
                                      rating={rating}
                                      address={address}
                                      city={city}
                                      province={province}
                                      picture={picture}
                                      neighbourhood={neighbourhood}
                                  />
                              );
                          }
                      )
                    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((elem) => {
                          return (
                              <div key={elem}>
                                  <Skeleton
                                      variant="rect"
                                      animation="wave"
                                      height="23rem"
                                      style={{
                                          borderRadius: "7px",
                                      }}
                                  />
                                  <Skeleton
                                      variant="text"
                                      animation="wave"
                                      height="5rem"
                                      style={{
                                          borderRadius: "7px",
                                          marginBottom: "2rem",
                                      }}
                                  />
                              </div>
                          );
                      })}
            </div>
            {recommendedStores.length >= 12 && (
                <>
                    <h1>Recommended</h1>
                    <div className={classes.grid}>
                        {recommendedStores.map(
                            (
                                {
                                    store_id,
                                    name,
                                    services,
                                    price,
                                    rating,
                                    address,
                                    city,
                                    province,
                                    picture,
                                    neighbourhood,
                                },
                                idx
                            ) => {
                                return (
                                    <SmallCard
                                        key={idx}
                                        shopId={store_id}
                                        name={name}
                                        services={services}
                                        price={price}
                                        rating={rating}
                                        address={address}
                                        city={city}
                                        province={province}
                                        picture={picture}
                                        neighbourhood={neighbourhood}
                                    />
                                );
                            }
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
