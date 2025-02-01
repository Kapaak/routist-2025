import { Mapbox } from "~/components/Mapbox";
import { RouteDescription } from "../RouteDescription";
import { Route } from "@prisma/client";
import { TabPanel } from "@headlessui/react";
import { Coordinate } from "~/domains";

interface RouteDetailTabProps {
  route: Route;
  coordinates: Coordinate[];
}
export async function RouteDetailTab({
  route,
  coordinates,
}: RouteDetailTabProps) {
  return (
    <TabPanel className="flex w-full h-full">
      <RouteDescription detail={route?.detail} />
      <Mapbox
        routePoints={coordinates}
        waypoints={route?.routePoints}
        className="flex-1 h-[50rem]"
      />
    </TabPanel>
  );
}
