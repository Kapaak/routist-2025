import { signIn } from "next-auth/react";

import { Divider, MaxWidth, Text } from "~/ui/components/atoms";

import { HalfPageImage } from "~/ui/components/layouts";
import { SignInForm, SignInOptions } from "./components";

//TODO: handle form using NEXTJS https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations
export const SignInPageScreen = () => {
  const onSubmit = (formVals: SignUpFormModel) => {
    signIn("credentials", {
      redirect: true,
      email: formVals.email,
      password: formVals.password,
      callbackUrl: `/`,
    });
  };

  return (
    <section>
      <HalfPageImage
        image="/images/girls-on-ride.jpg"
        alt="Two girls riding a bike."
      >
        <MaxWidth className="h-screen flex-1 flex flex-col justify-center items-center">
          <div className="flex max-w-[40rem] flex-col gap-4 items-center">
            <SignInForm />

            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center my-2 gap-8">
                <Divider borderColor="secondary" />
                <Text size="small" color="gray">
                  nebo
                </Text>
                <Divider borderColor="secondary" />
              </div>

              <SignInOptions />
            </div>
          </div>
        </MaxWidth>
      </HalfPageImage>
    </section>
  );
};
