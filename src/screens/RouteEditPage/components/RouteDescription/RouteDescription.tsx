import { Button, Input } from "~/ui/components/atoms";
import { RouteSectionLabel } from "../RouteSectionLabel";
import { metersToKilometers } from "~/utils/route";
import { Route } from "@prisma/client";

interface RouteDescriptionProps {
  detail: Route["detail"];
}

export function RouteDescription({ detail }: RouteDescriptionProps) {
  return (
    <div className="flex-1 p-12">
      <div className="flex flex-col h-full gap-4">
        <RouteSectionLabel label="Název trasy">
          <Input name="detail.name" required defaultValue={detail?.name} />
        </RouteSectionLabel>
        <RouteSectionLabel label="Popis trasy">
          <Input
            name="detail.description"
            required
            defaultValue={detail?.description}
          />
        </RouteSectionLabel>
        <div className="flex justify-between">
          <RouteSectionLabel label="Počet km" className="items-center">
            <p>{metersToKilometers(detail?.distance ?? 0)}</p>
          </RouteSectionLabel>
          {/* <RouteSectionLabel label="Převýšení (m)" className="items-center">
            <p>-</p>
          </RouteSectionLabel> */}
          <RouteSectionLabel label="Vhodné pro">
            <div className="flex items-end gap-2">
              <Button
                type="button"
                // {...isTerrainActive(BikeType.ROAD)}
                // onClick={() => handleTerrainChange(BikeType.ROAD)}
              >
                Silnička
              </Button>
              <Button
                type="button"
                // {...isTerrainActive(BikeType.MTB)}
                // onClick={() => handleTerrainChange(BikeType.MTB)}
              >
                Horské kolo
              </Button>
              <Button
                type="button"
                // {...isTerrainActive(BikeType.GRAVEL)}
                // onClick={() => handleTerrainChange(BikeType.GRAVEL)}
              >
                Gravel
              </Button>
            </div>
          </RouteSectionLabel>
        </div>
        <RouteSectionLabel label="Informace o trase">
          <div className="flex items-end gap-2">
            <Button
              type="button"
              // {...isInterestingPlaceActive(PlaceOfInterest.SWIMMING)}
              // onClick={() =>
              //   handleInterestingPlaceChange(PlaceOfInterest.SWIMMING)
              // }
            >
              Koupání
            </Button>
            <Button
              type="button"
              // {...isInterestingPlaceActive(PlaceOfInterest.PUB)}
              // onClick={() => handleInterestingPlaceChange(PlaceOfInterest.PUB)}
            >
              Občerstvení
            </Button>
            <Button
              type="button"
              // {...isInterestingPlaceActive(PlaceOfInterest.NATURE)}
              // onClick={() =>
              //   handleInterestingPlaceChange(PlaceOfInterest.NATURE)
              // }
            >
              Hezká příroda
            </Button>
            <Button
              type="button"
              // {...isInterestingPlaceActive(PlaceOfInterest.CHILDREN)}
              // onClick={() =>
              //   handleInterestingPlaceChange(PlaceOfInterest.CHILDREN)
              // }
            >
              Vhodné pro děti
            </Button>
            <Button
              type="button"
              // {...isInterestingPlaceActive(PlaceOfInterest.CULTURE)}
              // onClick={() =>
              //   handleInterestingPlaceChange(PlaceOfInterest.CULTURE)
              // }
            >
              Památky
            </Button>
          </div>
        </RouteSectionLabel>

        {/* <ControlledSelect
          name={`detail.regions`}
          options={locations}
          required
        /> */}

        {/* //ulozit by mohlo byt v parent comp */}
        {/* <Button className="mt-auto mr-auto" type="submit">
          Uložit
        </Button> */}
      </div>
    </div>
  );
}
