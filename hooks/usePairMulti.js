import { useEffect, useState } from "react"
import { useEthers } from "@pdusedapp/core"
import { Contract } from "ethers"
import { CHAINS, UNISWAPFACTORY_ADDRESSES } from "@constants/index"
import { abi as IUniswapV2FactoryABI } from "@uniswap/v2-core/build/IUniswapV2Factory.json"

function usePairMulti(tokenAs, tokenBs) {
  const { chainId, account, library } = useEthers()
  const [pairs, setPairs] = useState([])

  useEffect(() => {
    if (chainId != CHAINS.BSC || !account) {
      setPairs([])
      return
    }
    const factory = new Contract(UNISWAPFACTORY_ADDRESSES[chainId], IUniswapV2FactoryABI, library)
    ;(async () => {
      const result = await Promise.all(tokenAs.map((p, i) => factory.getPair(tokenAs[i], tokenBs[i])))
      setPairs(result)
    })()
  }, [chainId, account])

  return pairs
}
export default usePairMulti
