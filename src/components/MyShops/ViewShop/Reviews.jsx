import React, { Component } from "react";
import "./ViewShops.scss";
import ReviewCard from "./Cards/ReviewCard";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

class Reviews extends Component {
    constructor(props) {
        super(props);
        let barberRatings = new Map();
        this.props.barbers.forEach((barber) => {
            barberRatings.set(barber.barber_id, {
                name: barber.name,
                count: 0,
                sum: 0,
            });
        });
        // calculate average ratings
        let sum = 0;
        this.props.reviews.forEach((review) => {
            sum += review.rating;
            barberRatings.get(review.barber_id).count += 1;
            barberRatings.get(review.barber_id).sum += review.rating;
        });
        this.state = {
            barberRatings: Array.from(barberRatings.values()),
            overallRating: sum / parseFloat(this.props.reviews.length),
        };
    }

    render() {
        if (!this.props.reviews || this.props.reviews.length === 0) {
            return (
                <Typography align="center" variant={"h2"}>
                    There are no reviews yet!
                </Typography>
            );
        } else {
            return (
                <div id="shop-reviews">
                    <div className={"header"}>
                        <div id="avg-rating">
                            <div className={"circle big"}>
                                <Typography align="center" variant={"h2"}>
                                    {(
                                        Math.round(this.state.overallRating * 10) /
                                        10
                                    ).toFixed(1)}
                                </Typography>
                                <Rating
                                    size="large"
                                    disabled
                                    name={"overall-rating"}
                                    value={this.state.overallRating}
                                />
                                <p>{this.props.reviews.length + " ratings"} </p>
                            </div>
                            <div className="barber-ratings-cards">
                                {this.state.barberRatings.map((value, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={"circle medium"}
                                        >
                                            <Typography
                                                align="center"
                                                variant={"h4"}
                                            >
                                                {value.count > 0
                                                    ? (
                                                          Math.round(
                                                              (value.sum * 10.0) /
                                                                  value.count
                                                          ) / 10
                                                      ).toFixed(1)
                                                    : "N/A"}
                                            </Typography>
                                            <p>{value.name}</p>
                                            <Rating
                                                size="medium"
                                                disabled
                                                name={"overall-rating"}
                                                value={value.sum / value.count}
                                            />
                                            <p>{value.count + " ratings"} </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {this.props.reviews.map((review, index) => {
                        return <ReviewCard key={index} review={review} />;
                    })}
                </div>
            );
        }
    }
}

export default Reviews;
