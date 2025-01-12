import { signOut } from "next-auth/react";
import { Menu } from "~/ui/components/molecules";

interface UserProps {
  userName: string;
}

export const User = ({ userName }: UserProps) => {
  return (
    <Menu
      label={userName}
      actionButtonProps={{
        color: "secondary",
        variant: "tinted",
      }}
      options={[
        { label: "Profil", href: "/profile" },
        { label: "Moje trasy", href: "/my-routes" },
        {
          label: "Vytvořit trasu",
          href: "/locations/create",
        },
        { label: "Odhlásit se", onClick: signOut },
      ]}
    />
  );
};
