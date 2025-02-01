import { Mapbox } from "~/components/Mapbox";
import { RouteDescription } from "../RouteDescription";
import { Route } from "@prisma/client";
import { getRoutePointsByWaypoints } from "~/libs/mapbox/api/route";
import { coordinatesFromRoutePoints } from "~/utils/route";
import { TabPanel } from "@headlessui/react";

interface RouteDetailTabProps {
  route: Route;
}
export async function RouteDetailTab({ route }: RouteDetailTabProps) {
  const data = await getRoutePointsByWaypoints(
    //In the API I have routePoints, that are actually waypoints
    //I need to convert them to coordinates
    //TOOD: rename routePoints to waypoints
    coordinatesFromRoutePoints(route?.routePoints)
  );
  return (
    <TabPanel className="flex w-full h-full">
      <RouteDescription detail={route?.detail} />
      <Mapbox
        routePoints={data?.geometry?.coordinates}
        waypoints={route?.routePoints}
        className="flex-1 h-[50rem]"
      />
    </TabPanel>
  );
}
