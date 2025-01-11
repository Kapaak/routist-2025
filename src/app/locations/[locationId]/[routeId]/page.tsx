// import { GetServerSideProps, NextPage } from "next";
// import { getServerSession } from "next-auth";

// import { RouteContextProvider } from "@/contexts";
// import { GeneratedRoute } from "@/domains";
import { getRouteById } from "~/prisma/api/route";
import { notFound } from "next/navigation";
import { RoutePageScreen } from "~/screens/RouteDetailPage";

// import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

interface NextPageProps {
  params: { locationId: string; routeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function RoutePage({ params }: NextPageProps) {
  const { routeId, locationId } = params;

  const route = await getRouteById(routeId as string);

  if (!route) {
    return notFound();
  }

  return (
    // <RouteContextProvider>
    <RoutePageScreen
      routeId={routeId}
      locationId={locationId}
      route={route}
      isAuthor={true}
    />
    //  </RouteContextProvider>
  );
}

// export const getServerSideProps: GetServerSideProps<RoutePageProps> = async (
//   ctx
// ) => {
//   const { routeId } = ctx.query;

//   const route = await getRouteById(routeId as string);

//   if (!route) return { notFound: true };

//   const session = await getServerSession(ctx.req, ctx.res, authOptions);

//   const isAuthor = session?.user.id === route?.authorId;

//   //@ts-ignore Have to convert date to string so that I can pass it in props
//   route.createdAt = JSON.stringify(route.createdAt);

//   return {
//     props: {
//       route,
//       isAuthor,
//     },
//   };
// };
