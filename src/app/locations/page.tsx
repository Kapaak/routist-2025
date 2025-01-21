import { getAllDistrictRoutesCount } from "~/libs/prisma/api/route";
import { LocationsPageScreen } from "~/screens/LocationsPage";

export default async function LocationsPage() {
  const districtRoutesCount = await getAllDistrictRoutesCount();

  return <LocationsPageScreen districtRoutesCount={districtRoutesCount} />;
}
