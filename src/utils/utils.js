import { useEffect, useState } from "react";
import { CALENDAR_COLORS, DAYS_OF_WEEK_ABBR, MONTHS_OF_YEAR } from "./constants";
import moment from "moment";

export function convert24HrTo12Hr(time) {
    let hours = parseInt(time.substr(0, 2));
    const minutes = time.substr(2);
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

export function initializeHours() {
    const hours = [];
    for (let i = 0; i < 7; i++) {
        hours.push({ isOpen: true, from: "0800", to: "1700" });
    }
    return hours;
}

export function hoursToString(hours) {
    let retObj = {};
    hours.forEach((day, index) => {
        const dayAbr = DAYS_OF_WEEK_ABBR[index];
        if (day.isOpen) {
            retObj[dayAbr] =
                dayAbr +
                " - " +
                convert24HrTo12Hr(day.from) +
                " to " +
                convert24HrTo12Hr(day.to);
        } else {
            retObj[dayAbr] = "Closed";
        }
    });
    return retObj;
}

export function addColonTime(time) {
    if (time.length !== 4) {
        return "";
    } else {
        const hours = time.substring(0, 2);
        const minutes = time.substring(2);
        return hours + ":" + minutes;
    }
}

export function stringTimeToLocalTime(str) {
    if (str === null || str === undefined || str === "" || str === " ") {
        return "0000";
    }
}

export function refreshPage() {
    window.location.reload();
}

export function parseSearchURL() {
    const params = new URLSearchParams(window.location.search);
    const queryParams = {};

    for (const [key, value] of params) {
        switch (key) {
            case "price":
                queryParams.price = value
                    .split(",")
                    .map((str) => Number(str))
                    .filter((num) => [1, 2, 3].includes(num))
                    .sort();
                break;
            case "services":
                if (value) {
                    queryParams.services = value.split(",");
                }
                break;
            case "rating":
                // eslint-disable-next-line no-case-declarations
                const rating = Number(value);
                if (rating >= 1 && rating <= 5) {
                    queryParams.rating = rating;
                }
                break;
            case "neighbourhoods":
                if (value.length !== 0) {
                    queryParams.neighbourhoods = value.split(",");
                }
                break;
            case "page":
                queryParams.page = Number(value);
                break;
            default:
                break;
        }
    }
    return queryParams;
}

export function setQueryString(param, history, replace = false) {
    const currParam = parseSearchURL();

    const newParam = {
        ...currParam,
        ...param,
    };

    if (!param.page) {
        delete newParam.page;
    }

    const newUrl = window.location.pathname + `?${convertToQueryString(newParam)}`;

    if (replace) {
        history.replace(newUrl);
    } else {
        history.push(newUrl);
    }
}

export function convertToQueryString(queryObj) {
    const query = Object.keys(queryObj)
        .map((key) => {
            return key + "=" + encodeURIComponent(queryObj[key]);
        })
        .join("&");

    return query;
}

export function getBarberColor(barbers) {
    if (barbers === null || barbers === undefined) {
        return null;
    }
    // assign colors to barbers
    const colors = {};
    let i = 0;
    for (let barber of barbers) {
        colors[barber.barber_id] = CALENDAR_COLORS[i % CALENDAR_COLORS.length];
        i++;
    }
    return colors;
}

export function convertReservationToEvent(barbers, reservation) {
    const colors = getBarberColor(barbers);
    return {
        title: reservation.user_name,
        start: new Date(reservation.from),
        end: new Date(reservation.to),
        allDay: false,
        barber_id: reservation.barber_id,
        service: reservation.service,
        color: colors[reservation.barber_id],
    };
}

// returns tuple, [0] is earliest, [1] is latest
export function getEarliestAndLatest(hours) {
    if (hours === null || hours === undefined) {
        return [null, null];
    }
    const minTime = new Date();
    const maxTime = new Date();
    let alwaysClosed = false;
    let earliestTime = hours[0].from;
    let latestTime = hours[0].to;
    for (let day of hours) {
        if (day.isOpen) {
            alwaysClosed = false;
            const todayOpen = day.from;
            const todayClose = day.to;
            earliestTime =
                parseInt(earliestTime) > parseInt(day.from)
                    ? todayOpen
                    : earliestTime;
            latestTime =
                parseInt(latestTime) < parseInt(day.to) ? todayClose : latestTime;
        }
    }
    if (alwaysClosed) {
        minTime.setHours(7, 0, 0);
        maxTime.setHours(18, 0, 0);
    } else {
        // extract the hours and minutes
        let earliestHours = parseInt(earliestTime.substring(0, 2));
        let earliestMins = parseInt(earliestTime.substring(2));
        let latestHours = parseInt(latestTime.substring(0, 2));
        let latestMins = parseInt(latestTime.substring(2));
        minTime.setHours(earliestHours, earliestMins, 0);
        maxTime.setHours(latestHours, latestMins, 0);
    }
    return [minTime, maxTime];
}

export function reservationDate(reservation) {
    const date = new Date(reservation.to);
    return (
        MONTHS_OF_YEAR[date.getMonth()] +
        " " +
        date.getDate() +
        ", " +
        date.getFullYear()
    );
}

export function reservationBarber(barbers, reservation) {
    const barber = barbers.find(
        (barber) => barber.barber_id === reservation.barber_id
    );
    return barber.name;
}

export function sortReservations(reservations) {
    return reservations.sort((a, b) => {
        return new Date(b.to) - new Date(a.to);
    });
}

export function convertDateToString(date) {
    return moment(date).format("MMMM Do YYYY, h:mm a");
}
