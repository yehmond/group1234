import { DAYS_OF_WEEK_ABBR } from "./constants";

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
