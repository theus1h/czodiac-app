import { useEffect, useState } from "react"
import { useEthers } from "@pdusedapp/core"
import { Contract } from "ethers"
import { CHAINS, UNISWAPFACTORY_ADDRESSES } from "@constants/index"
import { abi as IUniswapV2FactoryABI } from "@uniswap/v2-core/build/IUniswapV2Factory.json"

function usePair(tokenA, tokenB) {
  const { chainId, account, library } = useEthers()

  const [pair, setPair] = useState(null)

  useEffect(() => {
    if (chainId != CHAINS.BSC || !account) {
      setPair(null)
      return
    }
    const factory = new Contract(UNISWAPFACTORY_ADDRESSES[chainId], IUniswapV2FactoryABI, library)
    ;(async () => {
      const result = await factory.getPair(tokenA, tokenB)
      setPair(result)
    })()
  }, [chainId, account, tokenA, tokenB])

  return pair
}
export default usePair
