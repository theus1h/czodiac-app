import { utils, BigNumber } from "ethers"
const { formatEther, parseEther } = utils

export function toShortString(bn, decimals) {
  if (!bn) return (0).toFixed(decimals)
  if (bn.gte(10 ** 12)) {
    return (Number(bn) / 10 ** 12).toFixed(decimals) + "T"
  }
  if (bn.gte(10 ** 9)) {
    return (Number(bn) / 10 ** 9).toFixed(decimals) + "B"
  }
  if (bn.gte(10 ** 6)) {
    return (Number(bn) / 10 ** 6).toFixed(decimals) + "M"
  }
  if (bn.gte(10 ** 3)) {
    return (Number(bn) / 10 ** 3).toFixed(decimals) + "K"
  }
  return Number(bn).toFixed(decimals)
}

export function decimalStringToBn(decimalString, tokenDecimals) {
  const numDecimals = decimalString.toString().split(".")?.[1]?.length || 0

  const refined = decimalString.toString().split(".").join("")
  if (!refined) return BigNumber.from(0)

  const bn = BigNumber.from(decimalString.toString().split(".").join("")).mul(
    BigNumber.from("10").pow(tokenDecimals - numDecimals)
  )

  return bn
}

export function toString(bn) {
  return bn.isZero() ? "0" : formatEther(bn)
}

export function weiToShortStringSmall(bn, tokenDecimals, decimals) {
  if (!bn) return (0).toFixed(decimals)
  let power = BigNumber.from("10").pow(tokenDecimals)
  if (bn.lt(power)) return (Number(bn) / Number(power)).toPrecision(decimals)
  return Number(bn.div(BigNumber.from("10").pow(tokenDecimals - 2))).toFixed(decimals + 2) / 100
}

export function weiToFixed(bn, decimals) {
  if (!bn) return (0).toFixed(decimals)
  return Number(formatEther(bn)).toFixed(decimals)
}

export function weiToShortString(bn, decimals) {
  if (!bn) return (0).toFixed(decimals)
  if (bn.lt(parseEther("1000"))) return weiToShortStringSmall(bn, 18, decimals)
  return toShortString(bn.div(BigNumber.from("10").pow(18)), decimals)
}

export function tokenAmtToShortString(bn, tokenDecimals, decimals) {
  if (!bn) return (0).toFixed(decimals)
  if (bn.lt(BigNumber.from("10").pow(tokenDecimals + 3))) return weiToShortStringSmall(bn, tokenDecimals, decimals)
  return toShortString(bn.div(BigNumber.from("10").pow(tokenDecimals)), decimals)
}
