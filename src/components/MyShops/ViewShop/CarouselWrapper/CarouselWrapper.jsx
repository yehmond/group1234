import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Carousel from "react-elastic-carousel";
import { makeStyles } from "@material-ui/core";
import "../ViewShops.scss";
import "./carouselWrapper.scss";

const useStyles = makeStyles({
    image: {
        height: "0",
        width: "0",
        padding: "45%",
        "&:hover": {
            transform: "scale(1.1)",
        },
    },
});

export default function CarouselWrapper(props) {
    const classes = useStyles();
    const breakPoints = [
        { width: 1, itemsToShow: 1, itemsToScroll: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 1 },
        { width: 850, itemsToShow: 3, itemsToScroll: 1 },
    ];
    return (
        <Carousel
            pagination={true}
            disableArrowsOnEnd={false}
            itemsToShow={3}
            showArrows={true}
            className="carousel-wrapper"
            breakPoints={breakPoints}
        >
            {props.images.map((image, index) => {
                console.log(image);
                return (
                    <CardMedia
                        id={"view-shop-image-" + index}
                        className={classes.image}
                        key={index}
                        image={image}
                    />
                );
            })}
        </Carousel>
    );
}
