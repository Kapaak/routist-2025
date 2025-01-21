import { RoutePoint } from "@prisma/client";
import { GetRoutePointsResponse } from "~/domains";

export async function getRoutePointsByWaypoints(
  waypoints: RoutePoint[]
): Promise<GetRoutePointsResponse> {
  const coordinates = waypoints.map((point) => {
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
    `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordinatesString}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX}`,
    { method: "GET" }
  );

  const json = await query.json();

  const data: GetRoutePointsResponse = json.routes[0];

  return data;
}
