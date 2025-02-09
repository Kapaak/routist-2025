import { LayerSpecification, LngLatLike } from "mapbox-gl";
import { Popup, Marker } from "mapbox-gl";
import { Coordinate } from "~/domains";

/**
 * Updates route markers on the given map instance.
 *
 * This function takes an array of coordinates and a Mapbox map instance,
 * and adds markers to the map at each coordinate. Each marker is draggable
 * and has a popup displaying a message.
 *
 * @param coordinates - An array of coordinates for the markers.
 * @param map - The Mapbox map instance where the markers will be added.
 * @param onChange - A function to call when a marker is dragged.
 * @param editable - A boolean indicating whether the markers are draggable.
 * @returns An array of created markers.
 */
export function updateRouteMarkers(
  coordinates: Coordinate[],
  map: mapboxgl.Map,
  onChange?: (coordinates: Coordinate[]) => void,
  editable = true
) {
  const markers = coordinates.map((coord, index) => {
    return new Marker()
      .setLngLat(coord as LngLatLike)
      .addTo(map)
      .setDraggable(editable)
      .on("dragend", (e) => {
        const lngLat = e.target.getLngLat();

        const latLngCoordinates = lngLat.toArray() as Coordinate;

        const updatedCoordinates = coordinates.map((coord, i) =>
          i === index ? latLngCoordinates : coord
        );

        //TODO: Fix this hack
        //Hack that updates the waypoints
        //using it in the handleRoutePointsChange in useMapBox didnt work for some reason
        coordinates = updatedCoordinates;

        onChange?.(updatedCoordinates);
      })
      .setPopup(new Popup().setHTML("<h1>Marker</h1>"));
  });

  return markers;
}

/**
 * Updates a route path layer for a Mapbox map.
 *
 * This function takes an array of coordinates and generates a Mapbox layer
 * specification for displaying the route as a line on the map. The layer is
 * configured with a GeoJSON source containing the route coordinates.
 *
 * @param coordinates - An array of coordinates for the route path.
 * @returns A Mapbox LayerSpecification object for the route path.
 */
export function updateRoutePath(coordinates: Coordinate[]): LayerSpecification {
  const geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates,
    },
  };

  const layer: LayerSpecification = {
    id: "route",
    type: "line",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
  };

  return layer;
}

/**
 * Updates route points on the given map instance.
 *
 * This function takes an array of coordinates and a Mapbox map instance,
 * and adds point layers to the map at each coordinate. Each point is displayed
 * as a circle with a specified radius and color.
 *
 * @param coordinates - An array of coordinates for the route points.
 * @param map - The Mapbox map instance where the points will be added.
 * @returns void
 */
export function updateRoutePoints(coordinates: number[][], map: mapboxgl.Map) {
  return coordinates.forEach((coord, index) => {
    map.addLayer({
      id: `point-${index}`,
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: coord,
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 10,
        "circle-color": "#3887be",
      },
    });
  });
}

export function cleanupMapLayer(layerName: string, map: mapboxgl.Map) {
  const layers = map?.getStyle()?.layers || [];

  layers.forEach((layer) => {
    if (layer.id.startsWith(layerName)) {
      map.removeLayer(layer.id);
      map.removeSource(layer.id);
    }
  });
}
