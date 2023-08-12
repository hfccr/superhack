import { Address } from "../scaffold-eth";
import { useNFT } from "@zoralabs/nft-hooks";

interface IProps {
  nftToken: string;
  nftTokenId: string;
}
export const NftInfo = ({ nftToken, nftTokenId }: IProps) => {
  const { data } = useNFT(nftToken, nftTokenId);
  const src = `https://embed.zora.co/${nftToken}/${nftTokenId}?title=false&controls=false&loop=false&autoplay=false`;
  const title = data?.metadata?.name ? data?.metadata?.name : data?.nft?.contract?.name;
  const owner = data?.nft?.owner?.address;
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
              <button className="btn btn-primary">Listen</button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};
