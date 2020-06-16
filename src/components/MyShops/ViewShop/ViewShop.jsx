import React, { Component } from "react";
import CarouselWrapper from "./CarouselWrapper/CarouselWrapper";
import "./ViewShops.scss";
import { mockStore } from "../../../utils/stubbedData";
import InfoCard from "./Cards/InfoCard";
import { hoursToString } from "../../../utils/utils";
import Chip from "@material-ui/core/Chip";
import MapCard from "./Cards/MapCard";
import ReviewCard from "./Cards/ReviewCard";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

class ViewShop extends Component {
    barbershop = null;

    constructor(props) {
        super(props);
        this.barbershop = mockStore;
    }

    getAddressCard(){
        const loc = this.barbershop.city + ', ' + this.barbershop.province;
        return {
            address: this.barbershop.address,
            location: loc,
            phoneNumber: this.barbershop.phoneNumber,
            website: this.barbershop.website
        }
    }

    genDollarSigns(){
        let dollarSigns = ""
        for (let i = 0; i < this.barbershop.price; i++) {
            dollarSigns += "$";
        }
        return dollarSigns;
    }

    getAverageRating() {
        let sum = 0;
        this.barbershop.reviews.forEach(review => {
            sum+=review.rating;
        })
        return (sum/parseFloat(this.barbershop.reviews.length)).toPrecision(1);
    }


    render() {
        const loc = {lat: this.barbershop.lat, lon: this.barbershop.lon}
        return (
            <div id="view-shops-content" className="page-content">
                <div id="top-info">
                <h1>{this.barbershop.name}</h1>
                <p>{this.barbershop.description}</p>
                <div id='service-tags'>
                {this.barbershop.servicesOffered.map((service) => {
                    return (<Chip
                        label={service}
                        color="primary"
                        key={service}
                    />)
                })}
                    <Chip variant={"outlined"} color={'primary'} label={this.genDollarSigns()}/>
                </div>
                </div>
                <div>
                    <CarouselWrapper images={this.barbershop.photos} />
                </div>
                <div id="shop-information">
                    <InfoCard title={'Information'} info={this.getAddressCard()}/>
                    <InfoCard title={'Hours'} info={hoursToString(this.barbershop.hours)}/>
                    <MapCard title={'Location'} loc={loc}/>
                </div>
                <div id="shop-reviews">
                    <div className={'header'}>
                        <Typography variant={'h4'}>Reviews</Typography>
                        <div id='avg-rating'>
                            <div className={'circle'}>
                                <Typography align='center' variant={'h2'}>{(Math.round(this.getAverageRating() * 10) / 10).toFixed(1)}</Typography>
                                <Rating size='large' disabled name={'overall-rating'} value={Math.round(this.getAverageRating())}/>
                                <p>{this.barbershop.reviews.length + ' ratings'} </p>
                             </div>
                            <div></div>
                        </div>
                    </div>
                    {this.barbershop.reviews.map((review, index) => {
                        return <ReviewCard key={index} review={review}/>
                    })}
                </div>
            </div>
        );
    }
}

export default ViewShop;
