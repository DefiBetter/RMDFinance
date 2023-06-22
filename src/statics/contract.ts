import pancakeSwapRouterABI from "./abis/pancakeSwapRouter.json";
import pancakeSwapRouterV3ABI from "./abis/pancakeV3Router.json";
import { erc20ABI } from "wagmi";

import wbnbABI from "./abis/wbnb.json";

export const contracts = {
  56: {
    pancakeRouter: {
      address: "0x10ed43c718714eb63d5aa57b78b54704e256024e",
      abi: pancakeSwapRouterABI,
    },
    pancakeRouterV3: {
      address: "0x13f4ea83d0bd40e75c8222255bc855a974568dd4",
      abi: pancakeSwapRouterV3ABI,
    },
    rmd: {
      address: "0xf095E3223fA9d84424dafa4E6EDeE573E7CEf357",
      abi: erc20ABI,
    },
    wbnb: {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      abi: wbnbABI,
    },
  },
};
