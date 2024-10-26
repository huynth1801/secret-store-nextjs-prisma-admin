"use client"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn, isVariableValid } from "@/lib/utils"
import { Category } from "@prisma/client"
import { Check, ChevronsUpDown } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export function SortBy({ initialData }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [value, setValue] = React.useState("featured")

  useEffect(() => {
    if (isVariableValid(initialData)) setValue(initialData)
  }, [initialData])

  return (
    <Select
      onValueChange={(currentValue) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))

        if (currentValue === value) {
          current.delete("sort")
          setValue("")
        } else {
          current.set("sort", currentValue)
          setValue(currentValue)
        }

        // cast to string
        const search = current.toString()
        // or const query = `${'?'.repeat(search.length && 1)}${search}`;
        const query = search ? `?${search}` : ""

        router.replace(`${pathname}${query}`, {
          scroll: false,
        })
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="most_expensive">Most Expensive</SelectItem>
        <SelectItem value="least_expensive">Least Expensive</SelectItem>
      </SelectContent>
    </Select>
  )
}

type CategoriesComboboxProps = {
  categories?: Category[]
  initialCategory?: string
}

export function CategoriesCombobox({
  categories,
  initialCategory = "",
}: CategoriesComboboxProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  // Debug logging
  useEffect(() => {
    categories?.map((category) => {
      console.log(category.title)
    })
  }, [categories])

  useEffect(() => {
    if (initialCategory) {
      setValue(initialCategory)
    }
  }, [initialCategory])

  // If categories is undefined or null, show a loading state
  if (!categories) {
    return <div>Loading categories...</div>
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? categories.find((c) => c.title === value)?.title ||
              "Select category..."
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.title}
                    onSelect={(currentValue) => {
                      const current = new URLSearchParams(
                        Array.from(searchParams.entries())
                      )

                      if (currentValue === value) {
                        current.delete("category")
                        setValue("")
                      } else {
                        current.set("category", currentValue)
                        setValue(currentValue)
                      }

                      const search = current.toString()
                      const query = search ? `?${search}` : ""

                      router.replace(`${pathname}${query}`, {
                        scroll: false,
                      })

                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === category.title ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {category.title}
                  </CommandItem>
                ))
              ) : (
                <CommandItem disabled>No categories available</CommandItem>
              )}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export function AvailableToggle({ initialData }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = React.useState(false)

  useEffect(() => {
    setValue(initialData === "true" ? true : false)
  }, [initialData])

  return (
    <div className="flex w-full border rounded-md items-center space-x-2">
      <div className="mx-auto flex gap-2 items-center">
        <Switch
          checked={value}
          onCheckedChange={(currentValue: boolean) => {
            const current = new URLSearchParams(
              Array.from(searchParams.entries())
            )

            current.set("isAvailable", currentValue == true ? "true" : "false")
            setValue(currentValue)

            // cast to string
            const search = current.toString()
            // or const query = `${'?'.repeat(search.length && 1)}${search}`;
            const query = search ? `?${search}` : ""

            router.replace(`${pathname}${query}`, {
              scroll: false,
            })
          }}
          id="available"
        />
        <Label htmlFor="available">Only Available</Label>
      </div>
    </div>
  )
}
