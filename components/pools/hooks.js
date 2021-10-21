import { useStore } from "@store/index"
import { usePoolStore } from "@store/pool"
import { selectPools } from "@store/selectors"

export function useFilteredPools() {
  let pools = useStore(selectPools)
  const { stakedOnly, query, finishedOrLive, sortBy } = usePoolStore()
  const currentDate = new Date()

  if (stakedOnly) {
    pools = pools.filter((p) => p.user.czfStaked > 0)
  }

  if (query) {
    pools = pools.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
  }

  if (finishedOrLive) {
    pools = pools.filter((p) => p.timeEnd < currentDate)
  } else {
    pools = pools.filter((p) => p.timeStart <= currentDate && p.timeEnd >= currentDate)
  }

  return pools
}
