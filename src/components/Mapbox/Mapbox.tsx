"use client";

import mapboxgl, { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useEffect, useRef } from "react";
import { GeneratedRoute } from "~/domains";
import {
  initializeRouteMarkers,
  initializeRoutePath,
  initializeRoutePoints,
} from "~/utils/map";

interface MapboxProps {
  routePoints: LngLatLike[];
  waypoints: GeneratedRoute["routePoints"];
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

const DEFAULT_COORDINATES: LngLatLike = [16.6068, 49.1951];

export function Mapbox({ waypoints, routePoints }: MapboxProps) {
  //Map container is for targeting the map HTML element
  const mapContainer = useRef(null);
  //MapInstance provides map methods and properties
  const mapInstance = useRef<mapboxgl.Map>(null);

  useEffect(() => {
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
      center: waypoints[0]?.coordinates
        ? routeStartCoordinates
        : DEFAULT_COORDINATES,
      zoom: 9,
      minZoom: 6,
    });

    mapInstance.current = map;

    map.on("load", () => {
      map.addControl(new mapboxgl.NavigationControl());

      if (waypoints && map) {
        const waypointsCoordinates = waypoints?.map((point) => {
          return [point.coordinates.lng, point.coordinates.lat];
        });

        initializeRoutePoints(waypointsCoordinates, map);
        initializeRouteMarkers(waypointsCoordinates, map);

        const layer = initializeRoutePath(routePoints);
        map?.addLayer(layer);
      }
    });
  }, [routePoints, waypoints]);

  return (
    <div id="map" className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
