import { Address, useAccount, useContractRead } from "wagmi";
import destinationToL0, { ChainId, contracts } from "../statics/contract";
import { hexToBytes, padBytes, toHex } from "viem";

export default function useBridgeEstimateOut(
  amountIn: BigInt,
  fromChainId: ChainId,
  destinationChainId: ChainId | null
) {
  const { address } = useAccount();

  const { data } = useContractRead({
    address: contracts[fromChainId].ocg.address as Address,
    abi: contracts[fromChainId].ocg.abi,
    functionName: "estimateSendFee",
    enabled: (amountIn as bigint) > 0 && destinationChainId != null,
    args: [
      destinationToL0(destinationChainId),
      `0x000000000000000000000000${address?.substring(2)}`,
      amountIn,
      false,
      "0x",
    ],
  });

  const arrayData = data as BigInt[];
  return arrayData ? (arrayData[0] as bigint) : (BigInt(0) as bigint);
}
