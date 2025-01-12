"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button, Input, MainHeadline } from "~/ui/components/atoms";
import { TextLink } from "~/ui/components/molecules";

type SignInFormModel = {
  email: string;
  password: string;
};

export function SignInForm() {
  const form = useForm<SignInFormModel>();
  const { register, handleSubmit } = form;

  const handleFormSubmit = (formValues: SignInFormModel) => {
    const { email, password } = formValues;

    //TODO: IMPLEMENT CREDENTIALS PROVIDER

    signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: `/`,
    });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(handleFormSubmit)}>
      <MainHeadline className="mb-20 text-center font-bold">
        Rádi tě opět vidíme!
      </MainHeadline>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col mx-auto w-full gap-6">
          <Input label="E-mail" {...register("email")} />
          <Input label="Heslo" {...register("password")} type="password" />
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
      </div>
    </form>
  );
}
