import { Check } from "@components/common/Icons"
import React from "react"

export default function Stepper({ steps = [] }) {
  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="relative flex items-center">
            <div className="w-[34px] h-[34px] p-[5px] transition duration-500 ease-in-out text-primary-400 rounded-full bg-white-neutral-0">
              <Check />
            </div>
            <div className="absolute top-0 w-40 mt-[40px] -ml-16 font-medium text-center text-white-neutral-0 text-subheader">
              {step}
            </div>
          </div>
          {index !== steps.length - 1 && (
            <div className="z-50 flex-auto transition duration-500 ease-in-out border-t-2 text-white-neutral-0"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
