"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useEffect, useRef } from "react";

export function Mapbox() {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map>(null);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_MAPBOX);

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/kapaakinos/cljg8ydp100aw01qs1bpl3sn2",
      center: [16.6068, 49.1951],
      zoom: 13,
    });
  }, []);

  return (
    <div id="map" className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
