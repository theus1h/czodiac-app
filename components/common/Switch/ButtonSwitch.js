import { useState } from "react"
import { Switch as HSwitch } from "@headlessui/react"

export default function ButtonSwitch({ labels = ["Enabled", "Disabled"], checked, onChange, ...pass }) {
  return (
    <HSwitch.Group>
      <div className="flex items-center">
        <HSwitch
          checked={checked}
          onChange={onChange}
          className={`relative inline-flex items-center h-[44px] rounded-full w-[220px] border border-gray-neutral-100 bg-white-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span
            className={`absolute w-[110px] h-[44px] text-gray-neutral-300 uppercase flex items-center justify-center ${
              checked ? "left-0" : "right-0"
            }`}
          >
            {checked ? labels[0] : labels[1]}
          </span>
          <span
            className={`${
              checked ? "translate-x-[110px]" : "translate-x-0"
            } flex items-center justify-center w-[110px] h-[44px] transform bg-primary-400 text-white-neutral-0 rounded-full transition-transform uppercase text-input2`}
          >
            <span>{checked ? labels[1] : labels[0]}</span>
          </span>
        </HSwitch>
      </div>
    </HSwitch.Group>
  )
}
