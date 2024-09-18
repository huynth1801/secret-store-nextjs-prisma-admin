import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Preview,
  Tailwind,
  Heading,
  Hr,
} from "@react-email/components"
import React from "react"

interface OTPEmailProps {
  otp?: string
}

export const OTPEmail: React.FC<OTPEmailProps> = ({
  otp,
}): React.ReactElement => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email</Preview>
      <Tailwind>
        <Body className="my-auto mx-auto w-full max-w-lg">
          <Container className="border border-solid border-neutral-500/25 rounded mx-auto p-6">
            <Heading className="mt-0">My secret store</Heading>
            <Text>
              Let’s make sure this is the right address we should use for your
              account.
            </Text>
            <Section>
              <Text className="text-4xl font-bold text-[#484848]">
                Your One-Time Password
              </Text>
              <Text className="text-xl text-[#484848]">
                Use the following OTP to complete your authentication:
              </Text>
            </Section>
            <Section>
              <div className="w-3/4 bg-neutral-500/5 border border-solid border-neutral-400/25 rounded-lg px-6">
                <pre className="text-3xl font-bold text-center">{otp}</pre>
              </div>
            </Section>
            <Text>
              Your confirmation code is above. Enter it in your open browser
              window and we&apos;ll help you get signed in. If you didn&apos;t
              try to login, you can safely ignore this email.
            </Text>
            <Hr className="border border-solid border-neutral-500/25 my-4 mx-0 w-full" />
            <Text className="text-xs text-center mx-auto text-neutral-500/75">
              © {new Date().getFullYear()} My secret store™. All Rights
              Reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
