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

export function initializeHours() {
    const hours = [];
    for (let i = 0; i < 7; i++) {
        hours.push({ isOpen: true, from: "08:00", to: "17:00" });
    }
    return hours;
}