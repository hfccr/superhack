import { useState } from "react";
import type { NextPage } from "next";
import { Form } from "~~/components/search/Form";
import { NftInfo } from "~~/components/search/NftInfo";

const Search: NextPage = () => {
  const [nftToken, setNftToken] = useState("");
  const [nftTokenId, setNftTokenId] = useState("");
  const onSearch = (nftToken: string, nftTokenId: string) => {
    setNftToken(nftToken);
    setNftTokenId(nftTokenId);
  };
  const showInfo = nftToken.length > 0 && nftTokenId.length > 0;
  return (
    <>
      <div className="grid md:grid-cols-1 flex-shrink px-8">
        <Form onSearch={onSearch} />
        {showInfo && <NftInfo nftToken={nftToken} nftTokenId={nftTokenId} />}
      </div>
    </>
  );
};

export default Search;
