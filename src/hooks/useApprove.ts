import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { erc20ABI } from "wagmi";
import { TOAST_TYPE, useToastContext } from "../contexts/ToastContext";
import { ChainId, chains } from "../statics/helpers/chains";

export default function useApprove(
  chainId: ChainId,
  amountIn: bigint | undefined,
  token: Address,
  spender: Address
) {
  const toast = useToastContext();

  const preparation = usePrepareContractWrite({
    address: token,
    abi: erc20ABI,
    functionName: "approve",
    args: [spender, amountIn ? amountIn : BigInt("1000000000000000000000000")],
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
        "Approve",
        err.cause ? (err.cause as any).details : `Failed to approve`,
        chains[chainId].explorer,
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
        "Approve",
        `Successfully approved`,
        chains[chainId].explorer,
        transaction.data?.hash as string
      );
    },
  });

  return { confirmation, transaction };
}
