import NumberFormat from "react-number-format"

export default function NumberInput({ className, suffix, tokenSymbol, children, ...pass }) {
  return (
    <div
      className={`flex items-center px-4 py-6 border border-gray-neutral-200 bg-white-neutral-0 rounded-lg space-x-2  ${
        className || ""
      }`}
    >
      <NumberFormat
        thousandsGroupStyle="thousand"
        suffix={" " + tokenSymbol}
        decimalSeparator="."
        displayType="input"
        type="text"
        thousandSeparator={true}
        decimalScale={2}
        className="font-bold text-input1 text-black-neutral-1000 focus:outline-none placeholder-gray-neutral-300"
        isNumericString={true}
        {...pass}
      />

      {suffix ? <span className="text-input1 text-black-neutral-1000">{suffix}</span> : null}
    </div>
  )
}
