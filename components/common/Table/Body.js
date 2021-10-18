export default function TableBody({ children, ...pass }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200" {...pass}>
      {children}
    </tbody>
  )
}
