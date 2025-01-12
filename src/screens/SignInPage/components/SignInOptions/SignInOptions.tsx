"use client";

import { GoogleLogo } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import { Button } from "~/ui/components/atoms";

export const SignInOptions = () => {
  return (
    <div className="flex justify-between gap-4">
      <Button
        className="flex flex-1 items-center justify-center gap-2 border-main-orange"
        variant="outlined"
        onClick={() =>
          signIn("google", {
            redirect: true,
            callbackUrl: `/`,
          })
        }
        type="button"
      >
        <GoogleLogo size={20} weight="bold" />
        <span>Google</span>
      </Button>

      {/* <IconButton
        icon={<FacebookLogo />}
        onClick={() => signIn("facebook")}
        disabled
        size="medium"
        className="flex items-center gap-2 border-main-orange"
      />
      <IconButton
        icon={<GithubLogo />}
        onClick={() => signIn("github")}
        disabled
        size="medium"
        className="flex items-center gap-2 border-main-orange"
      /> */}
    </div>
  );
};
