// import { GetServerSideProps, NextPage } from "next";
// import { getServerSession } from "next-auth";

// import { RouteContextProvider } from "@/contexts";
// import { GeneratedRoute } from "@/domains";
import { getRouteById } from "~/libs/prisma/api/route";
import { notFound } from "next/navigation";
import { RoutePageScreen } from "~/screens/RouteDetailPage";
import { getSession } from "~/auth";

// import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

interface NextPageProps {
  params: { locationId: string; routeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function RoutePage({ params }: NextPageProps) {
  const { routeId, locationId } = params;

  const route = await getRouteById(routeId);

  if (!route) {
    return notFound();
  }

  const session = await getSession();

  const isAuthor = session?.user.id === route?.authorId;

  return (
    <RoutePageScreen
      routeId={routeId}
      locationId={locationId}
      route={route}
      isAuthor={isAuthor}
    />
  );
}
