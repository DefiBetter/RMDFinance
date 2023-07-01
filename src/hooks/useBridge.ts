import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ChainId, chains } from "../statics/helpers/chains";
import { TOAST_TYPE, useToastContext } from "../contexts/ToastContext";
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

export default function useBridge(
  value: BigInt,
  amountIn: BigInt,
  fromChainId: ChainId,
  destinationChainId: ChainId | null
) {
  const { address } = useAccount();
  const toast = useToastContext();

  const l0Id = destinationChainId ? chains[destinationChainId].l0Id : 0;
  const preparation = usePrepareContractWrite({
    address: chains[fromChainId].contracts.ocg.address as Address,
    abi: chains[fromChainId].contracts.ocg.abi,
    functionName: "sendFrom",
    enabled: destinationChainId != null,
    args: [
      address,
      l0Id,
      `0x000000000000000000000000${address?.substring(2)}`,
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
      console.error(err);
      toast?.showToast(
        TOAST_TYPE.ERROR,
        "Bridge",
        err.cause ? (err.cause as any).details : `Failed to bridge your OCG`,
        chains[fromChainId].explorer,
        transaction.data?.hash as string
      );
    },
  });
  const confirmation = useWaitForTransaction({
    confirmations: 2,
    hash: transaction.data?.hash,
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      toast?.showToast(
        TOAST_TYPE.SUCCESS,
        "Bridge",
        `Successfully bridged your OCG`,
        chains[fromChainId].explorer,
        transaction.data?.hash as string
      );
    },
  });

  return { confirmation, transaction };
}
