"use client";

import Link from "next/link";
import { redirectToLocation } from "~/actions";
import { Button } from "~/ui/components/atoms";

interface EditButtonProps {
  redirectHref: string;
}

export function EditButton({ redirectHref }: EditButtonProps) {
  return (
    <Link href={redirectHref}>
      <Button
        onClick={() => {
          redirectToLocation(redirectHref);
        }}
      >
        Upravit
      </Button>
    </Link>
  );
}
