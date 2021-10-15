export default function Button({ className, bordered, disabled, leftIcon, rightIcon, ...pass }) {
  let baseClass = "py-[14px] px-4 bg-white-neutral-0 rounded-full text-body font-semibold"

  if (bordered) baseClass += " border border-gray-neutral-200"
  if (disabled) baseClass += " opacity-50 cursor-not-allowed"

  return (
    <button type="button" className={`${baseClass} ${className || ""}`} disabled={disabled} {...pass}>
      {!!leftIcon || !!rightIcon ? (
        <div className="flex items-center space-x-2">
          {leftIcon}
          <span>{pass.children}</span>
          {rightIcon}
        </div>
      ) : (
        pass.children
      )}
    </button>
  )
}
