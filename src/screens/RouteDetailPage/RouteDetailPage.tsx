import { GeneratedRoute } from "~/domains";
// import { MapContainer } from "components/Map";

import {
  DeleteButton,
  EditButton,
  RouteDetailCard,
  RouteTitleDescription,
} from "./components";
import { Mapbox } from "~/components/Mapbox";
// import { LeafletMap } from "@/components/Map/LeafletMap";
// import { MapContainer } from "@/components/Map";

interface RoutePageScreenProps {
  locationId: string;
  routeId: string;
  route: GeneratedRoute;
  isAuthor: boolean;
}

export const RoutePageScreen = ({
  locationId,
  routeId,
  route,
  isAuthor,
}: RoutePageScreenProps) => {
  return (
    <RouteDetailCard returnPath={`/locations/${locationId}`}>
      <div className="relative flex flex-col flex-1 gap-4 p-12 lg:flex">
        <RouteTitleDescription
          title="Název trasy"
          description={route?.detail?.name}
        />
        <RouteTitleDescription
          title="Popis trasy"
          description={route?.detail?.description}
        />
        <RouteTitleDescription
          title="Počet kilometrů"
          description={route?.detail?.distance}
        />
        <RouteTitleDescription
          title="Autor"
          description={route?.author?.name}
        />
        {isAuthor && (
          <div className="mt-auto mr-auto hidden gap-4 lg:flex">
            <EditButton
              redirectHref={`/locations/${locationId}/${routeId}/edit`}
            />
            <DeleteButton routeId={routeId} />
          </div>
        )}
      </div>
      <div className="relative h-[35rem] lg:h-full lg:flex-1 lg:p-4">
        <Mapbox route={route?.routePoints} />
        {/* <MapContainer staticView /> */}
        {/* <MapContainer staticView={true} /> */}
      </div>
    </RouteDetailCard>
  );
};
