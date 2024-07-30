import { TokenSymbol } from "@/types"
import { FC } from "react"

/** Converts real token symbol to symbol that understandable by human */
export const DisplaySymbol: FC<{children: TokenSymbol}> = ({children: symbol}) => {
    if(symbol === 'BTCB') {
      return 'BTC'
    }
  
    return symbol
  }
  