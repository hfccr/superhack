import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface ITxTableRow {
  type: string;
  blockTimestamp: string;
}

dayjs.extend(relativeTime);

export const TxTableRow = ({ type, blockTimestamp }: ITxTableRow) => {
  const date = new Date(0);
  date.setUTCSeconds(parseInt(blockTimestamp));
  const unknownRating = (
    <div className="rating">
      <img src="/assets/2stars.svg" />
    </div>
  );
  const fairRating = (
    <div className="rating">
      <img src="/assets/3stars.svg" />
    </div>
  );
  const unfairRating = (
    <div className="rating">
      <img src="/assets/1star.svg" />
    </div>
  );
  let rating = unknownRating;
  if (type === "fair") {
    rating = fairRating;
  } else if (type === "unfair") {
    rating = unfairRating;
  }
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{date.toLocaleDateString()}</div>
            <div className="text-sm opacity-50">{dayjs(date).fromNow()}</div>
          </div>
        </div>
      </td>
      <td>
        {rating}
        <br />
        <span className="badge badge-ghost badge-sm">{type}</span>
      </td>
      <th>
        <button className="btn btn-ghost btn-xs">Attest</button>
      </th>
    </tr>
  );
};
