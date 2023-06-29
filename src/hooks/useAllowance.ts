import { Address, useAccount, useContractRead } from "wagmi";
import { contracts } from "../statics/contract";
import { parseEther } from "viem";
import { erc20ABI } from "wagmi";

export default function useAllowance(tokenIn: Address, spender: Address) {
  const { address } = useAccount();

  const { data } = useContractRead({
    address: tokenIn as Address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address as Address, spender],
    watch: true,
  });

  return data ? (data as bigint) : parseEther("0");
}
