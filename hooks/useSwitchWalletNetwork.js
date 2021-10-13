import { useEffect } from "react"
import { useEthers } from "@pdusedapp/core"
import { CHAINS } from "@constants/index"

const ALLOWED_NETWORK = CHAINS.BSC

export function switchNetwork(chainId) {
  return new Promise(async (resolve) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
      resolve(true)
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                // other chain info
              },
            ],
          })
          resolve(true)
        } catch (error) {
          resolve(false)
        }
      } else {
        resolve(false)
      }
    }
  })
}

export default function useSwitchWalletNetwork() {
  const { chainId, account } = useEthers()

  useEffect(() => {
    if (account && chainId !== ALLOWED_NETWORK) {
      switchNetwork(ALLOWED_NETWORK)
    }
  }, [chainId, account])
}
