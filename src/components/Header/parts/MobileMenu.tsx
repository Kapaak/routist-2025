"use client";

import { useEffect } from "react";

import { IconButton, Link } from "~/ui/components/atoms";
import { X } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
// import { useSession } from "next-auth/react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose(): void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // const { data: session } = useSession();
  const query = useSearchParams();

  useEffect(() => {
    onClose();
  }, [onClose, query]);

  return (
    <div
      className={`${
        !isOpen ? "translate-x-full" : "translate-x-0"
      } border-green fixed left-0 top-0 z-20 flex h-full w-full flex-col items-end gap-10 border bg-main-yellow py-6  px-8 transition-all lg:hidden`}
    >
      <IconButton icon={<X size={40} />} onClick={onClose} />

      {/* {!session && (
        <Button onClick={() => router.push("/sign-in")}>Přihlásit se</Button>
      )}
      {session && session?.user?.name && (
        <UserComponent userName={session?.user?.name} />
      )} */}
      <ul className="flex flex-col gap-6 text-right">
        <Link variant="underlined" href="/">
          domů
        </Link>
        <Link variant="underlined" href="/locations">
          trasy
        </Link>
        <Link variant="underlined" href="/contact">
          kontakt
        </Link>
      </ul>
    </div>
  );
};
