import * as React from "react"

function SvgMining(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#mining_svg__clip0)" fill="currentColor">
        <path d="M23.525 12.521a11.6 11.6 0 00-2.796-4.774l.386-.385a.692.692 0 000-.98l-3.497-3.497a.692.692 0 00-.98 0l-.385.386A11.599 11.599 0 0011.48.476 11.596 11.596 0 005.793.25a.692.692 0 00-.016 1.35l.677.162a10.17 10.17 0 014.843 2.705l1.88 1.88-.21.21a.692.692 0 000 .978l3.497 3.497c.27.27.709.27.979 0l.21-.21 1.88 1.88a10.172 10.172 0 012.704 4.843l.161.678a.692.692 0 00.674.532h.008a.692.692 0 00.67-.549 11.597 11.597 0 00-.225-5.686zM12.197 8.725L.203 20.72a.692.692 0 000 .979L2.3 23.797a.69.69 0 00.979 0l11.995-11.994-3.078-3.078z" />
      </g>
      <defs>
        <clipPath id="mining_svg__clip0">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SvgMining
