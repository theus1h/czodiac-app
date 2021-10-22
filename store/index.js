import create from "zustand"

export const useStore = create((set, get) => ({
  pools: [],
  farmState: {
    pools: [],
  },
  farmActions: {},
  vaults: [],
  setPools: (pools) => {
    set((state) => ({ pools }))
    console.log("setPools", pools)
  },
  setVaults: (vaults) => set((state) => ({ vaults })),
  setFarmState: (farmState) => set((_) => ({ farmState })),
  setFarmActions: (key, action) => set((_) => ({ [key]: action })),
}))
