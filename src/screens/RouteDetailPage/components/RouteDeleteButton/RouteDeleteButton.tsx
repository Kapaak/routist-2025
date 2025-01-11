"use client";

import { deleteRouteByIdAction, redirectToLocation } from "~/actions";
import { Button } from "~/ui/components/atoms";

interface DeleteButtonProps {
  routeId: string;
}

export function DeleteButton({ routeId }: DeleteButtonProps) {
  return (
    <Button
      className="border-black hover:border-red-500 hover:bg-red-500 hover:text-white"
      variant="outlined"
      type="button"
      onClick={async () => {
        await deleteRouteByIdAction(routeId);
        await redirectToLocation("/locations");
      }}
    >
      Odstranit
    </Button>
  );
}
