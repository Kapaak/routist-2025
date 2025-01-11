import { GeneratedRoute } from "~/domains";
import { countRegionOccurrences } from "~/utils/route";

import { prisma } from "../prisma";

export const getAllRoutes = async () => {
  const routes = await prisma.route.findMany({
    include: {
      author: true,
    },
  });

  return routes;
};

export const getAllDistrictRoutesCount = async () => {
  const routes = await prisma.route.findMany({
    select: {
      detail: {
        select: {
          regions: true,
        },
      },
    },
  });

  const districtRoutesCount = countRegionOccurrences(routes);

  return districtRoutesCount;
};

export const getAllRoutesByLocation = async (location: string) => {
  const routes = await prisma.route.findMany({
    include: {
      author: true,
    },
  });

  const filtered = routes.filter((route) =>
    route.detail.regions.includes(location)
  );

  return filtered;
};

export const getRouteById = async (id: string) => {
  const route = await prisma.route.findUnique({
    where: { id },
    include: {
      author: true,
    },
  });

  return route;
};

export const updateRatingById = async (id: string, rating: number) => {
  const updatedRating = await prisma.route.update({
    where: {
      id,
    },
    data: {
      rating: {
        increment: rating,
      },
      votesNumber: {
        increment: 1,
      },
    },
  });

  return updatedRating;
};

export const updateRouteById = async (id: string, data: GeneratedRoute) => {
  const updatedRoute = await prisma.route.update({
    where: {
      id,
    },
    data: {
      detail: {
        description: data?.detail?.description,
        distance: data?.detail?.distance,
        elevation: data?.detail?.elevation,
        name: data?.detail?.name,
        interestingPlaces: data?.detail?.interestingPlaces,
        terrain: data?.detail?.terrain,
        regions: data?.detail?.regions,
      },
      routePoints: data.routePoints,
    },
  });

  return updatedRoute;
};

export const createRoute = async (data: GeneratedRoute) => {
  const newRoute = await prisma.route.create({
    data: {
      detail: data.detail,
      authorId: data.authorId,
      createdAt: data.createdAt,
      routePoints: data.routePoints,
    },
    include: {
      author: true,
    },
  });
  return newRoute;
};

export const deleteRouteById = async (id: string) => {
  const deletedRoute = await prisma.route.delete({
    where: {
      id,
    },
  });

  return deletedRoute;
};

// data: {
//   detail: {
//     name: "Generated",
//     description: "Vygenerovana trasa z kodu",
//     distance: 133,
//     elevation: 250,
//     interestingPlaces: ["gravel"],
//     terrain: [],
//   },
//   authorId: "6438f8baa0c55e85281ab54d",
//   createdAt: "2022-04-14T06:56:53.037Z",
//   routePoints: [
//     {
//       id: "0",
//       coordinates: {
//         lat: 49.1839069,
//         lng: 16.5304978,
//       },
//       value: "odkud",
//     },
//     {
//       id: "0",
//       coordinates: {
//         lat: 49.1839069,
//         lng: 16.7809511,
//       },
//       value: "odkud",
//     },
//   ],
// },
