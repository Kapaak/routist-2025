import { Coordinate, GetRoutePointsResponse } from "~/domains";

export async function getRoutePointsByWaypoints(
  waypoints: Coordinate[]
): Promise<GetRoutePointsResponse> {
  const coordinatesString = waypoints.reduce((acc, coord, index) => {
    const coordString = `${coord[0]},${coord[1]}`;
    if (index !== waypoints.length - 1) {
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
