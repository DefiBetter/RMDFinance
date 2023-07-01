import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import destinationToL0, { ChainId, contracts } from "../statics/contract";
import { TOAST_TYPE, useToastContext } from "../contexts/ToastContext";
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
import { useToaster } from "react-hot-toast/headless";

export default function useBridge(
  value: BigInt,
  amountIn: BigInt,
  fromChainId: ChainId,
  destinationChainId: ChainId
) {
  const { address } = useAccount();
  const toast = useToastContext();

  const preparation = usePrepareContractWrite({
    address: contracts[fromChainId].ocg.address as Address,
    abi: contracts[fromChainId].ocg.abi,
    functionName: "sendFrom",
    args: [
      address,
      destinationToL0(destinationChainId),
      `0x000000000000000000000000${address?.substring(2)}`,
      amountIn,
      [address, NULL_ADDRESS, "0x"],
    ],
    value: value as bigint,
    onError(err) {
      console.error(err);
      toast?.showToast(
        TOAST_TYPE.ERROR,
        "Bridge",
        `Failed to bridge your OCG`,
        chainIdToExplorer(fromChainId),
        transaction.data?.hash as string
      );
    },
  });

  const transaction = useContractWrite({
    ...preparation.config,
    onError(err) {
      console.log("tx error");
      console.error(err);
      toast?.showToast(
        TOAST_TYPE.ERROR,
        "Bridge",
        `Failed to bridge your OCG`,
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
        `Successfully bridge your OCG`,
        transaction.data?.hash as string
      );
    },
  });

  return { confirmation, transaction };
}
