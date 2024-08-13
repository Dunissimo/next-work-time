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
                        <td data-text={key}>{key}</td>
                        <td data-text={convertToFormat(totalTime)}>{convertToFormat(totalTime)}</td>
                        <td data-text={formatMoney(totalMoney)}>{formatMoney(totalMoney)}</td>
                        <td data-text={totalQuota >= 0 ? formattedQuota : `-${formattedQuota}`}>
                            {totalQuota >= 0 ? formattedQuota : `-${formattedQuota}`}
                        </td>
                        <td></td>
                    </tr>
                );
            })}
        </tbody>
    );
}
