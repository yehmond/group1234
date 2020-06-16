import { useState, useEffect } from "react";

export function convert24HrTo12Hr(time) {
    let hours = parseInt(time.substr(0, 2));
    const minutes = time.substr(3);
    //it is pm if hours from 12 onwards
    const suffix = hours >= 12 ? "PM" : "AM";
    //only -12 from hours if it is greater than 12 (if not back at mid night)
    hours = hours > 12 ? hours - 12 : hours;
    //if 00 then it is 12 am
    hours = hours === 0 ? 12 : hours;
    return hours.toString() + ":" + minutes + " " + suffix;
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// From https://usehooks.com/useWindowSize/
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
