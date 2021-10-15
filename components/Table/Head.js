import { UnfoldMore } from "@components/Icons"

const defaultHeaders = [
  { name: "pair", label: "", isSortable: false, render: () => <>Hot</> },
  { name: "lp", label: "LP", isSortable: true, render: undefined },
  { name: "apr", label: "APR", isSortable: true, render: undefined },
  { name: "liquidity", label: "Liquidity", isSortable: true, render: undefined },
  { name: "earned", label: "Earned", isSortable: true, render: undefined },
  { name: "other", label: "", isSortable: false, render: undefined },
]

export default function TableHead({ headers = defaultHeaders, sortBy, className, ...pass }) {
  return (
    <thead className={`bg-accent-200 rounded-tl rounded-tr ${className || ""}`} {...pass}>
      <tr>
        {headers.map(({ name, label, isSortable, render }, idx) => (
          <th key={idx} scope="col" className={"py-4 first:rounded-tl last:rounded-tr"}>
            {render ? (
              render()
            ) : (
              <div className="flex items-center justify-center px-5 py-4 space-x-4 text-black-neutral-1000">
                <span className="font-semibold text-input2">{label}</span>
                {isSortable ? <UnfoldMore onClick={() => sortBy(name)} className="cursor-pointer" /> : null}
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
}
