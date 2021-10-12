import * as React from "react"

function SvgVault(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17.833 2H6.167A4.168 4.168 0 002 6.167v11.666A4.168 4.168 0 006.167 22h11.666A4.168 4.168 0 0022 17.833V6.167A4.168 4.168 0 0017.833 2zM12 18.667A6.666 6.666 0 1118.667 12 6.675 6.675 0 0112 18.667z"
        fill="currentColor"
      />
      <path
        d="M12 7a5 5 0 100 10 5 5 0 000-10zm2.5 5.833h-1.058a1.667 1.667 0 110-1.666H14.5a.834.834 0 010 1.666z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgVault
