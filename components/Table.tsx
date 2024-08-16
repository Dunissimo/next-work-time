"use client";

import TableBody from "./TableBody";
import { useEffect, useState } from "react";
import { IData } from "@/utils/types";
import { getData } from "@/api/getData";
import TableFoot from "./TableFoot";

import "@/styles/table.scss";

export default function Table() {
    const [timeData, setData] = useState<IData>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        getData()
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                console.error("Error while fetching data");
            });
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
            {loading ? (
                <tbody>
                    <tr>
                        <td colSpan={5} className="!text-gray-300 text-center">
                            LOADING
                        </td>
                    </tr>
                </tbody>
            ) : (
                <>
                    <TableBody data={timeData} />
                    <TableFoot data={timeData} />
                </>
            )}
        </table>
    );
}
