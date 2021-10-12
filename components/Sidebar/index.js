import React from "react"
import ActiveLink from "@components/Link/ActiveLink"

import { SIDEBAR_ROUTES } from "./const"

export default function Sidebar() {
  return (
    <section className="w-[319px]">
      <div className="p-[32px]">
        <ul className="flex flex-col">
          {SIDEBAR_ROUTES.map(({ href, label, icon: Icon }, index) => (
            <ActiveLink key={index} href={href} activeClassName="active-link">
              <a>
                <div className="w-full px-[20px] py-[14px] flex items-center rounded-option link-option">
                  <Icon />
                  <span className="ml-2">{label}</span>
                </div>
              </a>
            </ActiveLink>
          ))}
        </ul>
      </div>
    </section>
  )
}
