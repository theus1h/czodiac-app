export default function Search({ className, ...pass }) {
  return (
    <input
      type="text"
      className={`px-6 py-4 border border-gray-neutral-200 bg-white-neutral-0 border-r-8 text-input1 text-black-neutral-1000 ${
        className || ""
      }`}
      {...pass}
    >
      {pass.children}
    </input>
  )
}
