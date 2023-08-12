import { useState } from "react";

interface IProps {
  onSearch: (nftToken: string, nftTokenId: string) => void;
}

const DEFAULT_CONTRACT = "0xc2c747e0f7004f9e8817db2ca4997657a7746928";
const DEFAULT_TOKEN_ID = "13303";

export const Form = ({ onSearch }: IProps) => {
  const [nftContract, setNftContract] = useState(DEFAULT_CONTRACT);
  const [nftTokenId, setNftTokenId] = useState(DEFAULT_TOKEN_ID);
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(nftContract, nftTokenId);
  };
  return (
    <div className="flex flex-col mt-6 px-7 py-8 bg-base-200">
      <span className="text-4xl sm:text-6xl text-black">Lookup Token</span>
      <form onSubmit={handleSearch} className="flex items-center justify-end mb-5 space-x-3">
        <input
          className="border-primary bg-base-100 text-base-content p-2 mr-2 w-full md:w-1/2 lg:w-1/3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-accent"
          type="text"
          value={nftContract}
          placeholder="Enter Contract Address"
          onChange={e => setNftContract(e.target.value)}
        />
        <input
          className="border-primary bg-base-100 text-base-content p-2 mr-2 w-full md:w-1/2 lg:w-1/3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-accent"
          type="text"
          value={nftTokenId}
          placeholder="Enter Token ID"
          onChange={e => setNftTokenId(e.target.value)}
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
