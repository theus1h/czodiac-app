import create from "zustand"

export const useStore = create((set, get) => ({
  pools: [],
  farms: [],
  vaults: [],
  setPools: (pools) => {
    set((state) => ({ pools }))
    console.log("setPools", pools)
  },
  setFarms: (farms) => set((state) => ({ farms })),
  setVaults: (vaults) => set((state) => ({ vaults })),
}))
