import React from "react"
import Search from "@components/common/Input/Search"
import Switch from "@components/common/Switch"
import Select from "@components/common/Select"
import Card from "@components/common/Card"
import ButtonSwitch from "@components/common/Switch/ButtonSwitch"
import { usePoolStore } from "@store/pool"

const sortOptions = [{ label: "LP" }, { label: "APR" }, { label: "Liquidity" }]

const switchOptions = ["Live", "Finished"]

export default function PoolFilter() {
  const { query, setQuery, stakedOnly, setStakedOnly, finishedOrLive, setFinishedOrLive, sortBy, setSortBy } =
    usePoolStore()

  return (
    <Card className="flex items-center justify-around w-full p-8 space-x-6">
      <Search value={query} onChange={(e) => setQuery(e.target.value)} />
      <Switch label="Staked Only" checked={stakedOnly} onChange={setStakedOnly} />
      <ButtonSwitch labels={switchOptions} checked={finishedOrLive} onChange={setFinishedOrLive} />
      <Select options={sortOptions} label="Sort by" onChange={sortBy} value={setSortBy} />
    </Card>
  )
}
