import React from "react";
import "./loading.scss";

function Loading() {
    return (
        <div className="overlay-center">
            <div className="container">
                <div className="loader">Loading...</div>
            </div>
        </div>
    );
}

export default Loading;
