import { useFarmStore } from "@store/farm"
import { useStore } from "@store/index"
import { selectFarmState } from "@store/selectors"
import { BigNumber } from "ethers"

export function useFilteredFarms() {
  let farmState = useStore(selectFarmState)
  const { stakedOnly, query, finishedOrLive, sortBy } = useFarmStore()
  const currentDate = new Date()
  let { pools } = farmState

  if (stakedOnly) {
    pools = pools.filter((p) => p.userInfo.amount.lte(BigNumber.from(0)))
  }

  if (query) {
    pools = pools.filter(
      (p) => p.tokens.filter((token) => token.symbol.toLowerCase().includes(query.toLowerCase())).length > 0
    )
  }

  console.log("useFilteredFarms", { pools })

  // if (finishedOrLive) {
  //   pools = pools.filter((p) => p.timeEnd < currentDate)
  // } else {
  //   pools = pools.filter((p) => p.timeStart <= currentDate && p.timeEnd >= currentDate)
  // }

  return {
    ...farmState,
    pools,
  }
}
