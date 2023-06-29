import { MerkleTree } from "merkletreejs";
import { Address, keccak256 } from "viem";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { contracts } from "../statics/contract";
import useChain from "./useChain";
import useMerkleProof from "./useMerkleProof";

export default function useBuyPresale(tokenIn: string, amountIn: BigInt) {
  const { address } = useAccount();
  const { proof, whitelisted } = useMerkleProof(address as Address);
  const chain = useChain();

  const preparation = usePrepareContractWrite({
    address: contracts[chain].pancakeRouterV3.address as Address,
    abi: contracts[chain].pancakeRouterV3.abi,
    functionName: "buy",
    args: [tokenIn, amountIn, proof],
    enabled: whitelisted,
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
