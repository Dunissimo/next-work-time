import { calcData, convertToFormat, formatMoney } from "@/utils/helpers";
import { IData } from "@/utils/types";

interface ITableBodyProps {
    data: IData;
}

export default function TableBody({ data }: ITableBodyProps) {
    return (
        <tbody>
            {Object.entries(data).map(([key, value]) => {
                const { totalQuota, formattedQuota, totalMoney, totalTime } = calcData(value);

                return (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{convertToFormat(totalTime)}</td>
                        <td>{formatMoney(totalMoney)}</td>
                        <td>{totalQuota >= 0 ? formattedQuota : `-${formattedQuota}`}</td>
                        <td>{formatMoney(+totalMoney / (totalTime / 60))}</td>
                    </tr>
                );
            })}
        </tbody>
    );
}
