import { PropsWithChildren } from "react";

import { Karla } from "next/font/google";

import { Header } from "../Header";
import { Footer } from "../Footer";

const karla = Karla({ subsets: ["latin", "latin-ext"] });

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className={karla.className}>{children}</main>
      <Footer />
    </>
  );
};
