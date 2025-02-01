import { RoutePoint } from "@prisma/client";
import { Button, Input } from "~/ui/components/atoms";

interface RouteWaypointsProps {
  waypoints: RoutePoint[];
}

export function RouteWaypoints({ waypoints }: RouteWaypointsProps) {
  //TODO: convert coordinate to address name

  return (
    <div className="flex-1">
      <div className="h-full overflow-y-auto">
        <div className="h-full">
          <div className="flex flex-col h-full flex-1  gap-4 p-12">
            {waypoints?.map((field, index) => (
              <Input
                key={field.id}
                name={`routePoints.${index}.value`}
                placeholder="Zadejte bod"

                // {...events(index)}
                // onCoordinatesChange={(val) =>
                //   updatePointById(routePoints[index].id, val)
                // }
              />
            ))}

            <Button
              className="mr-auto"
              // variant={allowAddCrossingPts ? "contained" : "outlined"}
              // onClick={toggleAddCrossingPts}
              type="button"
              variant="outlined"
            >
              Přidat průnikový bod
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
