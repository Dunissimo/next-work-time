// Gets time in format "hh:mm"
// returns in minutes

import { BASE_QUOTA_TIME } from "./consts";
import { IData, IDataItem } from "./types";

// E.g: "01:25" => 85
export const parseTimeAndConvertToMinutes = (time: string): number => {
    const splittedTime = time.split(":");
    const hours = Number.parseInt(splittedTime[0], 10);
    const minutes = Number.parseInt(splittedTime[1], 10);

    return hours * 60 + minutes;
};

// Gets time in minutes
// returns in format "hh:mm"
// E.g: 85 => "01:25"
export const convertToFormat = (n: number) => {
    const hours = String(Math.floor(n / 60)).padStart(2, "0");
    const minutes = String(n % 60).padStart(2, "0");

    return `${hours}:${minutes}`;
};

export const formatMoney = (value: number): string => {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
    }).format(value);
};

export const calcData = (data: IDataItem) => {
    let totalTime = 0;
    let totalMoney = 0;
    let totalQuota = 0;

    for (let i = 0; i < data.length; i += 2) {
        const time = parseTimeAndConvertToMinutes(data[i]);
        const price = +data[i + 1];

        totalTime += time;
        totalMoney += Math.floor(time * (price / 60));
    }

    totalQuota += totalTime - BASE_QUOTA_TIME;

    return {
        totalQuota,
        totalTime,
        totalMoney,
        formattedQuota: convertToFormat(Math.abs(totalQuota)),
    };
};

export const calcAllData = (data: IData) => {
    return Object.values(data).reduce(
        (prev, items) => {
            const { totalMoney, totalQuota, totalTime } = calcData(items);

            return {
                totalMoney: prev.totalMoney + totalMoney,
                totalQuota: prev.totalQuota + totalQuota,
                totalTime: prev.totalTime + totalTime,
            };
        },
        { totalMoney: 0, totalQuota: 0, totalTime: 0 }
    );
};

export const formatQuota = (quota: number): string => {
    const absQuota = Math.abs(quota);
    const sign = quota < 0 ? "-" : quota === 0 ? "" : "+";

    return `${sign}${convertToFormat(absQuota)}`;
};
