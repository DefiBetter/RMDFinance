"use client";
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import {
  ARB,
  BSC,
  ChainId,
  ETH,
  POLYGON,
  chainIdToFetchURL,
} from "../statics/contract";

type Web2ContextType = {
  rmdPrice: number | null;
  nativePrice: number | null;
  usdcPrice: number;
  fetchNativePrice: (chainId: ChainId) => Promise<void>;
};

export const Web2Context = createContext<Web2ContextType | null>(null);
export function useWeb2Context() {
  return useContext(Web2Context);
}

type Props = {
  children: ReactNode;
};

export default function Web2Provider({ children }: Props) {
  const [rmdPrice, setRmdPrice] = useState<number | null>(null);
  const [nativePrice, setNativePrice] = useState<number | null>(null);
  const [usdcPrice, setUsdcPrice] = useState<number>(1);

  async function fetchNativePrice(chainId: ChainId) {
    const url = chainIdToFetchURL(chainId);
    if (url) {
      const req = await fetch(url, { next: { revalidate: 10 } });
      const priceData = await req.json();
      setNativePrice(Number(priceData.pairs[0].priceUsd));
    }
  }

  useEffect(() => {
    async function fetchEcosystemPrices() {
      try {
        const rmdReq = await fetch(
          "https://api.dexscreener.com/latest/dex/pairs/bsc/0x766d7ed89297cc97ffbc8101a78438b3d59ae087",
          { next: { revalidate: 10 } }
        );
        const data = await rmdReq.json();
        setRmdPrice(Number(data.pairs[0].priceUsd));
      } catch (e) {
        console.error(e);
      }
    }

    fetchEcosystemPrices();
  }, []);

  return (
    <Web2Context.Provider
      value={{ rmdPrice, nativePrice, usdcPrice, fetchNativePrice }}
    >
      {children}
    </Web2Context.Provider>
  );
}
