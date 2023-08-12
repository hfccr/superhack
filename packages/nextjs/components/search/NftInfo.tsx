import { Address } from "../scaffold-eth";
import { useNFT } from "@zoralabs/nft-hooks";
import { useNftFairness } from "~~/hooks/scaffold-eth/useNftFairness";

interface IProps {
  nftToken: string;
  nftTokenId: string;
}
export const NftInfo = ({ nftToken, nftTokenId }: IProps) => {
  const { data } = useNFT(nftToken, nftTokenId);
  const src = `https://embed.zora.co/${nftToken}/${nftTokenId}?title=false&controls=false&loop=false&autoplay=false`;
  const title = data?.metadata?.name ? data?.metadata?.name : data?.nft?.contract?.name;
  const owner = data?.nft?.owner?.address;
  const {
    fetching: fairnessFetching,
    success: fairnessSuccess,
    error: fairnessError,
    data: fairness,
  } = useNftFairness(nftToken, nftTokenId);
  return (
    <>
      <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 ">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            {/* <img src="/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/> */}
            <div className="nft-embed-container">
              <div className="nft-embed-wrapper">
                <iframe
                  src={src}
                  height="100%"
                  sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-popups"
                ></iframe>
                <div></div>
              </div>
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{title ? title : "Loading..."}</h2>
            <p>{data?.metadata?.description}</p>
            {owner && <Address address={owner} />}
            <div className="card-actions justify-end">
              {fairnessFetching && <span className="loading loading-spinner loading-xs"></span>}
              {fairnessError && (
                <div className="alert alert-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Error! Failed to fetch fairness score</span>
                </div>
              )}
              {fairnessSuccess && <button className="btn btn-primary">{fairness?.score}</button>}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};
