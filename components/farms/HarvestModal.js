import Image from "next/image"
import Modal from "@components/common/Modal"
import { weiToShortString, toString, decimalStringToBn, tokenAmtToShortString } from "@utils/bnDisplay"
import NumberInput from "@components/common/Input/NumberInput"
import Button from "@components/common/Button"
import SvgInfoOutline from "@components/Icons/InfoOutline"
import React from "react"

export default function HarvestModal({ earned, name, logo, children, tokenDecimals = 18, onConfirm, ...pass }) {
  const [amount, setAmount] = React.useState(toString(earned))

  const handleMaxClick = () => {
    setAmount(toString(earned))
  }

  const handleConfirmClick = () => {
    onConfirm(decimalStringToBn(amount, tokenDecimals))
  }

  return (
    <Modal {...pass}>
      <div className="flex flex-col space-y-6">
        <div className="flex space-x-6">
          <div className="justify-center flex-1 text-center">
            <div className="text-body text-black-neutral-1000">Earned</div>
            <div className="flex items-center justify-center">
              <span className="mr-2 font-semibold text-input1 text-black-neutral-1000">
                {tokenAmtToShortString(earned, tokenDecimals, 2)}
              </span>
              <Image src={logo} alt={name} width={24} height={24} />
            </div>
          </div>
        </div>
        <NumberInput
          className="w-full"
          tokenSymbol={name}
          value={amount}
          onValueChange={(obj) => setAmount(obj.value)}
          isAllowed={({ value }) => decimalStringToBn(value, tokenDecimals).lte(earned)}
          suffix={
            <div
              className="font-bold text-center cursor-pointer text-body text-gray-neutral-300"
              role="button"
              tabIndex="0"
              onClick={handleMaxClick}
            >
              <div>MAX</div>
              <div className="whitespace-nowrap">({weiToShortString(earned)})</div>
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
    </Modal>
  )
}
