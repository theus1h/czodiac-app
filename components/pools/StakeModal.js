import Image from "next/image"
import CZodiacLogo from "assets/czodiac-logo.png"
import Modal from "@components/common/Modal"
import { weiToShortString, toString, decimalStringToBn } from "@utils/bnDisplay"
import NumberInput from "@components/common/Input/NumberInput"
import Button from "@components/common/Button"
import SvgInfoOutline from "@components/Icons/InfoOutline"
import React from "react"
import { CZFARM_ADDRESSES, CHAINS } from "@constants/index"

function CZFRequired() {
  const handleBuyClick = () => {
    window.open(`https://pancakeswap.finance/swap#/swap?outputCurrency=${CZFARM_ADDRESSES[CHAINS.BSC]}`, "_blank")
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex space-x-6">
        <div className="justify-center flex-1 text-center">
          <div className="text-body text-black-neutral-1000">CZF Balance</div>
          <div className="flex items-center justify-center">
            <span className="mr-2 font-semibold text-input1 text-black-neutral-1000">0.0000</span>
            <Image src={CZodiacLogo} alt="CZodiac" width={24} height={24} />
          </div>
        </div>
      </div>
      <p className="font-semibold text-center text-body text-error-500 opacity-60">
        You have insufficient CZF Balance. <br /> You can buy more CZF or withdraw from another pool.
      </p>
      <Button className="w-full text-white-neutral-0" background="accent-400" onClick={handleBuyClick}>
        Buy CZF
      </Button>
    </div>
  )
}
export default function StakeModal({ czfStaked, czfBal, children, tokenDecimals = 18, title, onConfirm, ...pass }) {
  const [amount, setAmount] = React.useState(toString(czfBal))

  const handleMaxClick = () => {
    setAmount(toString(czfBal))
  }

  const handleConfirmClick = () => {
    onConfirm(decimalStringToBn(amount, tokenDecimals))
  }

  const isBalZero = czfBal.isZero()

  return (
    <Modal title={isBalZero ? "CZF Required" : title} {...pass}>
      {isBalZero ? (
        <CZFRequired />
      ) : (
        <div className="flex flex-col space-y-6">
          <div className="flex space-x-6">
            <div className="justify-center flex-1 text-center">
              <div className="text-body text-black-neutral-1000">CZF Balance</div>
              <div className="flex items-center justify-center">
                <span className="mr-2 font-semibold text-input1 text-black-neutral-1000">
                  {weiToShortString(czfBal, 2)}
                </span>
                <Image src={CZodiacLogo} alt="CZodiac" width={24} height={24} />
              </div>
            </div>
            <div className="justify-center flex-1 text-center">
              <div className="text-body text-black-neutral-1000">Staked Balance</div>
              <div className="flex items-center justify-center">
                <span className="mr-2 font-semibold text-input1 text-black-neutral-1000">
                  {weiToShortString(czfStaked, 2)}
                </span>
                <Image src={CZodiacLogo} alt="CZodiac" width={24} height={24} />
              </div>
            </div>
          </div>
          <NumberInput
            className="w-full"
            tokenSymbol="CZF"
            value={amount}
            onValueChange={(obj) => setAmount(obj.value)}
            isAllowed={({ value }) => decimalStringToBn(value, tokenDecimals).lte(czfBal)}
            suffix={
              <div
                className="font-bold text-center cursor-pointer text-body text-gray-neutral-300"
                role="button"
                tabIndex="0"
                onClick={handleMaxClick}
              >
                <div>MAX</div>
                <div className="whitespace-nowrap">({weiToShortString(czfBal)})</div>
              </div>
            }
          />
          <Button className="w-full text-white-neutral-0" background="accent-400" onClick={handleConfirmClick}>
            Confirm
          </Button>
          <div className="flex items-center justify-center space-x-2 text-gray-neutral-400" role="button" tabIndex="0">
            <SvgInfoOutline />
            <span className="text-body ">Show more details</span>
          </div>
        </div>
      )}
    </Modal>
  )
}
