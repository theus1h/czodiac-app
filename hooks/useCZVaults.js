import { useEffect, useState } from "react"
import { useEthers, useContractCalls, MultiCallABI } from "@pdusedapp/core"
import {
  CZVAULTS,
  CZFARM_ADDRESSES,
  CZVAULTROUTER,
  CZFARMMASTERROUTABLE,
  CHAINS,
  MUTICALL_ADDRESSES,
  BELTPRICEPERSHARELAST,
} from "@constants/index"
import { Contract, utils, BigNumber } from "ethers"
import useDeepCompareEffect from "./useDeepCompareEffect"
import useBUSDPrice from "./useBUSDPrice"
import useBUSDPriceMulti from "./useBUSDPriceMulti"
import czVaultRouter from "@contracts/abis/CZVaultRouter.json"
import iBeltMultiStrategyToken from "@contracts/abis/IBeltMultiStrategyToken.json"
import czFarmMasterRoutable from "@contracts/abis/CZFarmMasterRoutable.json"
import beltPricePerShaerLast from "@contracts/abis/BeltPricePerShareLast.json"
import czfBeltVault from "@contracts/abis/CzfBeltVault.json"
import ierc20 from "@contracts/abis/ierc20.json"
const { Interface } = utils

const weiFactor = BigNumber.from("10").pow(BigNumber.from("18"))
const CHAIN = CHAINS.BSC

function useCZVaults() {
  const vault = {
    rewardPerSecond: null,
    totalAmount: null,
    totalAmountUSD: null,
    aprBasisPoints: null,
    userInfo: {
      amount: null,
      amountUSD: null,
      pendingReward: null,
    },
  }
  const { account, chainId, library } = useEthers()

  const ierc20Interface = new Interface(ierc20)
  const czFarmMasterRoutableInterface = new Interface(czFarmMasterRoutable)
  const czVaultRouterInterface = new Interface(czVaultRouter)
  const iBeltMultiStrategyTokenInterface = new Interface(iBeltMultiStrategyToken)
  const czfBeltVaultInterface = new Interface(czfBeltVault)
  const beltPricePerShaerLastInterface = new Interface(beltPricePerShaerLast)

  const sendDepositForVault = async (pid, wad) => {
    if (!account || !library || !CZVAULTROUTER[CHAINS.BSC]) return
    const vaultRouterContract = new Contract(CZVAULTROUTER[CHAINS.BSC], czVaultRouterInterface, library).connect(
      library.getSigner()
    )
    try {
      await vaultRouterContract.depositAndStakeBeltBNB(CZFARMMASTERROUTABLE[CHAIN], pid, {
        value: wad,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const sendWithdrawForVault = async (pid, wad) => {
    if (!account || !library || !CZVAULTROUTER[CHAINS.BSC]) return
    const vaultRouterContract = new Contract(CZVAULTROUTER[CHAINS.BSC], czVaultRouterInterface, library).connect(
      library.getSigner()
    )

    try {
      await vaultRouterContract.withdrawAndUnstakeBeltBNB(CZFARMMASTERROUTABLE[CHAIN], pid, wad)
    } catch (err) {
      console.log(err)
    }
  }

  const sendClaim = async (pid) => {
    if (!account || !library || !CZFARMMASTERROUTABLE[CHAINS.BSC]) return
    const farmContract = new Contract(CZFARMMASTERROUTABLE[CHAINS.BSC], czFarmMasterRoutableInterface, library).connect(
      library.getSigner()
    )

    try {
      await farmContract.claim(pid)
    } catch (err) {
      console.log(err)
    }
  }

  const czfBusdPrice = useBUSDPrice(CZFARM_ADDRESSES[chainId])
  const rewardBusdPrices = useBUSDPriceMulti(!!CZVAULTS[chainId] ? CZVAULTS[chainId].map((v) => v.rewardAddress) : [])

  const [vaults, setVaults] = useState([])
  const [calls, setCalls] = useState([])
  const callResults = useContractCalls(calls) ?? []

  useEffect(() => {
    const newCalls = []
    if (!CZVAULTS[chainId]) {
      setCalls(newCalls)
      return
    }

    newCalls.push({
      abi: czFarmMasterRoutableInterface,
      address: CZFARMMASTERROUTABLE[chainId],
      method: "czfPerBlock",
    })
    newCalls.push({
      abi: czFarmMasterRoutableInterface,
      address: CZFARMMASTERROUTABLE[chainId],
      method: "totalAllocPoint",
    })

    CZVAULTS[chainId].forEach((v) => {
      let user = "0x0000000000000000000000000000000000000000" // Simplifies code by calling for 0x0 if no account
      if (!!account) user = account
      newCalls.push({
        abi: MultiCallABI,
        address: MUTICALL_ADDRESSES[chainId],
        method: "getEthBalance",
        args: [user],
      })
      newCalls.push({
        abi: czFarmMasterRoutableInterface,
        address: CZFARMMASTERROUTABLE[chainId],
        method: "userInfo",
        args: [v.pid, user],
      })
      newCalls.push({
        abi: czFarmMasterRoutableInterface,
        address: CZFARMMASTERROUTABLE[chainId],
        method: "pendingCzf",
        args: [v.pid, user],
      })
      newCalls.push({
        abi: iBeltMultiStrategyTokenInterface, //TODO: Add support for non belt ABI
        address: v.strategyAddress,
        method: "getPricePerFullShare",
      })
      newCalls.push({
        abi: czFarmMasterRoutableInterface,
        address: CZFARMMASTERROUTABLE[chainId],
        method: "poolInfo",
        args: [v.pid],
      })
      newCalls.push({
        abi: czfBeltVaultInterface,
        address: v.vaultAddress,
        method: "balanceOf",
        args: [CZFARMMASTERROUTABLE[chainId]],
      })
      newCalls.push({
        abi: czfBeltVaultInterface,
        address: v.vaultAddress,
        method: "feeBasis",
      })
      newCalls.push({
        abi: ierc20Interface,
        address: CZFARM_ADDRESSES[chainId],
        method: "balanceOf",
        args: [v.lpCzfAddress],
      })
      newCalls.push({
        abi: ierc20Interface,
        address: v.assetAddress,
        method: "balanceOf",
        args: [v.lpCzfAddress],
      })
      newCalls.push({
        abi: beltPricePerShaerLastInterface,
        address: BELTPRICEPERSHARELAST[chainId],
        method: "pricePerFullShareLast",
        args: [v.strategyAddress],
      })
      newCalls.push({
        abi: beltPricePerShaerLastInterface,
        address: BELTPRICEPERSHARELAST[chainId],
        method: "updateTimeLast",
        args: [v.strategyAddress],
      })
      newCalls.push({
        abi: beltPricePerShaerLastInterface,
        address: BELTPRICEPERSHARELAST[chainId],
        method: "updateTimeRecent",
        args: [v.strategyAddress],
      })
    })
    setCalls(newCalls)
  }, [account, chainId])

  useDeepCompareEffect(() => {
    let newVaults = []
    if (!callResults || callResults.length === 0 || !callResults[0] || !CZVAULTS[chainId] || !czfBusdPrice) {
      return
    }

    let czfPerBlock = callResults[0][0]
    let totalAllocPoint = callResults[1][0].toNumber()
    if (typeof callResults[3] == "undefined") return
    CZVAULTS[chainId].forEach(async (v, index) => {
      let o = 11 * index + 2 //Offset for cycling thru call results
      const currentTimestamp = Math.floor(Date.now() / 1000)

      v.sendDeposit = (wad) => sendDepositForVault(v.pid, wad)
      v.sendWithdraw = (wad) => sendWithdrawForVault(v.pid, wad)
      v.sendClaim = () => sendClaim(v.pid)

      v.user = {}
      v.user.address = account

      v.user.bnbBal = callResults[0 + o][0]
      //TODO get balance for bep20 token to deposit into non-BNB vaults
      //v.user.tokenBal = ;
      v.user.vaultAssetStaked = callResults[1 + o][0]
      v.user.rewardPending = callResults[2 + o][0]
      v.pricePerShare = callResults[3 + o][0]
      v.allocPoint = callResults[4 + o].allocPoint.toNumber()
      v.vaultAssetStaked = callResults[5 + o][0]
      v.feeBasis = callResults[6 + o][0].toNumber()
      v.lpBaseCzf = {
        czfBal: callResults[7 + o][0],
        baseBal: callResults[8 + o][0],
      }
      v.pricePerShareLast = callResults[9 + o][0]
      v.pricePerShareUpdateLast = callResults[10 + o][0].toNumber()
      v.pricePerShareUpdateRecent = callResults[11 + o][0].toNumber()
      v.user.baseAssetStaked = v.user.vaultAssetStaked.mul(v.pricePerShare).div(weiFactor)
      v.baseAssetStaked = v.vaultAssetStaked.mul(v.pricePerShare).div(weiFactor)

      v.czfPerBlock = czfPerBlock.mul(v.allocPoint).div(totalAllocPoint)
      v.user.czfPerBlock = v.czfPerBlock.mul(v.user.vaultAssetStaked).div(v.vaultAssetStaked)

      v.baseAssetPerUnitPerDay = v.pricePerShare
        .sub(v.pricePerShareLast)
        .mul(BigNumber.from("86400"))
        .div(BigNumber.from((currentTimestamp - v.pricePerShareUpdateLast).toString()))
      v.baseAssetPerDay = v.baseAssetPerUnitPerDay.mul(v.baseAssetStaked).div(weiFactor)
      v.user.baseAssetPerDay = v.baseAssetPerUnitPerDay.mul(v.user.baseAssetStaked).div(weiFactor)

      v.czfPerDay = v.czfPerBlock.mul(BigNumber.from("28800"))
      v.user.czfPerDay = v.user.czfPerBlock.mul(BigNumber.from("28800"))

      v.baseAssetBusd = v.lpBaseCzf.czfBal.mul(czfBusdPrice).div(v.lpBaseCzf.baseBal)
      v.user.baseAssetStakedBusd = v.user.baseAssetStaked.mul(v.baseAssetBusd).div(weiFactor)
      v.baseAssetStakedBusd = v.baseAssetStaked.mul(v.baseAssetBusd).div(weiFactor)

      v.baseAssetAprBasis = v.baseAssetPerUnitPerDay.mul("3650000").div(weiFactor).toNumber()
      v.czfAprBasis = v.czfPerDay
        .mul(czfBusdPrice)
        .mul(BigNumber.from("365"))
        .mul(BigNumber.from("10000"))
        .div(v.baseAssetStakedBusd)
        .div(weiFactor)
        .toNumber()
      v.baseAssetApyBasis = Math.floor((Math.pow(1 + v.baseAssetAprBasis / (365 * 10000), 365) - 1) * 10000)
      v.aprBasis = v.czfAprBasis + v.baseAssetAprBasis
      v.apyBasis = v.czfAprBasis + v.baseAssetApyBasis
      console.log(v.aprBasis, v.apyBasis, v.baseAssetApyBasis)

      // v.rewardPerSecond = callResults[2 + o][0];
      // v.usdValue = v.czfBal.mul(czfBusdPrice).div(weiFactor);
      // v.rewardPerDay = v.rewardPerSecond.mul(BigNumber.from("86400"));
      // if (!!rewardBusdPrices[index]) {
      //   v.usdPerDay = v.rewardPerDay
      //     .mul(rewardBusdPrices[index])
      //     .div(weiFactor);
      // } else {
      //   v.usdPerDay = BigNumber.from("0");
      // }

      // //Fixes bug where TVL includes the CZF rewards in CZF->CZF pool
      // let tvlOffset = BigNumber.from("0");
      // if (
      //   v.rewardAddress == "0x7c1608C004F20c3520f70b924E2BfeF092dA0043" &&
      //   v.usdPerDay.gt(BigNumber.from("0"))
      // ) {
      //   let seconds = 0;
      //   if (new Date() >= v.timeStart && new Date() <= v.timeEnd) {
      //     seconds = Math.floor((v.timeEnd - new Date()) / 1000);
      //   } else if (new Date() < v.timeStart) {
      //     seconds = Math.floor((v.timeEnd - v.timeStart) / 1000);
      //   }
      //   tvlOffset = v.usdPerDay.mul(
      //     BigNumber.from(seconds.toString()).div(BigNumber.from("86400"))
      //   );
      //   v.usdValue = v.usdValue.sub(tvlOffset);
      // }

      // if (v.usdValue.gt(BigNumber.from("0"))) {
      //   v.aprBasisPoints = v.usdPerDay
      //     .mul(BigNumber.from("365"))
      //     .mul(BigNumber.from("10000"))
      //     .div(v.usdValue);
      // } else {
      //   v.aprBasisPoints = BigNumber.from("0");
      // }

      // if (v.usdValue.gt(BigNumber.from("0"))) {
      //   v.aprBasisPoints = v.usdPerDay
      //     .mul(BigNumber.from("365"))
      //     .mul(BigNumber.from("10000"))
      //     .div(v.usdValue.add(tvlOffset));
      // } else {
      //   v.aprBasisPoints = BigNumber.from("0");
      // }

      // if (
      //   v.rewardAddress == "0x7c1608C004F20c3520f70b924E2BfeF092dA0043" &&
      //   v.usdPerDay.gt(BigNumber.from("0"))
      // ) {
      //   v.usdValue = v.usdValue.add(
      //     parseEther("288385966")
      //       .mul(czfBusdPrice)
      //       .div(weiFactor)
      //   );
      // }

      // if (!!account && !!callResults[4 + o]) {
      //   v.user = {};
      //   v.user.czfStaked = callResults[4 + o][0];
      //   v.user.rewardPending = callResults[5 + o][0];
      //   v.user.czfBal = callResults[6 + o][0];

      //   v.user.czfStakedUsd = v.user.czfStaked.mul(czfBusdPrice).div(weiFactor);
      //   v.user.czfBalUsd = v.user.czfBal.mul(czfBusdPrice).div(weiFactor);
      //   if (v.czfBal > 0) {
      //     v.user.rewardPerDay = v.user.czfStaked
      //       .mul(v.rewardPerDay)
      //       .div(v.czfBal);
      //   } else {
      //     v.user.rewardPerDay = BigNumber.from("0");
      //   }
      // }
      newVaults.push(v)
    })

    setVaults(newVaults)
  }, [callResults, czfBusdPrice, rewardBusdPrices])

  return {
    vaults,
  }
}

export default useCZVaults
