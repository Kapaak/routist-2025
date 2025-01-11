import Image from "next/image";
import { SearchBar } from "~/components/SearchBar";

import CyclistHeroImage from "~/public/images/hero-img.jpg";
import { MainHeadline, MaxWidth, MainSubheadline } from "~/ui/components/atoms";
import { districts } from "~/ui/constants/location";

export const HomePageScreen = () => {
  return (
    <section className="relative">
      <MaxWidth>
        <div className="h-screen">
          <div className="flex h-full items-center justify-end gap-4 lg:justify-between">
            <div className="flex flex-col mb-30 flex-1 justify-end gap-4 lg:mb-0 lg:justify-center">
              <div>
                <MainHeadline className="max-w-lg font-bold">
                  Cestujte a objevujte nové kouty
                </MainHeadline>
                <MainSubheadline className="font-bold">
                  ze sedla svého kola
                </MainSubheadline>
              </div>
              <SearchBar
                placeholder="Vyhledej kraj mé trasy..."
                baseRoute="/locations"
                options={districts}
              />
            </div>
            <div className="relative z-20 hidden flex-1 lg:block h-[70rem] overflow-hidden">
              <Image
                src={CyclistHeroImage}
                alt="Cyklista sprintující na kole"
                fill
                className="z-0 m-auto max-h-full max-w-full object-cover object-center pl-[20%] md:object-right"
              />
            </div>
          </div>
        </div>
      </MaxWidth>
    </section>
  );
};
