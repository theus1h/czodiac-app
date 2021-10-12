import React from "react"
import Image from "next/image"
import CZodiacLogo from "assets/czodiac-logo.png"

function Navbar() {
  return (
    <div className="flex justify-between px-[48px] py-[20px] items-center fixed top-0 w-full shadow-bottom">
      <div className="flex items-center">
        <Image src={CZodiacLogo} alt="CZodiac" width={56} height={56} />
        <span className="ml-3 font-semibold text-header">CZodiac</span>
      </div>
      <div>xxxx</div>
    </div>
  )
}

export default Navbar
