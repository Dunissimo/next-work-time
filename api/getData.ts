import { API_URL } from "@/utils/consts";
import { IData } from "@/utils/types";

export const getData = async (): Promise<IData> => {
    const data = await fetch(API_URL || "");

    return data.json();
};
