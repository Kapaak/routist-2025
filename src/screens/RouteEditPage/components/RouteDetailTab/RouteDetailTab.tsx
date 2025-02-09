import { Mapbox } from "~/components/Mapbox";
import { RouteDescription } from "../RouteDescription";
import { Route } from "@prisma/client";
import { TabPanel } from "@headlessui/react";
import { coordinatesFromRoutePoints } from "~/utils/route";

interface RouteDetailTabProps {
  route: Route;
}
export async function RouteDetailTab({ route }: RouteDetailTabProps) {
  return (
    <TabPanel className="flex w-full h-full">
      <RouteDescription detail={route?.detail} />
      <Mapbox
        waypoints={coordinatesFromRoutePoints(route.routePoints)}
        className="flex-1 h-[50rem]"
      />
    </TabPanel>
  );
}
