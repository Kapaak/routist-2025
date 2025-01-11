"use server";

import { redirect } from "next/navigation";
import { deleteRouteById } from "~/prisma/api/route";

export async function redirectToLocation(location: string) {
  return redirect(location);
}

export async function deleteRouteByIdAction(routeId: string) {
  return deleteRouteById(routeId);
}
