"use client";

import { useCallback, useState } from "react";

import { IconButton, Link } from "~/ui/components/atoms";
import { List } from "@phosphor-icons/react/dist/ssr";
// import { useSession } from "next-auth/react";

// import { useRouter } from "next/navigation";
import { MobileMenu } from "./MobileMenu";
import { navigationItems } from "~/ui/constants/navigation";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const { data: session } = useSession();
  // const router = useRouter();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav>
      <ul className="hidden items-center gap-8 lg:flex">
        {navigationItems.map(
          (item) =>
            item.show && (
              <li key={item.href}>
                <Link
                  variant="underlined"
                  className="lowercase"
                  href={item.href}
                  onClick={handleClose}
                >
                  {item.label}
                </Link>
              </li>
            )
        )}

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
