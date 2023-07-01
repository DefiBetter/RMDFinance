import pancakeSwapRouterABI from "./abis/pancakeSwapRouter.json";
import pancakeSwapRouterV3ABI from "./abis/pancakeV3Router.json";
import ocgABI from "./abis/ocg.json";
import { erc20ABI } from "wagmi";

export const BSC = 56;
export const ARB = 42161;
export const ETH = 1;
export const POLYGON = 137;
export const SUPPORTED_CHAIN_IDS = [BSC, ARB, ETH, POLYGON];
export type ChainId = keyof typeof contracts;

export default function destinationToL0(destinationChainId: ChainId | null) {
  if (destinationChainId) {
    if (destinationChainId === ETH) {
      return 101;
    } else if (destinationChainId === BSC) {
      return 102;
    } else if (destinationChainId === ARB) {
      return 110;
    } else if (destinationChainId === POLYGON) {
      return 109;
    }
  }
}

export function chainIdToFetchURL(chainId: ChainId) {
  if (chainId === ETH) {
    return "https://api.dexscreener.com/latest/dex/pairs/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";
  } else if (chainId === BSC) {
    return "https://api.dexscreener.com/latest/dex/pairs/bsc/0x58f876857a02d6762e0101bb5c46a8c1ed44dc16";
  } else if (chainId === ARB) {
    return "https://api.dexscreener.com/latest/dex/pairs/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";
  } else if (chainId === POLYGON) {
    return "https://api.dexscreener.com/latest/dex/pairs/ethereum/0x290a6a7460b308ee3f19023d2d00de604bcf5b42";
  }
}
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
    ocg: {
      address: "0x51634f430f6acdd6ffb1e05e2824539d514b6086",
      abi: ocgABI,
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
    ocg: {
      address: "0xf095E3223fA9d84424dafa4E6EDeE573E7CEf357",
      abi: ocgABI,
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
    ocg: {
      address: "0xf095E3223fA9d84424dafa4E6EDeE573E7CEf357",
      abi: ocgABI,
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
  137: {
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
    ocg: {
      address: "0x65b1352751793b21598df2ab78f8e881876d1f86",
      abi: ocgABI,
    },
    wnative: {
      address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      abi: erc20ABI,
    },
    usdc: {
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      abi: erc20ABI,
    },
  },
};
