export default function Card({ className, children, ...pass }) {
  return (
    <div className={`bg-[#fff] rounded shadow-card ${className || ""}`} {...pass}>
      {children}
    </div>
  )
}
