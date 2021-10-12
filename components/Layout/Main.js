import Navbar from "@components/Navbar"
import Sidebar from "@components/Sidebar"

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex pt-[96px]">
        <Sidebar />
        <main className="flex-1 overflow-y-scroll main-container bg-white-neutral-50">
          <div className="max-w-[1120px] mx-auto my-[32px]">{children}</div>
        </main>
      </div>
    </>
  )
}
