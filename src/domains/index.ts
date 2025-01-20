import { HTMLAttributes } from "react";

import { Prisma, Route as PrismaRoute } from "@prisma/client";

export type ClassName = HTMLAttributes<HTMLDivElement>["className"];

export type AutocompleteOption = {
  id?: number | string;
  label: string;
  value: string;
};

export type DistrictRoutesCount = { [district: string]: number };

//TODO: generate new type for this -> author should be directly in PrismaRoute
export type GeneratedRoute = PrismaRoute & { author: { name?: string | null } };

export type GeneratedRouteWithAuthor = Prisma.RouteGetPayload<{
  include: { author: true };
}>;

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
