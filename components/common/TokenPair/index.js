import React from "react"
import Image from "next/image"
import CZodiacLogo from "assets/czodiac-logo.png"
import { ArrowRight } from "@components/common/Icons"

function TokenPair({ src, dst, srcName, dstName, className, ...pass }) {
  const getTokenImageUrl = (token) => {
    if (token === "CZF") return CZodiacLogo
    if (token.startsWith("./")) return "/" + token
    return token
  }

  return (
    <div className={`flex items-center space-x-2 justify-center ${className || ""}`} {...pass}>
      <div className="relative w-12 h-12 border rounded-full border-gray-neutral-200">
        <div className="absolute top-[50%] left-[50%] mt-[-15px] mr-0 mb-0 ml-[-15px]">
          <Image src={getTokenImageUrl(src)} width={30} height={30} alt={srcName || "Source token"} />
        </div>
      </div>
      <ArrowRight width={24} height={24} className="text-black-neutral-500" />
      <div className="relative w-12 h-12 border rounded-full border-gray-neutral-200">
        <div className="absolute top-[50%] left-[50%] mt-[-15px] mr-0 mb-0 ml-[-15px]">
          <Image src={getTokenImageUrl(dst)} width={30} height={30} alt={dstName || "Destination token"} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(TokenPair)
