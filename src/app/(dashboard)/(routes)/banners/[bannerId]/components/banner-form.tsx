"use client"

import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertModal } from "@/components/modals/alert-modal"
import { useOrigin } from "@/app/hooks/use-origin"
import ImageUpload from "@/components/ui/image-upload"
import { Banner } from "@prisma/client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  label: z.string().min(1),
  image: z.string().min(1),
})

type BannerFormValues = z.infer<typeof formSchema>

interface BannerFormProps {
  initialData: Banner | null
}

export const BannerForm: React.FC<BannerFormProps> = ({ initialData }) => {
  const router = useRouter()
  const params = useParams()
  const origin = useOrigin()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit banner" : "Create banner"
  const description = initialData ? "Edit banner" : "Add a new banner"
  const toastMessage = initialData ? "Banner updated" : "Banner created"
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      image: "",
    },
  })

  const onSubmit = async (data: BannerFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/banners/${params.bannerId}`, data)
      } else {
        await axios.post(`/api/banners/`, data)
      }
      router.push("/banners")
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      console.error("Error when submitting banner form", error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/banners/${params.bannerId}`)
      router.refresh()
      router.push(`/banners`)
      toast.success("Banner deleted.")
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using this banner first."
      )
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field?.value ? [field?.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Banner label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  )
}
