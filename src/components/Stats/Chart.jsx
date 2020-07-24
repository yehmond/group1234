import React from "react";
import { XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import Title from "./Title";
import Legend from "recharts/lib/component/Legend";
import Bar from "recharts/lib/cartesian/Bar";
import BarChart from "recharts/lib/chart/BarChart";
import { CALENDAR_COLORS, SERVICES_OFFERED } from "../../utils/constants";
import _ from "lodash";

function reservationsToDatePoints(reservations, barbers) {
    // initialize columns
    const data = new Map();
    for (let barber of barbers) {
        data.set(barber.barber_id, { name: barber.name, total: 0 });
    }
    // add the data points
    for (let reservation of reservations) {
        data.get(reservation.barber_id).total += 1;
        if (data.get(reservation.barber_id)[reservation.service])
            data.get(reservation.barber_id)[reservation.service] += 1;
        else data.get(reservation.barber_id)[reservation.service] = 1;
    }
    return data;
}

function round5(x) {
    return Math.ceil(x / 5) * 5;
}

export default function Chart(props) {
    const data = [
        ...reservationsToDatePoints(props.reservations, props.barbers).values(),
    ];
    const largest = Math.max(..._.map(data, "total"));
    const tickMarks = _.range(0, round5(largest) + 1, 5);

    return (
        <React.Fragment>
            <Title>Barber Breakdown</Title>
            <ResponsiveContainer minHeight={200}>
                <BarChart data={data} barCategoryGap={"10%"} barGap={"1%"}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, round5(largest)]} ticks={tickMarks} />
                    <Tooltip />
                    <Legend />

                    {SERVICES_OFFERED.map((key, index) => {
                        return (
                            <Bar
                                key={index}
                                dataKey={key}
                                stackId="a"
                                fill={CALENDAR_COLORS[index]}
                                maxBarSize={50}
                            />
                        );
                    })}
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
