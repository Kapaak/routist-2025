import { PropsWithChildren } from "react";

// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
import { Karla } from "next/font/google";

const karla = Karla({ subsets: ["latin", "latin-ext"] });

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* <Header /> */}
      <main className={karla.className}>{children}</main>
      {/* <Footer /> */}
    </>
  );
};
