import React, { Component } from "react";
import "./ViewShops.scss";
import ReviewCard from "./Cards/ReviewCard";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

class Reviews extends Component {
    getAverageRating() {
        let sum = 0;
        this.props.reviews.forEach((review) => {
            sum += review.rating;
        });
        return (sum / parseFloat(this.props.reviews.length)).toPrecision(1);
    }

    render() {
        if (!this.props.reviews || this.props.reviews.length === 0) {
            return (<Typography align="center" variant={"h2"}>
                There are no reviews yet!
            </Typography>)
        } else {
            return (
                <div id="shop-reviews">
                    <div className={"header"}>
                        <div id="avg-rating">
                            <div className={"circle"}>
                                <Typography align="center" variant={"h2"}>
                                    {(
                                        Math.round(this.getAverageRating() * 10) / 10
                                    ).toFixed(1)}
                                </Typography>
                                <Rating
                                    size="large"
                                    disabled
                                    name={"overall-rating"}
                                    value={Math.round(this.getAverageRating())}
                                />
                                <p>{this.props.reviews.length + " ratings"} </p>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    {this.props.reviews.map((review, index) => {
                        return <ReviewCard key={index} review={review}/>;
                    })}
                </div>
            );
        }
    }
}

export default Reviews;
