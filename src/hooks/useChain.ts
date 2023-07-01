import { useNetwork } from "wagmi";
import { ChainId, ETH, SUPPORTED_CHAIN_IDS } from "../statics/helpers/chains";
import { useEffect } from "react";
import { useWeb2Context } from "../contexts/web2Context";

export default function useChain() {
  const { chain } = useNetwork();
  const web2Context = useWeb2Context();

  // Updating chaind and fetching native price when switching chain
  useEffect(() => {
    if (chain && web2Context && SUPPORTED_CHAIN_IDS.includes(chain?.id)) {
      web2Context.fetchNativePrice(chain.id as ChainId);
    }
  }, [chain, web2Context]);

  function supportedChainId(chainId: number = ETH): ChainId {
    return SUPPORTED_CHAIN_IDS.includes(chainId) ? (chainId as ChainId) : ETH;
  }

  if (chain) return supportedChainId(chain.id);
  return supportedChainId();
}
