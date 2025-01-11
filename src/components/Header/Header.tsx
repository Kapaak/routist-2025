import { MaxWidth } from "~/ui/components/atoms";
import { Logo, Navigation } from "./parts";

export function Header() {
  return (
    <header className="py-6">
      <MaxWidth>
        <div className="flex justify-between">
          <Logo />
          <Navigation />
        </div>
      </MaxWidth>
    </header>
  );
}
