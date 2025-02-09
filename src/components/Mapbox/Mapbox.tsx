"use client";

import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Coordinate } from "~/domains";
import { useMapbox } from "./hooks";
import { LngLatLike } from "mapbox-gl";
import { compareArrays } from "~/utils/array";

interface MapboxProps {
  waypoints: Coordinate[];
  editable?: boolean;
  className?: string;
  onChange?: (waypoints: Coordinate[]) => void;
}

export function Mapbox({
  waypoints,
  editable = false,
  className,
  onChange,
}: MapboxProps) {
  const { mapWaypoints, mapContainer } = useMapbox({
    center: waypoints[0] as LngLatLike,
    editable,
    onChange,
  });

  useEffect(() => {
    if (compareArrays(waypoints, mapWaypoints.current)) {
      return;
    }

    mapWaypoints.current = waypoints;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waypoints]);

  return (
    <div id="map" className={twMerge("relative w-full h-full", className)}>
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
