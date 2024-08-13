// Gets time in format "hh:mm"
// returns in minutes
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
