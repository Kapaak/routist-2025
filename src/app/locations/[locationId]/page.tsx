import { LocationPageScreen } from "~/screens/LocationDetailPage";

interface NextPageProps {
  params: { locationId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function LocationDetailPage({ params }: NextPageProps) {
  //The await keyword is necessary, even though ts complains https://nextjs.org/docs/messages/sync-dynamic-apis
  const { locationId } = await params;

  return <LocationPageScreen locationId={locationId} />;
}
