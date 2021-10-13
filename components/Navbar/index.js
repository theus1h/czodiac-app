import React, { useEffect } from "react"
import Image from "next/image"
import { useEthers } from "@pdusedapp/core"
import CZodiacLogo from "assets/czodiac-logo.png"
import Button from "@components/Button"
import { Home } from "@components/Icons"
import { useReconnectWallet, useSwitchWalletNetwork } from "@hooks/index"
import { shortenWalletAddress } from "@utils/string"
import { removeWalletAddress } from "@hooks/useReconnectWallet"

function Navbar() {
  const { activateBrowserWallet, account, deactivate } = useEthers()

  const handleDisconnect = () => {
    deactivate()
    removeWalletAddress()
  }

  useReconnectWallet()
  useSwitchWalletNetwork()

  return (
    <div className="flex justify-between px-[48px] py-[20px] items-center fixed top-0 w-full shadow-bottom">
      <div className="flex items-center">
        <Image src={CZodiacLogo} alt="CZodiac" width={56} height={56} />
        <span className="ml-3 font-semibold text-header">CZodiac</span>
      </div>
      <div>
        {account ? (
          <Button className="text-primary-500 bg-primary-100" onClick={handleDisconnect}>
            {shortenWalletAddress(account)}
          </Button>
        ) : (
          <Button bordered className="" leftIcon={<Home />} onClick={activateBrowserWallet}>
            Connect
          </Button>
        )}
      </div>
    </div>
  )
}

export default Navbar
