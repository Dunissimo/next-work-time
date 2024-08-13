import { IData } from "@/utils/types";

export const getData = async (): Promise<IData> => {
    const { default: data } = await (process.env.NODE_ENV === "development"
        ? import("../data.json", { assert: { type: "json" } })
        : import("../data.example.json", { assert: { type: "json" } }));

    return data;
};
