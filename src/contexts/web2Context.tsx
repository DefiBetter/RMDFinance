"use client";
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";

type Web2ContextType = {
  rmdPrice: number | null;
  wNativePrice: number | null;
  usdcPrice: number;
};

const web2ContextDefaultValues: Web2ContextType = {
  rmdPrice: null,
  wNativePrice: null,
  usdcPrice: 1,
};

export const Web2Context = createContext<Web2ContextType>(
  web2ContextDefaultValues
);
export function useWeb2Context() {
  return useContext(Web2Context);
}

type Props = {
  children: ReactNode;
};

export default function Web2Provider({ children }: Props) {
  const [rmdPrice, setRmdPrice] = useState<number | null>(null);
  const [wNativePrice, setWNativePrice] = useState<number | null>(null);
  const [usdcPrice, setUsdcPrice] = useState<number>(1);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const rmdReq = await fetch(
          "https://api.dexscreener.com/latest/dex/pairs/bsc/0x766d7ed89297cc97ffbc8101a78438b3d59ae087",
          { next: { revalidate: 10 } }
        );
        const data = await rmdReq.json();
        setRmdPrice(Number(data.pairs[0].priceUsd));

        const bnbReq = await fetch(
          "https://api.dexscreener.com/latest/dex/pairs/bsc/0x58f876857a02d6762e0101bb5c46a8c1ed44dc16",
          { next: { revalidate: 10 } }
        );
        const bnbData = await bnbReq.json();
        setWNativePrice(Number(bnbData.pairs[0].priceUsd));
      } catch (e) {
        console.error(e);
      }
    }

    fetchPrices();
  }, []);

  return (
    <Web2Context.Provider value={{ rmdPrice, wNativePrice, usdcPrice }}>
      {children}
    </Web2Context.Provider>
  );
}
