import { useEffect, useState } from "react";

export interface ITransactions {
  interacted_with: string;
  tokenId: string;
  blockTimestamp: string;
}

export interface IFairness {
  score: number;
  fairTransactions: ITransactions[];
  unfairTransactions: ITransactions[];
  unknowTransactions: ITransactions[];
}

export interface IRemoteFairness {
  fetching: boolean;
  success: boolean;
  error: boolean;
  data: IFairness | undefined;
}

const PATH = "https://superhack-nft-fairness-production.up.railway.app/rest/classifier/score?";

export function useNftFairness(nftToken: string, nftTokenId: string) {
  const [fairness, setFairness] = useState<IRemoteFairness>({
    fetching: false,
    error: false,
    success: false,
    data: undefined,
  });
  useEffect(() => {
    const getFairness = async () => {
      setFairness({
        fetching: true,
        success: false,
        error: false,
        data: undefined,
      });
      try {
        const URI =
          PATH +
          new URLSearchParams({
            contractAddress: nftToken,
            tokenIds: nftTokenId,
          });
        const response = await fetch(URI, {
          cache: "no-store",
        });
        const responseObject: IFairness = await response.json();
        setFairness({
          fetching: false,
          success: true,
          error: false,
          data: responseObject,
        });
      } catch (error) {
        setFairness({
          fetching: false,
          success: false,
          error: true,
          data: undefined,
        });
      }
    };
    getFairness();
  }, [nftToken, nftTokenId]);
  return fairness;
}
