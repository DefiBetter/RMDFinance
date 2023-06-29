import { MerkleTree } from "merkletreejs";
import { Address, keccak256 } from "viem";

export default function useMerkleProof(address: Address) {
  const leavesString = process.env.NEXT_PUBLIC_WHITELIST;
  if (leavesString && address) {
    const leaves = leavesString?.split(",").map((x) => keccak256(x as Address));

    const tree = new MerkleTree(leaves, keccak256);
    const root = tree.getRoot().toString("hex");
    const leaf = keccak256(address);
    const proof = tree.getProof(leaf);
    return { proof, whitelisted: tree.verify(proof, leaf, root) };
  }
  return { proof: null, whitelisted: false };
}
