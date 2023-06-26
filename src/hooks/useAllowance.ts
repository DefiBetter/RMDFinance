import { Address, useAccount, useContractRead } from "wagmi";
import { contracts } from "../statics/contract";
import { parseEther } from "viem";

export default function useAllowance(tokenIn: string, spender: string) {
  const { address } = useAccount();

  const { data } = useContractRead({
    address: tokenIn as Address,
    abi: contracts[56].rmd.abi,
    functionName: "allowance",
    args: [address as Address, spender as Address],
    watch: true,
  });

  return data ? (data as bigint) : parseEther("0");
}
