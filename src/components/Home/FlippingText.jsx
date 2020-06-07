import React from "react";
import TextLoop from "react-text-loop";

export default function FlippingText(props) {
    return (
        <TextLoop interval={3000}>
            {props.texts.map((text, idx) => {
                return (
                    <span key={idx} style={{ color: props.color }}>
                        {text}
                    </span>
                );
            })}
        </TextLoop>
    );
}
