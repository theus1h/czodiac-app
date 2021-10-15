export { default as Body } from "./Body"
export { default as Head } from "./Head"
export { default as Row } from "./Row"

export function Root({ className, children, ...pass }) {
  return (
    <table className={`min-w-full divide-y divide-gray-200 ${className || ""}`} {...pass}>
      {children}
    </table>
  )
}
