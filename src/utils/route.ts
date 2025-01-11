import { RoutesPerLocationResponse } from "~/domains";

export function countRegionOccurrences(data: RoutesPerLocationResponse[]): {
  [region: string]: number;
} {
  const regionCounts: { [region: string]: number } = {};

  for (const item of data) {
    const regions = item.detail.regions || [];
    for (const region of regions) {
      if (regionCounts.hasOwnProperty(region)) {
        regionCounts[region]++;
      } else {
        regionCounts[region] = 1;
      }
    }
  }

  return regionCounts;
}
