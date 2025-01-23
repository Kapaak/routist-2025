"use client";

import mapboxgl, { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useCallback, useEffect, useRef } from "react";
import { Coordinate, GeneratedRoute } from "~/domains";
import { getRoutePointsByWaypoints } from "~/libs/mapbox/api/route";
import {
  cleanupMapLayer,
  updateRouteMarkers,
  updateRoutePath,
  updateRoutePoints,
} from "~/utils/map";

interface MapboxProps {
  routePoints: Coordinate[];
  waypoints: GeneratedRoute["routePoints"];
  editable?: boolean;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

const DEFAULT_COORDINATES: LngLatLike = [16.6068, 49.1951];

export function Mapbox({ waypoints, routePoints, editable }: MapboxProps) {
  const waypointsRef = useRef(waypoints);
  //Map container is for targeting the map HTML element
  const mapContainer = useRef(null);
  //MapInstance provides map methods and properties
  const mapInstance = useRef<mapboxgl.Map>(null);

  const handleWaypointsChange = useCallback(
    async (newWaypointsCoordinates: Coordinate[]) => {
      if (!mapInstance.current) return;

      const routePoints = await getRoutePointsByWaypoints(
        newWaypointsCoordinates
      );

      cleanupMapLayer("route", mapInstance.current);
      cleanupMapLayer("point", mapInstance.current);

      updateRoutePoints(newWaypointsCoordinates, mapInstance.current);
      const layer = updateRoutePath(routePoints.geometry.coordinates);

      mapInstance.current?.addLayer(layer);
    },
    []
  );

  useEffect(() => {
    waypointsRef.current = waypoints;

    const routeStartCoordinates: LngLatLike = [
      waypoints[0]?.coordinates.lng,
      waypoints[0]?.coordinates.lat,
    ];

    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      renderWorldCopies: false,
      preserveDrawingBuffer: true,
      style: "mapbox://styles/kapaakinos/cljg8ydp100aw01qs1bpl3sn2",
      center: waypointsRef?.current?.[0]?.coordinates
        ? routeStartCoordinates
        : DEFAULT_COORDINATES,
      zoom: 9,
      minZoom: 6,
    });

    mapInstance.current = map;

    map.on("load", () => {
      map.addControl(new mapboxgl.NavigationControl());

      if (waypoints && map) {
        const waypointsCoordinates = waypointsRef?.current?.map((point) => {
          return [point.coordinates.lng, point.coordinates.lat];
        });

        updateRoutePoints(waypointsCoordinates, map);
        updateRouteMarkers(
          waypointsCoordinates,
          map,
          handleWaypointsChange,
          editable
        );

        const layer = updateRoutePath(routePoints);
        map?.addLayer(layer);
      }
    });
  }, [editable, handleWaypointsChange, routePoints, waypoints]);

  return (
    <div id="map" className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
