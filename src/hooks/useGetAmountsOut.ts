import { Address, useContractRead, useNetwork } from "wagmi";
import { contracts } from "../statics/contract";

export default function useGetAmountsOut(
  amountIn: BigInt,
  path: [string, string]
) {
  const { data } = useContractRead({
    address: contracts[56].pancakeRouter.address as Address,
    abi: contracts[56].pancakeRouter.abi,
    functionName: "getAmountsOut",
    args: [amountIn, path],
  });

  const arrayData = data as BigInt[];
  return arrayData ? (arrayData[1] as bigint) : BigInt(0) as bigint;
}
