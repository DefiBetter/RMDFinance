import { useNetwork } from "wagmi";
import { BSC, ContractKey, SUPPORTED_CHAIN_IDS } from "../statics/contract";

export default function useChain() {
  function supportedChainId(chainId: number = BSC) : ContractKey {
    return SUPPORTED_CHAIN_IDS.includes(chainId) ? chainId as ContractKey : BSC;
  }

  const { chain } = useNetwork();
  if (chain) return supportedChainId(chain.id);
  return supportedChainId();
}
