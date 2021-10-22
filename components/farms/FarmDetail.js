import React from "react"
import Button from "@components/common/Button"
import CZodiacLogo from "assets/czodiac-logo.png"
import Image from "next/image"
import { Add, Clock, ExternalLink, Remove } from "@components/common/Icons"
import { weiToShortString, tokenAmtToShortString } from "@utils/bnDisplay"
import { getTokenLink, getContractCodeLink } from "@utils/token"
import { getDateTimeString } from "@utils/time"
import StakeModal from "./StakeModal"
import HarvestModal from "./HarvestModal"
import UnstakeModal from "./UnstakeModal"

export default function FarmDetail({ pool }) {
  const [isStakeOpen, setIsStakeOpen] = React.useState(false)
  const [isHarvestOpen, setIsHarvestOpen] = React.useState(false)
  const [isUnstakeOpen, setIsUnstakeOpen] = React.useState(false)
  const {
    user,
    name,
    logo,
    address,
    rewardDecimals,
    rewardAddress,
    aprBasisPoints,
    usdValue,
    usdPerDay,
    rewardPerDay,
    timeStart,
    timeEnd,
    sendDeposit,
    sendWithdraw,
  } = pool

  const handleStakeClick = () => {
    setIsStakeOpen(true)
  }

  const handleHarvestClick = () => {
    setIsHarvestOpen(true)
  }

  const handleUnstakeClick = () => {
    setIsUnstakeOpen(true)
  }

  return (
    <div className="flex flex-col mx-auto mt-4 space-y-4 ">
      <StakeModal
        isOpen={isStakeOpen}
        title="Add Stake"
        czfStaked={user.czfStaked}
        czfBal={user.czfBal}
        tokenDecimals={rewardDecimals}
        onClose={() => setIsStakeOpen(false)}
        onConfirm={(amount) => sendDeposit(amount)}
      />
      <UnstakeModal
        isOpen={isUnstakeOpen}
        title="Unstake"
        czfStaked={user.czfStaked}
        tokenDecimals={rewardDecimals}
        onClose={() => setIsUnstakeOpen(false)}
        onConfirm={(amount) => sendWithdraw(amount)}
      />
      <HarvestModal
        isOpen={isHarvestOpen}
        title="Harvest"
        logo={logo}
        name={name}
        earned={user.rewardPending}
        tokenDecimals={rewardDecimals}
        onClose={() => setIsHarvestOpen(false)}
        onConfirm={(amount) => sendWithdraw(0)}
      />
      <div className="flex">
        <div className="flex flex-col flex-1 space-y-2 text-black-neutral-1000 text-body">
          <div className="font-medium">Your Stats</div>
          <div className="opacity-60">Staked: {weiToShortString(user.czfStaked, 2)} CZF</div>
          <div className="opacity-60">
            Claimable: {tokenAmtToShortString(user.rewardPending, rewardDecimals, 2)} {name}
          </div>
          <div className="opacity-60">Wallet: {weiToShortString(user.czfBal, 2)} CZF</div>
          <div className="opacity-60">
            {name}/day: {tokenAmtToShortString(user.rewardPerDay, rewardDecimals, 2)} {name}
          </div>
        </div>

        <div className="flex flex-col flex-1 space-y-2 text-black-neutral-1000 text-body">
          <div className="font-medium">Pool Stats</div>
          <div className="opacity-60">APR: {aprBasisPoints.toNumber() / 100}%</div>
          <div className="opacity-60">TVL: ${weiToShortString(usdValue, 2)}</div>
          <div className="opacity-60">
            {name}/day: : {tokenAmtToShortString(rewardPerDay, rewardDecimals, 2)}
          </div>
          <div className="opacity-60">USD/day: ${weiToShortString(usdPerDay, 2)}</div>
          <div className="opacity-60">PID: 0</div>
        </div>

        <div className="flex flex-col flex-1 space-y-2 text-black-neutral-1000 text-body">
          <div className="font-medium">Additional Info</div>
          <div className="opacity-60">
            <span className="mr-2">Opens: {getDateTimeString(timeStart)}</span>
            <Clock className="inline-block" />
          </div>
          <div className="opacity-60">
            <span className="mr-2">Closes: {getDateTimeString(timeEnd)}</span>
            <Clock className="inline-block" />
          </div>
          <div className="opacity-60">
            <span className="mr-2">See Token Info</span>
            <a href={getTokenLink(rewardAddress)} rel="noopener noreferrer" target="_blank">
              <ExternalLink className="inline-block" />
            </a>
          </div>
          <div className="opacity-60">
            <span className="mr-2">View Contract</span>
            <a href={getContractCodeLink(address)} rel="noopener noreferrer" target="_blank">
              <ExternalLink className="inline-block" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex space-x-6">
        <div className="flex-1 p-4 text-center border bg-accent-50 border-accent-200 rounded-2xl min-w-[360px]">
          <div className="text-body text-black-neutral-1000">Staked</div>
          <div className="flex items-center justify-center">
            <span className="mr-2 font-semibold text-input1 text-black-neutral-1000">
              {weiToShortString(user.czfStaked, 2)}
            </span>
            <Image src={CZodiacLogo} alt="CZodiac" width={24} height={24} />
          </div>
          <div className="mt-4 space-x-2">
            <Button className="border border-accent-200 text-accent-500" rightIcon={<Add />} onClick={handleStakeClick}>
              Add Stake
            </Button>
            <Button
              className="border border-accent-200 text-accent-500"
              disabled={user.czfStaked.isZero()}
              rightIcon={<Remove />}
              onClick={handleUnstakeClick}
            >
              Unstake
            </Button>
          </div>
        </div>
        <div className="flex-1 p-4 text-center border bg-accent-50 border-accent-200 rounded-2xl min-w-[360px]">
          <div className="text-body text-black-neutral-1000">Earned</div>
          <div className="flex items-center justify-center">
            <span className="mr-2 font-semibold text-input1 text-black-neutral-1000">
              {tokenAmtToShortString(user.rewardPending, rewardDecimals, 2)}
            </span>
            <Image src={logo} alt={name} width={24} height={24} />
          </div>
          <div className="mt-4">
            <Button
              className="w-full border border-accent-200 text-accent-500"
              disabled={user.rewardPending.isZero()}
              onClick={handleHarvestClick}
            >
              Harvest
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
