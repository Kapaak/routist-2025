import { RouteEditPageScreen } from "~/screens/RouteEditPage";

interface NextPageProps {
  params: { locationId: string; routeId: string };
}

export default async function RouteEditPage({ params }: NextPageProps) {
  const { routeId, locationId } = params;

  return <RouteEditPageScreen routeId={routeId} locationId={locationId} />;
}
