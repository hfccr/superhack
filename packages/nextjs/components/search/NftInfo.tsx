import { Address } from "../scaffold-eth";
import { TxTable } from "./TxTable";
import { useNFT } from "@zoralabs/nft-hooks";
import { useNftFairness } from "~~/hooks/scaffold-eth/useNftFairness";

interface IProps {
  nftToken: string;
  nftTokenId: string;
}
export const NftInfo = ({ nftToken, nftTokenId }: IProps) => {
  const { data } = useNFT(nftToken, nftTokenId);
  // const src = `https://embed.zora.co/${nftToken}/${nftTokenId}?title=false&controls=false&loop=false&autoplay=false`;
  const title = data?.metadata?.name ? data?.metadata?.name : data?.nft?.contract?.name;
  const owner = data?.nft?.owner?.address;
  const {
    fetching: fairnessFetching,
    success: fairnessSuccess,
    error: fairnessError,
    data: fairness,
  } = useNftFairness(nftToken, nftTokenId);
  const fair = <img src="/assets/stamp_3.svg" />;
  const unknown = <img src="/assets/stamp_2.svg" />;
  const unfair = <img src="/assets/stamp_1.svg" />;
  let score = <></>;
  if (fairnessSuccess && fairness) {
    if (fairness.score > 0.8) {
      score = fair;
    } else if (fairness.score >= 0.5) {
      score = unknown;
    } else if (fairness.score >= 0) {
      score = unfair;
    }
  }
  return (
    <>
      {/* <NFTPreview id={nftTokenId} contract={nftToken} /> */}
      <>
        <div className="stats shadow stats-vertical lg:stats-horizontal">
          <div className="stat relative istat">
            <div className="scoreboard text-primary rotate-12 absolute z-50">{score}</div>
            <div className="stat-value">{title ? title : "Loading..."}</div>
            <div className="stat-value text-primary pt-4">
              <figure>
                <img
                  className="nimg"
                  src="https://hashmasksstore.blob.core.windows.net/hashmaskspreview/7060.png"
                  alt="Album"
                />
              </figure>
            </div>
            <div className="stat-desc pt-4">{owner && <Address address={owner} />}</div>
          </div>

          <div className="stat">
            {/* <div className="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div> */}
            <div className="stat-value">FAIR-TRADE Current Score</div>
            <div className="stat-value text-primary justify-self-center">
              {fairnessError && <div className="text-red-500">Error loading fairness data</div>}
              {fairnessFetching && <progress className="progress w-56"></progress>}
              {fairnessSuccess && <h1 className="text-8xl">{fairness?.score}</h1>}
            </div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>

          <div className="stat">
            <div className="stat-value">History Of FAIR-TRADE</div>
            <div className="stat-title pt-4">
              {fairnessError && <div className="text-red-500">Error loading fairness data</div>}
              {fairnessFetching && <progress className="progress w-56"></progress>}
              {fairnessSuccess && fairness && (
                <TxTable
                  score={fairness?.score}
                  fairTransactions={fairness?.fairTransactions}
                  unfairTransactions={fairness?.unfairTransactions}
                  unknowTransactions={fairness?.unknowTransactions}
                />
              )}
            </div>
          </div>
        </div>
      </>
    </>
  );
};
