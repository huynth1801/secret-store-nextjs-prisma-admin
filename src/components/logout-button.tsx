"use client"

import { LogOutIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LoggoutButton() {
  const onLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        cache: "no-store",
      })
      if (typeof window !== "undefined" && window.localStorage) {
        document.cookie =
          "logged-in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      }

      if (response.status === 200) window.location.reload()
    } catch (error) {
      console.error({ error })
    }
  }
  return (
    <Button variant={"outline"} size={"icon"} onClick={onLogout}>
      <LogOutIcon className="h-4" />
    </Button>
  )
}
