import { signIn } from "next-auth/react";

import {
  Button,
  Divider,
  Input,
  MainHeadline,
  MaxWidth,
  Text,
} from "~/ui/components/atoms";

import { HalfPageImage } from "~/ui/components/layouts";
import { TextLink } from "~/ui/components/molecules";
import { SignInOptions } from "./components";

type SignUpFormModel = {
  name?: string;
  email?: string;
  password?: string;
  verifyPassword?: string;
};

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
        <MaxWidth className="flex-1">
          <div className="flex items-center h-screen">
            <form className="w-full max-w-[40rem]">
              <MainHeadline className="mb-20 text-center font-bold">
                Rádi tě opět vidíme!
              </MainHeadline>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col mx-auto w-full gap-6">
                  <Input name="email" label="E-mail" />
                  <Input name="password" label="Heslo" type="password" />
                </div>

                <div className="flex flex-col gap-2">
                  <TextLink
                    text="Ještě nemáš účet"
                    action="Registruj se"
                    href="/sign-up"
                  />
                  <TextLink
                    text="Zapomněli jste heslo?"
                    action="Nové heslo"
                    href="/new-password"
                  />
                </div>

                <Button color="secondary" className="self-end">
                  Přihlásit se
                </Button>

                <div className="flex items-center my-2 gap-8">
                  <Divider borderColor="secondary" />
                  <Text size="small" color="gray">
                    nebo
                  </Text>
                  <Divider borderColor="secondary" />
                </div>

                <SignInOptions />
              </div>
            </form>
          </div>
        </MaxWidth>
      </HalfPageImage>
    </section>
  );
};
