import { Switch as HSwitch } from "@headlessui/react"

export default function Switch({ label, checked = false, onChange, ...pass }) {
  return (
    <HSwitch.Group>
      <div className="flex items-center">
        <HSwitch
          checked={checked}
          onChange={onChange}
          className={`${
            checked ? "bg-primary-400" : "bg-gray-neutral-100"
          } relative inline-flex items-center w-[52px] h-[22px] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span
            className={`${
              checked ? "translate-x-[18px]" : "translate-x-[2px]"
            } inline-block w-[18px] h-[18px] transform bg-white-neutral-0 rounded-full transition-transform`}
          />
        </HSwitch>
        <HSwitch.Label className="ml-2">{label}</HSwitch.Label>
      </div>
    </HSwitch.Group>
  )
}
