"use client";

import { redirectToLocation } from "~/actions";
import { Button } from "~/ui/components/atoms";

interface EditButtonProps {
  redirectHref: string;
}

export function EditButton({ redirectHref }: EditButtonProps) {
  return (
    <Button
      onClick={() => {
        redirectToLocation(redirectHref);
      }}
    >
      Upravit
    </Button>
  );
}
