"use client";

import TableBody from "./TableBody";
import { useEffect, useState } from "react";
import { IData } from "@/utils/types";
import { getData } from "@/api/getData";
import TableFoot from "./TableFoot";

import "@/styles/table.scss";

export default function Table() {
    const [timeData, setData] = useState<IData>({});

    useEffect(() => {
        getData()
            .then((data) => setData(data))
            .catch(() => console.error("Error while fetching data"));
    }, [setData]);

    return (
        <table className="container">
            <thead>
                <tr>
                    <th>Число</th>
                    <th>Время (hh:mm)</th>
                    <th>Деньги</th>
                    <th>Квота (hh:mm)</th>
                    <th>Средняя за час</th>
                </tr>
            </thead>

            <TableBody data={timeData} />
            <TableFoot data={timeData} />
        </table>
    );
}
