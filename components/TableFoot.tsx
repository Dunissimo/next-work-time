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
                <td>{convertToFormat(totalTime)}</td>
                <td>{formatMoney(totalMoney)}</td>
                <td rowSpan={2}>{totalQuota >= 0 ? formattedQuota : `-${formattedQuota}`}</td>
                <td>{formatMoney(+totalMoney / (totalTime / 60))}</td>
            </tr>
            <tr>
                <td>
                    среднее = {convertToFormat(Math.floor(totalTime / Object.values(data).length))}
                </td>
                <td>+ ставка = {formatMoney(totalMoney + 10000)}</td>
                <td>
                    + ставка = {formatMoney(Math.floor((totalMoney + 10000) / (totalTime / 60)))}
                </td>
            </tr>
        </tfoot>
    );
}
