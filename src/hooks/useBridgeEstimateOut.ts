import { Address, useAccount, useContractRead } from "wagmi";
import { hexToBytes, padBytes, toHex } from "viem";
import { ChainId, chains } from "../statics/helpers/chains";

export default function useBridgeEstimateOut(
  amountIn: BigInt,
  fromChainId: ChainId,
  destinationChainId: ChainId | null
) {
  const { address } = useAccount();

  const l0Id = destinationChainId ? chains[destinationChainId].l0Id : 0;

  const { data } = useContractRead({
    address: chains[fromChainId].contracts.ocg.address as Address,
    abi: chains[fromChainId].contracts.ocg.abi,
    functionName: "estimateSendFee",
    enabled: (amountIn as bigint) > 0 && destinationChainId != null,
    args: [
      l0Id,
      `0x000000000000000000000000${address?.substring(2)}`,
      amountIn,
      false,
      "0x",
    ],
  });

  const arrayData = data as BigInt[];
  return arrayData ? (arrayData[0] as bigint) : (BigInt(0) as bigint);
}
