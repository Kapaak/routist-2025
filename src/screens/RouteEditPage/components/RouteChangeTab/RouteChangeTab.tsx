import { TabPanel } from "@headlessui/react";
import { Route } from "@prisma/client";
import { Mapbox } from "~/components/Mapbox";
import { Coordinate } from "~/domains";
import { RouteWaypoints } from "../RouteWaypoints";

interface RouteChangeTabProps {
  route: Route;
  coordinates: Coordinate[];
}

export function RouteChangeTab({ coordinates, route }: RouteChangeTabProps) {
  return (
    <TabPanel className="flex w-full h-full">
      <RouteWaypoints waypoints={route.routePoints} />
      <Mapbox
        routePoints={coordinates}
        waypoints={route?.routePoints}
        className="flex-1 h-[50rem]"
        editable
      />
    </TabPanel>
  );
}
