import { HTMLAttributes } from "react";

import { Route as PrismaRoute } from "@prisma/client";

export type ClassName = HTMLAttributes<HTMLDivElement>["className"];

export type AutocompleteOption = {
  id?: number | string;
  label: string;
  value: string;
};

export type DistrictRoutesCount = { [district: string]: number };

export type GeneratedRoute = PrismaRoute;

export type RoutesPerLocationResponse = {
  detail: { regions: string[] };
};
