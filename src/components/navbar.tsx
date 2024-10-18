"use client"

import { MainNav } from "./main-nav"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"
import { LoggoutButton } from "./logout-button"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "./ui/button"
import { LogInIcon } from "lucide-react"
import { parseCookies } from "nookies"
import { useCallback } from "react"

export default function Navbar() {
  const getToken = useCallback(() => {
    if (typeof window !== "undefined") {
      const cookies = parseCookies()
      return cookies["logged-in"]
    }
    return null
  }, [])

  const isAuthenticated = getToken()
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
        {isAuthenticated ? <LoggoutButton /> : <LoginDialog />}
      </div>
    </div>
  )
}

const LoginDialog = () => {
  return (
    <Link href="/login">
      <Button className="font-medium flex gap-2">
        <LogInIcon className="h-4" />
        <p>Sign in</p>
      </Button>
    </Link>
  )
}
