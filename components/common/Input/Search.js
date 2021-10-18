import { Search } from "@components/common/Icons"

export default function Input({ className, ...pass }) {
  return (
    <div
      className={`flex items-center w-full px-6 py-4 border rounded-full border-gray-neutral-200 ${className || ""}`}
    >
      <label htmlFor={pass.name || "Search"} className="hidden">
        Search
      </label>
      <Search />
      <input
        className="flex-1 ml-2 border-none text-input2 focus:outline-none "
        type="search"
        name="Search"
        placeholder="Search"
        {...pass}
      />
    </div>
  )
}
