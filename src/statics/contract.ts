import pancakeSwapRouterABI from "./abis/pancakeSwapRouter.json";
import pancakeSwapRouterV3ABI from "./abis/pancakeV3Router.json";
import rmdv2ABI from "./abis/rmdv2.json";
import { erc20ABI } from "wagmi";

export const BSC = 56;
export const ARB = 42161;
export const ETH = 1;
export const SUPPORTED_CHAIN_IDS = [BSC, ARB, ETH];
export type ChainId = keyof typeof contracts;

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
    rmdv2: {
      address: "0xf095E3223fA9d84424dafa4E6EDeE573E7CEf357",
      abi: rmdv2ABI,
    },
    wnative: {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      abi: erc20ABI,
    },
    usdc: {
      address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      abi: erc20ABI,
    },
  },
  42161: {
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
    rmdv2: {
      address: "0xf095E3223fA9d84424dafa4E6EDeE573E7CEf357",
      abi: rmdv2ABI,
    },
    wnative: {
      address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
      abi: erc20ABI,
    },
    usdc: {
      address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
      abi: erc20ABI,
    },
  },
  1: {
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
    rmdv2: {
      address: "0xf095E3223fA9d84424dafa4E6EDeE573E7CEf357",
      abi: rmdv2ABI,
    },

    wnative: {
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      abi: erc20ABI,
    },
    usdc: {
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      abi: erc20ABI,
    },
  },
};
