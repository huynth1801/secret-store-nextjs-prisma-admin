"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

// Schema validation using Zod
const FormSchema = z.object({
  pin: z
    .string()
    .min(5, {
      message: "Your one-time password must be 5 characters.",
    })
    .max(6, {
      message: "Your one-time password must be 5 characters.",
    }),
})

// Accept `onChange` as a prop
interface InputOTPFormProps {
  onChange?: (value: string) => void
  disabled?: boolean
}

export function InputOTPForm({ onChange }: InputOTPFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  // Modify the submission handler
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center space-end"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                {/* Pass the onChange event down to InputOTP */}
                <InputOTP
                  maxLength={5}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value)
                    // Call the onChange prop if provided
                    if (onChange) {
                      onChange(value)
                    }
                  }}
                  className="w-full"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 
        <Button type="submit" disabled={disabled}>
          Submit
        </Button> */}
      </form>
    </Form>
  )
}
