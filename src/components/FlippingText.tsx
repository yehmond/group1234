import React from "react";
import TextLoop from "react-text-loop";

type FlippingTextPropType = {
    texts: string[];
    color: string;
};

export default function FlippingText(props: FlippingTextPropType): JSX.Element {
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
