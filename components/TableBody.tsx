import { calcData, convertToFormat, formatMoney, formatQuota } from "@/utils/helpers";
import { IData } from "@/utils/types";

interface ITableBodyProps {
    data: IData;
}

export default function TableBody({ data }: ITableBodyProps) {
    if (!Object.values(data).length) {
        return (
            <tbody>
                <tr>
                    <td colSpan={5} className="custom text-center !text-xl">
                        Произошла ошибка! <br />
                        Не удалось загрузить данные
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {Object.entries(data).map(([key, value]) => {
                const { totalQuota, totalMoney, totalTime } = calcData(value);

                return (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{convertToFormat(totalTime)}</td>
                        <td>{formatMoney(totalMoney)}</td>
                        <td>{formatQuota(totalQuota)}</td>
                        <td>{formatMoney(totalMoney / (totalTime / 60))}</td>
                    </tr>
                );
            })}
        </tbody>
    );
}
