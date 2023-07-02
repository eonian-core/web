export enum ChainId {
  SEPOLIA = 11155111,
  BSC_MAINNET = 56,
  UNKNOWN = -1,
}

export namespace ChainId {
  export function toHex(chainId: ChainId): string {
    return '0x' + chainId.toString(16);
  }

  export function parse(value: string | number): ChainId {
    const chainId =
      typeof value === "string" && value.startsWith("0x")
        ? parseInt(value, 16)
        : +value;
    const index = Object.values(ChainId).indexOf(chainId);
    return index < 0 ? ChainId.UNKNOWN : (chainId as ChainId);
  }
}
