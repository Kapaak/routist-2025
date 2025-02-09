"use client";

import { TabPanel } from "@headlessui/react";
import { Route } from "@prisma/client";
import { Mapbox } from "~/components/Mapbox";
import { RouteWaypoints } from "../RouteWaypoints";
import { useCallback, useState } from "react";
import { coordinatesFromRoutePoints } from "~/utils/route";
import { Coordinate } from "~/domains";

interface RouteChangeTabProps {
  route: Route;
}

export function RouteChangeTab({ route }: RouteChangeTabProps) {
  const [waypoints, setWaypoints] = useState(
    coordinatesFromRoutePoints(route.routePoints)
  );

  const handleWaypointsChange = useCallback((waypoints: Coordinate[]) => {
    console.log("UPDATED", waypoints);

    setWaypoints(waypoints);
  }, []);

  return (
    <TabPanel className="flex w-full h-full">
      <RouteWaypoints waypoints={waypoints} />
      <Mapbox
        waypoints={waypoints}
        className="flex-1 h-[50rem]"
        editable
        onChange={handleWaypointsChange}
      />
    </TabPanel>
  );
}
