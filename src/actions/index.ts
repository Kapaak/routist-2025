"use server";

import { redirect } from "next/navigation";

export async function redirectToLocation(location: string) {
  return redirect(location);
}
