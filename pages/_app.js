import { DAppProvider } from "@pdusedapp/core"
import "../styles/globals.css"

import { CHAINS, MUTICALL_ADDRESSES, RPC_URLS, SUPPORT_CHAINS } from "@constants/index"

const dappConfig = {
  readOnlyChainId: CHAINS.BSCTestnet,
  readOnlyUrls: RPC_URLS,
  supportedChains: SUPPORT_CHAINS,
  multicallAddresses: MUTICALL_ADDRESSES,
}

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return <DAppProvider config={dappConfig}>{getLayout(<Component {...pageProps} />)}</DAppProvider>
}

export default MyApp
