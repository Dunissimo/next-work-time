import { calcAllData, calcData, convertToFormat, formatMoney } from "@/utils/helpers";
import { IData } from "@/utils/types";

interface ITableFootProps {
    data: IData;
}

export default function TableFoot({ data }: ITableFootProps) {
    const { totalQuota, formattedQuota, totalMoney, totalTime } = calcAllData(data);

    return (
        <tfoot>
            <tr>
                <td data-text={"Всего"} rowSpan={2}>
                    Всего
                </td>
                <td data-text={convertToFormat(totalTime)} rowSpan={2}>
                    {convertToFormat(totalTime)}
                </td>
                <td data-text={formatMoney(totalMoney)}>{formatMoney(totalMoney)}</td>
                <td data-text={totalQuota >= 0 ? formattedQuota : `-${formattedQuota}`} rowSpan={2}>
                    {totalQuota >= 0 ? formattedQuota : `-${formattedQuota}`}
                </td>
                <td data-text={formatMoney(+totalMoney / (totalTime / 60))}>
                    {formatMoney(+totalMoney / (totalTime / 60))}
                </td>
            </tr>
            <tr>
                <td data-text={`+ ставка = ${formatMoney(totalMoney + 10000)}`}>
                    + ставка = {formatMoney(totalMoney + 10000)}
                </td>
                <td
                    data-text={`+ ставка = ${formatMoney(
                        Math.floor((totalMoney + 10000) / (totalTime / 60))
                    )}`}
                >
                    + ставка = {formatMoney(Math.floor((totalMoney + 10000) / (totalTime / 60)))}
                </td>
            </tr>
        </tfoot>
    );
}
