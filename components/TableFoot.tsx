import { BASE_MONEY } from "@/utils/consts";
import { calcAllData, calcData, convertToFormat, formatMoney, formatQuota } from "@/utils/helpers";
import { IData } from "@/utils/types";

interface ITableFootProps {
    data: IData;
}

export default function TableFoot({ data }: ITableFootProps) {
    const { totalQuota, totalMoney, totalTime } = calcAllData(data);

    if (!Object.values(data).length) {
        return null;
    }

    return (
        <tfoot>
            <tr>
                <td rowSpan={2}>Всего</td>
                <td>{convertToFormat(totalTime)}</td>
                <td>{formatMoney(totalMoney)}</td>
                <td rowSpan={2}>{formatQuota(totalQuota)}</td>
                <td>{formatMoney(+totalMoney / (totalTime / 60))}</td>
            </tr>
            <tr>
                <td>
                    среднее = {convertToFormat(Math.floor(totalTime / Object.values(data).length))}
                </td>
                <td>+ ставка = {formatMoney(totalMoney + BASE_MONEY)}</td>
                <td>
                    + ставка ={" "}
                    {formatMoney(Math.floor((totalMoney + BASE_MONEY) / (totalTime / 60)))}
                </td>
            </tr>
        </tfoot>
    );
}
