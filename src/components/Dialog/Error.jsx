import React from "react";
import Typography from "@material-ui/core/Typography";

export default function ErrorText(props) {
    return (
        <Typography align="center" variant={"h2"} style={{ "padding": "5vw" }}>
            {props.message}
        </Typography>
    );
}
