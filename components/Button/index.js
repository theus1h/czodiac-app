export default function Button({ className, bordered, leftIcon, rightIcon, ...pass }) {
  let baseClass = "py-[14px] px-4 bg-white-neutral-0 rounded-full text-body font-semibold"

  if (bordered) baseClass += " border border-gray-neutral-200"

  return (
    <button type="button" className={`${baseClass} ${className || ""}`} {...pass}>
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
