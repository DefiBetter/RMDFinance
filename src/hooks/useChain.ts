import { useNetwork } from "wagmi";
import { ChainId, ETH, SUPPORTED_CHAIN_IDS } from "../statics/contract";

export default function useChain() {
  function supportedChainId(chainId: number = ETH) : ChainId {
    return SUPPORTED_CHAIN_IDS.includes(chainId) ? chainId as ChainId : ETH;
  }

  const { chain } = useNetwork();
  if (chain) return supportedChainId(chain.id);
  return supportedChainId();
}
