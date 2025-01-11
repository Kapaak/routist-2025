import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { PlaceOfInterest, RouteRow } from "~/domains";
import { Button, TableHeaderCell, Tooltip } from "~/ui/components/atoms";
import {
  Baby,
  BeerStein,
  CalendarBlank,
  CastleTurret,
  Drop,
  Eye,
  Flower,
  Path,
  PersonSimpleBike,
  User,
} from "@phosphor-icons/react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const useRoutesTable = (routes: RouteRow[]) => {
  const { locationId } = useParams();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<RouteRow>();

    return [
      columnHelper.accessor("name", {
        header: () => (
          <TableHeaderCell
            title="Název trasy"
            icon={<PersonSimpleBike size="25" className="text-main-orange" />}
          />
        ),
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("distance", {
        header: () => (
          <TableHeaderCell
            title="Počet km"
            icon={<Path size="25" className="text-main-orange" />}
          />
        ),
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      // columnHelper.accessor("elevation", {
      //   header: () => (
      //     <TableHeaderCell
      //       title="Převýšení"
      //       icon={<Mountains size="25" className="text-main-orange" />}
      //     />
      //   ),
      //   cell: (info) => <div>{info.getValue()}</div>,
      // }),
      // columnHelper.accessor("likes", {
      //   header: () => (
      //     <TableHeaderCell
      //       title="Počet liků"
      //       icon={<Heart size="25" className="text-main-orange" />}
      //     />
      //   ),
      //   cell: (info) => <div>{info.getValue()}</div>,
      // }),
      columnHelper.accessor("authorName", {
        header: () => (
          <TableHeaderCell
            title="Trasu vytvořil"
            icon={<User size="25" className="text-main-orange" />}
          />
        ),
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("createdAt", {
        header: () => (
          <TableHeaderCell
            title="Datum přidání"
            icon={<CalendarBlank size="25" className="text-main-orange" />}
          />
        ),
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("interestingPlaces", {
        header: () => (
          <TableHeaderCell
            title="Informace o trase"
            icon={<Eye size="25" className="text-main-orange" />}
          />
        ),
        cell: (info) => {
          const interestingPlaces = info.getValue();

          const hasInterestingPlace = (place: PlaceOfInterest) =>
            interestingPlaces?.includes(place) ? "#000" : "#00000040";

          return (
            <div className="flex gap-2">
              <Tooltip content="Občerstvení">
                <BeerStein
                  size={20}
                  color={hasInterestingPlace(PlaceOfInterest.PUB)}
                />
              </Tooltip>

              <Tooltip content="Hezká krajina">
                <Flower
                  size={20}
                  color={hasInterestingPlace(PlaceOfInterest.NATURE)}
                />
              </Tooltip>

              <Tooltip content="Koupání">
                <Drop
                  size={20}
                  color={hasInterestingPlace(PlaceOfInterest.SWIMMING)}
                />
              </Tooltip>

              <Tooltip content="Vhodné pro děti">
                <Baby
                  size={20}
                  color={hasInterestingPlace(PlaceOfInterest.CHILDREN)}
                />
              </Tooltip>

              <Tooltip content="Památky">
                <CastleTurret
                  size={20}
                  color={hasInterestingPlace(PlaceOfInterest.CULTURE)}
                />
              </Tooltip>
            </div>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: (info) => (
          <NextLink href={`/locations/${locationId}/${info.row.original.id}`}>
            <Button variant="plain">zobrazit</Button>
          </NextLink>
        ),
      }),
    ];
  }, [locationId]);

  const table = useReactTable<RouteRow>({
    data: routes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
  };
};
