import Link from "next/link";
import type { NextPage } from "next";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">FAIR NFTs</span>
          </h1>
          <img src="/assets/Group_3.svg" className="heroi" />
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
                {" "}
                <Link href="/search" passHref className="link">
                  Check NFT
                </Link>{" "}
                to see if it has been Fairly Traded
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
