import { Borrow, Farm, Home, Mining, Nft, SwapAlt, Target, Vault } from "@components/Icons"

export const SIDEBAR_ROUTES = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/pools",
    label: "Pool",
    icon: Mining,
  },
  {
    href: "/farms",
    label: "Farm",
    icon: Farm,
  },
  {
    href: "/vaults",
    label: "Vault",
    icon: Vault,
  },
  {
    href: "/borrow",
    label: "Borrow",
    icon: Borrow,
  },
  {
    href: "/hunt",
    label: "CZ Hunt",
    icon: Target,
  },
  {
    href: "/nft",
    label: "NFT",
    icon: Nft,
  },
]
