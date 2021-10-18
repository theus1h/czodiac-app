import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { Check, ExpandMore } from "@components/common/Icons"

export default function Select({ options = [], value, onChange, label, className, ...pass }) {
  return (
    <div className={`min-w-[114px] ${className || ""}`} {...pass}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-[14px] px-[20px] text-left rounded-lg cursor-default text-input2 text-black-neutral-500 bg-white-neutral-50 border border-gray-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{value?.label || label}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ExpandMore className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute w-full py-1 mt-4 overflow-auto border rounded-md shadow-lg text-body bg-white-neutral-0 border-gray-neutral-100 max-h-60 sm:text-sm">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-black-neutral-1000"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`${selected ? "font-medium" : "font-normal"} block truncate`}>
                        {option.label}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? "text-amber-600" : "text-amber-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <Check className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
