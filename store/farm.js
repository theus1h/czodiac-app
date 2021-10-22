import create from "zustand"

export const useFarmStore = create((set) => ({
  query: "",
  stakedOnly: false,
  finishedOrLive: false,
  sortBy: "",
  setQuery: (query) => set((_) => ({ query })),
  setStakedOnly: (stakedOnly) => set((_) => ({ stakedOnly })),
  setFinishedOrLive: (finishedOrLive) => set((_) => ({ finishedOrLive })),
  setSortBy: (sortBy) => set((_) => ({ sortBy })),
}))
