import * as React from "react"

function SvgClose(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17.892 5.303a.996.996 0 00-1.41 0l-4.89 4.88-4.89-4.89a.996.996 0 10-1.41 1.41l4.89 4.89-4.89 4.89a.996.996 0 101.41 1.41l4.89-4.89 4.89 4.89a.996.996 0 101.41-1.41l-4.89-4.89 4.89-4.89c.38-.38.38-1.02 0-1.4z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgClose
