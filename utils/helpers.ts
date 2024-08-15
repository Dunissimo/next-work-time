// Gets time in format "hh:mm"
// returns in minutes

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
export const convertToFormat = (number: number): string => {
    const tempHours = Math.trunc(number / 60);
    const hours = tempHours >= 10 ? tempHours : `0${tempHours}`;

    const tempMinutes = number % 60;
    const minutes = tempMinutes >= 10 ? tempMinutes : `0${tempMinutes}`;

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

    let timePerDate = 0;
    let moneyPerDate = 0;

    for (let i = 0; i < data.length; i += 2) {
        const time = parseTimeAndConvertToMinutes(data[i]);
        const price = +data[i + 1];

        totalTime += time;
        timePerDate += time;

        const sum = Math.floor(time * (price / 60));

        totalMoney += sum;
        moneyPerDate += sum;
    }

    const quota = totalTime - 360;
    const formattedQuota = convertToFormat(Math.abs(quota));
    totalQuota += quota;

    return {
        totalQuota,
        totalTime,
        totalMoney,
        formattedQuota,
    };
};

export const calcAllData = (data: IData) => {
    let totalTime = 0;
    let totalMoney = 0;
    let totalQuota = 0;

    for (const key in data) {
        const { totalQuota: quota, totalMoney: money, totalTime: time } = calcData(data[key]);

        totalMoney += money;
        totalQuota += quota;
        totalTime += time;
    }

    return {
        totalMoney,
        totalQuota,
        totalTime,
        formattedQuota: convertToFormat(Math.abs(totalQuota)),
    };
};

export const formatQuota = (quota: number): string => {
    if (quota > 0) {
        return `+${convertToFormat(Math.abs(quota))}`;
    } else if (quota < 0) {
        return `-${convertToFormat(Math.abs(quota))}`;
    } else {
        return convertToFormat(Math.abs(quota));
    }
};
