export default function TableRow({ index, columns = [], expanded, children, className, ...pass }) {
  return (
    <>
      <tr key={index}>
        {columns.map(({ name, render, align, className }, idx) => (
          <td key={name || idx} className={`py-4 whitespace-nowrap text-${align || "center"} ${className || ""}`}>
            {render()}
          </td>
        ))}
      </tr>
      {expanded ? (
        <tr {...pass}>
          <td colSpan={columns.length}>
            <div className={`px-10 py-4 ${className || ""}`}>{children}</div>
          </td>
        </tr>
      ) : null}
    </>
  )
}
