import { API_URL } from "@/utils/consts";
import { IData } from "@/utils/types";

export const getData = async (): Promise<IData> => {
    if (process.env.NODE_ENV === "development") {
        return getDataFromNpoint();
    }

    return getDataFromNpoint("https://api.npoint.io/2333dc1e1d95de6b56a5");
};

const getDataFromNpoint = async (url?: string) => {
    const data = await fetch(url || API_URL || "");

    return data.json();
};
