import { MainHeadline, MainSubheadline, MaxWidth } from "~/ui/components/atoms";
import { Suspense } from "react";
import { getAllRoutesByDistrict } from "~/libs/prisma/api/route";
import { districts } from "~/ui/constants/location";
import { RoutesTable } from "./components";

interface LocationpageScreenProps {
  locationId?: string;
}

export const LocationPageScreen = async ({
  locationId,
}: LocationpageScreenProps) => {
  const locationByValue = districts.find(
    (district) => district?.value === locationId
  );

  const routesByLocation = await getAllRoutesByDistrict(locationId ?? "");

  return (
    <section className="relative">
      <MaxWidth>
        <div className="h-screen lg:pt-20">
          <MainHeadline>Destinace v okolí</MainHeadline>
          <MainSubheadline className="mb-10">
            {locationByValue?.label}
          </MainSubheadline>
          <Suspense fallback={<p>Načítají se trasy ke kraji.</p>}>
            <div className="overflow-x-auto">
              <RoutesTable routes={routesByLocation} />
            </div>
          </Suspense>
        </div>
      </MaxWidth>
    </section>
  );
};
