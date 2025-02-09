import { useCallback, useEffect, useRef } from "react";
import { Coordinate } from "~/domains";
import { getRoutePointsByWaypoints } from "~/libs/mapbox/api/route";
import {
  cleanupMapLayer,
  updateRouteMarkers,
  updateRoutePath,
  updateRoutePoints,
} from "~/utils/map";

import mapboxgl, { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface useMapboxProps {
  center: LngLatLike;
  editable?: boolean;
  onChange?: (waypoints: Coordinate[]) => void;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

const DEFAULT_COORDINATES: LngLatLike = [16.6068, 49.1951];

export function useMapbox({ center, editable, onChange }: useMapboxProps) {
  const mapWaypoints = useRef<Coordinate[]>([]);
  //Map container is for targeting the map HTML element
  const mapContainer = useRef(null);
  //MapInstance provides map methods and properties
  const mapInstance = useRef<mapboxgl.Map>(null);

  const handleRoutePointsChange = useCallback(
    async (newWaypointsCoordinates: Coordinate[]) => {
      if (!mapInstance.current) return;

      try {
        const routePoints = await getRoutePointsByWaypoints(
          newWaypointsCoordinates
        );

        onChange?.(newWaypointsCoordinates);

        cleanupMapLayer("route", mapInstance.current);
        cleanupMapLayer("point", mapInstance.current);

        updateRoutePoints(newWaypointsCoordinates, mapInstance.current);
        const layer = updateRoutePath(routePoints.geometry.coordinates);

        mapInstance.current?.addLayer(layer);
      } catch {
        console.log("ERROR");
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      renderWorldCopies: false,
      preserveDrawingBuffer: true,
      style: "mapbox://styles/kapaakinos/cljg8ydp100aw01qs1bpl3sn2",
      center: center ?? DEFAULT_COORDINATES,
      zoom: 9,
      minZoom: 6,
    });

    mapInstance.current = map;

    map.on("load", () => {
      map.addControl(new mapboxgl.NavigationControl());
    });

    return () => {
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapInstance?.current) return;

    const map = mapInstance.current;

    map.on("style.load", async () => {
      if (mapWaypoints.current.length > 0) {
        updateRouteMarkers(
          mapWaypoints.current,
          map,
          handleRoutePointsChange,
          editable
        );

        await handleRoutePointsChange(mapWaypoints.current);
      }
    });
  }, [editable, handleRoutePointsChange, mapWaypoints, mapInstance]);

  return {
    mapWaypoints,
    mapContainer,
    onRoutePointsChange: handleRoutePointsChange,
    mapInstance,
  };
}
