"use client";

import { useCallback, useState } from "react";

import { IconButton, Link } from "~/ui/components/atoms";
import { List } from "@phosphor-icons/react/dist/ssr";
// import { useSession } from "next-auth/react";

// import { useRouter } from "next/navigation";
import { MobileMenu } from "./MobileMenu";
export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const { data: session } = useSession();
  // const router = useRouter();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav className="">
      <ul className="hidden items-center gap-8 lg:flex">
        <Link variant="underlined" href="/" onClick={handleClose}>
          domů
        </Link>
        <Link variant="underlined" href="/locations" onClick={handleClose}>
          kraje
        </Link>
        {/* <Link variant="underlined" href="/contact" onClick={handleClose}>
          kontakt
        </Link> */}
        {/* {!session && (
          <Button onClick={() => router.push("/sign-in")}>Přihlásit se</Button>
        )}
        {session && session?.user?.name && (
          <UserComponent userName={session?.user?.name} />
        )} */}
      </ul>

      <IconButton
        icon={<List size={40} />}
        onClick={() => setIsOpen(true)}
        className="lg:hidden"
      />
      <MobileMenu isOpen={isOpen} onClose={handleClose} />
    </nav>
  );
};
