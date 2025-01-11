"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

interface AuthProvidersProps extends PropsWithChildren {
  session: Session | null;
}

export function AuthProvider({ session, children }: AuthProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
