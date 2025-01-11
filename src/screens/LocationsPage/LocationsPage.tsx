import { DistrictRoutesCount } from "~/domains";
import { MainHeadline, MaxWidth } from "~/ui/components/atoms";

import { LocationCard } from "./components";
import { districts } from "~/ui/constants/location";

interface LocationsPageScreenProps {
  districtRoutesCount: DistrictRoutesCount;
}

export const LocationsPageScreen = ({
  districtRoutesCount,
}: LocationsPageScreenProps) => {
  return (
    <section>
      <MaxWidth>
        <div className="h-screen flex flex-col justify-center">
          <MainHeadline>Vyber kraj, který chceš objevovat</MainHeadline>
          <div className="grid grid-flow-row grid-cols-fluid gap-10 pt-10">
            {districts?.map((location) => {
              const region = location.value;
              return (
                <LocationCard
                  key={location.value}
                  routesCount={districtRoutesCount[region] ?? 0}
                  label={location.label}
                  href={`/locations/${location.value}`}
                />
              );
            })}
          </div>
        </div>
      </MaxWidth>
    </section>
  );
};
