import { Button } from "~/ui/components/atoms";
import {
  RouteChangeTab,
  RouteDetailTab,
  RouteEditCard,
  RouteEditTabs,
} from "./components";
import { getRouteById } from "~/libs/prisma/api/route";

import { TabPanels } from "@headlessui/react";
import { getRoutePointsByWaypoints } from "~/libs/mapbox/api/route";
import { coordinatesFromRoutePoints } from "~/utils/route";

interface RouteEditPageScreenProps {
  locationId: string;
  routeId: string;
}

export async function RouteEditPageScreen({
  locationId,
  routeId,
}: RouteEditPageScreenProps) {
  const route = await getRouteById(routeId);

  if (!route) {
    return null;
  }

  const data = await getRoutePointsByWaypoints(
    //In the API I have routePoints, that are actually waypoints
    //I need to convert them to coordinates
    //TOOD: rename routePoints to waypoints
    coordinatesFromRoutePoints(route?.routePoints)
  );

  // const [page, setPage] = useState(RouteEditSteps.DETAIL);

  // const isDetailPage = page === RouteEditSteps.DETAIL;
  // const isRoutePage = page === RouteEditSteps.ROUTE;

  // const { query, ...router } = useRouter();

  // const form = useForm<GeneratedRoute>({
  //   defaultValues: route,
  // });

  // const { reset, handleSubmit } = form;

  // const { distance } = useRouteContext();

  // const { updateRouteDetail, isLoading } = useUpdateRouteDetail();

  // const onSubmit = (routeData: GeneratedRoute) => {
  //   const newRouteData = { ...routeData };

  //   newRouteData.detail.distance = +convertMetersToKilometers(distance);
  //   newRouteData.detail.regions = newRouteData.detail.regions.map(
  //     //@ts-ignore
  //     (region) => region.value
  //   );

  //   updateRouteDetail(query.routeId as string, newRouteData);

  //   setTimeout(() => {
  //     router.push(`/locations/${query.locationId}/${query.routeId}`);
  //   }, 300);
  // };

  // const handleRouteReset = () => {
  //   //tady je potreba resetovat, reset(route), aby to fungovalo
  //   setPage(RouteEditSteps.ROUTE);
  // };

  // useEffect(() => {
  //   //   //by default regions contain only value, but I need to have also label
  //   const updatedRoute = structuredClone(route);

  //   const regions = locations.filter((location) =>
  //     route.detail.regions.includes(location.value)
  //   );

  //   //@ts-ignore -> need to update type detail.regions from string to {label:string,value:string}
  //   updatedRoute.detail.regions = regions;

  //   reset(updatedRoute);
  // }, [route, reset]);

  return (
    <RouteEditCard returnPath={`/locations/${locationId}/${routeId}`}>
      <RouteEditTabs>
        <form id="FORM_ROUTE_EDIT" action="todo" className="w-full border-t-2">
          <TabPanels className="pt-4">
            <RouteDetailTab
              route={route}
              coordinates={data?.geometry?.coordinates}
            />
            <RouteChangeTab
              route={route}
              coordinates={data?.geometry?.coordinates}
            />
          </TabPanels>
        </form>
      </RouteEditTabs>

      <Button form="FORM_ROUTE_EDIT" className="mt-auto mr-auto" type="submit">
        Uložit
      </Button>
    </RouteEditCard>
  );
}
