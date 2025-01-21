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
  route: GeneratedRoute["routePoints"];
}

//TODO:
//1. pridat do route nejakej identifikator na manualni point pridaný uživatelem
// - abych mohl zobrazit ty manualni pointy pomoci markeru a
// - zaroven abych mohl zobrazit vsechny pointy z routy a nevolat API vzdy znova
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

const DEFAULT_COORDINATES: LngLatLike = [16.6068, 49.1951];

export function Mapbox({ route }: MapboxProps) {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map>(null);

  useEffect(() => {
    const routeStartCoordinates: LngLatLike = [
      route[0]?.coordinates.lng,
      route[0]?.coordinates.lat,
    ];

    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      renderWorldCopies: false,
      preserveDrawingBuffer: true,
      style: "mapbox://styles/kapaakinos/cljg8ydp100aw01qs1bpl3sn2",
      center: route[0]?.coordinates
        ? routeStartCoordinates
        : DEFAULT_COORDINATES,
      zoom: 9,
      minZoom: 6,
    });

    map.on("load", () => {
      map.addControl(new mapboxgl.NavigationControl());

      if (route && map) {
        const waypoints = route?.map((point) => {
          return [point.coordinates.lng, point.coordinates.lat];
        });

        initializeRoutePoints(waypoints, map);
        initializeRouteMarkers(waypoints, map);

        //tady do budoucna nebudou vsechny waypoints
        //waypoints budou jen manualne pridany pruchozi pointy
        //tady budou vsechny vygenerovany pointy z routy
        const layer = initializeRoutePath(waypoints);
        map?.addLayer(layer);
      }
    });
  }, [route]);

  const test = async () => {
    if (!route || !map?.current) return;

    const coordinates = route.map((point) => {
      return [point.coordinates.lng, point.coordinates.lat];
    });

    const coordinatesString = coordinates.reduce((acc, coord, index) => {
      const coordString = `${coord[0]},${coord[1]}`;
      if (index !== coordinates.length - 1) {
        return acc + coordString + ";";
      } else {
        return acc + coordString;
      }
    }, "");

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordinatesString}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );

    const json = await query.json();

    const data = json.routes[0];
    const routeCoordinates = data.geometry.coordinates;
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: routeCoordinates,
      },
    };

    // if the route already exists on the map, we'll reset it using setData
    if (map.current.getSource("route")) {
      map.current.getSource("route")?.setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
  };

  return (
    <>
      <button type="button" onClick={() => test()}>
        test onclick
      </button>
      <div id="map" className="relative w-full h-full">
        <div ref={mapContainer} className="w-full h-full" />
      </div>
    </>
  );
}
