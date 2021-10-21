import Image from "next/image"
import PoolsBanner from "assets/banners/pool.png"
import HomeBanner from "assets/banners/home.png"
import HuntBanner from "assets/banners/hunt.png"
import VaultBanner from "assets/banners/vault.png"
import FarmBanner from "assets/banners/farm.png"
import CZUsdBorrowBanner from "assets/banners/czusd-borrow.png"
import Card from "."

const BANNER_MAP = {
  home: HomeBanner,
  pools: PoolsBanner,
  hunt: HuntBanner,
  vault: VaultBanner,
  farm: FarmBanner,
  czUsdBorrow: CZUsdBorrowBanner,
}

export default function BannerCard({ className, name, children, ...pass }) {
  const bannerUrl = BANNER_MAP[name]

  if (!bannerUrl) {
    return (
      <Card className={className} {...pass}>
        {children}
      </Card>
    )
  }

  return (
    <div className="relative rounded">
      <Image src={bannerUrl} alt="Pools" layout="fill" placeholder="blur" className="rounded filter" />
      <div
        className="absolute top-0 left-0 block w-full h-full bg-gray-300 rounded right-full bottom-full"
        style={{
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0) -20.16%, #000000 105.04%)",
          filter: "drop-shadow(0px 4px 32px rgba(0, 0, 0, 0.08))",
        }}
      ></div>
      <div className={`rounded ${className || ""}`} {...pass}>
        {children}
      </div>
    </div>
  )
}
