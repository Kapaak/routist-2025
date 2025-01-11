import { HTMLAttributes } from "react";

import { Prisma, Route as PrismaRoute } from "@prisma/client";

export type ClassName = HTMLAttributes<HTMLDivElement>["className"];

export type AutocompleteOption = {
  id?: number | string;
  label: string;
  value: string;
};

export type DistrictRoutesCount = { [district: string]: number };

export type GeneratedRoute = PrismaRoute;

export type GeneratedRouteWithAuthor = Prisma.RouteGetPayload<{
  include: { author: true };
}> &
  GeneratedRoute;

export type RoutesPerLocationResponse = {
  detail: { regions: string[] };
};

export type RouteRow = {
  id: string;
  name: string;
  distance: number;
  elevation?: number;
  likes: number;
  authorName: string;
  createdAt: string;
  interestingPlaces: string[];
};

export enum PlaceOfInterest {
  SWIMMING = "swimming",
  PUB = "pub",
  NATURE = "nature",
  CULTURE = "culture",
  CHILDREN = "children",
}
