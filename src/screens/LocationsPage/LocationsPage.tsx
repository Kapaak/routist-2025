import { Region } from "~/domains";
import { MainHeadline, MaxWidth } from "~/ui/components/atoms";

import { LocationCard } from "./components";
import { districts } from "~/ui/constants/location";

interface LocationsPageScreenProps {
  regionsRoutesCount: Region;
}

export const LocationsPageScreen = ({
  regionsRoutesCount,
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
                  routesCount={regionsRoutesCount[region] ?? 0}
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
