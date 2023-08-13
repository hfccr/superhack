import { TxTableRow } from "./TxTableRow";
import { IFairness } from "~~/hooks/scaffold-eth/useNftFairness";

export const TxTable = ({ fairTransactions, unfairTransactions, unknowTransactions }: IFairness) => {
  const fairTxs = fairTransactions.map(tx => ({ ...tx, type: "fair" }));
  const unfairTxs = unfairTransactions.map(tx => ({ ...tx, type: "unfair" }));
  const unknowTxs = unknowTransactions.map(tx => ({ ...tx, type: "unknown" }));
  const combined = [...fairTxs, ...unfairTxs, ...unknowTxs];
  const sorted = combined.sort((a, b) => parseInt(b.blockTimestamp) - parseInt(a.blockTimestamp));
  const rows = sorted.map((tx, index) => {
    const { type, blockTimestamp } = tx;
    return <TxTableRow key={index} type={type} blockTimestamp={blockTimestamp} index={index} />;
  });
  return (
    <div className="overflow-x-auto h-96 w-auto overflow-y-scroll">
      <table className="table table-pin-cols table-pin-rows fill-available">
        {/* head */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Fair-Trade Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>Date</th>
            <th>FAIR-TRADE Grade</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
