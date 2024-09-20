import { MainNav } from "./main-nav"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"
import { LoggoutButton } from "./logout-button"

export default function Navbar() {
  return (
    <div
      className="border-b flex justify-between h-16 items-center 
                    px-[1.4rem] md:px-[4rem] 
                    lg:px-[6rem] xl:px-[8rem] 
                    2xl:px-[12rem] dark:text-txt_dark dark:bg-black_dark"
    >
      <div className="flex gap-6">
        <Link href={"/"} className="font-bold tracking-wider">
          Admin
        </Link>
        <MainNav />
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <LoggoutButton />
      </div>
    </div>
  )
}
