import { Check } from "@components/Icons"

export default function Stepper({ steps = [] }) {
  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <>
          <div className="relative flex items-center">
            <div className="w-[34px] h-[34px] p-[5px] transition duration-500 ease-in-out bg-primary-400 rounded-full text-white-neutral-0">
              <Check />
            </div>
            <div className="absolute top-0 w-32 mt-[40px] -ml-10 font-medium text-center text-black-neutral-1000 text-subheader">
              {step}
            </div>
          </div>
          {index !== steps.length - 1 && (
            <div className="flex-auto transition duration-500 ease-in-out border-t-2 border-primary-200"></div>
          )}
        </>
      ))}
    </div>
  )
}
