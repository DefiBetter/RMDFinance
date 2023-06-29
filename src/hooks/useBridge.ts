import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ChainId, contracts } from "../statics/contract";
import useChain from "./useChain";

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

export default function useBridge(
  value: BigInt,
  amountIn: BigInt,
  fromChainId: ChainId,
  destinationChain: ChainId
) {
  const { address } = useAccount();
  const chainId = useChain();

  const preparation = usePrepareContractWrite({
    address: contracts[fromChainId].rmdv2.address as Address,
    abi: contracts[fromChainId].rmdv2.abi,
    functionName: "sendFrom",
    args: [
      address,
      destinationChain,
      address,
      amountIn,
      [address, NULL_ADDRESS, "0x"],
    ],
    value: value as bigint,
    onError(err) {
      console.error(err);
    },
  });

  const transaction = useContractWrite({
    ...preparation.config,
    onError(err) {
      console.log("tx error");
      console.error(err);
    },
  });
  const confirmation = useWaitForTransaction({
    confirmations: 2,
    hash: transaction.data?.hash,
    onError(error) {
      console.error(error);
    },
  });

  return { confirmation, transaction };
}
