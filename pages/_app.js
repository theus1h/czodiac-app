import { DAppProvider } from "@pdusedapp/core"
import "../styles/globals.css"

import { CHAINS, MUTICALL_ADDRESSES, RPC_URLS, SUPPORT_CHAINS } from "@constants/index"
import useCZPools from "@hooks/useCZPools"
import useCZFarmMaster from "@hooks/useCZFarmMaster"

const dappConfig = {
  readOnlyChainId: CHAINS.BSCTestnet,
  readOnlyUrls: RPC_URLS,
  supportedChains: SUPPORT_CHAINS,
  multicallAddresses: MUTICALL_ADDRESSES,
}

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  useCZPools()
  useCZFarmMaster()

  return getLayout(<Component {...pageProps} />)
}

export default function WrappedApp({ Component, pageProps }) {
  return (
    <DAppProvider config={dappConfig}>
      <MyApp Component={Component} pageProps={pageProps} />
    </DAppProvider>
  )
}
