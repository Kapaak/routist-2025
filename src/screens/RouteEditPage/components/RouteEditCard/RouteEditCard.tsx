import NextLink from "next/link";
import { PropsWithChildren } from "react";

import { MaxWidth } from "~/ui/components/atoms";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

interface RouteEditCardProps extends PropsWithChildren {
  returnPath: string;
}

export const RouteEditCard = ({ children, returnPath }: RouteEditCardProps) => {
  return (
    <section className="relative">
      <MaxWidth className="px-0 md:px-0 lg:px-14">
        <div className="h-screen flex flex-col lg:block">
          <NextLink
            href={returnPath}
            className="mb-4 flex items-center gap-2 py-2 px-4 lg:px-0"
          >
            <ArrowLeft weight="bold" /> Zpět na seznam všech tras
          </NextLink>

          <div className="relative flex z-10 h-[40rem] flex-1 flex-col-reverse rounded-lg bg-transparent before:absolute before:z-negative before:h-full before:w-full before:rounded-lg before:bg-white before:opacity-50 before:content-[''] lg:h-[70rem] lg:flex-row">
            {children}
          </div>
        </div>
      </MaxWidth>
    </section>
  );
};
