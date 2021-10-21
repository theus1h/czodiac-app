import * as React from "react"

function SvgCheck(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9 15.817l-3.293-3.294a1.246 1.246 0 10-1.763 1.764l4.18 4.18a1.246 1.246 0 001.763 0l10.58-10.58a1.246 1.246 0 10-1.763-1.764L9 15.817z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.5}
      />
    </svg>
  )
}

export default SvgCheck
